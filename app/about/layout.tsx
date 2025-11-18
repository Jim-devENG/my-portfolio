import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | James Olorunfemi Enietan",
  description: "Learn more about James Olorunfemi Enietan - Full Stack Developer with 5+ years of experience",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

