"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CalendlyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])
  
  // Initialize Calendly widget when modal opens
  useEffect(() => {
    if (isOpen) {
      // Load the script and initialize the widget
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = () => {
        if (typeof window !== 'undefined' && (window as any).Calendly) {
          (window as any).Calendly.initInlineWidget({
            url: 'https://calendly.com/zak-thewebtailors?primary_color=67169e',
            parentElement: document.querySelector('.calendly-inline-widget'),
            prefill: {},
            utm: {}
          });
        }
      }
      document.body.appendChild(script)
      
      return () => {
        // Clean up
        if (script.parentNode) {
          document.body.removeChild(script)
        }
      }
    }
  }, [isOpen])
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 bg-black/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendly-modal-title"
          >
            {/* Title for accessibility */}
            <h2 id="calendly-modal-title" className="sr-only">Book Your Free Demo</h2>
            
            {/* Gradient border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 rounded-3xl opacity-50 blur-sm"></div>
            
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Calendly widget */}
            <div className="w-full h-full relative">
              <div 
                className="calendly-inline-widget w-full h-full" 
                data-url="https://calendly.com/zak-thewebtailors?primary_color=67169e"
              >
                {/* Loading spinner */}
                <div className="flex items-center justify-center h-full">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 