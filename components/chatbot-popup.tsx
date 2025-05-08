"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Bot, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatbotPopupProps {
  onBookDemo: () => void
}

export default function ChatbotPopup({ onBookDemo }: ChatbotPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    if (hasBeenShown) return
    
    const timer = setTimeout(() => {
      setIsVisible(true)
      setHasBeenShown(true)
    }, 5000) // 5 seconds
    
    return () => clearTimeout(timer)
  }, [hasBeenShown])

  const handleClose = () => {
    setIsVisible(false)
  }
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }
  
  const handleBookDemo = () => {
    onBookDemo()
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {isMinimized ? (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              className="fixed bottom-6 right-6 z-40 cursor-pointer"
              onClick={toggleMinimize}
            >
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-1 shadow-lg shadow-indigo-600/20">
                <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-black z-10"></div>
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-6 right-6 w-[380px] bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 z-40"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-white" />
                  <h3 className="text-white font-medium">Chatbot Assistant</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleMinimize}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <span className="sr-only">Minimize</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <button 
                    onClick={handleClose}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="px-6 py-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-0.5 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-2xl rounded-tl-none p-4 text-white/90">
                    <p>Hi there! 👋 Would you like to enhance your website with a smart AI chatbot that converts visitors into customers 24/7?</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 backdrop-blur-sm border border-white/5 rounded-xl p-5 mb-2">
                    <h4 className="text-lg font-medium text-white mb-2">Transform Your Website</h4>
                    <p className="text-white/70 text-sm mb-3">Our AI-powered chatbots deliver outstanding results:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 6.5L6.5 3.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                            <path d="M1.5 3.5L3.5 5.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="text-white/80 text-sm">35% increase in lead generation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 6.5L6.5 3.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                            <path d="M1.5 3.5L3.5 5.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="text-white/80 text-sm">24/7 customer support automation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 6.5L6.5 3.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                            <path d="M1.5 3.5L3.5 5.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="text-white/80 text-sm">Custom solutions for your business</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Button 
                  onClick={handleBookDemo}
                  className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full shadow-lg shadow-indigo-600/20 flex items-center justify-center transition-all"
                >
                  <span>Book a Free Demo</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                
                <p className="text-center text-white/50 text-xs mt-3">
                  No obligation, just see how it could work for you
                </p>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
} 