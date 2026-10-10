import Link from "next/link"
import { site } from "@/lib/content"
import { socialMeta } from "./social"

const COPYRIGHT_YEAR = "2026"

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#09090b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-neutral-400 text-sm">
            © {COPYRIGHT_YEAR} {site.fullName}. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            {site.social.map((link) => {
              const { name, icon: Icon } = socialMeta[link.platform]
              return (
                <Link
                  key={`${link.platform}-${link.url}`}
                  href={link.url}
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label={name}
                >
                  <Icon size={20} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
