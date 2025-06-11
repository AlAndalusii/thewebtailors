"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ArrowRight, Star, Award, TrendingUp } from "lucide-react"
import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap",
})

export default function GallerySection() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const sectionRef = useRef(null)
  
  const openCalendly = () => {
    setIsCalendlyOpen(true)
  }

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="relative snap-section bg-[#030303] overflow-hidden py-20 pt-32 scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-rose-500/[0.02]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-8">
        {/* Premium Before/After Transformation Showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          {/* Premium Header Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Decorative elements */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border border-gold-400/30 rounded-full flex items-center justify-center"
                >
                  <Star className="w-3 h-3 text-yellow-400/60" />
                </motion.div>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"></div>
                <Award className="w-4 h-4 text-yellow-400/60" />
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"></div>
                <motion.div
                  animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border border-gold-400/30 rounded-full flex items-center justify-center"
                >
                  <Star className="w-3 h-3 text-yellow-400/60" />
                </motion.div>
              </div>

              <h2 className={cn("text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight", pacifico.variable)}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-300 to-purple-300 font-pacifico">
                  Coaches We've Helped 
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 font-pacifico text-4xl md:text-6xl">
                  Get Booked
                </span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-white/80 max-w-4xl mx-auto text-xl font-light leading-relaxed">
                Real examples of how we help coaches go from invisible to fully booked
              </p>
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-white/60">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium">+200% More Discovery Calls</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2 text-white/60">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">Fully Booked Results</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2 text-white/60">
                  <Star className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium">Coach Specialists</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Premium Showcase */}
          <div className="relative">
            {/* Sophisticated ambient effects */}
            <motion.div 
              className="absolute -top-60 left-1/4 w-[500px] h-[500px] rounded-full"
              animate={{ 
                background: [
                  'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 40%, rgba(0,0,0,0) 70%)',
                  'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 40%, rgba(0,0,0,0) 70%)',
                  'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 40%, rgba(0,0,0,0) 70%)'
                ],
                scale: [1, 1.1, 1],
                filter: ['blur(80px)', 'blur(100px)', 'blur(80px)'],
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-60 right-1/4 w-[500px] h-[500px] rounded-full"
              animate={{ 
                background: [
                  'radial-gradient(circle, rgba(244,114,182,0.15) 0%, rgba(244,114,182,0.05) 40%, rgba(0,0,0,0) 70%)',
                  'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.05) 40%, rgba(0,0,0,0) 70%)',
                  'radial-gradient(circle, rgba(244,114,182,0.15) 0%, rgba(244,114,182,0.05) 40%, rgba(0,0,0,0) 70%)'
                ],
                scale: [1, 1.15, 1],
                filter: ['blur(80px)', 'blur(100px)', 'blur(80px)'],
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 2
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* BEFORE - Premium Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: -30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 2,
                  transition: { duration: 0.3 }
                }}
                transition={{ duration: 1, type: "spring", stiffness: 200, damping: 20 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative group perspective-1000"
              >
                <div className="absolute -inset-2 bg-gradient-to-br from-red-500/30 via-rose-500/20 to-pink-500/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                <div className="relative bg-white/[0.04] backdrop-blur-md border-2 border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                  {/* Premium BEFORE badge */}
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-br-2xl text-sm font-bold tracking-wide z-20 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                      BEFORE
                    </div>
                  </div>
                  
                  {/* Premium overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-rose-500/10 z-10"></div>
                  
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src="/Screenshot 2025-06-11 at 16.45.40.png"
                      alt="Before Redesign - Coach Website"
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                      quality={85}
                    />
                  </div>
                  
                  {/* Premium bottom section */}
                  <div className="absolute bottom-0 left-0 right-0 px-8 py-6 text-white z-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/70 font-medium tracking-wide uppercase">Before Our Help</p>
                        <p className="text-sm text-white/90 mt-1">Invisible online & struggling to get clients</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-400 opacity-80"></div>
                          <div className="w-2 h-2 rounded-full bg-red-400 opacity-60"></div>
                          <div className="w-2 h-2 rounded-full bg-red-400 opacity-40"></div>
                        </div>
                        <span className="text-xs text-white/60">Low Performance</span>
                      </div>
                    </div>
                    <div className="mt-4 h-px bg-gradient-to-r from-red-400/30 via-white/10 to-transparent"></div>
                  </div>
                </div>
                
                {/* Premium shadow effect */}
                <div className="absolute -bottom-4 left-8 right-8 h-8 bg-gradient-to-b from-black/20 to-transparent rounded-b-3xl blur-lg"></div>
              </motion.div>

              {/* AFTER - Premium Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: -5,
                  rotateX: 2,
                  transition: { duration: 0.3 }
                }}
                transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative group perspective-1000"
              >
                <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-rose-500/40 rounded-3xl blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                <div className="relative bg-white/[0.04] backdrop-blur-md border-2 border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                  {/* Premium AFTER badge */}
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white px-6 py-3 rounded-br-2xl text-sm font-bold tracking-wide z-20 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      AFTER
                    </div>
                  </div>
                  
                  {/* Premium overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 z-10"></div>
                  
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src="/Screenshot 2025-06-11 at 16.44.47.png"
                      alt="After Redesign - Coach Website That Gets Clients"
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                      quality={85}
                    />
                  </div>
                  
                  {/* Premium bottom section */}
                  <div className="absolute bottom-0 left-0 right-0 px-8 py-6 text-white z-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/70 font-medium tracking-wide uppercase">After Working With Us</p>
                        <p className="text-sm text-white/90 mt-1">Fully booked & attracting dream clients</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-indigo-400 opacity-90 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-purple-400 opacity-80"></div>
                          <div className="w-2 h-2 rounded-full bg-rose-400 opacity-70"></div>
                        </div>
                        <span className="text-xs text-green-400 font-medium">High Performance</span>
                      </div>
                    </div>
                    <div className="mt-4 h-px bg-gradient-to-r from-indigo-400/30 via-white/20 to-transparent"></div>
                  </div>
                </div>
                
                {/* Premium shadow effect */}
                <div className="absolute -bottom-4 left-8 right-8 h-8 bg-gradient-to-b from-indigo-500/20 to-transparent rounded-b-3xl blur-lg"></div>
              </motion.div>
            </div>

            {/* Premium CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row justify-between items-center mt-16 md:mt-20 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.04] via-white/[0.06] to-white/[0.04] backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] rounded-3xl"></div>
              
              <div className="relative z-10 p-8 md:p-10 mb-8 lg:mb-0 lg:mr-8">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                  Ready to go from invisible to fully booked?
                </h4>
                <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
                  Let's chat about turning your website into a client magnet that gets you more bookings without the tech headaches.
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>Simple & Effective</span>
                  </div>
                  <div className="w-px h-4 bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400" />
                    <span>Fully Booked Results</span>
                  </div>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <button 
                  className="relative whitespace-nowrap gap-3 inline-flex items-center px-10 py-5 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 rounded-full border-0 text-white shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 font-semibold text-lg" 
                  onClick={openCalendly}
                >
                  <span>Let's Chat About Getting You Booked</span>
                  <motion.span 
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    className="text-white/90"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Calendly Modal */}
      <Dialog open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">Book Your Free Design Consultation</DialogTitle>
          <div className="relative w-full">
            <button
              onClick={() => setIsCalendlyOpen(false)}
              className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="calendly-inline-widget" data-url="https://calendly.com/zak-thewebtailors?primary_color=67169e" style={{ minWidth: 320, height: 700 }}></div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
