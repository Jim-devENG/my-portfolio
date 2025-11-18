import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/Jim-devENG" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/enietan-jimmy" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Email", icon: Mail, href: "mailto:jamesenietan@gmail.com" },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#09090b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} James Olorunfemi Enietan. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label={link.name}
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

