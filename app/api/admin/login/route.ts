import { NextResponse, type NextRequest } from "next/server"
import { errorResponse, requireSameOrigin } from "@/lib/admin/request"
import { SESSION_COOKIE, SESSION_MAX_AGE, checkPassword, createSessionToken, getAdminConfig } from "@/lib/admin/session"
import { AdminError } from "@/lib/admin/store"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    requireSameOrigin(req)
    const result = getAdminConfig()
    if (!("config" in result)) throw new AdminError(503, result.error)

    const body = await req.json().catch(() => ({}))
    const password = typeof body.password === "string" ? body.password : ""
    if (!(await checkPassword(password, result.config))) {
      // Slow down guessing.
      await new Promise((resolve) => setTimeout(resolve, 1000))
      throw new AdminError(401, "Wrong password")
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set(SESSION_COOKIE, await createSessionToken(result.config), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    })
    return res
  } catch (err) {
    return errorResponse(err)
  }
}
