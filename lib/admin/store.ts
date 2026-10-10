import { promises as fs } from "fs"
import path from "path"

export class AdminError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message)
  }
}

export type StoreFile = { path: string; content: Buffer }
export type CommitResult = { commitUrl?: string }

export interface ContentStore {
  kind: "github" | "local"
  readText(filePath: string): Promise<string>
  commit(files: StoreFile[], message: string): Promise<CommitResult>
}

/**
 * Where admin edits are saved. Production commits to GitHub (which triggers a
 * Vercel redeploy); development writes to the local working tree. Override
 * with CONTENT_STORE=github|local.
 */
export function getStore(): ContentStore {
  const mode = process.env.CONTENT_STORE ?? (process.env.NODE_ENV === "production" ? "github" : "local")
  if (mode === "local") return localStore
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  if (!token || !repo) {
    throw new AdminError(503, "Saving isn't configured: set GITHUB_TOKEN and GITHUB_REPO in the Vercel environment.")
  }
  return githubStore(token, repo, process.env.GITHUB_BRANCH || "main")
}

function resolveInRepo(filePath: string) {
  const root = process.cwd()
  const resolved = path.resolve(root, filePath)
  if (!resolved.startsWith(root + path.sep)) throw new AdminError(400, `Invalid path: ${filePath}`)
  return resolved
}

const localStore: ContentStore = {
  kind: "local",
  async readText(filePath) {
    return fs.readFile(resolveInRepo(filePath), "utf8")
  },
  async commit(files) {
    for (const file of files) {
      const target = resolveInRepo(file.path)
      await fs.mkdir(path.dirname(target), { recursive: true })
      await fs.writeFile(target, file.content)
    }
    return {}
  },
}

function githubStore(token: string, repo: string, branch: string): ContentStore {
  async function api<T>(endpoint: string, init: RequestInit & { accept?: string } = {}): Promise<T> {
    const res = await fetch(`https://api.github.com/repos/${repo}${endpoint}`, {
      ...init,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: init.accept ?? "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
      },
    })
    if (!res.ok) {
      const body = await res.text()
      const hint = [401, 403, 404].includes(res.status) ? " Check that GITHUB_TOKEN can read and write GITHUB_REPO." : ""
      throw new AdminError(
        res.status === 422 ? 409 : 502,
        `GitHub ${init.method ?? "GET"} ${endpoint} failed (${res.status}).${hint}`,
        body
      )
    }
    return (init.accept?.includes("raw") ? res.text() : res.json()) as Promise<T>
  }

  return {
    kind: "github",
    async readText(filePath) {
      return api<string>(`/contents/${filePath.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(branch)}`, {
        accept: "application/vnd.github.raw+json",
      })
    },
    // Writes every file in a single commit so one save triggers one deploy.
    async commit(files, message) {
      const blobs = await Promise.all(
        files.map((file) =>
          api<{ sha: string }>("/git/blobs", {
            method: "POST",
            body: JSON.stringify({ content: file.content.toString("base64"), encoding: "base64" }),
          })
        )
      )
      const tree = files.map((file, i) => ({ path: file.path, mode: "100644", type: "blob", sha: blobs[i].sha }))

      // Retry if the branch moved between reading the head and updating it.
      for (let attempt = 0; ; attempt++) {
        const ref = await api<{ object: { sha: string } }>(`/git/ref/heads/${encodeURIComponent(branch)}`)
        const parent = await api<{ tree: { sha: string } }>(`/git/commits/${ref.object.sha}`)
        const newTree = await api<{ sha: string }>("/git/trees", {
          method: "POST",
          body: JSON.stringify({ base_tree: parent.tree.sha, tree }),
        })
        const commit = await api<{ sha: string }>("/git/commits", {
          method: "POST",
          body: JSON.stringify({ message, tree: newTree.sha, parents: [ref.object.sha] }),
        })
        try {
          await api(`/git/refs/heads/${encodeURIComponent(branch)}`, {
            method: "PATCH",
            body: JSON.stringify({ sha: commit.sha, force: false }),
          })
          return { commitUrl: `https://github.com/${repo}/commit/${commit.sha}` }
        } catch (err) {
          if (!(err instanceof AdminError && err.status === 409) || attempt >= 2) throw err
        }
      }
    },
  }
}
