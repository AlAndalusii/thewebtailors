"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function PaginationDots() {
  const [activeSection, setActiveSection] = useState(0)
  const sections = ["hero", "services", "gallery", "why-choose-us", "contact"]

  useEffect(() => {
    const checkActiveSection = () => {
      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i])
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(i)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", checkActiveSection)
    return () => window.removeEventListener("scroll", checkActiveSection)
  }, [])

  return (
    <div className="fixed left-10 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {sections.map((section, index) => (
        <button
          key={section}
          className="group relative flex items-center"
          onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: activeSection === index ? 1.2 : 1,
                opacity: activeSection === index ? 1 : 0.5,
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                activeSection === index
                  ? "bg-gradient-to-r from-indigo-500 to-rose-500"
                  : "bg-white/40 group-hover:bg-white/60"
              )}
            />
          </div>
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: activeSection === index ? 0 : -30,
                opacity: activeSection === index ? 1 : 0,
              }}
              className="ml-3 text-sm font-medium text-white origin-left whitespace-nowrap"
            >
              {section === "hero" ? "Home" : 
               section === "services" ? "Our Services" : 
               section === "gallery" ? "Our Work" : 
               section === "why-choose-us" ? "Why Choose Us" : "Contact"}
            </motion.div>
          </div>
        </button>
      ))}
    </div>
  )
} 