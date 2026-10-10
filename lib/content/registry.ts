import type { ZodTypeAny } from "zod"
import {
  aboutSchema,
  contactSchema,
  expressSchema,
  homeSchema,
  projectsSchema,
  siteSchema,
  skillsSchema,
} from "./schema"

export const contentFiles = {
  projects: { label: "Projects", path: "content/projects.json", schema: projectsSchema },
  home: { label: "Home", path: "content/home.json", schema: homeSchema },
  about: { label: "About", path: "content/about.json", schema: aboutSchema },
  skills: { label: "Skills", path: "content/skills.json", schema: skillsSchema },
  contact: { label: "Contact", path: "content/contact.json", schema: contactSchema },
  express: { label: "Express", path: "content/express.json", schema: expressSchema },
  site: { label: "Site & SEO", path: "content/site.json", schema: siteSchema },
} satisfies Record<string, { label: string; path: string; schema: ZodTypeAny }>

export type ContentKey = keyof typeof contentFiles
export const contentKeys = Object.keys(contentFiles) as ContentKey[]

export function isContentKey(key: string): key is ContentKey {
  return Object.prototype.hasOwnProperty.call(contentFiles, key)
}
