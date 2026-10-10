"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { ChevronDown, ChevronRight, ChevronUp, ImageOff, Plus, Trash2, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Field } from "../_lib/specs"
import { slugify } from "../_lib/specs"
import { compressImage, type CompressedImage } from "../_lib/image"

type Path = (string | number)[]
type Value = any

type EditorContextValue = {
  errors: Record<string, string>
  previews: Record<string, string>
  addUpload: (url: string, image: CompressedImage) => void
}

export const EditorContext = createContext<EditorContextValue>({ errors: {}, previews: {}, addUpload: () => {} })

const pathKey = (path: Path) => path.join(".")

function useFieldError(path: Path) {
  return useContext(EditorContext).errors[pathKey(path)]
}

function hasErrorsUnder(errors: Record<string, string>, path: Path) {
  const key = pathKey(path)
  return Object.keys(errors).some((e) => e === key || e.startsWith(key + "."))
}

export const inputClass =
  "w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"

function FieldShell({ label, help, error, children, htmlFor }: { label: string; help?: string; error?: string; children: ReactNode; htmlFor?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-neutral-200">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : help ? <p className="mt-1 text-xs text-neutral-500">{help}</p> : null}
    </div>
  )
}

function IconButton({ label, onClick, disabled, children, className }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn("rounded-md p-1.5 text-neutral-400 transition hover:bg-neutral-800 hover:text-white disabled:pointer-events-none disabled:opacity-30", className)}
    >
      {children}
    </button>
  )
}

/** Two-step delete so nothing is removed by a stray click. */
function DeleteButton({ label, onConfirm }: { label: string; onConfirm: () => void }) {
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (!armed) return
    const timer = setTimeout(() => setArmed(false), 3000)
    return () => clearTimeout(timer)
  }, [armed])
  return armed ? (
    <button type="button" onClick={onConfirm} className="rounded-md bg-red-500/15 px-2 py-1 text-xs font-medium text-red-300 hover:bg-red-500/25">
      Confirm delete
    </button>
  ) : (
    <IconButton label={label} onClick={() => setArmed(true)} className="hover:text-red-400">
      <Trash2 className="h-4 w-4" />
    </IconButton>
  )
}

/** Stable React keys for array items so reordering doesn't confuse inputs. */
function useStableKeys(length: number) {
  const counter = useRef(0)
  const keys = useRef<string[]>([])
  while (keys.current.length < length) keys.current.push(`k${counter.current++}`)
  if (keys.current.length > length) keys.current.length = length
  return {
    keys: keys.current,
    move(from: number, to: number) {
      const [k] = keys.current.splice(from, 1)
      keys.current.splice(to, 0, k)
    },
    remove(index: number) {
      keys.current.splice(index, 1)
    },
    insert(index: number) {
      const k = `k${counter.current++}`
      keys.current.splice(index, 0, k)
      return k
    },
  }
}

function moveItem<T>(items: T[], from: number, to: number) {
  const next = [...items]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export function FieldList({ fields, value, onChange, path }: { fields: Field[]; value: Value; onChange: (v: Value) => void; path: Path }) {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <FieldRenderer
          key={field.key}
          field={field}
          value={value?.[field.key]}
          onChange={(v) => onChange({ ...value, [field.key]: v })}
          path={[...path, field.key]}
        />
      ))}
    </div>
  )
}

function FieldRenderer({ field, value, onChange, path }: { field: Field; value: Value; onChange: (v: Value) => void; path: Path }) {
  const error = useFieldError(path)
  const id = `f-${pathKey(path)}`
  switch (field.type) {
    case "text":
      return (
        <FieldShell label={field.label} help={field.help} error={error} htmlFor={id}>
          <input
            id={id}
            className={cn(inputClass, error && "border-red-500")}
            value={value ?? ""}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        </FieldShell>
      )
    case "textarea":
      return (
        <FieldShell label={field.label} help={field.help} error={error} htmlFor={id}>
          <textarea
            id={id}
            rows={field.rows ?? 4}
            className={cn(inputClass, "resize-y leading-relaxed", error && "border-red-500")}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </FieldShell>
      )
    case "number":
      return (
        <FieldShell label={field.label} help={field.help} error={error} htmlFor={id}>
          <input
            id={id}
            type="number"
            min={field.min}
            max={field.max}
            className={cn(inputClass, "w-32", error && "border-red-500")}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </FieldShell>
      )
    case "select":
      return (
        <FieldShell label={field.label} error={error} htmlFor={id}>
          <select id={id} className={cn(inputClass, "w-auto min-w-48")} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FieldShell>
      )
    case "image":
      return <ImageField field={field} value={value} onChange={onChange} error={error} />
    case "tags":
      return <TagsField label={field.label} help={field.help} error={error} value={value ?? []} onChange={onChange} id={id} />
    case "stringList":
      return <StringListField field={field} value={value ?? []} onChange={onChange} path={path} />
    case "group":
      return (
        <fieldset className="rounded-xl border border-neutral-800 p-4 sm:p-5">
          <legend className="px-2 text-sm font-semibold text-white">{field.label}</legend>
          <FieldList fields={field.fields} value={value ?? {}} onChange={onChange} path={path} />
        </fieldset>
      )
    case "list":
      return <ListField field={field} value={value ?? []} onChange={onChange} path={path} />
  }
}

function TagsField({ label, help, error, value, onChange, id }: { label: string; help?: string; error?: string; value: string[]; onChange: (v: string[]) => void; id: string }) {
  const [draft, setDraft] = useState("")
  const add = (raw: string) => {
    const tags = raw.split(",").map((t) => t.trim()).filter((t) => t && !value.includes(t))
    if (tags.length) onChange([...value, ...tags])
    setDraft("")
  }
  return (
    <FieldShell label={label} help={help ?? "Press Enter or comma to add."} error={error} htmlFor={id}>
      <div className={cn(inputClass, "flex flex-wrap items-center gap-1.5 px-2 py-1.5", error && "border-red-500")}>
        {value.map((tag, i) => (
          <span key={`${tag}-${i}`} className="inline-flex items-center gap-1 rounded-md bg-blue-500/15 py-0.5 pl-2 pr-1 text-xs text-blue-200">
            {tag}
            <button type="button" aria-label={`Remove ${tag}`} onClick={() => onChange(value.filter((_, j) => j !== i))} className="rounded p-0.5 hover:bg-blue-500/30">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={draft}
          onChange={(e) => (e.target.value.includes(",") ? add(e.target.value) : setDraft(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              add(draft)
            } else if (e.key === "Backspace" && !draft && value.length) {
              onChange(value.slice(0, -1))
            }
          }}
          onBlur={() => draft && add(draft)}
          className="min-w-24 flex-1 bg-transparent px-1 py-0.5 text-sm text-white outline-none placeholder:text-neutral-500"
          placeholder={value.length ? "" : "Add…"}
        />
      </div>
    </FieldShell>
  )
}

function StringListField({ field, value, onChange, path }: { field: Extract<Field, { type: "stringList" }>; value: string[]; onChange: (v: string[]) => void; path: Path }) {
  const { errors } = useContext(EditorContext)
  const listError = errors[pathKey(path)]
  const { keys, move, remove, insert } = useStableKeys(value.length)
  return (
    <FieldShell label={field.label} help={field.help} error={listError}>
      <div className="space-y-2">
        {value.map((item, i) => {
          const error = errors[pathKey([...path, i])]
          const Input = field.multiline ? "textarea" : "input"
          return (
            <div key={keys[i]}>
              <div className="flex items-start gap-1">
                <Input
                  aria-label={`${field.itemLabel} ${i + 1}`}
                  rows={field.multiline ? 3 : undefined}
                  className={cn(inputClass, field.multiline && "resize-y leading-relaxed", error && "border-red-500")}
                  value={item}
                  onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}
                />
                <div className={cn("flex shrink-0", field.multiline ? "flex-col" : "items-center")}>
                  <IconButton label="Move up" disabled={i === 0} onClick={() => (move(i, i - 1), onChange(moveItem(value, i, i - 1)))}>
                    <ChevronUp className="h-4 w-4" />
                  </IconButton>
                  <IconButton label="Move down" disabled={i === value.length - 1} onClick={() => (move(i, i + 1), onChange(moveItem(value, i, i + 1)))}>
                    <ChevronDown className="h-4 w-4" />
                  </IconButton>
                  <IconButton label={`Remove ${field.itemLabel}`} onClick={() => (remove(i), onChange(value.filter((_, j) => j !== i)))} className="hover:text-red-400">
                    <X className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
              {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
            </div>
          )
        })}
        <button
          type="button"
          onClick={() => (insert(value.length), onChange([...value, ""]))}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-blue-400 hover:bg-blue-500/10"
        >
          <Plus className="h-4 w-4" /> Add {field.itemLabel}
        </button>
      </div>
    </FieldShell>
  )
}

function ListField({ field, value, onChange, path }: { field: Extract<Field, { type: "list" }>; value: Value[]; onChange: (v: Value[]) => void; path: Path }) {
  const { errors } = useContext(EditorContext)
  const { keys, move, remove, insert } = useStableKeys(value.length)
  const [open, setOpen] = useState<Set<string>>(new Set())

  // Expand any item that failed validation so the error is visible.
  useEffect(() => {
    const withErrors = value.map((_, i) => i).filter((i) => hasErrorsUnder(errors, [...path, i]))
    if (withErrors.length) setOpen((prev) => new Set([...prev, ...withErrors.map((i) => keys[i])]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  const toggle = (key: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const add = (index: number) => {
    const key = insert(index)
    setOpen((prev) => new Set(prev).add(key))
    const next = [...value]
    next.splice(index, 0, field.create())
    onChange(next)
  }

  const addButton = (index: number, text: string) => (
    <button type="button" onClick={() => add(index)} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-blue-400 hover:bg-blue-500/10">
      <Plus className="h-4 w-4" /> {text}
    </button>
  )

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-white">
            {field.label} <span className="font-normal text-neutral-500">({value.length})</span>
          </h3>
          {field.help && <p className="mt-0.5 text-xs text-neutral-500">{field.help}</p>}
        </div>
        {value.length > 3 && addButton(0, `Add to top`)}
      </div>
      <div className="space-y-2">
        {value.map((item, i) => {
          const key = keys[i]
          const isOpen = open.has(key)
          const invalid = hasErrorsUnder(errors, [...path, i])
          return (
            <div key={key} className={cn("rounded-xl border bg-neutral-950", invalid ? "border-red-500/60" : "border-neutral-800")}>
              <div className="flex items-center gap-1 py-1 pl-2 pr-1">
                <button type="button" onClick={() => toggle(key)} aria-expanded={isOpen} className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-1.5 text-left">
                  <ChevronRight className={cn("h-4 w-4 shrink-0 text-neutral-500 transition-transform", isOpen && "rotate-90")} />
                  <span className="truncate text-sm text-neutral-100">{field.summary(item)}</span>
                  {invalid && <span className="shrink-0 rounded bg-red-500/15 px-1.5 py-0.5 text-[11px] text-red-300">Needs fixing</span>}
                </button>
                <IconButton label="Move up" disabled={i === 0} onClick={() => (move(i, i - 1), onChange(moveItem(value, i, i - 1)))}>
                  <ChevronUp className="h-4 w-4" />
                </IconButton>
                <IconButton label="Move down" disabled={i === value.length - 1} onClick={() => (move(i, i + 1), onChange(moveItem(value, i, i + 1)))}>
                  <ChevronDown className="h-4 w-4" />
                </IconButton>
                <DeleteButton label={`Delete ${field.itemLabel}`} onConfirm={() => (remove(i), onChange(value.filter((_, j) => j !== i)))} />
              </div>
              {isOpen && (
                <div className="border-t border-neutral-800 p-4">
                  <FieldList fields={field.fields} value={item} onChange={(v) => onChange(value.map((old, j) => (j === i ? v : old)))} path={[...path, i]} />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-2">{addButton(value.length, `Add ${field.itemLabel}`)}</div>
    </div>
  )
}

function ImageField({ field, value, onChange, error }: { field: Extract<Field, { type: "image" }>; value?: string; onChange: (v: string) => void; error?: string }) {
  const { previews, addUpload } = useContext(EditorContext)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState("")
  const [uploadError, setUploadError] = useState("")
  const [broken, setBroken] = useState(false)
  const src = value ? previews[value] ?? value : ""
  useEffect(() => setBroken(false), [src])

  const onFile = async (file: File | undefined) => {
    if (!file) return
    setBusy(true)
    setUploadError("")
    try {
      const image = await compressImage(file)
      const base = slugify(file.name.replace(/\.[^.]+$/, "")).slice(0, 60) || "image"
      const url = `/${field.folder}/${base}-${Date.now().toString(36)}.${image.ext}`
      addUpload(url, image)
      onChange(url)
      setNote(`Compressed to ${Math.max(1, Math.round(image.bytes / 1024))} KB.`)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Couldn't process that image.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <FieldShell label={field.label} help={note || field.help} error={uploadError || error}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex aspect-video w-full max-w-[16rem] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
          {src && !broken ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="" className="h-full w-full object-cover" onError={() => setBroken(true)} />
          ) : (
            <span className="flex flex-col items-center gap-1 px-3 text-center text-xs text-neutral-500">
              <ImageOff className="h-5 w-5" />
              {src ? "Appears once the site has redeployed" : "No image"}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className={cn("inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-100 hover:bg-neutral-800", busy && "pointer-events-none opacity-60")}>
            <Upload className="h-4 w-4" />
            {busy ? "Compressing…" : value ? "Replace image" : "Upload image"}
            <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(e) => (onFile(e.target.files?.[0]), (e.target.value = ""))} />
          </label>
          {field.optional && value && (
            <button type="button" onClick={() => onChange("")} className="w-fit text-left text-xs text-neutral-400 hover:text-red-400">
              Remove image
            </button>
          )}
          {value && <code className="break-all text-xs text-neutral-500">{value}</code>}
        </div>
      </div>
    </FieldShell>
  )
}
