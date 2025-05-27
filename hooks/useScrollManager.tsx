import { useEffect, useRef, useCallback, useState } from 'react';

type ScrollCallback = (scrollY: number) => void;

export function useScrollManager() {
  const callbacks = useRef<Set<ScrollCallback>>(new Set());
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Only trigger callbacks if scroll position changed significantly
        if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
          callbacks.current.forEach(callback => callback(currentScrollY));
          lastScrollY.current = currentScrollY;
        }
        
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const registerCallback = useCallback((callback: ScrollCallback) => {
    callbacks.current.add(callback);
    return () => callbacks.current.delete(callback);
  }, []);

  return { registerCallback };
}

// Helper hook for section visibility
export function useSectionVisibility(sectionId: string, threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const { registerCallback } = useScrollManager();

  useEffect(() => {
    const cleanup = registerCallback((scrollY) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // Calculate how much of the element is visible
      const visibleHeight = Math.min(elementBottom, viewportHeight) - Math.max(elementTop, 0);
      const visibilityRatio = visibleHeight / rect.height;
      
      setIsVisible(visibilityRatio > threshold);
    });

    return () => {
      cleanup();
    };
  }, [sectionId, threshold, registerCallback]);

  return isVisible;
} 