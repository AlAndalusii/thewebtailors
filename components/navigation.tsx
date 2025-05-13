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
  { label: "Home", href: "/", isExternal: true },
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
  const [isAIChatbotVisible, setIsAIChatbotVisible] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    // Only track scrolling and activate sections on homepage
    if (!isHomePage) return

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

      // Check if AI Chatbot section is visible
      const aiChatbotSection = document.getElementById('ai-chatbot-section')
      if (aiChatbotSection) {
        const rect = aiChatbotSection.getBoundingClientRect()
        // If AI Chatbot section is in view
        if (rect.top <= 300 && rect.bottom >= 100) {
          setIsAIChatbotVisible(true)
        } else {
          setIsAIChatbotVisible(false)
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
  }, [isHomePage])

  // Helper function to determine if a nav item is active
  const isNavItemActive = (item: NavItem) => {
    if (item.isExternal) {
      // Special case for home link
      if (item.href === "/") {
        return isHomePage
      }
      // Check if we're on the external page - only match exact path
      return pathname === item.href
    } else {
      // Only activate section items if we're on the homepage
      return isHomePage && activeSection === item.href.substring(1)
    }
  }

  // Function to handle navigation click
  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.isExternal) {
      // For external pages, let the navigation happen naturally
      return
    }
    
    // For homepage sections, scroll to them if we're on homepage
    e.preventDefault()
    if (isHomePage) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
    } else {
      // If we're not on homepage but clicked a section link, go to homepage and then to that section
      window.location.href = `/${item.href}`
    }
  }

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled || !isHomePage ? "bg-black/70 backdrop-blur-md border-b border-white/10" : "bg-black/30 backdrop-blur-sm"
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
                      onClick={(e) => handleNavClick(e, item)}
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

          {/* Mobile Menu Button - Enhanced for visibility */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-3 rounded-full bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white md:hidden shadow-lg shadow-black/20 backdrop-blur-md border border-white/20 active:scale-95 transition-all touch-manipulation"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu - Fixed to take up full screen */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md md:hidden flex flex-col"
              style={{ 
                position: "fixed", 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                height: "100vh", 
                width: "100vw",
                overflowY: "auto"
              }}
            >
              <div className="relative h-full w-full flex flex-col">
                {/* Top Logo and Close Button */}
                <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-black/90 backdrop-blur-md z-10">
                  <Logo />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 rounded-full bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white shadow-lg shadow-black/10 active:scale-95 transition-all"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-6 mt-4">
                  <ul className="flex flex-col gap-6 items-stretch">
                    {navItems.map((item) => (
                      <li key={item.href} className="w-full">
                        {item.isExternal ? (
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-center text-2xl font-medium py-5 px-6 rounded-xl transition-all",
                              isNavItemActive(item)
                                ? "text-white bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-white/10"
                                : "text-white/80 hover:text-white hover:bg-white/5"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <span>{item.label}</span>
                            {isNavItemActive(item) && (
                              <motion.div
                                layoutId="mobileNavIndicator"
                                className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-indigo-500 to-rose-500"
                                transition={{ type: "spring", duration: 0.5 }}
                              />
                            )}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            className={cn(
                              "flex items-center justify-center text-2xl font-medium py-5 px-6 rounded-xl transition-all",
                              isNavItemActive(item)
                                ? "text-white bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-white/10"
                                : "text-white/80 hover:text-white hover:bg-white/5"
                            )}
                            onClick={(e) => {
                              handleNavClick(e, item)
                              setIsOpen(false)
                            }}
                          >
                            <span>{item.label}</span>
                            {isNavItemActive(item) && (
                              <motion.div
                                layoutId="mobileNavIndicator"
                                className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-indigo-500 to-rose-500"
                                transition={{ type: "spring", duration: 0.5 }}
                              />
                            )}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                
                {/* Footer with contact info */}
                <div className="p-6 mt-auto border-t border-white/10 bg-black/80">
                  <div className="text-center text-white/70 text-sm">
                    <p>Need help? Contact us</p>
                    <a href="mailto:info@thewebtailors.com" className="mt-2 text-white font-medium block">
                      info@thewebtailors.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Side Navigation Menu - Only shown on homepage and hidden when AI chatbot is visible */}
      {isHomePage && !isAIChatbotVisible && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 py-6 px-4 shadow-lg shadow-black/20">
            <ul className="flex flex-col gap-6">
              {navItems.filter(item => !item.isExternal || item.href === "/").map((item) => {
                // Only show one active item at a time
                const isActive = item.href === "/" 
                  ? isHomePage && activeSection === "hero"  // Home is only active on homepage with hero section active
                  : isNavItemActive(item);                  // Other items are active based on their section
                
                return (
                <li key={item.href}>
                  {item.href === "/" ? (
                    <Link
                      href="/"
                      className={cn(
                        "flex items-center transition-all duration-300 group relative",
                        isActive
                          ? "text-white"
                          : "text-white/40 hover:text-white/90"
                      )}
                    >
                      {/* Interactive dot with pulse effect for active item */}
                      <div className="relative">
                        <div className={cn(
                          "w-3 h-3 rounded-full transition-all duration-300 mr-4 group-hover:scale-125",
                          isActive
                            ? "bg-gradient-to-r from-indigo-500 to-rose-500 scale-125" 
                            : "bg-white/40 group-hover:bg-white/70"
                        )} />
                        
                        {isActive && (
                          <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-indigo-500 animate-ping opacity-75"></div>
                        )}
                      </div>
                      
                      {/* Label that appears on hover or when active */}
                      <span className={cn(
                        "text-sm font-medium opacity-0 translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 absolute right-8",
                        isActive && "opacity-100 translate-x-0"
                      )}>
                        {item.label}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block ml-1"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </motion.div>
                        )}
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={cn(
                        "flex items-center transition-all duration-300 group relative",
                        isActive
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
                      {isActive && (
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
                          isActive
                            ? "bg-gradient-to-r from-indigo-500 to-rose-500 scale-125" 
                            : "bg-white/40 group-hover:bg-white/70"
                        )} />
                        
                        {isActive && (
                          <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-indigo-500 animate-ping opacity-75"></div>
                        )}
                      </div>
                      
                      {/* Label that appears on hover or when active */}
                      <span className={cn(
                        "text-sm font-medium opacity-0 translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 absolute right-8",
                        isActive && "opacity-100 translate-x-0"
                      )}>
                        {item.label}
                        {isActive && (
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
                  )}
                </li>
              )})}
            </ul>
          </div>
        </div>
      )}
    </>
  )
} 