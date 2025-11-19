import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "James Olorunfemi Enietan | AI-Powered Software Engineer",
  description: "AI-Powered Software Engineer with 5+ years of experience building scalable, secure, and user-focused web applications. Specializing in React, Node.js, Python, FastAPI, and blockchain development.",
  keywords: ["AI-powered software engineer", "full stack developer", "software engineer", "blockchain developer", "developer", "portfolio", "James Enietan", "React", "Node.js", "Laravel", "Python", "FastAPI", "Solidity", "AI", "machine learning"],
  authors: [{ name: "James Olorunfemi Enietan" }],
  openGraph: {
    title: "James Olorunfemi Enietan | AI-Powered Software Engineer",
    description: "AI-Powered Software Engineer with 5+ years of experience building scalable, secure, and user-focused web applications. Specializing in React, Node.js, Python, FastAPI, and blockchain development.",
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

