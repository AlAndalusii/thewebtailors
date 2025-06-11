"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { Palette, ArrowRight, BarChart, Compass, Bot, Star, Award, Crown, Sparkles, TrendingUp, Mail, CheckCircle, Lightbulb, Wrench, MessageSquare } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"


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
                repeatType: "reverse" 
              }}
            >
              <Icon className="h-8 w-8 text-white" />
            </motion.div>
          </div>
        </div>
        
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-rose-300 transition-all duration-300">
            {title}
          </h3>
          <p className="text-white/60 leading-relaxed text-sm">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Animation variants for performance optimization
const metricsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const pulseVariants = {
  initial: { scale: 1, opacity: 0.8 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
}

export default function ServicesSection() {
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  // Updated for coaches - force reload
  
  // --- Dashboard typing animation (optimized) ---
  const [dashboardText, setDashboardText] = useState("")
  const dashboardLines = [
    "✓ Smart Follow-ups Running",
    "✓ 12 Discovery Calls This Week",
    "✓ Competitor Analysis Complete"
  ]
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;

    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const typeLines = () => {
      if (currentLineIndex >= dashboardLines.length) {
        currentLineIndex = 0;
      }
      
      const currentLine = dashboardLines[currentLineIndex];
      
      if (!isDeleting && currentCharIndex <= currentLine.length) {
        setDashboardText(currentLine.substring(0, currentCharIndex));
        currentCharIndex++;
      } else if (isDeleting && currentCharIndex >= 0) {
        setDashboardText(currentLine.substring(0, currentCharIndex));
        currentCharIndex--;
        
        if (currentCharIndex < 0) {
          isDeleting = false;
          currentLineIndex++;
          currentCharIndex = 0;
        }
      } else {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      }
    };

    const startDelay = setTimeout(() => {
      timeoutId = setInterval(typeLines, isDeleting ? 50 : 100);
    }, 1000);

    return () => {
      clearTimeout(startDelay);
      if (timeoutId) {
        clearInterval(timeoutId);
      }
    };
  }, [isVisible, dashboardLines]);

  const handleBookDemo = () => {
    const calendlyElement = document.querySelector('[data-calendly-link]') as HTMLElement;
    if (calendlyElement) {
      calendlyElement.click();
    }
  };

  const navigateToLeadsSystem = () => {
    router.push('/leads-system')
  }

  return (
    <section ref={sectionRef} id="services" className="relative py-24 pt-32 bg-[#030303] overflow-hidden scroll-mt-20">
      {/* Enhanced Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-rose-500/[0.03]" />
      <motion.div 
        className="absolute top-40 left-20 w-[500px] h-[500px] rounded-full"
        animate={{ 
          background: [
            'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 50%, rgba(0,0,0,0) 70%)',
            'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 50%, rgba(0,0,0,0) 70%)',
            'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 50%, rgba(0,0,0,0) 70%)'
          ],
          scale: [1, 1.1, 1],
          filter: ['blur(100px)', 'blur(120px)', 'blur(100px)'],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-40 right-20 w-[500px] h-[500px] rounded-full"
        animate={{ 
          background: [
            'radial-gradient(circle, rgba(244,114,182,0.08) 0%, rgba(244,114,182,0.02) 50%, rgba(0,0,0,0) 70%)',
            'radial-gradient(circle, rgba(236,72,153,0.08) 0%, rgba(236,72,153,0.02) 50%, rgba(0,0,0,0) 70%)',
            'radial-gradient(circle, rgba(244,114,182,0.08) 0%, rgba(244,114,182,0.02) 50%, rgba(0,0,0,0) 70%)'
          ],
          scale: [1, 1.15, 1],
          filter: ['blur(100px)', 'blur(120px)', 'blur(100px)'],
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 3
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Premium Header Section */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={metricsVariants}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative mb-8"
          >
            {/* Premium Decorative Elements */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-amber-400/40 rounded-full flex items-center justify-center"
              >
                <Crown className="w-4 h-4 text-amber-400/70" />
              </motion.div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-5 h-5 text-amber-400/70" />
              </motion.div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-amber-400/40 rounded-full flex items-center justify-center"
              >
                <Award className="w-4 h-4 text-amber-400/70" />
              </motion.div>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/85">How We Help You</span>
              <span
                className={cn(
                  " ml-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-rose-300",
                  pacifico.className,
                )}
              >
                Get Booked
              </span>
              
              {/* Luxury Accent Lines */}
              <motion.div 
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="h-[3px] bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "120px" }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  viewport={{ once: true }}
                />
                <div className="w-2 h-2 rounded-full bg-amber-400/70"></div>
                <motion.div 
                  className="h-[3px] bg-gradient-to-r from-transparent via-rose-400/60 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "120px" }}
                  transition={{ duration: 1.2, delay: 1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-white/85 max-w-4xl mx-auto text-xl md:text-2xl font-light leading-relaxed">
              Three simple ways we turn invisible coaches into fully booked ones.
            </p>
            
            {/* Premium Credentials Bar */}
            <motion.div 
              className="flex items-center justify-center gap-8 mt-8 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-white/70">
                <div className="relative">
                  <Star className="w-5 h-5 text-amber-400" />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-amber-400/30 rounded-full blur-sm"
                  />
                </div>
                <span className="text-sm font-semibold tracking-wide">Premium Results</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-3 text-white/70">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-sm font-semibold tracking-wide">+200% More Bookings</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-3 text-white/70">
                <Crown className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-semibold tracking-wide">Coach Specialists</span>
              </div>
            </motion.div>

            {/* Elegant Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed italic">
                "Simple, effective strategies that work for independent coaches who want more clients without the tech headaches"
              </p>
              <div className="flex justify-center mt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Three Main Services - Premium A-Grade Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Website Redesign - Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative group h-full"
          >
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl shadow-black/20 h-full flex flex-col group-hover:shadow-indigo-500/10">
              {/* Premium Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-purple-500/[0.01] to-rose-500/[0.02] rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated Browser Mockup - Premium Version */}
              <div className="relative mb-8 flex-shrink-0">
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl p-4 border border-gray-700/40 shadow-2xl shadow-black/30 h-40 flex flex-col">
                  {/* Premium Browser Header */}
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700/30">
                    <div className="flex gap-2">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/30"
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30"
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30"
                      />
                    </div>
                    <div className="flex-1 bg-gray-800/60 rounded-lg text-sm text-gray-300 px-4 py-2 font-mono">
                      https://yourcoaching.com
                    </div>
                  </div>
                  
                  <div className="flex-1 relative overflow-hidden">
                    {/* Before Website - Outdated */}
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="space-y-3 absolute inset-0"
                    >
                      <div className="h-3 bg-gray-600/40 rounded-lg w-4/5 animate-pulse"></div>
                      <div className="h-2 bg-gray-600/30 rounded w-3/5"></div>
                      <div className="h-2 bg-gray-600/25 rounded w-2/3"></div>
                      <div className="h-8 bg-gray-600/20 rounded-lg mt-4 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Contact Us</span>
                      </div>
                    </motion.div>
                    
                    {/* After Website - Modern */}
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 6, repeat: Infinity, delay: 3 }}
                      className="space-y-3 absolute inset-0"
                    >
                      <div className="h-4 bg-gradient-to-r from-indigo-400/80 to-purple-500/80 rounded-lg w-4/5 shadow-lg shadow-indigo-500/20"></div>
                      <div className="h-2.5 bg-white/60 rounded w-3/5"></div>
                      <div className="h-2.5 bg-white/50 rounded w-2/3"></div>
                      <motion.div 
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-10 bg-gradient-to-r from-indigo-600/90 to-rose-600/90 rounded-xl mt-4 flex items-center justify-center shadow-xl shadow-indigo-500/30"
                      >
                        <span className="text-sm text-white font-semibold">Book Discovery Call</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="text-center flex-grow flex flex-col justify-between relative z-10">
                <div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-400/30 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20"
                  >
                    <Palette className="w-8 h-8 text-indigo-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                    Website That Converts
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed mb-6">
                    Transform your outdated site into a client magnet
                  </p>
                </div>
                
                                 {/* Premium Benefits */}
                 <div className="space-y-3 max-w-xs mx-auto">
                   <div className="flex items-center text-sm text-white/60">
                     <div className="w-2 h-2 rounded-full bg-emerald-400/80 mr-3 shadow-lg shadow-emerald-400/40 flex-shrink-0"></div>
                     <span>Mobile-friendly & lightning fast</span>
                   </div>
                   <div className="flex items-center text-sm text-white/60">
                     <div className="w-2 h-2 rounded-full bg-emerald-400/80 mr-3 shadow-lg shadow-emerald-400/40 flex-shrink-0"></div>
                     <span>Frictionless booking process</span>
                   </div>
                   <div className="flex items-center text-sm text-white/60">
                     <div className="w-2 h-2 rounded-full bg-emerald-400/80 mr-3 shadow-lg shadow-emerald-400/40 flex-shrink-0"></div>
                     <span>Premium trust signals</span>
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Follow-up Systems - Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group h-full"
          >
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl shadow-black/20 h-full flex flex-col group-hover:shadow-purple-500/10">
              {/* Premium Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-rose-500/[0.01] to-orange-500/[0.02] rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Premium Communication Flow Mockup */}
              <div className="relative mb-8 flex-shrink-0">
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl p-4 border border-gray-700/40 shadow-2xl shadow-black/30 h-40">
                  <div className="space-y-3 h-full flex flex-col justify-center pt-6">
                    {/* Email Notification */}
                    <motion.div
                      initial={{ opacity: 0, x: -30, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 4 }}
                      className="bg-gradient-to-r from-purple-500/30 to-rose-500/30 rounded-xl p-3 border border-purple-400/30 shadow-lg shadow-purple-500/20"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="w-4 h-4 text-purple-300" />
                        <span className="text-xs text-white/80 font-medium">Follow-up Email</span>
                      </div>
                      <div className="text-xs text-white/60">
                        "Hi Sarah, still interested in coaching..."
                      </div>
                    </motion.div>

                    {/* SMS Reminder */}
                    <motion.div
                      initial={{ opacity: 0, x: 30, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 1, delay: 2, repeat: Infinity, repeatDelay: 4 }}
                      className="bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-xl p-3 border border-emerald-400/30 shadow-lg shadow-emerald-500/20 ml-6"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-emerald-300" />
                        <span className="text-xs text-white/80 font-medium">SMS Reminder</span>
                      </div>
                      <div className="text-xs text-white/60">
                        "Your discovery call is tomorrow at 3pm"
                      </div>
                    </motion.div>

                    {/* Success Confirmation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 4, repeat: Infinity, repeatDelay: 4 }}
                      className="bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-xl p-3 border border-amber-400/30 text-center shadow-lg shadow-amber-500/20 mx-3"
                    >
                      <CheckCircle className="w-5 h-5 text-amber-300 mx-auto mb-1" />
                      <div className="text-xs text-white/80 font-medium">Client Booked!</div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="text-center flex-grow flex flex-col justify-between relative z-10">
                <div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-rose-600/20 border border-purple-400/30 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/20"
                  >
                    <Bot className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                    Smart Follow-ups
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed mb-6">
                    Never lose a lead again with automated nurturing
                  </p>
                </div>
                
                                 {/* Premium Benefits */}
                 <div className="space-y-3 max-w-xs mx-auto">
                   <div className="flex items-center text-sm text-white/60">
                     <div className="w-2 h-2 rounded-full bg-emerald-400/80 mr-3 shadow-lg shadow-emerald-400/40 flex-shrink-0"></div>
                     <span>Intelligent lead nurturing</span>
                   </div>
                   <div className="flex items-center text-sm text-white/60">
                     <div className="w-2 h-2 rounded-full bg-emerald-400/80 mr-3 shadow-lg shadow-emerald-400/40 flex-shrink-0"></div>
                     <span>Smart booking reminders</span>
                   </div>
                   <div className="flex items-center text-sm text-white/60">
                     <div className="w-2 h-2 rounded-full bg-emerald-400/80 mr-3 shadow-lg shadow-emerald-400/40 flex-shrink-0"></div>
                     <span>Personal touch at scale</span>
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Market Intelligence - Analytics Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative group h-full"
          >
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl shadow-black/20 h-full flex flex-col group-hover:shadow-amber-500/10">
              {/* Premium Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] via-orange-500/[0.01] to-rose-500/[0.02] rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Premium Analytics Dashboard */}
              <div className="relative mb-8 flex-shrink-0">
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl p-4 border border-gray-700/40 shadow-2xl shadow-black/30 h-40 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-white/80 font-medium">Market Analysis</span>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                      />
                      <span className="text-xs text-emerald-400 font-medium">Live Data</span>
                    </div>
                  </div>
                  
                  {/* Premium Animated Chart */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60 font-medium">Your Position</span>
                      <div className="flex-1 mx-3 bg-gray-800/50 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "65%" }}
                          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
                          className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full shadow-lg shadow-indigo-500/30"
                        />
                      </div>
        </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">Competitor A</span>
                      <div className="flex-1 mx-3 bg-gray-800/50 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "42%" }}
                          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 2 }}
                          className="h-full bg-gradient-to-r from-rose-400 to-orange-500 rounded-full shadow-lg shadow-rose-500/30"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">Competitor B</span>
                      <div className="flex-1 mx-3 bg-gray-800/50 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "78%" }}
                          transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
                          className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-lg shadow-amber-500/30"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Premium Insight Alert */}
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 4, repeat: Infinity, repeatDelay: 4 }}
                    className="mt-4 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-xl p-3 border border-amber-400/40 shadow-lg shadow-amber-500/20"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb className="w-4 h-4 text-amber-300" />
                      <span className="text-sm text-amber-200 font-medium">Opportunity Detected</span>
                    </div>
                    <div className="text-xs text-white/70">
                      Premium coaching niche wide open
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div className="text-center flex-grow flex flex-col justify-between relative z-10">
                <div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-400/30 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20"
                  >
                    <BarChart className="w-8 h-8 text-amber-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                    Market Intelligence
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed mb-6">
                    Know exactly how to position yourself to win
                  </p>
                </div>
                
                                 {/* Premium Benefits */}
                 <div className="space-y-3 max-w-xs mx-auto">
                   <div className="flex items-center text-sm text-white/60">
                     <div className="w-2 h-2 rounded-full bg-emerald-400/80 mr-3 shadow-lg shadow-emerald-400/40 flex-shrink-0"></div>
                     <span>Deep competitor analysis</span>
                   </div>
                   <div className="flex items-center text-sm text-white/60">
                     <div className="w-2 h-2 rounded-full bg-emerald-400/80 mr-3 shadow-lg shadow-emerald-400/40 flex-shrink-0"></div>
                     <span>Market opportunity mapping</span>
                   </div>
                   <div className="flex items-center text-sm text-white/60">
                     <div className="w-2 h-2 rounded-full bg-emerald-400/80 mr-3 shadow-lg shadow-emerald-400/40 flex-shrink-0"></div>
                     <span>Strategic positioning</span>
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Simplified Process - Visual Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-3">Simple Process</h3>
            <p className="text-white/70 max-w-xl mx-auto">
              From invisible to fully booked in 3 steps
              </p>
            </div>
          
          {/* Visual Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-rose-500/50"></div>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-8"
              >
                <div className="flex-1 text-right">
                  <h4 className="text-xl font-bold text-white mb-2">Chat About Goals</h4>
                  <p className="text-white/60">Quick call to understand your vision</p>
            </div>
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-indigo-700/20 border-2 border-indigo-500/30 flex items-center justify-center">
                  <Compass className="w-8 h-8 text-indigo-400" />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-indigo-500/20"
                  />
          </div>
                <div className="flex-1"></div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-8"
              >
                <div className="flex-1"></div>
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-700/20 border-2 border-purple-500/30 flex items-center justify-center">
                  <Wrench className="w-8 h-8 text-purple-400" />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 rounded-full bg-purple-500/20"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-xl font-bold text-white mb-2">Build & Optimize</h4>
                  <p className="text-white/60">We handle the tech, you focus on coaching</p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-8"
              >
                <div className="flex-1 text-right">
                  <h4 className="text-xl font-bold text-white mb-2">Get Booked</h4>
                  <p className="text-white/60">Watch the discovery calls roll in</p>
                </div>
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-rose-500/20 to-rose-700/20 border-2 border-rose-500/30 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-rose-400" />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute inset-0 rounded-full bg-rose-500/20"
                  />
                </div>
                <div className="flex-1"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-28 relative"
        >
          <motion.div 
            className="text-center mb-10 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-rose-200 relative z-10">
                Real Results
              </span>
            </h3>
          </motion.div>
          
          {/* Metrics Showcase */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={metricsVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              {/* More Clients Metric */}
              <motion.div 
                className="text-center"
                variants={metricsVariants}
              >
                <div className="relative mb-4 flex justify-center">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-indigo-700/20 border border-indigo-500/30 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-indigo-400 relative z-10" />
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
                    +180%
                  </motion.span>
                </motion.div>
                <h4 className="text-xl text-white mt-2 font-medium">More Discovery Calls</h4>
                <p className="text-white/60 text-sm mt-1">Coaches getting more quality leads</p>
              </motion.div>
              
              {/* Booking Rate Metric */}
              <motion.div 
                className="text-center"
                variants={metricsVariants}
              >
                <div className="relative mb-4 flex justify-center">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-700/20 border border-purple-500/30 flex items-center justify-center">
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
                    85%
                  </motion.span>
                </motion.div>
                <h4 className="text-xl text-white mt-2 font-medium">Client Conversion</h4>
                <p className="text-white/60 text-sm mt-1">Discovery calls to paying clients</p>
              </motion.div>
              
              {/* Time Saved Metric */}
              <motion.div 
                className="text-center"
                variants={metricsVariants}
              >
                <div className="relative mb-4 flex justify-center">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-rose-500/30 blur-xl"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-rose-500/20 to-rose-700/20 border border-rose-500/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-rose-400 relative z-10">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
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
                    15hrs
                  </motion.span>
                </motion.div>
                <h4 className="text-xl text-white mt-2 font-medium">Time Saved Weekly</h4>
                <p className="text-white/60 text-sm mt-1">Focus on coaching, not chasing leads</p>
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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Go from Invisible to Fully Booked?</h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Let's have a quick chat about turning your website into a client magnet
          </p>
          <motion.button 
            onClick={handleBookDemo}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg">Let's Chat</span>
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
