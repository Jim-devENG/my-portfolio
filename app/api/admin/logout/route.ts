import { NextResponse, type NextRequest } from "next/server"
import { errorResponse, requireSameOrigin } from "@/lib/admin/request"
import { SESSION_COOKIE } from "@/lib/admin/session"

export async function POST(req: NextRequest) {
  try {
    requireSameOrigin(req)
    const res = NextResponse.json({ ok: true })
    res.cookies.delete(SESSION_COOKIE)
    return res
  } catch (err) {
    return errorResponse(err)
  }
}
