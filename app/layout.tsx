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
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://thewebtailors.co.uk' : 'http://localhost:3000'),
  title: "theWebTailors | Premium Trade Website Design & Lead Generation Systems UK",
  description:
    "Transform your UK trade business with premium website design & 24/7 lead capture systems. Specialising in roofing, driveway & loft conversion websites that convert visitors into customers. +285% ROI average.",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
    ],
    shortcut: [
      { url: '/favicon.png', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#6366F1'
      }
    ]
  },
  manifest: '/manifest.json',
  applicationName: 'theWebTailors',
  keywords: [
    'trade website design UK', 
    'roofing website design', 
    'driveway website design', 
    'loft conversion website design',
    'premium trade websites',
    'lead generation systems',
    'UK trade business websites',
    'professional service websites',
    'conversion focused web design',
    'theWebTailors',
    'trade chatbot systems',
    'local trade marketing'
  ],
  authors: [{ name: 'theWebTailors' }],
  creator: 'theWebTailors',
  publisher: 'theWebTailors',
  category: 'Web Design & Digital Marketing',
  classification: 'Business Services',
  openGraph: {
    title: 'theWebTailors | Premium Trade Website Design & Lead Generation UK',
    description: 'Transform your UK trade business with premium website design & 24/7 lead capture systems. +285% ROI average for roofing, driveway & loft conversion websites.',
    url: '/',
    siteName: 'theWebTailors',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'theWebTailors - Premium Trade Website Design UK',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'theWebTailors | Premium Trade Website Design UK',
    description: 'Transform your UK trade business with premium websites & lead generation systems. +285% ROI average.',
    creator: '@thewebtailors',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
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
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/before 4.png" as="image" type="image/png" />
        <link rel="preload" href="/after 4.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        
        {/* Resource hints for better loading */}
        <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />
        
        {/* Critical CSS inlined would go here if needed */}
      </head>
      <body className={cn("min-h-screen bg-[#030303] font-sans antialiased [--scroll-mt:80px] [scroll-margin-top:80px]", poppins.variable)}>
        {children}
        <Toaster position="top-center" theme="dark" richColors />
        
        {/* Optimized Scripts */}
        <Script 
          src="https://assets.calendly.com/assets/external/widget.js" 
          strategy="lazyOnload"
          id="calendly-widget"
        />
        
        <Script id="performance-optimization" strategy="afterInteractive">
          {`
            (function() {
              if (typeof window === 'undefined') return;
              
              // Enhanced performance monitoring
              const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                  }
                  if (entry.entryType === 'first-input') {
                    console.log('FID:', entry.processingStart - entry.startTime);
                  }
                  if (entry.entryType === 'layout-shift') {
                    if (!entry.hadRecentInput) {
                      console.log('CLS:', entry.value);
                    }
                  }
                }
              });
              
              observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
              
              // Optimized visibility change handler
              let rafId;
              document.addEventListener('visibilitychange', () => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                  if (document.hidden) {
                    document.body.classList.add('reduce-animations');
                  } else {
                    document.body.classList.remove('reduce-animations');
                  }
                });
              });
              
              // Optimized image loading
              if ('loading' in HTMLImageElement.prototype) {
                const images = document.querySelectorAll('img[loading="lazy"]');
                images.forEach(img => {
                  if (img.dataset.src) {
                    img.src = img.dataset.src;
                  }
                });
              }
              
              // Resource cleanup on page unload
              window.addEventListener('beforeunload', () => {
                if (rafId) cancelAnimationFrame(rafId);
                observer.disconnect();
              });
              
              // Mark app as interactive
              window.addEventListener('load', () => {
                window.performance.mark('app-interactive');
              });
            })();
          `}
        </Script>
        
        {/* Service Worker Registration for caching */}
        <Script id="sw-registration" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator && 'production' === '${process.env.NODE_ENV}') {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .catch(() => console.log('SW registration failed'));
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
