"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function WhatsAppCTA() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const phoneNumber = "+447591092103" // Formatted for WhatsApp (no spaces)

  const handleContactClick = () => {
    if (!isClient || typeof window === 'undefined') return // SSR safety check
    
    try {
      const message = encodeURIComponent("Hi, book me in for a call")
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
      window.open(whatsappUrl, '_blank')
    } catch (error) {
      console.error('Error opening WhatsApp:', error)
      // Fallback: try direct navigation
      window.location.href = `https://wa.me/${phoneNumber}`
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleContactClick}
      className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-rose-500/80 hover:from-indigo-500 hover:via-purple-500 hover:to-rose-500 backdrop-blur-xl border border-white/20 rounded-full text-white font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer group overflow-hidden"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-rose-400/20 rounded-full"
        animate={{
          background: [
            "linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), rgba(244, 63, 94, 0.2))",
            "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(244, 63, 94, 0.2), rgba(99, 102, 241, 0.2))",
            "linear-gradient(to right, rgba(244, 63, 94, 0.2), rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))",
            "linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), rgba(244, 63, 94, 0.2))"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Chat Icon */}
      <motion.div 
        className="relative z-10 flex items-center justify-center"
        animate={{ 
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          className="w-4 h-4 text-white/90 group-hover:text-white transition-colors duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
      </motion.div>

      {/* Contact Us Text */}
      <span className="relative z-10 text-white/95 group-hover:text-white transition-colors duration-300">
        Contact Us
      </span>

      {/* Subtle arrow */}
      <motion.div
        className="relative z-10"
        animate={{ x: [0, 2, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          className="w-3 h-3 text-white/70 group-hover:text-white/90 transition-colors duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </motion.div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"
        animate={{
          x: ["-100%", "100%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 2
        }}
      />

      {/* Floating particles */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            top: `${30 + i * 40}%`,
            right: `${20 + i * 15}%`,
          }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.button>
  )
} 