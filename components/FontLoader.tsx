"use client"

import { useEffect } from 'react'

export default function FontLoader() {
  useEffect(() => {
    // Non-blocking font loading with fallbacks
    const loadFont = (href: string, id: string) => {
      if (document.getElementById(id)) return; // Already loaded
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.id = id;
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      
      // Add to head
      document.head.appendChild(link);
      
      // Fallback after 3 seconds
      setTimeout(() => {
        if (link.media === 'print') {
          link.media = 'all';
        }
      }, 3000);
    };

    // Load fonts asynchronously with fallback
    if (typeof window !== 'undefined') {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          loadFont('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap', 'poppins-font');
          loadFont('https://fonts.googleapis.com/css2?family=Pacifico&display=swap', 'pacifico-font');
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          loadFont('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap', 'poppins-font');
          loadFont('https://fonts.googleapis.com/css2?family=Pacifico&display=swap', 'pacifico-font');
        }, 100);
      }
    }

  }, []);

  return null;
} 