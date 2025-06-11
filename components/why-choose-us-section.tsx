"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { CheckCircle2, Zap, Trophy, Sparkles } from "lucide-react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: any
  title: string
  description: string
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="relative p-6 rounded-xl overflow-hidden group hover:border-white/20 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] to-rose-500/[0.05] backdrop-blur-sm border border-white/10 rounded-xl group-hover:from-indigo-500/[0.08] group-hover:to-rose-500/[0.08] transition-all duration-300" />
      <div className="relative z-10 flex items-start">
        <div className="mr-4 bg-gradient-to-br from-indigo-500/20 to-rose-500/20 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3
            className={cn(
              "text-lg font-semibold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
              pacifico.className,
            )}
          >
            {title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="relative min-h-screen py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-rose-500/[0.03]" />
      <div className="absolute top-40 left-20 w-72 h-72 bg-indigo-500/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-40 right-20 w-72 h-72 bg-rose-500/5 rounded-full filter blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24 min-h-screen max-h-screen flex flex-col">
        <div className="scrollable-content flex-1 overflow-y-auto pr-2 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Why Choose</span>
              <span
                className={cn(
                  " ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
                  pacifico.className,
                )}
              >
                TheWebTailors
              </span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Websites that turn visitors into clients — not just pretty pictures that sit there doing nothing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Trophy}
              title="Client Booking Focus"
              description="Everything we build is designed to get you more discovery calls and bookings."
              delay={0.1}
            />
            <FeatureCard
              icon={Zap}
              title="Simple & Fast"
              description="Clean, beautiful websites that load fast and make booking easy for clients."
              delay={0.2}
            />
            <FeatureCard
              icon={Sparkles}
              title="Getting Noticed Expert"
              description="We know exactly how to help coaches stand out and get found by the right people."
              delay={0.3}
            />
            <FeatureCard
              icon={CheckCircle2}
              title="Never Miss a Client"
              description="Follow-up systems that catch potential clients before they slip away."
              delay={0.4}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center justify-center p-px bg-gradient-to-r from-indigo-500/50 to-rose-500/50 rounded-full">
              <a
                href="#contact"
                className="bg-[#030303] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#0a0a0a] transition-colors duration-300"
              >
                Start Your Project
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
