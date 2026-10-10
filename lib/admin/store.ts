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
  const token = process.env.GITHUB_TOKEN?.trim()
  if (!token) {
    throw new AdminError(503, "Saving isn't configured: add GITHUB_TOKEN in Vercel → Settings → Environment Variables, then redeploy.")
  }
  return githubStore(token, resolveRepo(), process.env.GITHUB_BRANCH?.trim() || "main")
}

/** GITHUB_REPO as owner/repo, tolerating a pasted URL; falls back to the repo Vercel deploys from. */
function resolveRepo() {
  const raw = process.env.GITHUB_REPO?.trim()
  if (!raw) {
    const { VERCEL_GIT_REPO_OWNER: owner, VERCEL_GIT_REPO_SLUG: slug } = process.env
    if (owner && slug) return `${owner}/${slug}`
    throw new AdminError(503, "Saving isn't configured: add GITHUB_REPO (e.g. Jim-devENG/my-portfolio) in Vercel, then redeploy.")
  }
  const repo = raw
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/\.git$/i, "")
    .replace(/\/+$/, "")
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    // Don't echo the value: a token pasted into the wrong field would end up in logs.
    throw new AdminError(503, "GITHUB_REPO should look like owner/repo (e.g. Jim-devENG/my-portfolio). Fix it in Vercel, then redeploy.")
  }
  return repo
}

function githubErrorMessage(status: number, repo: string, request: string) {
  if (status === 401) {
    return "GitHub rejected GITHUB_TOKEN (401): it may have expired or been revoked. Create a new token, update it in Vercel, then redeploy."
  }
  if (status === 403 || status === 404) {
    return `GitHub returned ${status} for ${repo}. Check that GITHUB_REPO is exactly the owner/repo name and that GITHUB_TOKEN has access to that repository with Contents: read and write.`
  }
  return `GitHub ${request} failed (${status}).`
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
      // 500 rather than 502: Cloudflare replaces 502 responses with its own HTML page.
      throw new AdminError(
        res.status === 422 ? 409 : 500,
        githubErrorMessage(res.status, repo, `${init.method ?? "GET"} ${endpoint}`),
        await res.text()
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
