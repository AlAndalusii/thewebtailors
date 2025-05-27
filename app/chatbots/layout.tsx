import type { Metadata, Viewport } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Therapy Website Design & AI Chatbots | Modern Sites for Therapists",
  description: "Professional web design for therapists with AI chatbots. Create a modern, secure website that attracts clients and streamlines your practice. Get a custom therapy website design with booking automation.",
  generator: 'v0.dev',
  keywords: ['web design for therapists', 'therapy web design', 'therapy website design', 'therapist website', 'mental health website', 'therapy practice website', 'counseling website design', 'private practice therapist website'],
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