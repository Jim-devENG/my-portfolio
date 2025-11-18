import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "James Olorunfemi Enietan | Full Stack Developer",
  description: "Results-driven Full Stack Developer with 5+ years of experience building scalable, secure, and user-focused web applications",
  keywords: ["full stack developer", "software engineer", "developer", "portfolio", "James Enietan", "React", "Node.js", "Laravel"],
  authors: [{ name: "James Olorunfemi Enietan" }],
  openGraph: {
    title: "James Olorunfemi Enietan | Full Stack Developer",
    description: "Results-driven Full Stack Developer with 5+ years of experience building scalable, secure, and user-focused web applications",
    type: "website",
    url: "https://jimmyenietan.site",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}

