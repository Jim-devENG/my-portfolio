const HIGHLIGHT_COLORS = ["text-blue-400", "text-purple-400", "text-pink-400"]
const HIGHLIGHT = /\*\*(.+?)\*\*/g

export function countHighlights(text: string) {
  return text.match(HIGHLIGHT)?.length ?? 0
}

/** Renders `**marked**` phrases as highlights, cycling colours starting at `offset`. */
export function HighlightedText({ text, offset = 0 }: { text: string; offset?: number }) {
  const parts = text.split(HIGHLIGHT)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={`${HIGHLIGHT_COLORS[(offset + (i - 1) / 2) % HIGHLIGHT_COLORS.length]} font-semibold`}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}
