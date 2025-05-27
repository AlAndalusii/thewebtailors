"use client"

import { motion, Variants } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { Palette, ArrowRight, BarChart, Compass, Code, Zap, Bot, MessageCircle, LineChart, ChevronRight, ShieldCheck, Star } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSectionVisibility } from '@/hooks/useScrollManager';

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  benefits,
  delay = 0,
}: {
  icon: any
  title: string
  description: string
  benefits?: string[]
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="relative p-8 rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-black/20 transition-all duration-500 border border-white/10 h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.07] to-rose-500/[0.07] backdrop-blur-sm transition-opacity duration-500 group-hover:from-indigo-500/[0.1] group-hover:to-rose-500/[0.1]" />
      
      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/70 to-rose-500/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-rose-500/30 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110">
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-rose-300 transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-white/70 mb-8 leading-relaxed">{description}</p>
        
        {benefits && (
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500/20 to-rose-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 6.5L6.5 3.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                    <path d="M1.5 3.5L3.5 5.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-white/60 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

const ProcessStep = ({ 
  number, 
  title, 
  description, 
  delay = 0,
  icon: Icon,
}: { 
  number: string; 
  title: string; 
  description: string; 
  delay?: number;
  icon: any;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute top-0 left-6 h-full w-[1px] bg-gradient-to-b from-indigo-500/30 to-rose-500/30 group-last:hidden"></div>
      
      <div className="flex gap-6">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/30 to-rose-500/30 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 z-10 relative">
            {number}
          </div>
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping opacity-30 group-hover:opacity-60 transition-opacity"></div>
        </div>
        
        <div className="pb-12">
          <div className="flex items-center mb-2">
            <Icon className="w-5 h-5 mr-2 text-indigo-300" />
            <h4 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-rose-300 transition-all duration-300">{title}</h4>
          </div>
          <p className="text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

const ResultCard = ({
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
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative rounded-xl overflow-hidden group h-full"
    >
      {/* Background gradient that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 rounded-xl" />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl p-[1px] bg-transparent z-10">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 via-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <motion.div 
            className="h-full w-[200%] absolute -left-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              translateX: ["0%", "200%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: delay * 2
            }}
          />
        </div>
      </div>
      
      {/* Card content background */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-colors duration-300 rounded-xl z-0" />
      
      {/* Card content */}
      <div className="relative z-20 p-6 flex flex-col h-full">
        {/* Animated icon container */}
        <div className="relative mb-4 w-16 h-16 mx-auto">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-rose-500/30 rounded-full opacity-70 blur-md"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-rose-500/30 rounded-full"
            animate={{ 
              rotate: [0, 180],
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, repeatType: "reverse" }
            }}
          />
          <div className="relative h-full w-full rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        </div>
        
        {/* Text content */}
        <div className="text-center">
          <motion.h4 
            className="text-lg font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 group-hover:from-indigo-200 group-hover:to-white transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.2 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h4>
          <motion.p 
            className="text-white/60 text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.4 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
        </div>
        
        {/* Animated underline */}
        <motion.div 
          className="h-0.5 bg-gradient-to-r from-indigo-500/60 to-rose-500/60 rounded-full mx-auto mt-5"
          initial={{ width: 0 }}
          whileInView={{ width: "30%" }}
          whileHover={{ width: "60%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
}

// Animation variants and typing effect state for dashboard mockup (from hero-section)
const uiMockupVariants = {
  hover: {
    rotateY: [0, 2, 0, -2, 0],
    rotateX: [0, 1, 0, -1, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
}
const cursorBlink = {
  opacity: [0, 1, 1, 0],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "loop" as const,
    times: [0, 0.4, 0.8, 1]
  }
}
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}
const mockupLines = [
  "PROFESSIONAL THERAPY SERVICES",
  "Your Journey to Wellness",
  "Starts Here",
  "Expert guidance through evidence-based therapeutic approaches",
  ""
];

export default function ServicesSection() {
  const router = useRouter();
  const isVisible = useSectionVisibility('services', 0.1);

  // Memoize animation variants to prevent recreating them on each render
  const metricsVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }), []);

  const glowVariants: Variants = useMemo(() => ({
    initial: { opacity: 0.3, scale: 1 },
    animate: {
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }), []);

  // Move hooks here (fix Invalid Hook Call)
  const [typedLines, setTypedLines] = useState<string[]>([""]);
  const typingState = useRef({
    typingIndex: 0,
    charIndex: 0,
    isTyping: true
  });
  useEffect(() => {
    if (!typingState.current.isTyping) return;
    const { typingIndex, charIndex } = typingState.current;
    if (typingIndex < mockupLines.length) {
      if (charIndex < mockupLines[typingIndex].length) {
        const timeout = setTimeout(() => {
          setTypedLines((prev) => {
            const newLines = [...prev];
            newLines[typingIndex] = (newLines[typingIndex] || "") + mockupLines[typingIndex][charIndex];
            return newLines;
          });
          typingState.current.charIndex += 1;
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        if (typingIndex < mockupLines.length - 1) {
          const timeout = setTimeout(() => {
            setTypedLines((prev) => [...prev, ""]);
            typingState.current.typingIndex += 1;
            typingState.current.charIndex = 0;
          }, 500);
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => {
            setTypedLines([""]);
            typingState.current.typingIndex = 0;
            typingState.current.charIndex = 0;
          }, 2200);
          return () => clearTimeout(timeout);
        }
      }
    }
  }, [typedLines, mockupLines]);

  // Email template for the "Book a Demo" button
  const handleBookDemo = () => {
    const emailSubject = "Website Redesign Demo Request";
    const emailBody = `Hi TheWebTailors Team,

I'd like to book a demo to learn more about your website redesign service. Here are my details:

Name: [Your Full Name]
Business Name: [Your Business Name]
Phone Number: [Your Contact Number]
Current Website URL: [Your Website URL]
Preferred Date/Time: [Your Preferred Date and Time]

Brief Description of What You're Looking For:
[Please provide a short description of your goals and requirements]

Thank you,
[Your Name]`;

    window.location.href = `mailto:info@thewebtailors.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  const navigateToChatbots = () => {
    router.push('/chatbots')
  }

  return (
    <section id="services" className="relative py-24 pt-32 bg-[#030303] overflow-hidden scroll-mt-20">
      {/* Optimize background gradients by using CSS instead of motion.div */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-rose-500/[0.03]" />
      <div className="absolute top-40 left-20 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-rose-500/5 rounded-full filter blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={metricsVariants}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Our Premium</span>
            <span
              className={cn(
                " ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
                pacifico.className,
              )}
            >
              Services
            </span>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
            We transform outdated accounting websites into client-generating assets that showcase your expertise and build trust. Design that brings real results.
          </p>
        </motion.div>

        {/* Main Feature: Website Redesign */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900/60 via-blue-950/70 to-purple-900/70 shadow-2xl shadow-indigo-900/30">
                {/* --- Begin Dashboard Mockup (moved from hero) --- */}
                {/* Browser window mockup with 3D perspective */}
                <motion.div 
                  className="bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl transform perspective-1200"
                  animate="hover"
                  variants={uiMockupVariants}
                >
                  {/* Browser header */}
                  <div className="bg-slate-800/80 backdrop-blur-md p-3 border-b border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-slate-700/80 backdrop-blur-sm rounded-full h-6 w-full max-w-md mx-auto flex items-center justify-center group hover:bg-slate-600/80 transition-colors duration-300">
                        <div className="flex items-center text-slate-400 text-xs group-hover:text-slate-300 transition-colors duration-300">
                          <span>mindfultherapy.com</span>
                          <motion.span 
                            className="ml-1 w-1 h-3 bg-indigo-400 inline-block"
                            animate={cursorBlink}
                          ></motion.span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Browser content - Modern premium design */}
                  <div className="h-[450px] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-slate-900/20 to-rose-900/30 backdrop-blur-sm"></div>
                    {/* Top navigation bar */}
                    <div className="relative z-10 h-14 backdrop-blur-md bg-black/10 border-b border-white/10 flex items-center justify-between px-6">
                      <motion.div 
                        className="text-white font-bold text-lg tracking-wide flex items-center space-x-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        <motion.div 
                          className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center mr-2"
                          whileHover={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-sm">M</span>
                        </motion.div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">MINDFUL</span>
                      </motion.div>
                      <motion.div 
                        className="flex space-x-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                      >
                        {["HOME", "THERAPY", "APPROACH", "ABOUT", "CONTACT"].map((item, i) => (
                          <motion.div 
                            key={item} 
                            variants={fadeInUp}
                            className={`text-sm font-medium transition-colors duration-300 ${i === 0 ? 'text-white' : 'text-white/60 hover:text-white'}`}
                            whileHover={{ y: -2 }}
                          >
                            {item}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    {/* Main content area */}
                    <div className="relative z-10 grid grid-cols-12 gap-6 p-6 h-[calc(100%-56px)]">
                      <div className="col-span-8 flex flex-col justify-center">
                        {/* Typing effect for all lines */}
                        <div className="min-h-[140px] flex flex-col justify-center">
                          {mockupLines.map((line, i) => (
                            <div key={i} className={
                              i === 0
                                ? "text-xs text-indigo-400 font-semibold mb-2 tracking-wider"
                                : i === 1
                                ? "text-3xl font-bold text-white mb-0 leading-tight"
                                : i === 2
                                ? "text-3xl font-bold text-white mb-3 leading-tight"
                                : i === 3
                                ? "text-white/70 text-sm flex items-center"
                                : "text-3xl font-bold mb-3 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-rose-400"
                            }>
                              {typedLines[i] || ""}
                              {typingState.current.typingIndex === i && (
                                <motion.span
                                  className="inline-block w-1 h-4 align-middle bg-indigo-400 ml-0.5"
                                  animate={cursorBlink}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-4 mb-8">
                          <motion.button 
                            className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium flex items-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-lg shadow-indigo-900/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>Our Services</span>
                            <ChevronRight className="h-4 w-4" />
                          </motion.button>
                          <motion.button 
                            className="px-5 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Contact Us
                          </motion.button>
                        </div>
                        <div className="flex items-center space-x-8">
                          <motion.div 
                            className="flex space-x-2 items-center"
                            whileHover={{ scale: 1.05, x: 3 }}
                          >
                            <ShieldCheck className="h-5 w-5 text-indigo-400" />
                            <span className="text-white/70 text-xs">BACP Accredited</span>
                          </motion.div>
                          <motion.div 
                            className="flex space-x-2 items-center"
                            whileHover={{ scale: 1.05, x: 3 }}
                          >
                            <Star className="h-5 w-5 text-amber-400" />
                            <span className="text-white/70 text-xs">5-Star Rated</span>
                          </motion.div>
                        </div>
                      </div>
                      <div className="col-span-4 relative">
                        <div className="relative h-full w-full flex items-center justify-center">
                          <motion.div
                            animate={{ 
                              y: [0, -10, 0],
                              rotate: [0, 5, 0]
                            }}
                            transition={{ 
                              duration: 6, 
                              repeat: Infinity,
                              repeatType: "loop" as const, 
                            }}
                            className="absolute h-32 w-32 bg-gradient-to-br from-indigo-500/20 to-transparent backdrop-blur-md border border-indigo-500/30 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] transform rotate-12"
                          />
                          <motion.div
                            animate={{ 
                              y: [0, 10, 0],
                              rotate: [0, -5, 0]
                            }}
                            transition={{ 
                              duration: 7, 
                              repeat: Infinity,
                              repeatType: "loop" as const,
                              delay: 0.5
                            }}
                            className="absolute h-32 w-32 bg-gradient-to-br from-purple-500/20 to-transparent backdrop-blur-md border border-purple-500/30 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] transform -rotate-6"
                          />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-md border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.3)] overflow-hidden"
                            whileHover={{ boxShadow: "0 0 40px rgba(99,102,241,0.5)" }}
                          >
                            <div className="absolute inset-1 rounded-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                              <div className="absolute inset-0 flex items-end justify-center pb-6">
                                <div className="text-white/90 text-center">
                                  <p className="text-xs font-medium">Dr. Sarah Mitchell</p>
                                  <p className="text-[10px] text-white/60">Licensed Therapist</p>
                                </div>
                              </div>
                            </div>
                            <motion.div 
                              className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-purple-400"
                              animate={{
                                y: [0, -8, 0],
                                opacity: [0.2, 1, 0.2]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "loop" as const
                              }}
                            />
                            <motion.div 
                              className="absolute bottom-10 left-4 w-1 h-1 rounded-full bg-indigo-400"
                              animate={{
                                y: [0, 6, 0],
                                opacity: [0.2, 1, 0.2]
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatType: "loop" as const,
                                delay: 0.5
                              }}
                            />
                            <motion.div 
                              className="absolute top-14 left-6 w-1 h-1 rounded-full bg-rose-400"
                              animate={{
                                y: [0, -5, 0],
                                opacity: [0.2, 1, 0.2]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop" as const,
                                delay: 1
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-indigo-500/10 to-transparent"
                      animate={{ 
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        repeatType: "loop" as const
                      }}
                    />
                  </div>
                </motion.div>
                {/* --- End Dashboard Mockup --- */}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
                Therapy Practice Website Design
              </h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Transform your therapy practice website into a welcoming space that builds trust and connects with clients. Our specialized designs create a safe, professional presence that helps clients feel comfortable reaching out.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500/20 to-rose-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 1L3.5 8.5L1 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/80">Dedicated pages for therapy approaches, specialties, and client resources</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500/20 to-rose-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 1L3.5 8.5L1 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/80">Built-in trust elements like credentials, client testimonials, and professional memberships</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500/20 to-rose-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 1L3.5 8.5L1 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/80">Easy booking and contact forms designed for therapy client inquiries</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500/20 to-rose-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 1L3.5 8.5L1 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/80">Mobile-friendly design that makes it easy for clients to connect from any device</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="gap-2 bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 transition-all duration-300 border-0 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40" 
                  onClick={handleBookDemo}
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* AI Chatbot for Accountants Feature */}
        <div className="mb-24" id="ai-chatbot-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <motion.h3 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300">
                  AI Assistant for Therapists
                </span>
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/80 text-lg leading-relaxed mb-8"
              >
                24/7 compassionate support that helps potential clients find the right therapist while answering common questions about your practice.
              </motion.p>
              
              <div className="space-y-5 mb-8">
                <motion.div 
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/50 to-purple-500/50 blur-md"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ 
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear" 
                        }}
                        className="absolute inset-0 rounded-full overflow-hidden"
                      >
                        <div className="w-full h-full bg-gradient-to-r from-indigo-500/10 to-purple-500/0" />
                      </motion.div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">Client Matching</h4>
                    <p className="text-white/60 text-sm">Helps clients find the right therapy approach and appointment times</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/50 to-pink-500/50 blur-md"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.5
                      }}
                    />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center flex-shrink-0">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ 
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear" 
                        }}
                        className="absolute inset-0 rounded-full overflow-hidden"
                      >
                        <div className="w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/0" />
                      </motion.div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                        <path d="M17 10h.01"></path>
                        <path d="M7 10h.01"></path>
                        <path d="M13 14h.01"></path>
                        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">Lead Capture</h4>
                    <p className="text-white/60 text-sm">Converts visitors to qualified leads with CRM integration</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/50 to-rose-500/50 blur-md"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1
                      }}
                    />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-pink-500/30 to-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ 
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear" 
                        }}
                        className="absolute inset-0 rounded-full overflow-hidden"
                      >
                        <div className="w-full h-full bg-gradient-to-r from-pink-500/10 to-rose-500/0" />
                      </motion.div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">Appointment Booking</h4>
                    <p className="text-white/60 text-sm">Schedules client meetings directly into your calendar</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="gap-2 relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 border-0 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 px-6 py-3" 
                    onClick={handleBookDemo}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatDelay: 3 
                      }}
                    />
                    <span className="relative z-10 flex items-center">
                      Book a Demo
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative z-50 lg:ml-6"
            >
              <div className="relative">
                <motion.div 
                  className="absolute -top-6 -right-6 w-64 h-64 rounded-full"
                  animate={{ 
                    background: [
                      'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(147,51,234,0.1) 70%, rgba(0,0,0,0) 100%)',
                      'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(168,85,247,0.1) 70%, rgba(0,0,0,0) 100%)',
                      'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(147,51,234,0.1) 70%, rgba(0,0,0,0) 100%)'
                    ],
                    filter: ['blur(60px)', 'blur(80px)', 'blur(60px)'],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                />
                
                {/* Dashboard Preview with enhanced animations */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ 
                    y: [0, -10, 0],
                    boxShadow: [
                      "0 0 0 rgba(99, 102, 241, 0.3)",
                      "0 0 30px rgba(99, 102, 241, 0.6)",
                      "0 0 0 rgba(99, 102, 241, 0.3)"
                    ]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 w-full max-w-md mx-auto"
                >
                  {/* Animated glow effect */}
                  <motion.div
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut"
                    }}
                    className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-xl blur-xl z-0"
                  />
                  
                  <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-xl shadow-indigo-500/30">
                    <Image
                      src="/hotel-bot-dashboard.svg"
                      alt="Accounting Chatbot Dashboard"
                      width={800}
                      height={500}
                      className="w-full"
                      priority
                    />
                    <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-gradient-to-r from-indigo-500/90 to-purple-700/90 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white text-sm font-medium">Therapy Assistant</h4>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-red-400"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Animated pulse indicators */}
                    <motion.div
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                        delay: 1
                      }}
                      className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full"
                    >
                      <motion.div
                        animate={{ scale: [1, 2, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2
                        }}
                        className="absolute inset-0 bg-green-500 rounded-full opacity-50"
                      />
                    </motion.div>
                    
                    <motion.div
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                      className="absolute top-2/3 right-1/3 w-3 h-3 bg-indigo-500 rounded-full"
                    >
                      <motion.div
                        animate={{ scale: [1, 2, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          delay: 0.5
                        }}
                        className="absolute inset-0 bg-indigo-500 rounded-full opacity-50"
                      />
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Conversation Preview with better animations */}
                <motion.div
                  initial={{ opacity: 1, x: 0, y: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="absolute -bottom-8 -right-8 z-20 w-48 lg:w-60"
                >
                  <div className="rounded-xl overflow-hidden border border-white/20 shadow-xl shadow-purple-500/30">
                    <div className="bg-slate-900/90 p-3 border-b border-white/10 flex items-center space-x-2">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.3, 1],
                          backgroundColor: ["rgb(34, 197, 94)", "rgb(52, 211, 153)", "rgb(34, 197, 94)"]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut"
                        }}
                        className="w-2 h-2 rounded-full bg-green-500"
                      />
                      <p className="text-white text-xs">Counseling Assistant</p>
                    </div>
                    <div className="bg-slate-800/90 p-4 max-h-60">
                      <div className="chat-msg mb-3">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="bg-indigo-600/40 rounded-lg p-2 text-white text-xs"
                        >
                          Hi! How can I help you with your therapy needs today?
                        </motion.div>
                      </div>
                      <div className="chat-msg mb-3">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="bg-slate-700/60 rounded-lg p-2 text-white text-xs ml-auto max-w-[90%]"
                        >
                          When is the next available appointment?
                        </motion.div>
                      </div>
                      <div className="chat-msg mb-3">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 1 }}
                          className="bg-indigo-600/40 rounded-lg p-2 text-white text-xs"
                        >
                          I have openings next Tuesday at 2 PM and Thursday at 4 PM. Would you like to schedule one of these?
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced animated particles */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.6, 0.2],
                      rotate: [0, 15, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-4 -left-4 w-10 h-10 bg-indigo-500 rounded-full filter blur-md opacity-20"
                  />
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.6, 0.2],
                      rotate: [0, -15, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute -bottom-6 -right-6 w-8 h-8 bg-purple-500 rounded-full filter blur-md opacity-30"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Our Process */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 mb-24"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold text-white mb-3">Our Process</h3>
              <p className="text-white/70 max-w-xl">
                Clear. Focused. Built to Perform.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-white font-medium transition-all duration-300 group"
              >
                <span>Start Your Project</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
          
          <div className="space-y-0">
            <ProcessStep 
              number="1" 
              title="Discover" 
              description="We learn your goals and plan a smart strategy."
              delay={0.2}
              icon={Compass}
            />
            
            <ProcessStep 
              number="2" 
              title="Design" 
              description="We create clean, branded layouts that drive action."
              delay={0.4}
              icon={Palette}
            />
            
            <ProcessStep 
              number="3" 
              title="Build" 
              description="We develop fast, responsive sites that work everywhere."
              delay={0.6}
              icon={Code}
            />
            
            <ProcessStep 
              number="4" 
              title="Optimize" 
              description="We launch, track, and refine for ongoing results."
              delay={0.8}
              icon={BarChart}
            />
          </div>
        </motion.div>

        {/* Results-Driven Approach */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-28 relative"
        >
          {/* Enhanced background elements */}
          <motion.div 
            className="absolute -top-20 left-1/4 w-96 h-96 rounded-full"
            animate={{ 
              background: [
                'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 50%, rgba(0,0,0,0) 70%)',
                'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 50%, rgba(0,0,0,0) 70%)',
                'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 50%, rgba(0,0,0,0) 70%)'
              ],
              scale: [1, 1.1, 1],
              filter: ['blur(60px)', 'blur(70px)', 'blur(60px)'],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full"
            animate={{ 
              background: [
                'radial-gradient(circle, rgba(244,114,182,0.15) 0%, rgba(244,114,182,0.05) 50%, rgba(0,0,0,0) 70%)',
                'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.05) 50%, rgba(0,0,0,0) 70%)',
                'radial-gradient(circle, rgba(244,114,182,0.15) 0%, rgba(244,114,182,0.05) 50%, rgba(0,0,0,0) 70%)'
              ],
              scale: [1, 1.15, 1],
              filter: ['blur(60px)', 'blur(80px)', 'blur(60px)'],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          />
          
          <motion.div 
            className="text-center mb-10 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-3"
            >
              <h3 className="text-4xl md:text-5xl font-bold relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-rose-200 relative z-10">
                  Results That Matter
                </span>
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 rounded-full"
                  initial={{ width: 0, left: "50%" }}
                  whileInView={{ width: "100%", left: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </h3>
            </motion.div>
          </motion.div>
          
          {/* Metrics Showcase with Optimized Animations */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={metricsVariants}
          >
            {/* Use CSS animations for the vertical line instead of motion.div */}
            <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-gradient-flow" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              {/* Qualified Leads Metric */}
              <motion.div 
                className="text-center"
                variants={metricsVariants}
              >
                <div className="relative mb-4 flex justify-center">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl"
                    variants={glowVariants}
                    initial="initial"
                    animate={isVisible ? "animate" : "initial"}
                  />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-indigo-700/20 border border-indigo-500/30 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                      className="absolute inset-0 rounded-full overflow-hidden opacity-60"
                    >
                      <div className="w-full h-full bg-gradient-to-r from-indigo-500/30 to-transparent" />
                    </motion.div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-indigo-400 relative z-10">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 10,
                    delay: 0.2
                  }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div 
                    className="absolute inset-0 filter blur-sm opacity-30 bg-indigo-500/30 rounded-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.span
                    className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-indigo-500 block"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(99, 102, 241, 0)",
                        "0 0 15px rgba(99, 102, 241, 0.5)",
                        "0 0 5px rgba(99, 102, 241, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    +142%
                  </motion.span>
                </motion.div>
                <h4 className="text-xl text-white mt-2 font-medium">Qualified Leads</h4>
                <p className="text-white/60 text-sm mt-1">More high-quality prospects</p>
              </motion.div>
              
              {/* Conversion Rate Metric */}
              <motion.div 
                className="text-center"
                variants={metricsVariants}
              >
                <div className="relative mb-4 flex justify-center">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl"
                    variants={glowVariants}
                    initial="initial"
                    animate={isVisible ? "animate" : "initial"}
                  />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-700/20 border border-purple-500/30 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                      className="absolute inset-0 rounded-full overflow-hidden opacity-60"
                    >
                      <div className="w-full h-full bg-gradient-to-r from-purple-500/30 to-transparent" />
                    </motion.div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-purple-400 relative z-10">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 10,
                    delay: 0.3
                  }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div 
                    className="absolute inset-0 filter blur-sm opacity-30 bg-purple-500/30 rounded-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5
                    }}
                  />
                  <motion.span
                    className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-500 block"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(147, 51, 234, 0)",
                        "0 0 15px rgba(147, 51, 234, 0.5)",
                        "0 0 5px rgba(147, 51, 234, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.3
                    }}
                  >
                    +94%
                  </motion.span>
                </motion.div>
                <h4 className="text-xl text-white mt-2 font-medium">Conversion Rate</h4>
                <p className="text-white/60 text-sm mt-1">Higher visitor-to-client ratio</p>
              </motion.div>
              
              {/* Search Visibility Metric */}
              <motion.div 
                className="text-center"
                variants={metricsVariants}
              >
                <div className="relative mb-4 flex justify-center">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-rose-500/30 blur-xl"
                    variants={glowVariants}
                    initial="initial"
                    animate={isVisible ? "animate" : "initial"}
                  />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-rose-500/20 to-rose-700/20 border border-rose-500/30 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                      className="absolute inset-0 rounded-full overflow-hidden opacity-60"
                    >
                      <div className="w-full h-full bg-gradient-to-r from-rose-500/30 to-transparent" />
                    </motion.div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-rose-400 relative z-10">
                      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
                      <path d="M3 16.2V21m0-4.8H7.8"></path>
                      <path d="M21 7.8V3m0 4.8h-4.8"></path>
                      <path d="M3 3v4.8M3 3h4.8"></path>
                      <path d="M10 21v-4a2 2 0 0 1 4 0v4"></path>
                      <path d="M10 7V3h4v4"></path>
                      <path d="M3 12h18"></path>
                    </svg>
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 10,
                    delay: 0.4
                  }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div 
                    className="absolute inset-0 filter blur-sm opacity-30 bg-rose-500/30 rounded-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1
                    }}
                  />
                  <motion.span
                    className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-300 to-rose-500 block"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(244, 63, 94, 0)",
                        "0 0 15px rgba(244, 63, 94, 0.5)",
                        "0 0 5px rgba(244, 63, 94, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.6
                    }}
                  >
                    +67%
                  </motion.span>
                </motion.div>
                <h4 className="text-xl text-white mt-2 font-medium">Search Visibility</h4>
                <p className="text-white/60 text-sm mt-1">Improved rankings for key terms</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-500/10 to-rose-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Website?</h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Let's discuss how our premium services can elevate your digital presence and drive real business results.
          </p>
          <motion.button 
            onClick={handleBookDemo}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg">Book a Demo</span>
            <motion.span 
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
