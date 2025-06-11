import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import Script from "next/script"
import MobileOptimizationProvider from "@/components/MobileOptimizationProvider"
import FontLoader from "@/components/FontLoader"
import PerformanceMonitor from "@/components/PerformanceMonitor"
import ErrorBoundary from "@/components/ErrorBoundary"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://thewebtailors.co.uk' : 'http://localhost:3000'),
  title: "TheWebTailors | Done-for-You Websites & Booking Systems for Coaches",
  description:
    "TheWebTailors builds high-converting websites and automated booking systems for coaches. Launch fast, look professional, and get booked — no tech skills needed.",
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
    'coach website design', 
    'tutor website design', 
    'life coach websites', 
    'business coach websites',
    'coaching website design',
    'client booking systems',
    'coaching business websites',
    'discovery call booking',
    'coach client acquisition',
    'theWebTailors',
    'coaching follow-up systems',
    'coach marketing websites'
  ],
  authors: [{ name: 'theWebTailors' }],
  creator: 'theWebTailors',
  publisher: 'theWebTailors',
  category: 'Web Design & Coaching Business',
  classification: 'Business Services',
  openGraph: {
    title: 'TheWebTailors | Done-for-You Websites & Booking Systems for Coaches',
    description: 'TheWebTailors builds high-converting websites and automated booking systems for coaches. Launch fast, look professional, and get booked — no tech skills needed.',
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
          title: 'TheWebTailors | Done-for-You Websites & Booking Systems for Coaches',
    description: 'TheWebTailors builds high-converting websites and automated booking systems for coaches. Launch fast, look professional, and get booked — no tech skills needed.',
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
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
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
        {/* Enhanced mobile meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Optimized font loading - just preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Font Awesome for WhatsApp icon */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossOrigin="anonymous" />
        
        {/* Critical resource hints */}
        <link rel="dns-prefetch" href="//assets.calendly.com" />
      </head>
      <body className={cn(
        "min-h-screen bg-[#030303] font-sans antialiased safe-area-insets performance-optimized", 
        poppins.variable
      )}>
        <FontLoader />
        <PerformanceMonitor />
        <ErrorBoundary>
          <MobileOptimizationProvider>
            {children}
          </MobileOptimizationProvider>
        </ErrorBoundary>
        
        <Toaster 
          position="top-center" 
          theme="dark" 
          richColors 
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }
          }}
        />
        
        {/* Optimized Calendly loading */}
        <Script 
          src="https://assets.calendly.com/assets/external/widget.js" 
          strategy="lazyOnload"
          id="calendly-widget"
        />
        
        {/* Enhanced performance tracking */}
        <Script id="performance-optimizations" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined') {
              // Performance marking
              window.addEventListener('load', () => {
                window.performance.mark('app-interactive');
                
                // Visibility change optimizations
                document.addEventListener('visibilitychange', () => {
                  if (document.hidden) {
                    document.body.classList.add('reduce-animations');
                    // Pause heavy operations when tab is hidden
                    window.dispatchEvent(new CustomEvent('tab-hidden'));
                  } else {
                    document.body.classList.remove('reduce-animations');
                    // Resume operations when tab is visible
                    window.dispatchEvent(new CustomEvent('tab-visible'));
                  }
                });
                
                // Enhanced image loading
                if ('loading' in HTMLImageElement.prototype) {
                  const images = document.querySelectorAll('img[loading="lazy"]');
                  images.forEach(img => {
                    if (img.dataset.src) {
                      img.src = img.dataset.src;
                    }
                  });
                }
                
                // Service worker registration for better caching
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js').catch(() => {
                    // Silently fail if service worker is not available
                  });
                }
                
                // Connection-aware optimizations
                if (typeof navigator !== 'undefined' && 'connection' in navigator) {
                  const connection = (navigator as any).connection;
                  if (connection && connection.effectiveType && connection.effectiveType.includes('2g')) {
                    document.body.classList.add('reduce-animations');
                  }
                }
                
                // Battery-aware optimizations
                if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
                  navigator.getBattery().then(battery => {
                    if (battery.level < 0.2 || !battery.charging) {
                      document.body.classList.add('reduce-animations');
                    }
                  }).catch(() => {
                    // Silently fail if battery API is not available
                  });
                }
              });
              
              // iOS Safari specific optimizations
              if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                // Prevent zoom on form focus
                const viewportMeta = document.querySelector('meta[name=viewport]');
                if (viewportMeta) {
                  viewportMeta.setAttribute('content', 
                    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
                  );
                }
                
                // Better iOS viewport handling
                const setVH = () => {
                  const vh = window.innerHeight * 0.01;
                  document.documentElement.style.setProperty('--vh', vh + 'px');
                };
                setVH();
                window.addEventListener('resize', setVH);
                window.addEventListener('orientationchange', setVH);
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}
