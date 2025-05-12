import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import Script from "next/script"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Accounting Website Redesigns + AI Chatbots | theWebtailors",
  description:
    "We redesign outdated accounting websites & add AI chatbots to boost leads. theWebtailors build modern, high-converting sites for UK accountants.",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030303',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className={cn("min-h-screen bg-[#030303] font-sans antialiased [--scroll-mt:80px] [scroll-margin-top:80px]", poppins.variable)}>
        {children}
        <Toaster position="top-center" theme="dark" richColors />
        <Script 
          src="https://assets.calendly.com/assets/external/widget.js" 
          strategy="lazyOnload"
          id="calendly-widget"
        />
        <Script id="performance-marker" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined') {
              window.addEventListener('load', () => {
                window.performance.mark('app-interactive');
                
                document.addEventListener('visibilitychange', () => {
                  if (document.hidden) {
                    document.body.classList.add('reduce-animations');
                  } else {
                    document.body.classList.remove('reduce-animations');
                  }
                });
                
                if ('loading' in HTMLImageElement.prototype) {
                  const images = document.querySelectorAll('img[loading="lazy"]');
                  images.forEach(img => {
                    if (img.dataset.src) {
                      img.src = img.dataset.src;
                    }
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
