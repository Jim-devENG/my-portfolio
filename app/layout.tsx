import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "James Olorunfemi Enietan | Software Engineer",
  description: "Software Engineer building scalable, secure, and user-focused web applications. Specializing in React, Node.js, Python, FastAPI, and blockchain development.",
  keywords: ["full stack developer", "software engineer", "blockchain developer", "developer", "portfolio", "James Enietan", "React", "Node.js", "Laravel", "Python", "FastAPI", "Solidity", "AI", "machine learning"],
  authors: [{ name: "James Olorunfemi Enietan" }],
  icons: {
    icon: "/James Enietan Logo favicon.png",
    shortcut: "/James Enietan Logo favicon.png",
    apple: "/James Enietan Logo favicon.png",
  },
  openGraph: {
    title: "James Olorunfemi Enietan | Software Engineer",
    description: "Software Engineer building scalable, secure, and user-focused web applications. Specializing in React, Node.js, Python, FastAPI, and blockchain development.",
    type: "website",
    url: "https://jimmyenietan.site",
    siteName: "James Olorunfemi Enietan",
    images: [
      {
        url: "/James Enietan Logo favicon.png",
        width: 1200,
        height: 630,
        alt: "James Olorunfemi Enietan - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "James Olorunfemi Enietan | Software Engineer",
    description: "Software Engineer building scalable, secure, and user-focused web applications. Specializing in React, Node.js, Python, FastAPI, and blockchain development.",
    images: ["/James Enietan Logo favicon.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

