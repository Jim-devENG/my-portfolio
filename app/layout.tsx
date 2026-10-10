import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { site } from "@/lib/content"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
  keywords: site.seo.keywords,
  authors: [{ name: site.fullName }],
  icons: {
    icon: site.logo,
    shortcut: site.logo,
    apple: site.logo,
  },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    type: "website",
    url: site.seo.url,
    siteName: site.fullName,
    images: [
      {
        url: site.logo,
        width: 1200,
        height: 630,
        alt: site.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.logo],
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

