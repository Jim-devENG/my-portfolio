"use client"

import { usePathname } from "next/navigation"
import { ExternalLink, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { contentFiles, contentKeys } from "@/lib/content/registry"

export function Sidebar() {
  const pathname = usePathname()

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {})
    window.location.href = "/admin/login"
  }

  return (
    <aside className="border-b border-neutral-800 md:fixed md:inset-y-0 md:left-0 md:w-60 md:border-b-0 md:border-r">
      <div className="flex h-full flex-col gap-4 p-4 md:p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-400">Admin</p>
          <div className="flex items-center gap-4 md:hidden">
            <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-white">
              View site <ExternalLink className="h-3 w-3" />
            </a>
            <button type="button" onClick={logout} className="text-xs text-neutral-500 hover:text-white">
              Log out
            </button>
          </div>
        </div>
        {/* Plain links (full page loads) so the unsaved-changes warning can fire. */}
        <nav className="-mx-1 flex gap-1 overflow-x-auto md:mx-0 md:flex-col md:overflow-visible">
          {contentKeys.map((key) => {
            const href = `/admin/${key}`
            const active = pathname === href
            return (
              <a
                key={key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-sm transition",
                  active ? "bg-blue-500/15 text-white" : "text-neutral-400 hover:bg-neutral-800/60 hover:text-white"
                )}
              >
                {contentFiles[key].label}
              </a>
            )
          })}
        </nav>
        <div className="mt-auto hidden flex-col gap-1 border-t border-neutral-800 pt-4 md:flex">
          <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-800/60 hover:text-white">
            <ExternalLink className="h-4 w-4" /> View site
          </a>
          <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-400 hover:bg-neutral-800/60 hover:text-white">
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </div>
    </aside>
  )
}
