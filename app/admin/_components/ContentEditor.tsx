"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { CheckCircle2, ExternalLink, Loader2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { contentFiles, type ContentKey } from "@/lib/content/registry"
import { specs } from "../_lib/specs"
import type { CompressedImage } from "../_lib/image"
import { EditorContext, FieldList } from "./fields"

const PUBLIC_PAGE: Record<ContentKey, string> = {
  projects: "/projects",
  home: "/",
  about: "/about",
  skills: "/",
  contact: "/contact",
  express: "/express",
  site: "/",
}

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; message: string; commitUrl?: string }
  | { kind: "error"; message: string }

type Issue = { path: (string | number)[]; message: string }

const toErrorMap = (issues: Issue[]) => Object.fromEntries(issues.map((i) => [i.path.join("."), i.message]))

function goToLogin() {
  window.location.href = `/admin/login?next=${encodeURIComponent(window.location.pathname)}`
}

export function ContentEditor({ fileKey }: { fileKey: ContentKey }) {
  const spec = specs[fileKey]
  const { label, schema } = contentFiles[fileKey]

  const [data, setData] = useState<any>(null)
  const [savedSnapshot, setSavedSnapshot] = useState("")
  const [store, setStore] = useState<"github" | "local">()
  const [loadError, setLoadError] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploads, setUploads] = useState<Record<string, CompressedImage>>({})
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  useEffect(() => {
    fetch(`/api/admin/content/${fileKey}`)
      .then(async (res) => {
        if (res.status === 401) return goToLogin()
        const body = await res.json()
        if (!res.ok) throw new Error(body.error ?? "Couldn't load content")
        setData(body.data)
        setSavedSnapshot(JSON.stringify(body.data))
        setStore(body.store)
      })
      .catch((err) => setLoadError(err.message))
  }, [fileKey])

  const dirty = data !== null && JSON.stringify(data) !== savedSnapshot

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  const update = (next: any) => {
    setData(next)
    if (status.kind !== "saving") setStatus({ kind: "idle" })
  }

  const save = useCallback(async () => {
    if (!dirty || status.kind === "saving") return
    const prepared = spec.prepare ? spec.prepare(data) : data
    setData(prepared)

    const check = schema.safeParse(prepared)
    if (!check.success) {
      setErrors(toErrorMap(check.error.issues))
      setStatus({ kind: "error", message: `${check.error.issues.length} field${check.error.issues.length > 1 ? "s need" : " needs"} fixing before you can save.` })
      return
    }
    setErrors({})
    setStatus({ kind: "saving" })

    // Only send images that are still used after any edits.
    const json = JSON.stringify(prepared)
    const pending = Object.entries(uploads)
      .filter(([url]) => json.includes(JSON.stringify(url)))
      .map(([url, image]) => ({ url, data: image.base64 }))

    try {
      const res = await fetch(`/api/admin/content/${fileKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: prepared, uploads: pending }),
      })
      if (res.status === 401) return goToLogin()
      const body = await res.json()
      if (!res.ok) {
        if (body.issues) setErrors(toErrorMap(body.issues))
        throw new Error(body.error ?? "Save failed")
      }
      setPreviews((prev) => ({ ...prev, ...Object.fromEntries(Object.entries(uploads).map(([url, img]) => [url, img.dataUrl])) }))
      setUploads({})
      setData(body.data)
      setSavedSnapshot(JSON.stringify(body.data))
      setStatus({
        kind: "saved",
        commitUrl: body.commitUrl,
        message:
          body.store === "github"
            ? "Saved. The site is redeploying and will show your changes in about 1–2 minutes."
            : "Saved to the local content files.",
      })
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Save failed" })
    }
  }, [data, dirty, fileKey, schema, spec, status.kind, uploads])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault()
        save()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [save])

  const context = useMemo(
    () => ({
      errors,
      previews: { ...previews, ...Object.fromEntries(Object.entries(uploads).map(([url, img]) => [url, img.dataUrl])) },
      addUpload: (url: string, image: CompressedImage) => setUploads((prev) => ({ ...prev, [url]: image })),
    }),
    [errors, previews, uploads]
  )

  return (
    <div className="pb-28">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{label}</h1>
          <p className="mt-1 max-w-2xl text-sm text-neutral-400">{spec.description}</p>
        </div>
        <a href={PUBLIC_PAGE[fileKey]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white">
          View page <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </header>

      {loadError ? (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">{loadError}</p>
      ) : data === null ? (
        <p className="flex items-center gap-2 text-sm text-neutral-400">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </p>
      ) : (
        <EditorContext.Provider value={context}>
          <FieldList fields={spec.fields} value={data} onChange={update} path={[]} />
        </EditorContext.Provider>
      )}

      {data !== null && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-neutral-800 bg-[#09090b]/95 backdrop-blur md:left-60">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
            <StatusLine status={status} dirty={dirty} store={store} />
            <div className="flex gap-2">
              {dirty && status.kind !== "saving" && (
                <button
                  type="button"
                  onClick={() => (setData(JSON.parse(savedSnapshot)), setErrors({}), setUploads({}), setStatus({ kind: "idle" }))}
                  className="rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                >
                  Discard
                </button>
              )}
              <button
                type="button"
                onClick={save}
                disabled={!dirty || status.kind === "saving"}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
              >
                {status.kind === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status.kind === "saving" ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatusLine({ status, dirty, store }: { status: Status; dirty: boolean; store?: "github" | "local" }) {
  if (status.kind === "error") {
    return (
      <p className="flex items-center gap-2 text-sm text-red-300">
        <AlertTriangle className="h-4 w-4 shrink-0" /> {status.message}
      </p>
    )
  }
  if (status.kind === "saved" && !dirty) {
    return (
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-emerald-300">
        <CheckCircle2 className="h-4 w-4 shrink-0" /> {status.message}
        {status.commitUrl && (
          <a href={status.commitUrl} target="_blank" rel="noreferrer" className="text-neutral-400 underline hover:text-white">
            View commit
          </a>
        )}
      </p>
    )
  }
  return (
    <p className={cn("text-sm", dirty ? "text-amber-300" : "text-neutral-500")}>
      {dirty ? "Unsaved changes" : store === "local" ? "Saving to local files (development)" : "All changes saved"}
    </p>
  )
}
