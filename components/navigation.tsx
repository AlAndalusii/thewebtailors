"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Define the type for navigation items
type NavItem = {
  label: string;
  href: string;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Our Services", href: "#services" },
  { label: "Our Work", href: "#gallery" },
  { label: "Chatbots", href: "/chatbots", isExternal: true },
  { label: "Articles", href: "/articles", isExternal: true },
  { label: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      // Update active section
      const sections = ["hero", "services", "gallery", "why-choose-us", "contact"]
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          
          // If this section is in view (accounting for some tolerance)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }

      // Check if page has scrolled for navbar background
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Helper function to determine if a nav item is active
  const isNavItemActive = (item: NavItem) => {
    if (item.isExternal) {
      // Check if we're on the external page
      return pathname === item.href
    } else {
      // Check if this is the active section on homepage
      return activeSection === item.href.substring(1)
    }
  }

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-black/50 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}>
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.isExternal ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative text-sm font-medium transition-colors px-1 py-2",
                        isNavItemActive(item) ? "text-white" : "text-white/60 hover:text-white/90"
                      )}
                    >
                      {item.label}
                      {isNavItemActive(item) && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-rose-500"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={cn(
                        "relative text-sm font-medium transition-colors px-1 py-2",
                        isNavItemActive(item) ? "text-white" : "text-white/60 hover:text-white/90"
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      {item.label}
                      {isNavItemActive(item) && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-rose-500"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md md:hidden"
            >
              <div className="relative h-full w-full flex flex-col items-center justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white"
                >
                  <X className="w-6 h-6" />
                </button>

                <nav>
                  <ul className="flex flex-col gap-8 items-center">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        {item.isExternal ? (
                          <Link
                            href={item.href}
                            className="text-2xl font-medium text-white/60"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            className={cn(
                              "text-2xl font-medium",
                              isNavItemActive(item)
                                ? "text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300"
                                : "text-white/60"
                            )}
                            onClick={(e) => {
                              e.preventDefault()
                              document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                              setIsOpen(false)
                            }}
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Side Navigation Menu - Only shown on homepage */}
      {isHomePage && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 py-6 px-4 shadow-lg shadow-black/20">
            <ul className="flex flex-col gap-6">
              {navItems.filter(item => !item.isExternal).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center transition-all duration-300 group relative",
                      isNavItemActive(item)
                        ? "text-white"
                        : "text-white/40 hover:text-white/90"
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(item.href)?.scrollIntoView({ 
                        behavior: "smooth",
                        block: "start" 
                      })
                    }}
                  >
                    {/* Animated indicator for active item */}
                    {isNavItemActive(item) && (
                      <motion.div 
                        layoutId="sideNavIndicator"
                        className="absolute right-full mr-3 w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-rose-500"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 10 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Interactive dot with pulse effect for active item */}
                    <div className="relative">
                      <div className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300 mr-4 group-hover:scale-125",
                        isNavItemActive(item)
                          ? "bg-gradient-to-r from-indigo-500 to-rose-500 scale-125" 
                          : "bg-white/40 group-hover:bg-white/70"
                      )} />
                      
                      {isNavItemActive(item) && (
                        <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-indigo-500 animate-ping opacity-75"></div>
                      )}
                    </div>
                    
                    {/* Label that appears on hover or when active */}
                    <span className={cn(
                      "text-sm font-medium opacity-0 translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 absolute right-8",
                      isNavItemActive(item) && "opacity-100 translate-x-0"
                    )}>
                      {item.label}
                      {isNavItemActive(item) && (
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="inline-block ml-1"
                        >
                          <ChevronRight className="w-3 h-3" />
                        </motion.div>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
} 