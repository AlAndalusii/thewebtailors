import type { Metadata, Viewport } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Trades Website Design & AI Chatbots | Modern Sites for Tradespeople",
  description: "Professional web design for tradespeople with AI chatbots. Create a modern, secure website that attracts customers and streamlines your business. Get a custom trades website design with booking automation.",
  generator: 'v0.dev',
  keywords: ['web design for tradespeople', 'tradesman web design', 'trades website design', 'electrician website', 'plumber website', 'gas engineer website', 'builder website', 'trades practice website'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030303',
}

export default function ChatbotsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 