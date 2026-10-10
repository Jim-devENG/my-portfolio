// Kept separate from ./index so Express posts aren't bundled into the
// client-side pages (home, about, contact) as the publication grows.
import expressJson from "@/content/express.json"
import type { ExpressContent } from "./schema"

export { expressSections as publicationSections } from "./constants"

export const express = expressJson as ExpressContent
export const expressPosts = express.posts
