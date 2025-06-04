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
    "Emergency Call Generator",
    "Local SEO Optimized",
    "Modern Design",
    "24/7 Lead Capture"
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
  const emailSubject = "Website Design Consultation For Tradespeople";
  const emailBody = `Hi TheWebTailors Team,

I'd like to request a Website Audit for my trade business. Here are my details:

Name: [Your Full Name]
Business Name: [Your Business Name]
Phone Number: [Your Contact Number]
Trade Type: [Electrician/Plumber/Gas Engineer/Builder/Other]
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
    "PREMIER THERAPY PRACTICE",
    "Healing & Growth",
    "For Your Clients",
    "Expert guidance through life's challenges",
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
  
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    details: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = 'Free Website Audit Request';
    const body = `Hi TheWebTailors Team,%0A%0AI'd like a free website audit. Here are my details:%0A%0AName: ${form.firstName} ${form.lastName}%0AEmail: ${form.email}%0APhone: ${form.phone}%0AWhat I need: ${form.details}%0A%0AThank you!`;
    window.location.href = `mailto:info@thewebtailors.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const switchMessages = [
    "Book More Emergency Jobs",
    "Automate Customer Queries",
    "Enhance Local Visibility"
  ];
  const [activeSwitch, setActiveSwitch] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSwitch((prev) => (prev + 1) % switchMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Feature cycling for premium benefits (classic style)
  const cyclingFeatures = [
    "Get More Emergency Calls",
    "Build Local Trust",
    "Enhance Professionalism"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % cyclingFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [cyclingFeatures.length]);

  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#181622] via-[#1a1830] to-[#2a1a2e] pt-28 md:pt-32">
      {/* Enhanced animated luxury background shapes and overlays */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Deep, rich animated gradients */}
        <motion.div
          className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-rose-700/30 blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 18, 0] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-rose-500/40 via-indigo-700/30 to-yellow-200/10 blur-3xl"
          animate={{ scale: [1, 1.13, 1], rotate: [0, -12, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2 }}
        />
        {/* Subtle gold radial glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vw] rounded-full bg-gradient-radial from-yellow-200/10 via-transparent to-transparent blur-2xl opacity-70"
          animate={{ opacity: [0.5, 0.7, 0.5], scale: [1, 1.04, 1] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1 }}
        />
        {/* Soft vignette for depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </motion.div>
      <div className="relative container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center z-10">
        {/* Left: Headline, subheadline, bullets, trust, ratings */}
        <div className="lg:col-span-6 z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-yellow-100 to-rose-200 drop-shadow-xl tracking-tight" style={{letterSpacing: '-0.02em'}}>
            Premium Locksmith Web Design
          </h1>
          <p className={cn("text-2xl text-white/80 mb-8 font-light", poppins.className)}>
            Get more local calls. Build trust. Grow your locksmith business.
          </p>
          <ul className="mb-8 space-y-3">
            <li className="flex items-center text-white/90 text-lg"><Check className="w-6 h-6 text-green-400 mr-3" /> Mobile-First, Professional Design</li>
            <li className="flex items-center text-white/90 text-lg"><Check className="w-6 h-6 text-green-400 mr-3" /> Built for UK Locksmiths</li>
            <li className="flex items-center text-white/90 text-lg"><Check className="w-6 h-6 text-green-400 mr-3" /> Trusted by Local Experts</li>
          </ul>
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-400" />)}
              <span className="text-white/70 ml-2 text-base">5-Star Client Reviews</span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-400" />)}
              <span className="text-white/70 ml-2 text-base">Award-Winning Service</span>
                    </div>
                  </div>
          {/* Classic cycling feature box (Framer Motion AnimatePresence) */}
          <div className="mt-6 mb-2">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-white/10 border border-green-400/30 shadow-lg backdrop-blur-md min-w-[270px] text-lg font-medium text-white"
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white/80 text-base font-medium">{cyclingFeatures[activeFeature]}</span>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center space-x-1 mt-3 justify-center">
                {cyclingFeatures.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 rounded-full ${index === activeFeature ? 'bg-gradient-to-r from-indigo-500 to-rose-500 w-6' : 'bg-white/20 w-2'}`}
                    animate={index === activeFeature ? { width: 24 } : { width: 8 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Right: Form */}
        <div className="lg:col-span-6 z-10 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-gradient-to-br from-white/10 via-indigo-900/40 to-purple-900/60 rounded-3xl shadow-2xl p-10 border border-white/10 backdrop-blur-2xl flex flex-col gap-6"
            style={{
              boxShadow: '0 8px 48px 0 rgba(80,60,180,0.18)',
              border: '1.5px solid rgba(255,255,255,0.12)',
              background: 'linear-gradient(120deg, rgba(30,32,60,0.85) 60%, rgba(80,60,180,0.18) 100%)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-2 text-center tracking-tight">Get Your Free Practice Audit</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="col-span-1 p-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-indigo-500 focus:via-purple-500 focus:to-rose-500 focus:border-transparent text-lg transition-all duration-200 shadow-inner shadow-black/10 hover:bg-white/20 backdrop-blur-md"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  boxShadow: '0 2px 12px 0 rgba(80,60,180,0.08) inset',
                  border: '1.5px solid rgba(255,255,255,0.10)',
                }}
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="col-span-1 p-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-indigo-500 focus:via-purple-500 focus:to-rose-500 focus:border-transparent text-lg transition-all duration-200 shadow-inner shadow-black/10 hover:bg-white/20 backdrop-blur-md"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  boxShadow: '0 2px 12px 0 rgba(80,60,180,0.08) inset',
                  border: '1.5px solid rgba(255,255,255,0.10)',
                }}
              />
            </div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="Email"
              className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-indigo-500 focus:via-purple-500 focus:to-rose-500 focus:border-transparent text-lg transition-all duration-200 shadow-inner shadow-black/10 hover:bg-white/20 backdrop-blur-md"
              style={{
                background: 'rgba(255,255,255,0.07)',
                boxShadow: '0 2px 12px 0 rgba(80,60,180,0.08) inset',
                border: '1.5px solid rgba(255,255,255,0.10)',
              }}
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-indigo-500 focus:via-purple-500 focus:to-rose-500 focus:border-transparent text-lg transition-all duration-200 shadow-inner shadow-black/10 hover:bg-white/20 backdrop-blur-md"
              style={{
                background: 'rgba(255,255,255,0.07)',
                boxShadow: '0 2px 12px 0 rgba(80,60,180,0.08) inset',
                border: '1.5px solid rgba(255,255,255,0.10)',
              }}
            />
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder="Tell us about your practice"
              rows={3}
              className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-indigo-500 focus:via-purple-500 focus:to-rose-500 focus:border-transparent text-lg transition-all duration-200 shadow-inner shadow-black/10 hover:bg-white/20 backdrop-blur-md"
              style={{
                background: 'rgba(255,255,255,0.07)',
                boxShadow: '0 2px 12px 0 rgba(80,60,180,0.08) inset',
                border: '1.5px solid rgba(255,255,255,0.10)',
              }}
            />
            <button type="submit" className="w-full py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-rose-500 text-white font-semibold text-xl hover:from-indigo-600 hover:to-rose-600 transition-all duration-300 shadow-lg shadow-indigo-500/20 mt-2">
              Get Free Practice Audit
            </button>
          </form>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#181622] via-transparent to-[#181622]/80 pointer-events-none z-0" />
    </div>
  );
}
