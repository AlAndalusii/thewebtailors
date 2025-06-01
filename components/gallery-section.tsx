"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
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
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const sectionRef = useRef(null)
  
  const openCalendly = () => {
    setIsCalendlyOpen(true)
  }

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1)
  }

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="relative snap-section bg-[#030303] overflow-hidden py-20 pt-32 scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-rose-500/[0.02]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-8">
        {/* Elegant Before/After comparison section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-28"
        >
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">The</span>
                <span className={cn(
                  " ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
                  pacifico.className,
                )}>
                  Transformation
                </span>
                </h3>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/70 max-w-3xl mx-auto text-lg"
            >
              See the dramatic impact of our expert trade business website redesigns
            </motion.p>
          </div>

          <div className="relative">
            {/* Simplified ambient glow effects - static instead of animated */}
            <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[60px] opacity-30" />
            <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-rose-500/10 blur-[60px] opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              {/* Before */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 300, damping: 18 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-rose-500/20 rounded-2xl blur-lg opacity-60"></div>
                <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 bg-rose-500/90 text-white px-5 py-2 rounded-br-lg text-sm font-semibold z-20">
                    BEFORE
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src="/before 4.png"
                      alt="Before Redesign - Trade Business Website"
                      width={800}
                      height={500}
                      className="object-contain w-full h-full"
                      priority={true}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onLoad={handleImageLoad}
                      style={{
                        maxHeight: '100%',
                        width: 'auto',
                        margin: '0 auto',
                        display: 'block'
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-6 py-5 text-white z-20">
                    <div className="flex items-center gap-4">
                      <div className="h-px bg-white/30 flex-grow"></div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-rose-400 opacity-80"></div>
                        <div className="w-2 h-2 rounded-full bg-rose-400 opacity-60"></div>
                        <div className="w-2 h-2 rounded-full bg-rose-400 opacity-40"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-3 left-6 right-6 h-6 bg-gradient-to-b from-white/5 to-transparent rounded-b-3xl blur-lg"></div>
              </motion.div>

              {/* After */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 300, damping: 18 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-rose-500/30 rounded-2xl blur-lg opacity-60"></div>
                <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 bg-indigo-500/90 text-white px-5 py-2 rounded-br-lg text-sm font-semibold z-20">
                    AFTER
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src="/after 4.png"
                      alt="After Redesign - Trade Business Website"
                      width={800}
                      height={500}
                      className="object-contain w-full h-full"
                      priority={true}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onLoad={handleImageLoad}
                      style={{
                        maxHeight: '100%',
                        width: 'auto',
                        margin: '0 auto',
                        display: 'block'
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-6 py-5 text-white z-20">
                    <div className="flex items-center gap-4">
                      <div className="h-px bg-white/30 flex-grow"></div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 opacity-80"></div>
                        <div className="w-2 h-2 rounded-full bg-indigo-400 opacity-60"></div>
                        <div className="w-2 h-2 rounded-full bg-indigo-400 opacity-40"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-3 left-6 right-6 h-6 bg-gradient-to-b from-white/5 to-transparent rounded-b-3xl blur-lg"></div>
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-10 md:mt-16 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="mb-6 md:mb-0">
                <h4 className="text-xl font-semibold text-white mb-2">Ready to transform your trade business website?</h4>
                <p className="text-white/70">See how we can elevate your online presence and turn more visitors into customers.</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <button 
                  className="whitespace-nowrap gap-2 inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 rounded-full border-0 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40" 
                  onClick={openCalendly}
                >
                  <span>Book a Free Website Consultation</span>
                  <motion.span 
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </button>
              </motion.div>
            </div>
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
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
