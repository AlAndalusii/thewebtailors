"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

type FAQItemProps = {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  index: number
}

const FAQItem = ({ question, answer, isOpen, onClick, index }: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="mb-4"
    >
      <button
        onClick={onClick}
        className={cn(
          "w-full text-left p-6 rounded-xl flex items-center justify-between",
          "bg-[#030d09]/50 backdrop-blur-sm border border-white/10",
          "hover:border-white/20 transition-all duration-300",
          isOpen && "bg-gradient-to-br from-indigo-500/[0.08] to-rose-500/[0.08]"
        )}
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-indigo-500/20 to-rose-500/20"
          )}
        >
          <ChevronDown className="w-4 h-4 text-white" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-[#030d09]/30 backdrop-blur-sm border-x border-b border-white/10 rounded-b-xl">
              <p className="text-white/70 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  const faqItems = [
    {
      question: "Who Are The Web Tailors?",
      answer: "We help independent coaches and solo tutors go from invisible to fully booked. We're not your typical web design agency - we focus on real results, not fancy features that don't actually get you clients."
    },
    {
      question: "How does this actually work?",
      answer: "Super simple. We'll have a quick chat about where you are now and where you want to be. Then we redesign your website, set up smart follow-up systems, and show you what your competitors are doing. No tech headaches for you."
    },
    {
      question: "How long before I see more bookings?",
      answer: "Most coaches start seeing more discovery calls within 2-3 weeks. But honestly, it depends on your current situation. Some see results in days, others take a month. We work fast, but we also make sure it's done right."
    },
    {
      question: "What if this doesn't work for me?",
      answer: "We're so confident you'll get more clients that we offer a 100% money-back guarantee. If you're not seeing more bookings after we're done, we'll refund every penny. No questions asked."
    },
    {
      question: "What exactly do I get?",
      answer: "Three things that actually matter: a website redesign that turns visitors into clients, follow-up systems that stop leads from slipping away, and competitor research so you know exactly how to stand out. Plus ongoing support to keep you fully booked."
    }
  ]
  
  return (
    <section id="faq" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-rose-500/[0.03]" />
      <div className="absolute top-40 left-20 w-72 h-72 bg-indigo-500/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-40 right-20 w-72 h-72 bg-rose-500/5 rounded-full filter blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-2">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/10 text-white/70 backdrop-blur-sm">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Frequently asked
              </span>
              <span
                className={cn(
                  " ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
                  pacifico.className,
                )}
              >
                questions
              </span>
            </h2>
            <p className="text-white/70 mb-12 text-lg max-w-2xl">
              Real answers to questions coaches ask us all the time.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 