"use client"

import { useState } from "react"
import { Loader2, Lock } from "lucide-react"
import { inputClass } from "../_components/fields"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Read from the form rather than state so autofill before hydration still works.
    const password = new FormData(e.currentTarget).get("password")
    setBusy(true)
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error ?? "Sign-in failed")
      const next = new URLSearchParams(window.location.search).get("next") ?? ""
      // Only follow redirects back into the admin.
      window.location.href = /^\/admin(\/[\w-]*)?$/.test(next) ? next : "/admin"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed")
      setBusy(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form method="post" onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15">
          <Lock className="h-5 w-5 text-blue-400" />
        </div>
        <h1 className="text-xl font-bold text-white">Portfolio admin</h1>
        <p className="mb-6 mt-1 text-sm text-neutral-400">Sign in to edit your site.</p>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-neutral-200">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          className={inputClass}
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign in
        </button>
      </form>
    </main>
  )
}
