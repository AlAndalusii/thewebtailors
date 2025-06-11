"use client"

import { useEffect, useState } from 'react'

interface MobileOptimizationProviderProps {
  children: React.ReactNode
}

export default function MobileOptimizationProvider({ children }: MobileOptimizationProviderProps) {
  const [isClient, setIsClient] = useState(false)

  // Initialize client state
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (!isClient || typeof window === 'undefined' || typeof navigator === 'undefined' || typeof document === 'undefined') {
      return;
    }

    try {
      // Mobile device detection
      const userAgent = navigator.userAgent
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isIOS = /iPad|iPhone|iPod/.test(userAgent)
      const isAndroid = /Android/.test(userAgent)

      // Apply mobile-specific optimizations
      if (isMobile) {
        document.body.classList.add('mobile-device')
        
        // Better touch responsiveness
        document.body.style.touchAction = 'manipulation'
        
        // Hardware acceleration for smoother animations
        document.body.style.transform = 'translateZ(0)'
        document.body.style.backfaceVisibility = 'hidden'
        
        // Better font rendering on mobile
        ;(document.body.style as any).webkitFontSmoothing = 'antialiased'
        ;(document.body.style as any).mozOsxFontSmoothing = 'grayscale'
      }

      // iOS-specific optimizations
      if (isIOS) {
        document.body.classList.add('ios-device')
        
        // Prevent iOS Safari bounce scrolling
        document.body.style.overscrollBehavior = 'none'
        
        // Better iOS viewport handling with dynamic viewport units
        const setIOSViewport = () => {
          if (typeof window !== 'undefined') {
            const vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--vh', `${vh}px`)
          }
        }
        
        setIOSViewport()
        window.addEventListener('resize', setIOSViewport)
        window.addEventListener('orientationchange', setIOSViewport)
        
        // iOS Safari zoom prevention
        const preventZoom = (e: TouchEvent) => {
          if (e.touches.length > 1) {
            e.preventDefault()
          }
        }
        
        document.addEventListener('touchstart', preventZoom, { passive: false })
        
        return () => {
          if (typeof window !== 'undefined') {
            window.removeEventListener('resize', setIOSViewport)
            window.removeEventListener('orientationchange', setIOSViewport)
          }
          if (typeof document !== 'undefined') {
            document.removeEventListener('touchstart', preventZoom)
          }
        }
      }

      // Android-specific optimizations
      if (isAndroid) {
        document.body.classList.add('android-device')
        
        // Better Chrome performance
        document.body.classList.add('chrome-mobile-optimized')
      }

      // Apple-style touch feedback for all interactive elements
      const addTouchFeedback = () => {
        const handleTouchStart = (e: TouchEvent) => {
          const target = e.target as HTMLElement
          if (target.matches('button, [role="button"], a, .touch-feedback')) {
            target.style.transform = 'scale(0.98)'
            target.style.transition = 'transform 0.1s ease'
          }
        }

        const handleTouchEnd = (e: TouchEvent) => {
          const target = e.target as HTMLElement
          if (target.matches('button, [role="button"], a, .touch-feedback')) {
            setTimeout(() => {
              target.style.transform = 'scale(1)'
            }, 100)
          }
        }

        document.addEventListener('touchstart', handleTouchStart, { passive: true })
        document.addEventListener('touchend', handleTouchEnd, { passive: true })
        document.addEventListener('touchcancel', handleTouchEnd, { passive: true })

        return () => {
          if (typeof document !== 'undefined') {
            document.removeEventListener('touchstart', handleTouchStart)
            document.removeEventListener('touchend', handleTouchEnd)
            document.removeEventListener('touchcancel', handleTouchEnd)
          }
        }
      }

      // Accessibility optimizations
      const applyAccessibilityOptimizations = () => {
        if (typeof window === 'undefined' || !window.matchMedia) return;

        // Reduced motion support
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        const handleReducedMotion = (e: MediaQueryListEvent) => {
          if (e.matches) {
            document.body.classList.add('reduce-animations')
          } else {
            document.body.classList.remove('reduce-animations')
          }
        }
        
        if (reducedMotionQuery.matches) {
          document.body.classList.add('reduce-animations')
        }
        
        reducedMotionQuery.addEventListener('change', handleReducedMotion)

        // High contrast support
        const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
        const handleHighContrast = (e: MediaQueryListEvent) => {
          if (e.matches) {
            document.body.classList.add('high-contrast')
          } else {
            document.body.classList.remove('high-contrast')
          }
        }
        
        if (highContrastQuery.matches) {
          document.body.classList.add('high-contrast')
        }
        
        highContrastQuery.addEventListener('change', handleHighContrast)

        return () => {
          reducedMotionQuery.removeEventListener('change', handleReducedMotion)
          highContrastQuery.removeEventListener('change', handleHighContrast)
        }
      }

      // Performance optimizations
      const applyPerformanceOptimizations = () => {
        // Font loading optimization
        if (typeof document !== 'undefined' && 'fonts' in document) {
          document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded')
          }).catch(() => {
            // Silently fail if fonts API is not available
          })
        }

        // Connection-aware optimizations
        if (typeof navigator !== 'undefined' && 'connection' in navigator) {
          const connection = (navigator as any).connection
          if (connection && connection.effectiveType && connection.effectiveType.includes('2g')) {
            document.body.classList.add('reduce-animations')
          }
        }

        // Battery-aware optimizations
        if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
          (navigator as any).getBattery().then((battery: any) => {
            if (battery.level < 0.2 || !battery.charging) {
              document.body.classList.add('reduce-animations')
            }
          }).catch(() => {
            // Silently fail if battery API is not available
          })
        }

        // Memory-aware optimizations
        if (typeof performance !== 'undefined' && 'memory' in performance) {
          const memory = (performance as any).memory
          if (memory && memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
            document.body.classList.add('reduce-animations')
          }
        }
      }

      // Keyboard handling for mobile
      const handleKeyboard = () => {
        if (typeof window === 'undefined' || !window.visualViewport) return

        const handleViewportChange = () => {
          if (typeof window === 'undefined' || !window.visualViewport) return;
          
          const viewport = window.visualViewport!
          const isKeyboardOpen = viewport.height < window.innerHeight * 0.75
          
          if (isKeyboardOpen) {
            document.body.classList.add('keyboard-open')
            document.body.style.height = `${viewport.height}px`
          } else {
            document.body.classList.remove('keyboard-open')
            document.body.style.height = ''
          }
        }

        window.visualViewport.addEventListener('resize', handleViewportChange)
        window.visualViewport.addEventListener('scroll', handleViewportChange)

        return () => {
          if (typeof window !== 'undefined' && window.visualViewport) {
            window.visualViewport?.removeEventListener('resize', handleViewportChange)
            window.visualViewport?.removeEventListener('scroll', handleViewportChange)
          }
          if (typeof document !== 'undefined') {
            document.body.style.height = ''
          }
        }
      }

      // Apply all optimizations
      const touchCleanup = addTouchFeedback()
      const accessibilityCleanup = applyAccessibilityOptimizations()
      const keyboardCleanup = handleKeyboard()
      applyPerformanceOptimizations()

      // Return cleanup function
      return () => {
        if (touchCleanup) touchCleanup()
        if (accessibilityCleanup) accessibilityCleanup()
        if (keyboardCleanup) keyboardCleanup()
      }
    } catch (error) {
      console.error('Error in MobileOptimizationProvider:', error);
    }
  }, [isClient])

  return <>{children}</>
} 