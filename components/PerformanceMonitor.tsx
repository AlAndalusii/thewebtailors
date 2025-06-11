"use client"

import { useEffect, useState } from 'react'

export default function PerformanceMonitor() {
  const [isClient, setIsClient] = useState(false)

  // Initialize client state
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side and in production
    if (!isClient || typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return

    try {
      // Web Vitals tracking
      const trackWebVitals = () => {
        if ('web-vital' in window) return // Avoid duplicate tracking

        // Mark that tracking is enabled
        ;(window as any)['web-vital'] = true

        // Largest Contentful Paint
        if (typeof PerformanceObserver !== 'undefined') {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            console.log('LCP:', lastEntry.startTime)
          })
          
          try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
          } catch (e) {
            // LCP not supported
          }

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const fidEntry = entry as any
              console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
            }
          })
          
          try {
            fidObserver.observe({ entryTypes: ['first-input'] })
          } catch (e) {
            // FID not supported
          }

          // Cumulative Layout Shift
          let clsValue = 0
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value
                console.log('CLS:', clsValue)
              }
            }
          })
          
          try {
            clsObserver.observe({ entryTypes: ['layout-shift'] })
          } catch (e) {
            // CLS not supported
          }
        }
      }

      // Resource loading optimization
      const optimizeResourceLoading = () => {
        // Preload critical resources when idle
        if (typeof window !== 'undefined' && window.requestIdleCallback) {
          window.requestIdleCallback(() => {
            if (typeof document !== 'undefined') {
              // Preload next likely pages
              const link = document.createElement('link')
              link.rel = 'prefetch'
              link.href = '/systems'
              document.head.appendChild(link)
            }
          })
        } else if (typeof window !== 'undefined') {
          // Fallback for browsers without requestIdleCallback
          setTimeout(() => {
            if (typeof document !== 'undefined') {
              const link = document.createElement('link')
              link.rel = 'prefetch'
              link.href = '/systems'
              document.head.appendChild(link)
            }
          }, 1000)
        }

        // Service worker registration for caching
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(() => {
              // Service worker registration failed
            })
          })
        }
      }

      // Memory management
      const optimizeMemory = () => {
        if (typeof window === 'undefined') return;

        // Clean up event listeners and observers on page unload
        const cleanup = () => {
          // Force garbage collection if available
          if ('gc' in window) {
            ;(window as any).gc()
          }
        }

        window.addEventListener('beforeunload', cleanup)
        
        return () => {
          if (typeof window !== 'undefined') {
            window.removeEventListener('beforeunload', cleanup)
          }
        }
      }

      trackWebVitals()
      optimizeResourceLoading()
      const cleanupMemory = optimizeMemory()

      return cleanupMemory
    } catch (error) {
      console.error('Error in PerformanceMonitor:', error);
    }
  }, [isClient])

  return null
} 