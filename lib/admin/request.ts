import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { SESSION_COOKIE, verifySessionToken } from "./session"
import { AdminError, type StoreFile } from "./store"

export async function requireAdmin(req: NextRequest) {
  if (!(await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value))) {
    throw new AdminError(401, "Not signed in")
  }
}

/** Blocks cross-site form posts; the session cookie is also SameSite=Strict. */
export function requireSameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin")
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host")
  if (!origin || !host || new URL(origin).host !== host) {
    throw new AdminError(403, "Cross-origin request blocked")
  }
}

export function errorResponse(err: unknown) {
  if (err instanceof AdminError) {
    if (err.status >= 500) console.error(err.message, err.details ?? "")
    const issues = err.status === 400 ? err.details : undefined
    return NextResponse.json({ error: err.message, issues }, { status: err.status })
  }
  console.error(err)
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
}

// Uploaded images are resized in the browser first; these limits are the backstop.
const MAX_IMAGE_BYTES = 1024 * 1024
const MAX_UPLOADS = 8
const UPLOAD_URL = /^\/(project-screenshots|uploads)\/[a-z0-9][a-z0-9-]{0,80}\.(webp|jpg|png)$/

const SIGNATURES: Record<string, (b: Buffer) => boolean> = {
  webp: (b) => b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP",
  jpg: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  png: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
}

const uploadsSchema = z
  .array(z.object({ url: z.string().regex(UPLOAD_URL, "Invalid upload path"), data: z.string().max(MAX_IMAGE_BYTES * 2) }))
  .max(MAX_UPLOADS, `At most ${MAX_UPLOADS} images per save`)
  .default([])

/** Validates uploaded images and maps them to files under public/. */
export function parseUploads(raw: unknown): StoreFile[] {
  const parsed = uploadsSchema.safeParse(raw)
  if (!parsed.success) throw new AdminError(400, parsed.error.issues[0]?.message ?? "Invalid uploads")
  return parsed.data.map(({ url, data }) => {
    const content = Buffer.from(data, "base64")
    const ext = url.slice(url.lastIndexOf(".") + 1)
    if (content.length === 0 || content.length > MAX_IMAGE_BYTES) {
      throw new AdminError(400, `${url} is ${Math.round(content.length / 1024)} KB; the limit is 1 MB`)
    }
    if (!SIGNATURES[ext](content)) throw new AdminError(400, `${url} isn't a valid ${ext} image`)
    return { path: `public${url}`, content }
  })
}
