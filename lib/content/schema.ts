import { z } from "zod"
import { expressSections, expressStatuses, socialPlatforms } from "./constants"

// Links are rendered as hrefs, so only allow schemes that can't run script.
const SAFE_LINK = /^(https?:\/\/\S+|mailto:\S+|tel:[+\d\s()-]+|\/\S*|#\S*)$/i
const IMAGE_PATH = /^\/(?!.*\.\.)[\w ()./-]+\.(png|jpe?g|webp|gif|svg)$/i

const text = (max: number) => z.string().trim().min(1, "Required").max(max)
const optionalText = (max: number) =>
  z.string().trim().max(max).optional().transform((v) => v || undefined)
const link = z.string().trim().max(500).regex(SAFE_LINK, "Must start with https://, mailto:, / or #")
const optionalLink = z
  .string()
  .trim()
  .max(500)
  .optional()
  .transform((v) => v || undefined)
  .refine((v) => v === undefined || SAFE_LINK.test(v), "Must start with https://, mailto:, / or #")
const imagePath = z.string().trim().regex(IMAGE_PATH, "Must be an image path like /uploads/photo.webp")
const optionalImagePath = z
  .string()
  .trim()
  .optional()
  .transform((v) => v || undefined)
  .refine((v) => v === undefined || IMAGE_PATH.test(v), "Must be an image path like /uploads/photo.webp")

function uniqueBy<T>(key: (item: T) => string, label: string) {
  return (items: T[], ctx: z.RefinementCtx) => {
    const seen = new Set<string>()
    items.forEach((item, i) => {
      const k = key(item)
      if (seen.has(k)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [i], message: `Duplicate ${label} "${k}"` })
      seen.add(k)
    })
  }
}

const sectionHeader = z.object({
  title: text(80),
  subtitle: optionalText(200),
})

export const siteSchema = z.object({
  brandName: text(60),
  fullName: text(100),
  logo: imagePath,
  seo: z.object({
    title: text(120),
    description: text(300),
    keywords: z.array(text(60)).max(40),
    url: link,
  }),
  social: z
    .array(z.object({ platform: z.enum(socialPlatforms), label: text(100), url: link }))
    .max(12),
})

const button = z.object({ label: text(40), href: link })

export const homeSchema = z.object({
  hero: z.object({
    headline: text(80),
    taglines: z.array(text(60)).max(4),
    intro: text(400),
    primaryCta: button,
    secondaryCta: button,
    stats: z.array(z.object({ value: text(12), label: text(30) })).max(4),
  }),
  skillsSection: sectionHeader,
  projectsSection: sectionHeader.extend({
    count: z.coerce.number().int().min(1).max(12),
    buttonLabel: text(40),
  }),
  aboutSection: sectionHeader.extend({
    paragraphs: z.array(text(1500)).min(1).max(6),
    buttonLabel: text(40),
  }),
  cta: z.object({ title: text(80), text: text(400), buttonLabel: text(40) }),
})

export const aboutSchema = sectionHeader.extend({
  photo: imagePath,
  photoAlt: text(120),
  heading: text(150),
  bio: z.array(text(2000)).min(1).max(8),
  philosophyTitle: text(80),
  philosophy: z.array(z.object({ title: text(80), text: text(1000) })).max(10),
  experienceTitle: text(80),
  experience: z
    .array(z.object({ period: text(40), role: text(80), company: text(100), description: text(1500) }))
    .max(40),
  educationTitle: text(80),
  education: z.array(z.object({ qualification: text(150), institution: text(150), year: text(40) })).max(20),
  certificationsTitle: text(80),
  certifications: z.array(text(150)).max(30),
})

export const projectSchema = z.object({
  id: z.string().trim().regex(/^[\w-]{1,40}$/, "Invalid id"),
  title: text(100),
  description: text(1200),
  stack: z.array(text(40)).max(20),
  liveUrl: optionalLink,
  githubUrl: optionalLink,
  thumbnail: optionalImagePath,
})

export const projectsSchema = sectionHeader.extend({
  projects: z.array(projectSchema).max(100).superRefine(uniqueBy((p) => p.id, "id")),
})

export const skillsSchema = z.object({
  categories: z
    .array(z.object({ category: text(60), skills: z.array(text(60)).max(60) }))
    .max(12)
    .superRefine(uniqueBy((c) => c.category, "category")),
})

export const contactSchema = sectionHeader.extend({
  connectTitle: text(80),
  connectText: text(500),
  responseTitle: text(80),
  responseText: text(500),
})

export const expressPostSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and dashes only")
    .max(100),
  title: text(150),
  dek: text(400),
  section: z.enum(expressSections),
  status: z.enum(expressStatuses),
  readingTime: text(30),
  publishedAt: text(40),
  author: text(80),
  tags: z.array(text(40)).max(15),
  body: z.array(text(5000)).min(1).max(100),
})

export const expressSchema = z.object({
  editorialCode: z.array(text(120)).max(10),
  posts: z.array(expressPostSchema).max(500).superRefine(uniqueBy((p) => p.slug, "slug")),
})

export type SiteContent = z.output<typeof siteSchema>
export type SocialLink = SiteContent["social"][number]
export type HomeContent = z.output<typeof homeSchema>
export type AboutContent = z.output<typeof aboutSchema>
export type Project = z.output<typeof projectSchema>
export type ProjectsContent = z.output<typeof projectsSchema>
export type SkillsContent = z.output<typeof skillsSchema>
export type SkillCategory = SkillsContent["categories"][number]
export type ContactContent = z.output<typeof contactSchema>
export type ExpressSection = (typeof expressSections)[number]
export type ExpressStatus = (typeof expressStatuses)[number]
export type ExpressPost = z.output<typeof expressPostSchema>
export type ExpressContent = z.output<typeof expressSchema>
