"use client"

import { useEffect, useState } from "react"

export function useScrollSnap() {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll(".snap-section")
    if (!sections.length) return

    // Only determine the current active section for navigation highlighting
    const checkActiveSection = () => {
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(i)
          break
        }
      }
    }
    
    // Check active section initially and on scroll
    checkActiveSection()
    window.addEventListener("scroll", checkActiveSection)

    // Handle click navigation
    const handleClickNavigation = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute('href')?.substring(1)
        const targetElement = document.getElementById(targetId || '')
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('click', handleClickNavigation)

    return () => {
      window.removeEventListener("scroll", checkActiveSection)
      document.removeEventListener('click', handleClickNavigation)
    }
  }, [])

  return { activeSection }
} 