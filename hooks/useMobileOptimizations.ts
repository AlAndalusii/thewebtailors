import { useEffect, useState, useCallback } from 'react'

interface MobileOptimizations {
  isMobile: boolean
  isIOS: boolean
  isAndroid: boolean
  orientation: 'portrait' | 'landscape'
  viewportHeight: number
  isKeyboardOpen: boolean
  reducedMotion: boolean
  highContrast: boolean
}

export function useMobileOptimizations(): MobileOptimizations {
  const [optimizations, setOptimizations] = useState<MobileOptimizations>({
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    orientation: 'portrait',
    viewportHeight: 0,
    isKeyboardOpen: false,
    reducedMotion: false,
    highContrast: false,
  })

  // Detect device type and capabilities
  const detectDevice = useCallback(() => {
    const userAgent = navigator.userAgent
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    const isIOS = /iPad|iPhone|iPod/.test(userAgent)
    const isAndroid = /Android/.test(userAgent)
    
    // Detect accessibility preferences
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const highContrast = window.matchMedia('(prefers-contrast: high)').matches
    
    return {
      isMobile,
      isIOS,
      isAndroid,
      reducedMotion,
      highContrast,
    }
  }, [])

  // Handle viewport changes for mobile
  const handleViewportChange = useCallback(() => {
    const viewportHeight = window.visualViewport?.height || window.innerHeight
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
    
    // Detect virtual keyboard on mobile
    const isKeyboardOpen = window.visualViewport 
      ? window.visualViewport.height < window.innerHeight * 0.75
      : false

    setOptimizations(prev => ({
      ...prev,
      viewportHeight,
      orientation,
      isKeyboardOpen,
    }))
  }, [])

  // Initialize mobile optimizations
  useEffect(() => {
    const deviceInfo = detectDevice()
    
    setOptimizations(prev => ({
      ...prev,
      ...deviceInfo,
      viewportHeight: window.visualViewport?.height || window.innerHeight,
      orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
    }))

    // iOS Safari specific optimizations
    if (deviceInfo.isIOS) {
      // Prevent iOS Safari bounce scrolling
      document.body.style.overscrollBehavior = 'none'
      
      // Better iOS viewport handling
      const viewport = document.querySelector('meta[name=viewport]')
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
        )
      }
    }

    // Android Chrome specific optimizations
    if (deviceInfo.isAndroid) {
      // Better Chrome performance
      document.body.classList.add('chrome-mobile-optimized')
    }

    // Apply performance optimizations for mobile
    if (deviceInfo.isMobile) {
      // Enable hardware acceleration for better performance
      document.body.style.transform = 'translateZ(0)'
      document.body.style.backfaceVisibility = 'hidden'
      
      // Optimize touch interactions
      document.body.style.touchAction = 'manipulation'
      
      // Better font rendering on mobile
      ;(document.body.style as any).webkitFontSmoothing = 'antialiased'
      ;(document.body.style as any).mozOsxFontSmoothing = 'grayscale'
    }

    // Apply reduced motion preferences
    if (deviceInfo.reducedMotion) {
      document.body.classList.add('reduce-animations')
    }

    // Apply high contrast preferences
    if (deviceInfo.highContrast) {
      document.body.classList.add('high-contrast')
    }

  }, [detectDevice])

  // Listen for viewport changes
  useEffect(() => {
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange)
      window.visualViewport.addEventListener('scroll', handleViewportChange)
    } else {
      window.addEventListener('resize', handleViewportChange)
      window.addEventListener('orientationchange', handleViewportChange)
    }

    // Listen for accessibility preference changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
    
    const handleReducedMotion = (e: MediaQueryListEvent) => {
      setOptimizations(prev => ({ ...prev, reducedMotion: e.matches }))
      if (e.matches) {
        document.body.classList.add('reduce-animations')
      } else {
        document.body.classList.remove('reduce-animations')
      }
    }
    
    const handleHighContrast = (e: MediaQueryListEvent) => {
      setOptimizations(prev => ({ ...prev, highContrast: e.matches }))
      if (e.matches) {
        document.body.classList.add('high-contrast')
      } else {
        document.body.classList.remove('high-contrast')
      }
    }

    reducedMotionQuery.addEventListener('change', handleReducedMotion)
    highContrastQuery.addEventListener('change', handleHighContrast)

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange)
        window.visualViewport.removeEventListener('scroll', handleViewportChange)
      } else {
        window.removeEventListener('resize', handleViewportChange)
        window.removeEventListener('orientationchange', handleViewportChange)
      }
      
      reducedMotionQuery.removeEventListener('change', handleReducedMotion)
      highContrastQuery.removeEventListener('change', handleHighContrast)
    }
  }, [handleViewportChange])

  return optimizations
}

// Additional utility hooks for mobile optimization

export function useAppleStyleTouchFeedback() {
  useEffect(() => {
    // Add Apple-style touch feedback
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
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [])
}

export function useKeyboardAwareViewport() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const handleViewportChange = () => {
      const height = window.visualViewport?.height || window.innerHeight
      const isKeyboardVisible = window.visualViewport 
        ? window.visualViewport.height < window.innerHeight * 0.75
        : false

      setViewportHeight(height)
      setIsKeyboardOpen(isKeyboardVisible)

      // Adjust body height when keyboard is open
      if (isKeyboardVisible) {
        document.body.style.height = `${height}px`
      } else {
        document.body.style.height = ''
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange)
      handleViewportChange() // Initial call
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange)
      }
      document.body.style.height = ''
    }
  }, [])

  return { isKeyboardOpen, viewportHeight }
}

export function usePerformanceOptimizations() {
  useEffect(() => {
    // Optimize font loading
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded')
      })
    }

    // Optimize image loading
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]')
      images.forEach(img => {
        const imageElement = img as HTMLImageElement
        if (imageElement.dataset.src) {
          imageElement.src = imageElement.dataset.src
        }
      })
    }

    // Connection-aware loading
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection && connection.effectiveType && connection.effectiveType.includes('2g')) {
        // Reduce animations for slow connections
        document.body.classList.add('reduce-animations')
      }
    }

    // Battery-aware optimizations
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.level < 0.2 || battery.charging === false) {
          // Reduce animations to save battery
          document.body.classList.add('reduce-animations')
        }
      })
    }

    // Memory-aware optimizations
    if ('memory' in performance) {
      const memory = (performance as any).memory
      if (memory && memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
        // Reduce complexity for low memory devices
        document.body.classList.add('reduce-animations')
      }
    }

  }, [])
} 