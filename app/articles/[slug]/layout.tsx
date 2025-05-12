import type { Metadata, Viewport } from "next"
import React from "react"

// This is a dynamic route, so we'll use generateMetadata
// In a real application, you'd fetch the article data here
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // In a real app, you would fetch article data here
  // For now, we'll just use the slug
  return {
    title: `${params.slug} | theWebtailors`,
    description: "We redesign outdated accounting websites & add AI chatbots to boost leads. theWebtailors build modern, high-converting sites for UK accountants.",
    generator: 'v0.dev',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030303',
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 