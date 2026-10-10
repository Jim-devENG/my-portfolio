const MAX_WIDTH = 1600
const TARGET_BYTES = 500 * 1024

export type CompressedImage = { ext: "webp" | "jpg"; base64: string; dataUrl: string; bytes: number }

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))
}

function readAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

/** Resizes an image to at most 1600px wide and re-encodes it small (WebP, or JPEG where WebP isn't supported). */
export async function compressImage(file: File): Promise<CompressedImage> {
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error("That file couldn't be read as an image. Use PNG, JPEG or WebP.")
  })
  const scale = Math.min(1, MAX_WIDTH / bitmap.width)
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Your browser couldn't process the image.")
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  let blob: Blob | null = null
  for (const quality of [0.8, 0.7, 0.6, 0.5]) {
    blob = await toBlob(canvas, "image/webp", quality)
    // Browsers that can't encode WebP silently return PNG; fall back to JPEG.
    if (blob?.type !== "image/webp") blob = await toBlob(canvas, "image/jpeg", quality)
    if (blob && blob.size <= TARGET_BYTES) break
  }
  if (!blob) throw new Error("Your browser couldn't process the image.")

  const dataUrl = await readAsDataUrl(blob)
  return {
    ext: blob.type === "image/webp" ? "webp" : "jpg",
    base64: dataUrl.slice(dataUrl.indexOf(",") + 1),
    dataUrl,
    bytes: blob.size,
  }
}
