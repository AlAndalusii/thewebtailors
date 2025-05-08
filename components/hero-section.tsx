"use client"

import { motion } from "framer-motion"
import { Pacifico, Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function HeroSection() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Tailored Web Design
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
                  pacifico.className,
                )}
              >
                for the Modern Brand
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p
              className={cn(
                "text-base sm:text-lg md:text-xl text-white/70 mb-6 leading-relaxed max-w-3xl mx-auto px-4",
                poppins.className,
              )}
            >
              We transform outdated web experiences into sophisticated, user-focused digital platforms 
              that elevate your brand and drive results.
            </p>
          </motion.div>

          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-12 max-w-3xl mx-auto">
              {/* Strategic Design Card */}
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl group-hover:border-white/20 transition-colors duration-300"></div>
                <div className="relative z-10 p-6">
                  <div className="relative mb-4">
                    <div className="absolute -inset-1 bg-indigo-500/20 rounded-full blur-sm transform group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-500/30 to-indigo-600/30 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-indigo-300">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m7 10 2 2 6-6"></path>
                  </svg>
                </div>
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">Strategic Design</h3>
                <p className="text-white/60 text-sm">We make your site look good and work even better. Pretty meets practical in every pixel.</p>
                  <div className="h-0.5 w-0 group-hover:w-full mt-4 bg-gradient-to-r from-indigo-500/60 to-transparent transition-all duration-300 rounded-full"></div>
              </div>
              </motion.div>
              
              {/* Client-Focused Card */}
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl group-hover:border-white/20 transition-colors duration-300"></div>
                <div className="relative z-10 p-6">
                  <div className="relative mb-4">
                    <div className="absolute -inset-1 bg-rose-500/20 rounded-full blur-sm transform group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-rose-500/30 to-rose-600/30 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-rose-300">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">Client-Focused</h3>
                <p className="text-white/60 text-sm">Your goals are our goals. We build exactly what your business needs to attract your ideal visitors.</p>
                  <div className="h-0.5 w-0 group-hover:w-full mt-4 bg-gradient-to-r from-rose-500/60 to-transparent transition-all duration-300 rounded-full"></div>
              </div>
              </motion.div>
              
              {/* Future-Ready Card */}
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl group-hover:border-white/20 transition-colors duration-300"></div>
                <div className="relative z-10 p-6">
                  <div className="relative mb-4">
                    <div className="absolute -inset-1 bg-amber-500/20 rounded-full blur-sm transform group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500/30 to-amber-600/30 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-amber-300">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">Future-Ready</h3>
                <p className="text-white/60 text-sm">Built to grow with you. Your site won't just work today—it'll adapt as your business expands.</p>
                  <div className="h-0.5 w-0 group-hover:w-full mt-4 bg-gradient-to-r from-amber-500/60 to-transparent transition-all duration-300 rounded-full"></div>
              </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div custom={4} variants={fadeUpVariants} initial="hidden" animate="visible" className="mt-8">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
            <Button
              size="lg"
                  className="relative bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white rounded-full px-8 py-6 border-0"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
                  <span className="flex items-center">
              See Our Work
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
            </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
            <Button
              size="lg"
                  className="relative bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white rounded-full px-8 py-6 border-0"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
                  <span className="flex items-center">
              Contact Us
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
            </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}
