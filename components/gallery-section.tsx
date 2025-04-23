"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import LawFirmGalleryItem from "./law-firm-gallery-item"
import CorporateWebsiteGalleryItem from "./corporate-website-gallery-item"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export default function GallerySection() {
  return (
    <section id="gallery" className="relative snap-section bg-[#030303] overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-rose-500/[0.02]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Before & After
            </span>
            <span
              className={cn(
                " ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
                pacifico.className,
              )}
            >
              Gallery
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-12">
            See the dramatic transformations we create for our clients. Slide to reveal the difference.
          </p>
        </motion.div>

        {/* Gallery content without scrolling */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-20">
            {/* Law Firm Website Redesign */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500/10 to-rose-500/10 rounded-xl blur-lg opacity-20"></div>
              <div className="relative">
                <h3 className="text-2xl text-white font-medium mb-3 inline-flex items-center">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">Law Firm Website Redesign</span>
                  <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-indigo-500/20 to-rose-500/20 rounded-full border border-white/10 text-white/80">Featured</span>
                </h3>
                <LawFirmGalleryItem />
              </div>
            </motion.div>

            {/* Corporate Website Refresh */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500/10 to-rose-500/10 rounded-xl blur-lg opacity-20"></div>
              <div className="relative">
                <h3 className="text-2xl text-white font-medium mb-3 inline-flex items-center">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">Corporate Website Refresh</span>
                  <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-indigo-500/20 to-rose-500/20 rounded-full border border-white/10 text-white/80">Featured</span>
                </h3>
                <CorporateWebsiteGalleryItem />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
