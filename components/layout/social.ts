import { Github, Globe, Instagram, Linkedin, Mail, Twitter, Youtube, type LucideIcon } from "lucide-react"
import type { SocialLink } from "@/lib/content"

export const socialMeta: Record<SocialLink["platform"], { name: string; icon: LucideIcon }> = {
  email: { name: "Email", icon: Mail },
  github: { name: "GitHub", icon: Github },
  linkedin: { name: "LinkedIn", icon: Linkedin },
  twitter: { name: "Twitter", icon: Twitter },
  instagram: { name: "Instagram", icon: Instagram },
  youtube: { name: "YouTube", icon: Youtube },
  website: { name: "Website", icon: Globe },
}
