// Content for the public pages. Edited through /admin, which validates
// against lib/content/schema.ts before committing the JSON files.
import siteJson from "@/content/site.json"
import homeJson from "@/content/home.json"
import aboutJson from "@/content/about.json"
import projectsJson from "@/content/projects.json"
import skillsJson from "@/content/skills.json"
import contactJson from "@/content/contact.json"
import type {
  AboutContent,
  ContactContent,
  HomeContent,
  ProjectsContent,
  SiteContent,
  SkillsContent,
} from "./schema"

export type * from "./schema"

export const site = siteJson as SiteContent
export const home = homeJson as HomeContent
export const about = aboutJson as AboutContent
export const projectsPage = projectsJson as ProjectsContent
export const projects = projectsPage.projects
export const skills = (skillsJson as SkillsContent).categories
export const contact = contactJson as ContactContent
