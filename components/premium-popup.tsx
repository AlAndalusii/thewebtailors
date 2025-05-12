"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export default function PremiumPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)
  const [showReopenButton, setShowReopenButton] = useState(false)

  useEffect(() => {
    if (hasBeenShown) return
    
    const timer = setTimeout(() => {
      setIsVisible(true)
      setHasBeenShown(true)
    }, 5000) // Show after 5 seconds
    
    return () => clearTimeout(timer)
  }, [hasBeenShown])

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    setShowReopenButton(true)
  }
  
  const reopenPopup = () => {
    setIsVisible(true)
  }
  
  const handleEmailClick = () => {
    const emailBody = `Hi TheWebTailors Team,

I'd like to redesign my website. Here are my details:

Name: [Your Full Name]
Business Name: [Your Business Name]
Phone Number: [Your Contact Number]
Availability: [Best days/times to chat]

Thanks!
[Your Name]`;

    window.location.href = `mailto:info@thewebtailors.com?subject=Redesign My Website&body=${encodeURIComponent(emailBody)}`;
    setIsVisible(false)
  }

  // Subtle animation variants
  const glowPulse = {
    initial: { opacity: 0.6 },
    animate: { 
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
  
  // Soft, elegant shimmer effect
  const shimmerEffect = {
    initial: { backgroundPosition: "200% 0" },
    animate: { 
      backgroundPosition: ["-200% 0", "200% 0"],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300,
                duration: 0.6
              }}
              className="relative w-full max-w-md bg-black/70 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle animated background elements */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
                  {...shimmerEffect}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
                  {...shimmerEffect}
                />
                <motion.div 
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl"
                  variants={glowPulse}
                  initial="initial"
                  animate="animate"
                />
                <motion.div 
                  className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"
                  variants={glowPulse}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 1 }}
                />
              </motion.div>
              
              {/* Elegant border */}
              <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />
              
              {/* Content container with backdrop blur */}
              <div className="relative backdrop-blur-sm p-8 md:p-10">
                {/* Close button */}
                <motion.button 
                  onClick={handleClose}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/5 border border-white/10 z-10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </motion.button>
                
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <motion.div 
                    className="relative w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                    <motion.div 
                      className="absolute inset-0 rounded-full border border-white/20"
                      animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
                
                {/* Heading */}
                <motion.div 
                  className="text-center space-y-2 mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-light tracking-wide text-white">
                    Elevate Your <span className="font-normal">Digital</span> Presence
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto font-light">
                    Curated experiences designed for those who appreciate refined digital aesthetics
                  </p>
                </motion.div>
                
                {/* Email CTA with elegant styling */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <motion.div 
                    className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-rose-500/30 blur-sm opacity-50"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <Button
                    onClick={handleEmailClick}
                    className="relative w-full bg-black bg-opacity-60 backdrop-blur-md border border-white/10 text-white rounded-xl py-6 text-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <span className={cn(pacifico.className, "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-rose-300")}>
                      Tailor My Website
                    </span>
                  </Button>
                </motion.div>
                
                {/* Subtle footer text */}
                <motion.p 
                  className="mt-8 text-center text-white/40 text-xs font-light tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Exclusive consultation opportunities available
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal reopen button */}
      {showReopenButton && !isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg z-40"
          onClick={reopenPopup}
          aria-label="Open inquiry"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
            borderColor: "rgba(255, 255, 255, 0.2)"
          }}
        >
          <Sparkles className="w-5 h-5 text-white/80" />
        </motion.button>
      )}
    </>
  )
} 