"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bot, Zap, BarChart, Clock, ArrowRight, Mail, Calculator, PieChart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatbotPremiumPopupProps {
  onBookDemo: () => void
}

export default function ChatbotPremiumPopup({ onBookDemo }: ChatbotPremiumPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)
  const [showReopenButton, setShowReopenButton] = useState(false)

  useEffect(() => {
    if (hasBeenShown) return
    
    const timer = setTimeout(() => {
      setIsVisible(true)
      setHasBeenShown(true)
    }, 5000) // 5 seconds for testing (will change back to 5 minutes in production)
    
    return () => clearTimeout(timer)
  }, [hasBeenShown])

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling
    setIsVisible(false)
    setShowReopenButton(true)
  }
  
  const reopenPopup = () => {
    setIsVisible(true)
  }
  
  const handleGetFreeAudit = () => {
    // Email template for accounting firms
    const subject = "AI Chatbot Demo For my Website"
    const body = "Hello,%0A%0AI'm interested in getting a free audit of my accounting firm's website to improve client acquisition.%0A%0APlease contact me at your earliest convenience.%0A%0AThank you,%0A"
    
    // Open default email client with pre-populated fields
    window.location.href = `mailto:info@yourcompany.com?subject=${subject}&body=${body}`
    
    setIsVisible(false)
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on backdrop from closing
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }}
              className="relative w-full max-w-lg bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 8,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 10,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
              
              {/* Improved Close button */}
              <motion.button 
                onClick={handleClose}
                className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-indigo-600/80 to-purple-600/80 shadow-lg shadow-black/20 hover:shadow-indigo-500/20 transition-all z-30 border border-white/20 touch-manipulation"
                aria-label="Close popup"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
              
              {/* Header */}
              <div className="pt-10 px-4 sm:px-8 text-center relative z-10">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-0.5 mb-6">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <motion.h3 
                  className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 mb-4"
                  animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  Unlock AI for Your Accounting Firm
                </motion.h3>
                
                <p className="text-white/90 mb-6 text-sm sm:text-base">
                  Transform client acquisition with our accounting-specific AI chatbot that converts prospects and streamlines client onboarding.
                </p>
              </div>
              
              {/* Content */}
              <div className="px-4 sm:px-8 pb-8 relative z-10">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <Zap className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1 text-sm sm:text-base">Client Acquisition</h4>
                        <p className="text-xs text-white/70">Converts website visitors into qualified leads</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <PieChart className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1 text-sm sm:text-base">Financial Insights</h4>
                        <p className="text-xs text-white/70">Deliver value through AI-powered conversations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <Clock className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1 text-sm sm:text-base">24/7 Availability</h4>
                        <p className="text-xs text-white/70">Engage clients even outside business hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <Shield className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1 text-sm sm:text-base">Compliance-Ready</h4>
                        <p className="text-xs text-white/70">Secure conversations with regulatory awareness</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-rose-600 rounded-full opacity-70 group-hover:opacity-100 blur-sm transition-all duration-200"></div>
                    <Button 
                      onClick={handleGetFreeAudit}
                      className="relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:via-purple-500 hover:to-rose-500 text-white font-medium rounded-full py-4 sm:py-6 border-0 shadow-lg shadow-indigo-600/20 flex items-center justify-center transition-all duration-300"
                    >
                      <span className="text-base sm:text-lg">Get My Free Audit</span>
                      <motion.span 
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        className="ml-2"
                      >
                        <Mail className="w-5 h-5" />
                      </motion.span>
                    </Button>
                  </motion.div>
                </div>
                
                <p className="text-center text-white/40 text-xs">
                  Limited spots available for free accounting website audits.
                  <br />Secure your assessment before we reach capacity.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Re-open button */}
      {showReopenButton && !isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-purple-900/30 z-40"
          onClick={reopenPopup}
          aria-label="Show accounting AI offer"
        >
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
        </motion.button>
      )}
    </>
  )
} 