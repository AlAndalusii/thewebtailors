import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "TheWebTailors - Tailored Web Design for the Modern Brand",
  description:
    "Premium web design services that transform outdated websites into elegant, future-forward digital experiences.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn("min-h-screen bg-[#030303] font-sans antialiased", poppins.variable)}>
        {children}
        <Toaster position="top-center" theme="dark" richColors />
      </body>
    </html>
  )
}
