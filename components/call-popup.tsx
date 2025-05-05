"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { X, Zap } from "lucide-react"

export default function CallPopup() {
  // Start with isOpen set to false
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Log to debug
    console.log("CallPopup mounted, setting timer")
    
    // Show popup after 2 seconds (reduced from 5 for faster testing)
    const timer = setTimeout(() => {
      console.log("Timer completed, showing popup")
      setIsOpen(true)
    }, 2000)

    return () => {
      console.log("Cleanup timer")
      clearTimeout(timer)
    }
  }, [])

  // Debug function to toggle popup manually
  const togglePopup = () => {
    console.log("Toggling popup, current state:", isOpen)
    setIsOpen(prev => !prev)
  }

  const closePopup = () => {
    console.log("Closing popup")
    setIsOpen(false)
  }

  // For particle animation
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 2
  }))

  console.log("Rendering CallPopup, isOpen:", isOpen)

  return (
    <>
      {/* Debug button (hidden in production) */}
      <button 
        onClick={togglePopup}
        className="fixed bottom-2 left-2 bg-black/50 text-white px-3 py-1 text-xs rounded-full z-50"
      >
        {isOpen ? 'Hide' : 'Show'} Popup
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closePopup()
            }}
          >
            <motion.div
              className="relative w-[90%] max-w-[400px] aspect-[1.2/1] overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateX: 0,
                transition: { 
                  type: "spring", 
                  damping: 20, 
                  stiffness: 300,
                  duration: 0.6 
                } 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.9, 
                rotateX: -10,
                transition: { duration: 0.4 } 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Base layer with advanced blur */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl rounded-2xl z-0" />
              
              {/* Geometric accent in corner */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-500/40 to-transparent rounded-full blur-lg z-0" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/40 to-transparent rounded-full blur-lg z-0" />
              
              {/* Particles */}
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full bg-white/60 z-10"
                  style={{ 
                    width: particle.size, 
                    height: particle.size, 
                    left: `${particle.x}%`, 
                    top: `${particle.y}%` 
                  }}
                  animate={{
                    x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
                    y: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
                    opacity: [0, 0.6, 0.6, 0]
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay
                  }}
                />
              ))}
              
              {/* Hexagonal grid pattern */}
              <div className="absolute inset-0 z-0 opacity-20" 
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 50 L30 65 L5 50 L5 20 Z' stroke='white' fill='none' stroke-opacity='0.2'/%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px'
                }} 
              />
              
              {/* Neon border effect */}
              <div className="absolute inset-0 rounded-2xl p-[1px] z-10 overflow-hidden">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-rose-500 opacity-90" />
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-rose-500 opacity-90 blur-[2px]"
                  animate={{ 
                    boxShadow: ["0 0 10px rgba(110, 0, 255, 0.5)", "0 0 20px rgba(110, 0, 255, 0.7)", "0 0 10px rgba(110, 0, 255, 0.5)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Animated line */}
                <motion.div 
                  className="absolute inset-0 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="h-full w-[400%] absolute -left-[300%] top-0 bg-gradient-to-r from-transparent via-white/80 to-transparent" 
                    animate={{ left: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                  />
                </motion.div>
              </div>
              
              {/* Content container with inner border */}
              <div className="absolute inset-[1px] rounded-2xl overflow-hidden z-20 bg-black/80 backdrop-blur-xl">
                <div className="w-full h-full relative p-6 flex flex-col items-center justify-center">
                  
                  {/* Close button with glow */}
                  <motion.button
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:text-white z-30"
                    onClick={closePopup}
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                  
                  {/* Icon with pulsing effect */}
                  <motion.div 
                    className="relative mb-5"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute inset-0 rounded-full bg-purple-500/50 blur-md" />
                    <div className="w-16 h-16 relative rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" stroke="white" strokeWidth={1.5} />
                    </div>
                    <motion.div
                      className="absolute -inset-2 rounded-full border-2 border-purple-500/50"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  {/* Text content - kept ultra minimal */}
                  <motion.div 
                    className="text-center space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                      Transform Your Digital Future
                    </h2>
                    <p className="text-cyan-200/80 text-sm">
                      Limited slots available this month
                    </p>
                  </motion.div>
                  
                  {/* CTA Button with hover effects */}
                  <motion.a
                    href="#contact"
                    onClick={() => {
                      closePopup();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="relative mt-6 w-full"
                    whileHover="hover"
                  >
                    <motion.div 
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 opacity-80 blur-[3px]"
                      variants={{
                        hover: { scale: 1.05, opacity: 1 }
                      }}
                    />
                    <motion.div
                      className="relative py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center"
                      variants={{
                        hover: { y: -2 }
                      }}
                    >
                      <span className="font-semibold text-white tracking-wide">SECURE YOUR SPOT</span>
                      <motion.div
                        className="ml-2 bg-white/20 h-px w-5"
                        variants={{
                          hover: { width: 20, x: 5 }
                        }}
                      />
                    </motion.div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 