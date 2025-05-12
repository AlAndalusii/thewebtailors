"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Pacifico, Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { ArrowRight, Check, ChevronRight, ShieldCheck, Star } from "lucide-react"
import { useState, useRef, useEffect, useCallback, memo } from "react"
import Image from "next/image"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

// Memoized floating component to prevent unnecessary re-renders
interface FloatingElementProps {
  className: string;
  variants: any;
  delay?: number;
}

const FloatingElement = memo(({ className, variants, delay = 0 }: FloatingElementProps) => (
  <motion.div
    variants={variants}
    initial="initial"
    animate="animate"
    transition={{ delay }}
    className={className}
  />
));

FloatingElement.displayName = 'FloatingElement';

export default function HeroSection() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const animationPaused = useRef(false);
  
  const features = [
    "HMRC Compliant",
    "Lead Generation",
    "Client Trust Builder",
    "Modern Design"
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!animationPaused.current) {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current || animationPaused.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Only update if there's significant movement
    if (Math.abs(x - mousePosition.x) > 0.01 || Math.abs(y - mousePosition.y) > 0.01) {
      setMousePosition({ x, y });
    }
  }, [mousePosition]);
  
  useEffect(() => {
    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    
    const handleMouseMoveRAF = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMoveRAF, { passive: true });
    
    // Pause animations when tab is not visible
    const handleVisibilityChange = () => {
      animationPaused.current = document.hidden;
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveRAF);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleMouseMove]);
  
  // Email template for the "Get My Free Audit" button
  const emailSubject = "AI Chatbot Demo For my Website";
  const emailBody = `Hi TheWebTailors Team,

I'd like to request a Website Audit. Here are my details:

Name: [Your Full Name]
Business Name: [Your Business Name]
Phone Number: [Your Contact Number]
Availability: [Best days/times to chat]

Thanks!
[Your Name]`;

  const handleGetAudit = () => {
    const mailtoLink = `mailto:info@thewebtailors.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
      },
    },
  };
  
  const glowPulse = {
    initial: {
      boxShadow: "0 0 0 rgba(99, 102, 241, 0.2)",
    },
    animate: {
      boxShadow: [
        "0 0 0 rgba(99, 102, 241, 0.2)",
        "0 0 30px rgba(99, 102, 241, 0.6)",
        "0 0 0 rgba(99, 102, 241, 0.2)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
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

  // Animation variants for the UI mockup interaction
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
  
  // Animation for the cursor in the browser mockup
  const cursorBlink = {
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop" as const,
      times: [0, 0.4, 0.8, 1]
    }
  }
  
  // --- Typing effect for multi-line mockup text ---
  const mockupLines = [
    "PREMIER ACCOUNTING SERVICES",
    "Financial Clarity",
    "For Your Business",
    "Expert guidance through complex financial advisory services",
    ""
  ];
  
  // Optimization: reduce component state updates by using refs for non-rendering data
  const [typedLines, setTypedLines] = useState<string[]>([""]);
  const typingState = useRef({
    typingIndex: 0,
    charIndex: 0,
    isTyping: true
  });
  
  useEffect(() => {
    if (!typingState.current.isTyping || animationPaused.current) return;
    
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
        // Move to next line after a short pause
        if (typingIndex < mockupLines.length - 1) {
          const timeout = setTimeout(() => {
            setTypedLines((prev) => [...prev, ""]);
            typingState.current.typingIndex += 1;
            typingState.current.charIndex = 0;
          }, 500);
          return () => clearTimeout(timeout);
        } else {
          // All lines done, pause, then reset
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
  
  return (
    <div 
      id="hero" 
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#030303] pt-28 md:pt-32"
    >
      {/* Dynamic background gradient that follows mouse */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-rose-500/10 blur-3xl"
        style={{
          backgroundPosition: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
          transition: 'background-position 0.5s ease-out'
        }}
      />
      
      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: 1, rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-[5%] w-64 h-64 rounded-full border border-indigo-500/20 blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.1, 0.3, 0.1], scale: 1, rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-[5%] w-96 h-96 rounded-full border border-rose-500/20 blur-sm"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-1/3 right-[15%] w-16 h-16 bg-gradient-to-tr from-indigo-600/10 to-indigo-400/10 rounded-xl backdrop-blur-xl border border-indigo-500/20"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute bottom-1/3 left-[25%] w-24 h-24 bg-gradient-to-tr from-rose-600/10 to-rose-400/10 rounded-xl backdrop-blur-xl border border-rose-500/20 rotate-12"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute top-1/2 left-[10%] w-20 h-20 bg-gradient-to-tr from-purple-600/10 to-purple-400/10 rounded-full backdrop-blur-xl border border-purple-500/20"
        />
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
        {/* Left side content */}
        <motion.div 
          className="lg:col-span-5 z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Websites
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                That Win
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Clients
              </span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className={cn(
              "text-base sm:text-lg text-white/80 mb-6 md:mb-8 leading-relaxed max-w-xl",
              poppins.className,
            )}>
              We turn outdated accounting sites into compliant, trust-building platforms
              that convert more visitors into long-term clients.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-6 md:mb-8">
            <motion.button
              onClick={handleGetAudit}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full text-white font-medium flex items-center gap-2 hover:from-indigo-600 hover:to-rose-600 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get My Free Audit</span>
              <motion.span 
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </motion.button>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeFeature}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{features[activeFeature]}</span>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center space-x-1 mt-3">
                {features.map((_, index) => (
                  <motion.div 
                    key={index}
                    className={`h-1 rounded-full ${index === activeFeature ? 'bg-gradient-to-r from-indigo-500 to-rose-500 w-6' : 'bg-white/20 w-2'}`}
                    animate={index === activeFeature ? { width: 24 } : { width: 8 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Advanced 3D Browser Mockup - Hide on small screens, show on medium and up */}
        <motion.div 
          className="lg:col-span-7 z-10 relative hidden md:block"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative">
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
                      <span>wilkinsaccounting.com</span>
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
                {/* Premium website mockup with glass morphism */}
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
                      <span className="text-sm">W</span>
                    </motion.div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">WILKINS</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex space-x-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    {["HOME", "SERVICES", "ABOUT", "TEAM", "CONTACT"].map((item, i) => (
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
                  {/* Left content - Hero section with animated elements */}
                  <div className="col-span-8 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="mb-6"
                    >
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
                            {/* Blinking cursor only on the current line being typed */}
                            {typingState.current.typingIndex === i && (
                              <motion.span
                                className="inline-block w-1 h-4 align-middle bg-indigo-400 ml-0.5"
                                animate={cursorBlink}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                      className="flex space-x-4 mb-8"
                    >
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
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                      className="flex items-center space-x-8"
                    >
                      <motion.div 
                        className="flex space-x-2 items-center"
                        whileHover={{ scale: 1.05, x: 3 }}
                      >
                        <ShieldCheck className="h-5 w-5 text-indigo-400" />
                        <span className="text-white/70 text-xs">HMRC Compliant</span>
                      </motion.div>
                      <motion.div 
                        className="flex space-x-2 items-center"
                        whileHover={{ scale: 1.05, x: 3 }}
                      >
                        <Star className="h-5 w-5 text-amber-400" />
                        <span className="text-white/70 text-xs">5-Star Rated</span>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Right content - Glowing 3D elements */}
                  <div className="col-span-4 relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                      className="absolute inset-0"
                    >
                      <div className="relative h-full w-full flex items-center justify-center">
                        {/* 3D floating elements */}
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
                        
                        {/* Centered accountant image */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.5, duration: 0.8 }}
                          className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-800/80 to-purple-800/80 backdrop-blur-md border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.3)] overflow-hidden"
                          whileHover={{ boxShadow: "0 0 40px rgba(99,102,241,0.5)" }}
                        >
                          <div className="absolute inset-1 rounded-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                            {/* This would be replaced with an actual image in production */}
                            <div className="absolute inset-0 flex items-end justify-center pb-6">
                              <div className="text-white/90 text-center">
                                <p className="text-xs font-medium">Sarah Wilkins, CPA</p>
                                <p className="text-[10px] text-white/60">Director & Founder</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Animated dot particles */}
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
                    </motion.div>
                  </div>
                </div>
                
                {/* Animated glow effects */}
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
            
            {/* Decorative ambient light effects */}
            <motion.div 
              className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full filter blur-3xl"
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1, 0.8],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "loop" as const
              }}
            />
            <motion.div 
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1, 0.8],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "loop" as const,
                delay: 1
              }}
            />
            <motion.div 
              className="absolute bottom-20 right-20 w-32 h-32 bg-rose-500/20 rounded-full filter blur-3xl"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [0.8, 1, 0.8],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "loop" as const,
                delay: 2
              }}
            />
          </div>
        </motion.div>
        
        {/* Mobile alternative content - Only visible on small screens */}
        <motion.div
          className="md:hidden z-10 mt-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-md rounded-xl p-4 border border-indigo-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center mr-2">
                <span className="text-sm font-bold">TW</span>
              </div>
              <h3 className="text-lg font-bold text-white">TheWebTailors</h3>
            </div>
            
            <div className="space-y-3">
              {[
                "Modern, responsive websites",
                "HMRC compliant solutions",
                "Trust-building design",
                "Lead generation focused"
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center mr-2 flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-white/90 text-sm">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-xs">Ready to transform your website?</span>
                <motion.button
                  onClick={handleGetAudit}
                  className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full text-white text-sm font-medium flex items-center"
                  whileTap={{ scale: 0.95 }}
                >
                  Start Now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}
