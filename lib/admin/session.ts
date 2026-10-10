// Admin session cookies, signed with HMAC-SHA256. Uses Web Crypto so it runs
// in both the middleware (edge) and route handlers (node).

export const SESSION_COOKIE = "admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days, in seconds

const MIN_PASSWORD_LENGTH = 10
const MIN_SECRET_LENGTH = 32

type AdminConfig = { password: string; secret: string }

/** Returns the admin credentials, or an explanation of what's missing. */
export function getAdminConfig(): { config: AdminConfig } | { error: string } {
  const password = process.env.ADMIN_PASSWORD ?? ""
  const secret = process.env.ADMIN_SESSION_SECRET ?? ""
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: `Admin is disabled: set ADMIN_PASSWORD (at least ${MIN_PASSWORD_LENGTH} characters).` }
  }
  if (secret.length < MIN_SECRET_LENGTH) {
    return { error: `Admin is disabled: set ADMIN_SESSION_SECRET (at least ${MIN_SECRET_LENGTH} characters).` }
  }
  return { config: { password, secret } }
}

const encoder = new TextEncoder()

function toBase64Url(bytes: ArrayBuffer) {
  let binary = ""
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

async function hmac(key: string, data: string) {
  const cryptoKey = await crypto.subtle.importKey("raw", encoder.encode(key), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ])
  return toBase64Url(await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data)))
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// Keying on the password as well as the secret means changing either one
// invalidates every existing session.
const signingKey = ({ password, secret }: AdminConfig) => `${secret}:${password}`

export async function checkPassword(input: string, config: AdminConfig) {
  // Compare digests so the comparison time doesn't depend on the input length.
  const [a, b] = await Promise.all([hmac(config.secret, input), hmac(config.secret, config.password)])
  return constantTimeEqual(a, b)
}

export async function createSessionToken(config: AdminConfig) {
  const expires = Date.now() + SESSION_MAX_AGE * 1000
  return `${expires}.${await hmac(signingKey(config), `admin:${expires}`)}`
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false
  const result = getAdminConfig()
  if (!("config" in result)) return false
  const [expiresRaw, signature] = token.split(".")
  const expires = Number(expiresRaw)
  if (!Number.isFinite(expires) || expires < Date.now() || !signature) return false
  return constantTimeEqual(signature, await hmac(signingKey(result.config), `admin:${expires}`))
}
