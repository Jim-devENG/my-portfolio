import type { ContentKey } from "@/lib/content/registry"
import { expressSections, expressStatuses, socialPlatforms } from "@/lib/content/constants"

type Item = Record<string, any>

export type Field =
  | { type: "text"; key: string; label: string; placeholder?: string; help?: string }
  | { type: "textarea"; key: string; label: string; rows?: number; help?: string }
  | { type: "number"; key: string; label: string; min?: number; max?: number; help?: string }
  | { type: "select"; key: string; label: string; options: readonly string[] }
  | { type: "image"; key: string; label: string; folder: "project-screenshots" | "uploads"; optional?: boolean; help?: string }
  | { type: "tags"; key: string; label: string; help?: string }
  | { type: "stringList"; key: string; label: string; itemLabel: string; multiline?: boolean; help?: string }
  | { type: "group"; key: string; label: string; fields: Field[] }
  | {
      type: "list"
      key: string
      label: string
      itemLabel: string
      summary: (item: Item) => string
      create: () => Item
      fields: Field[]
      help?: string
    }

export type EditorSpec = {
  description: string
  fields: Field[]
  /** Fills in derived values (ids, slugs) before validation. */
  prepare?: (data: Item) => Item
}

const HIGHLIGHT_HELP = "Wrap words in **double asterisks** to highlight them in colour."

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

const newId = () => `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
const today = () => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

const button = (key: string, label: string): Field => ({
  type: "group",
  key,
  label,
  fields: [
    { type: "text", key: "label", label: "Label" },
    { type: "text", key: "href", label: "Link", placeholder: "/projects or https://…" },
  ],
})

const sectionHeader: Field[] = [
  { type: "text", key: "title", label: "Title" },
  { type: "text", key: "subtitle", label: "Subtitle" },
]

export const specs: Record<ContentKey, EditorSpec> = {
  projects: {
    description: "Projects page and the home page's featured projects (the first projects that have a live link).",
    fields: [
      { type: "text", key: "title", label: "Page title" },
      { type: "text", key: "subtitle", label: "Page subtitle" },
      {
        type: "list",
        key: "projects",
        label: "Projects",
        itemLabel: "project",
        summary: (p) => p.title || "Untitled project",
        create: () => ({ id: newId(), title: "", description: "", stack: [], liveUrl: "", githubUrl: "", thumbnail: "" }),
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "description", label: "Description", rows: 4 },
          { type: "tags", key: "stack", label: "Tech stack", help: "The first three show on the card." },
          { type: "text", key: "liveUrl", label: "Live link", placeholder: "https://…" },
          { type: "text", key: "githubUrl", label: "GitHub link", placeholder: "https://github.com/…" },
          { type: "image", key: "thumbnail", label: "Screenshot", folder: "project-screenshots", optional: true },
        ],
      },
    ],
    prepare: (data) => ({ ...data, projects: data.projects.map((p: Item) => ({ ...p, id: p.id || newId() })) }),
  },

  home: {
    description: "Hero, section headings, about preview and call to action on the home page.",
    fields: [
      {
        type: "group",
        key: "hero",
        label: "Hero",
        fields: [
          { type: "text", key: "headline", label: "Headline" },
          { type: "stringList", key: "taglines", label: "Taglines", itemLabel: "tagline" },
          { type: "textarea", key: "intro", label: "Intro", rows: 3, help: HIGHLIGHT_HELP },
          button("primaryCta", "Primary button"),
          button("secondaryCta", "Secondary button"),
          {
            type: "list",
            key: "stats",
            label: "Stats",
            itemLabel: "stat",
            summary: (s) => [s.value, s.label].filter(Boolean).join(" ") || "New stat",
            create: () => ({ value: "", label: "" }),
            fields: [
              { type: "text", key: "value", label: "Value", placeholder: "10+" },
              { type: "text", key: "label", label: "Label", placeholder: "Projects" },
            ],
          },
        ],
      },
      { type: "group", key: "skillsSection", label: "Skills section", fields: sectionHeader },
      {
        type: "group",
        key: "projectsSection",
        label: "Featured projects section",
        fields: [
          ...sectionHeader,
          { type: "number", key: "count", label: "Projects shown", min: 1, max: 12 },
          { type: "text", key: "buttonLabel", label: "Button label" },
        ],
      },
      {
        type: "group",
        key: "aboutSection",
        label: "About preview",
        fields: [
          ...sectionHeader,
          { type: "stringList", key: "paragraphs", label: "Paragraphs", itemLabel: "paragraph", multiline: true, help: HIGHLIGHT_HELP },
          { type: "text", key: "buttonLabel", label: "Button label" },
        ],
      },
      {
        type: "group",
        key: "cta",
        label: "Call to action",
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "text", label: "Text", rows: 3, help: HIGHLIGHT_HELP },
          { type: "text", key: "buttonLabel", label: "Button label" },
        ],
      },
    ],
  },

  about: {
    description: "Everything on the About page.",
    fields: [
      ...sectionHeader,
      { type: "image", key: "photo", label: "Photo", folder: "uploads" },
      { type: "text", key: "photoAlt", label: "Photo description", help: "Read by screen readers." },
      { type: "text", key: "heading", label: "Bio heading" },
      { type: "stringList", key: "bio", label: "Bio", itemLabel: "paragraph", multiline: true },
      { type: "text", key: "philosophyTitle", label: "Philosophy heading" },
      {
        type: "list",
        key: "philosophy",
        label: "Philosophy",
        itemLabel: "principle",
        summary: (p) => p.title || "New principle",
        create: () => ({ title: "", text: "" }),
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "text", label: "Text", rows: 3 },
        ],
      },
      { type: "text", key: "experienceTitle", label: "Experience heading" },
      {
        type: "list",
        key: "experience",
        label: "Experience",
        itemLabel: "role",
        summary: (e) => [e.role, e.company].filter(Boolean).join(" — ") || "New role",
        create: () => ({ period: "", role: "", company: "", description: "" }),
        fields: [
          { type: "text", key: "role", label: "Role" },
          { type: "text", key: "company", label: "Company" },
          { type: "text", key: "period", label: "Period", placeholder: "2023 - 2025" },
          { type: "textarea", key: "description", label: "Description", rows: 3 },
        ],
      },
      { type: "text", key: "educationTitle", label: "Education heading" },
      {
        type: "list",
        key: "education",
        label: "Education",
        itemLabel: "qualification",
        summary: (e) => e.qualification || "New qualification",
        create: () => ({ qualification: "", institution: "", year: "" }),
        fields: [
          { type: "text", key: "qualification", label: "Qualification" },
          { type: "text", key: "institution", label: "Institution" },
          { type: "text", key: "year", label: "Year" },
        ],
      },
      { type: "text", key: "certificationsTitle", label: "Certifications heading" },
      { type: "stringList", key: "certifications", label: "Certifications", itemLabel: "certification" },
    ],
  },

  skills: {
    description: "Skill categories shown on the home page.",
    fields: [
      {
        type: "list",
        key: "categories",
        label: "Categories",
        itemLabel: "category",
        summary: (c) => c.category || "New category",
        create: () => ({ category: "", skills: [] }),
        fields: [
          { type: "text", key: "category", label: "Category name" },
          { type: "tags", key: "skills", label: "Skills" },
        ],
      },
    ],
  },

  contact: {
    description: "Contact page text. Email and social links are under Site & SEO.",
    fields: [
      ...sectionHeader,
      { type: "text", key: "connectTitle", label: "Connect heading" },
      { type: "textarea", key: "connectText", label: "Connect text", rows: 3 },
      { type: "text", key: "responseTitle", label: "Response time heading" },
      { type: "textarea", key: "responseText", label: "Response time text", rows: 3 },
    ],
  },

  express: {
    description: "Express publication posts. Only published posts appear on the site.",
    fields: [
      { type: "stringList", key: "editorialCode", label: "Editorial code", itemLabel: "line" },
      {
        type: "list",
        key: "posts",
        label: "Posts",
        itemLabel: "post",
        summary: (p) => `${p.title || "Untitled post"}${p.status === "Draft" ? " (draft)" : ""}`,
        create: () => ({
          slug: "",
          title: "",
          dek: "",
          section: "Essays",
          status: "Draft",
          readingTime: "5 min read",
          publishedAt: today(),
          author: "Jimmy Enietan",
          tags: [],
          body: [""],
        }),
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "slug", label: "URL slug", help: "Leave blank to generate it from the title." },
          { type: "select", key: "status", label: "Status", options: expressStatuses },
          { type: "select", key: "section", label: "Section", options: expressSections },
          { type: "textarea", key: "dek", label: "Summary", rows: 2 },
          { type: "text", key: "author", label: "Author" },
          { type: "text", key: "publishedAt", label: "Date", placeholder: "Oct 10, 2026" },
          { type: "text", key: "readingTime", label: "Reading time", placeholder: "5 min read" },
          { type: "tags", key: "tags", label: "Tags" },
          { type: "stringList", key: "body", label: "Article", itemLabel: "paragraph", multiline: true },
        ],
      },
    ],
    prepare: (data) => ({
      ...data,
      posts: data.posts.map((p: Item) => ({ ...p, slug: p.slug?.trim() || slugify(p.title ?? "") })),
    }),
  },

  site: {
    description: "Name, logo, search-engine details and social links used across the site.",
    fields: [
      { type: "text", key: "brandName", label: "Name in navigation bar" },
      { type: "text", key: "fullName", label: "Full name", help: "Used in the footer and page titles." },
      { type: "image", key: "logo", label: "Logo / favicon", folder: "uploads" },
      {
        type: "group",
        key: "seo",
        label: "Search & sharing",
        fields: [
          { type: "text", key: "title", label: "Page title" },
          { type: "textarea", key: "description", label: "Description", rows: 3 },
          { type: "tags", key: "keywords", label: "Keywords" },
          { type: "text", key: "url", label: "Site URL", placeholder: "https://…" },
        ],
      },
      {
        type: "list",
        key: "social",
        label: "Social links",
        itemLabel: "link",
        summary: (s) => [s.platform, s.label].filter(Boolean).join(" · ") || "New link",
        create: () => ({ platform: "website", label: "", url: "" }),
        fields: [
          { type: "select", key: "platform", label: "Platform", options: socialPlatforms },
          { type: "text", key: "label", label: "Text shown", placeholder: "@handle or email" },
          { type: "text", key: "url", label: "Link", placeholder: "https://… or mailto:…" },
        ],
      },
    ],
  },
}
