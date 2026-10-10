import { notFound } from "next/navigation"
import { isContentKey } from "@/lib/content/registry"
import { ContentEditor } from "../../_components/ContentEditor"

export default async function AdminEditorPage({ params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  if (!isContentKey(file)) notFound()
  return <ContentEditor key={file} fileKey={file} />
}
