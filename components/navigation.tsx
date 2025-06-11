"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useScrollManager } from '@/hooks/useScrollManager';

// Define the type for navigation items
type NavItem = {
  label: string;
  href: string;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", isExternal: true },
  { label: "How We Help", href: "#services" },
  { label: "Coaches We've Helped", href: "#gallery" },
  { label: "Leads System", href: "/leads-system", isExternal: true },
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
  const { registerCallback } = useScrollManager()

  useEffect(() => {
    if (!isHomePage) return;

    const cleanup = registerCallback((scrollY) => {
      // Enhanced section detection - find the section that takes up most of the viewport
      const sections = ["hero", "services", "gallery", "why-choose-us", "contact"];
      let bestMatch = "hero";
      let bestScore = -1;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate how much of the viewport this section occupies
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const score = visibleHeight / viewportHeight;
          
          // Section is considered active if it takes up more than 30% of viewport
          // or if we're near the top/bottom of the page
          if (score > bestScore && (score > 0.3 || 
              (section === "hero" && rect.top > -100) ||
              (section === "contact" && rect.bottom < viewportHeight + 100))) {
            bestScore = score;
            bestMatch = section;
          }
        }
      }
      
      // Only update if we have a clear winner
      if (bestScore > 0.2) {
        setActiveSection(bestMatch);
      }

      // Check if AI Chatbot section is visible
      const aiChatbotSection = document.getElementById('ai-chatbot-section');
      if (aiChatbotSection) {
        const rect = aiChatbotSection.getBoundingClientRect();
        if (rect.top <= 300 && rect.bottom >= 100) {
          setIsAIChatbotVisible(true);
        } else {
          setIsAIChatbotVisible(false);
        }
      }

      // Check if page has scrolled for navbar background
      setScrolled(scrollY > 50);
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, [isHomePage, registerCallback]);

  // Helper function to determine if a nav item is active (only one at a time)
  const isNavItemActive = (item: NavItem) => {
    if (item.isExternal) {
      // For external pages, check exact path match
      return pathname === item.href
    } else {
      // For sections, only one can be active at a time on homepage
      return isHomePage && activeSection === item.href.substring(1)
    }
  }

  // Function to handle navigation click
  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.isExternal) {
      // For external pages, let the navigation happen naturally
      setIsOpen(false) // Close mobile menu
      return
    }
    
    // For homepage sections, scroll to them if we're on homepage
    e.preventDefault()
    setIsOpen(false) // Close mobile menu immediately for better UX
    
    if (isHomePage) {
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
        // Manually set active section to ensure immediate feedback
        setActiveSection(item.href.substring(1))
      }
    } else {
      // If we're not on homepage but clicked a section link, go to homepage and then to that section
      window.location.href = `/${item.href}`
    }
  }

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Add iOS Safari bounce prevention
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  return (
    <>
      {/* Apple-Style Premium Navigation Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled || !isHomePage 
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/20" 
            : "bg-black/40 backdrop-blur-xl"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo with hover effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link href="/">
                <Logo />
              </Link>
            </motion.div>
          
            {/* Desktop Navigation - Apple Style */}
            <nav className="hidden md:block">
              <motion.div 
                className="flex items-center gap-2 px-6 py-3 bg-white/[0.03] backdrop-blur-xl rounded-full border border-white/10 shadow-xl shadow-black/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  >
                    {item.isExternal ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group",
                          isNavItemActive(item) 
                            ? "text-white bg-gradient-to-r from-indigo-500/20 to-purple-500/20 shadow-lg" 
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        )}
                      >
                        <span className="relative z-10">{item.label}</span>
                        {isNavItemActive(item) && (
                          <motion.div
                            layoutId="desktopNavIndicator"
                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full border border-white/20"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => handleNavClick(e, item)}
                        className={cn(
                          "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group",
                          isNavItemActive(item) 
                            ? "text-white bg-gradient-to-r from-indigo-500/20 to-purple-500/20 shadow-lg" 
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        )}
                      >
                        <span className="relative z-10">{item.label}</span>
                        {isNavItemActive(item) && (
                          <motion.div
                            layoutId="desktopNavIndicator"
                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full border border-white/20"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </nav>

            {/* Premium Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-3 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-xl hover:bg-white/[0.12] transition-all duration-300"
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Apple-Style Premium Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop with blur */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }}
              className="relative bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-2xl border-b border-white/10 pt-24 pb-8"
            >
              <div className="container mx-auto px-6">
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      {item.isExternal ? (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "group flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-300 touch-manipulation",
                            isNavItemActive(item)
                              ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/20 text-white shadow-lg"
                              : "text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20"
                          )}
                        >
                          <div className="flex items-center">
                            {/* Active indicator */}
                            {isNavItemActive(item) && (
                              <motion.div
                                layoutId="mobileNavIndicator"
                                className="w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full mr-4"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}
                            <span className="text-lg font-medium">{item.label}</span>
                          </div>
                          <motion.div
                            animate={{ x: isNavItemActive(item) ? 4 : 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <ChevronRight className="w-5 h-5 text-white/40" />
                          </motion.div>
                        </Link>
                      ) : (
                        <button
                          onClick={(e) => handleNavClick(e, item)}
                          className={cn(
                            "group flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-300 touch-manipulation",
                            isNavItemActive(item)
                              ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/20 text-white shadow-lg"
                              : "text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20"
                          )}
                        >
                          <div className="flex items-center">
                            {/* Active indicator */}
                            {isNavItemActive(item) && (
                              <motion.div
                                layoutId="mobileNavIndicator"
                                className="w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full mr-4"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}
                            <span className="text-lg font-medium">{item.label}</span>
                          </div>
                          <motion.div
                            animate={{ x: isNavItemActive(item) ? 4 : 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <ChevronRight className="w-5 h-5 text-white/40" />
                          </motion.div>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Premium CTA in Mobile Menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="mt-8 pt-6 border-t border-white/10"
                >
                  <motion.button
                    onClick={() => {
                      setIsOpen(false)
                      window.open('https://calendly.com/thewebtailors/free-strategy-call', '_blank', 'noopener,noreferrer')
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-2xl shadow-indigo-500/25 touch-manipulation"
                  >
                    Get Your Free Strategy Call
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Side Navigation Dots for Desktop */}
      {isHomePage && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        >
          <div className="flex flex-col gap-4 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-xl">
            {["hero", "services", "gallery", "contact"].map((section, index) => {
              const isActive = activeSection === section
              return (
                <motion.button
                  key={section}
                  onClick={() => {
                    const element = document.getElementById(section)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" })
                      setActiveSection(section)
                    }
                  }}
                  className="relative group"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={cn(
                      "w-4 h-4 rounded-full transition-all duration-300",
                      isActive 
                        ? "bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg shadow-indigo-400/30" 
                        : "bg-white/20 hover:bg-white/40"
                    )}
                    animate={isActive ? { 
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 0px rgba(99, 102, 241, 0.3)",
                        "0 0 0 8px rgba(99, 102, 241, 0)",
                        "0 0 0 0px rgba(99, 102, 241, 0)"
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                  />
                  
                  {/* Active line indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="sideNavIndicator"
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}
    </>
  )
} 