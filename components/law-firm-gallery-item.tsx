"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

export default function LawFirmGalleryItem() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    setSliderPosition((x / rect.width) * 100)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width))
    setSliderPosition((x / rect.width) * 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm"
    >
      <div className="p-6">
        <h3 className="text-xl text-white font-medium mb-2">Electrical Company Website Transformation</h3>
        <p className="text-white/60 text-sm mb-4">
          Revitalizing an electrical services company website with modern design, improved user experience, and clear service presentation to attract more qualified leads.
        </p>
        <div className="flex justify-center gap-8 mb-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
            <span className="text-white/80 text-sm">Before (Old Design)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 mr-2"></div>
            <span className="text-white/80 text-sm">After (Modern Design)</span>
          </div>
        </div>
      </div>
      
      <div 
        className="relative h-[700px] w-full cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Before image container - always visible (left side) */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image 
              src="/before 4.png" 
              alt="Before: Old Electrical Company Website Design" 
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <span className="absolute top-4 left-4 px-3 py-1 bg-gray-700/80 rounded-full text-white/90 text-xs font-medium z-10">
            BEFORE
          </span>
        </div>

        {/* After image container - will be clipped based on slider position (right side) */}
        <div 
          className="absolute inset-0 z-1"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <div className="relative w-full h-full">
            <Image 
              src="/after 4.png" 
              alt="After: Modern Electrical Company Website Design" 
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
          <span className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full text-white text-xs font-medium z-10">
            AFTER
          </span>
        </div>

        {/* Slider control */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white z-20 cursor-ew-resize"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
            <div className="text-black text-xs">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5L3 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 5L21 10L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-lg text-white/80 text-xs text-center z-20">
          Drag slider to reveal the after version
        </div>
      </div>
    </motion.div>
  )
} 