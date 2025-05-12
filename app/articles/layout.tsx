import type { Metadata, Viewport } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Articles & Resources | theWebtailors",
  description: "We redesign outdated accounting websites & add AI chatbots to boost leads. theWebtailors build modern, high-converting sites for UK accountants.",
  generator: 'v0.dev',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030303',
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 