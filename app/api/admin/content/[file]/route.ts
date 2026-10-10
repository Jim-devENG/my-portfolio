import { NextResponse, type NextRequest } from "next/server"
import { contentFiles, isContentKey } from "@/lib/content/registry"
import { errorResponse, parseUploads, requireAdmin, requireSameOrigin } from "@/lib/admin/request"
import { AdminError, getStore } from "@/lib/admin/store"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type Params = { params: Promise<{ file: string }> }

async function getFile(params: Params["params"]) {
  const { file } = await params
  if (!isContentKey(file)) throw new AdminError(404, `Unknown content file "${file}"`)
  return contentFiles[file]
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin(req)
    const file = await getFile(params)
    const store = getStore()
    const data = JSON.parse(await store.readText(file.path))
    return NextResponse.json({ data, store: store.kind })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin(req)
    requireSameOrigin(req)
    const file = await getFile(params)
    const body = await req.json().catch(() => {
      throw new AdminError(400, "Request body must be JSON")
    })

    const parsed = file.schema.safeParse(body.data)
    if (!parsed.success) {
      const issues = parsed.error.issues.map((issue) => ({ path: issue.path, message: issue.message }))
      throw new AdminError(400, "Some fields need fixing", issues)
    }
    const uploads = parseUploads(body.uploads)

    const store = getStore()
    const result = await store.commit(
      [{ path: file.path, content: Buffer.from(JSON.stringify(parsed.data, null, 2) + "\n") }, ...uploads],
      `Update ${file.label.toLowerCase()} via admin`
    )
    return NextResponse.json({ ok: true, data: parsed.data, store: store.kind, ...result })
  } catch (err) {
    return errorResponse(err)
  }
}
