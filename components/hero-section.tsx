"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Pacifico, Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { ArrowRight, Star, Calendar } from "lucide-react"
import WhatsAppCTA from "./WhatsAppCTA"
import { useState, useRef, useEffect, useCallback, memo } from "react"

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
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const animationPaused = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  
  const features = [
    "Smart Follow-up Systems",
    "Client Booking Funnels",
    "Competitor Insights",
    "Discovery Call Forms"
  ]
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animationPaused.current) {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  // Mobile-optimized scroll handler for floating CTA
  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;
    
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const heroBottom = rect.bottom
        const windowHeight = window.innerHeight
        
        // Show floating CTA when hero section is scrolled past 70% on mobile
        if (window.innerWidth < 768) {
          setShowFloatingCTA(heroBottom < windowHeight * 0.3)
        } else {
          setShowFloatingCTA(false) // Only show on mobile
        }
      }
    }
    
    // Throttled scroll event for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [isClient])
  
  // Throttled mouse move handler - disabled on reduced motion
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current || animationPaused.current || shouldReduceMotion) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Only update if there's significant movement (increased threshold for performance)
    if (Math.abs(x - mousePosition.x) > 0.05 || Math.abs(y - mousePosition.y) > 0.05) {
      setMousePosition({ x, y });
    }
  }, [mousePosition, shouldReduceMotion]);

  const handleMouseMoveRAF = useCallback((e: MouseEvent) => {
    if (shouldReduceMotion) return;
    requestAnimationFrame(() => handleMouseMove(e));
  }, [handleMouseMove, shouldReduceMotion]);

  // Pause animations when tab is hidden for better performance
  const handleVisibilityChange = () => {
    if (typeof document !== 'undefined') {
      animationPaused.current = document.hidden;
    }
  };

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;
    
    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMoveRAF);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        hero.removeEventListener('mousemove', handleMouseMoveRAF);
        if (typeof document !== 'undefined') {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
      };
    }
  }, [handleMouseMove, isClient]);

  // Performance optimized intersection observer for animations
  useEffect(() => {
    if (!isClient || typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isClient]);

  const handleGetAudit = () => {
    if (!isClient || typeof window === 'undefined') return;
    
    try {
      // Enhanced mobile-friendly interaction
      if (window.innerWidth < 768) {
        // Mobile: Direct to Calendly with optimized mobile view
        window.open('https://calendly.com/thewebtailors/free-strategy-call', '_blank', 'noopener,noreferrer')
      } else {
        // Desktop: Original behavior
        window.open('https://calendly.com/thewebtailors/free-strategy-call', '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      console.error('Error opening Calendly:', error);
    }
  }

  // Email template for the consultation request
  const emailSubject = "Let's Get You Fully Booked";
  const emailBody = `Hi The Web Tailors Team,

I'd love to chat about getting more clients. Here are my details:

Name: [Your Full Name]
Business: [Your Coaching/Tutoring Business]
Phone: [Your Contact Number]
What you do: [Life Coach/Business Coach/Language Tutor/etc.]
Current website: [Your current website or "None"]
Best time to chat: [Best days/times]

Looking forward to hearing from you!
[Your Name]`;

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
    if (!isClient || typeof window === 'undefined') return;
    
    try {
      const subject = 'Let\'s Get You Fully Booked';
      const body = `Hi The Web Tailors Team,%0A%0AI'd love to chat about getting more clients. Here are my details:%0A%0AName: ${form.firstName} ${form.lastName}%0AEmail: ${form.email}%0APhone: ${form.phone}%0AWhat I do: ${form.details}%0A%0AThanks!`;
      window.location.href = `mailto:info@thewebtailors.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    } catch (error) {
      console.error('Error opening email client:', error);
    }
  };

  const switchMessages = [
    "From Invisible to Fully Booked",
    "Stop Client Money Leaks",
    "Get Ahead of Competition"
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
    "Get More Discovery Calls",
    "Stop Clients Slipping Away",
    "Stay Ahead of Competition"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % cyclingFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [cyclingFeatures.length]);

  return (
    <>
      <div ref={heroRef} className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#181622] via-[#1a1830] to-[#0a0a0a] pt-28 md:pt-32">
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
        <div className="relative container mx-auto px-4 md:px-6 z-10">
          {/* Centered Premium Hero Content */}
          <div className="max-w-7xl mx-auto text-center">
            
            {/* WhatsApp CTA - World Class Apple Style - Moved Above Heading */}
            <div className="mb-8 md:mb-12">
              <WhatsAppCTA />
            </div>

            {/* Main Headline - Fortune 500 Style */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight leading-[0.95] px-2"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/90">
                We Tailor Client-Winning
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-rose-300 mt-2">
                Websites For Busy Coaches
              </span>
            </motion.h1>

            {/* Refined Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={cn("text-lg md:text-2xl lg:text-3xl text-white/70 mb-8 md:mb-12 max-w-5xl mx-auto font-light leading-relaxed px-4", poppins.className)}
            >
              Professional sites plus automated follow-up systems that convert more discovery calls into actual bookings
            </motion.p>

            {/* Premium Animated Benefits Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 max-w-6xl mx-auto px-4"
            >
              {/* Instant Credibility - Animated Trust Building */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl md:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60 group-hover:opacity-100"></div>
                <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-white/20 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                  
                  {/* Animated Trust Visual */}
                  <div className="relative w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6">
                    <motion.div 
                      className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    
                    {/* Trust Badge Animation */}
                    <motion.div 
                      className="absolute inset-2 rounded-lg md:rounded-xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0px rgba(99, 102, 241, 0.4)",
                          "0 0 0 10px rgba(99, 102, 241, 0)",
                          "0 0 0 0px rgba(99, 102, 241, 0)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.svg 
                        className="w-6 h-6 md:w-8 md:h-8 text-indigo-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </motion.svg>
                    </motion.div>
                    
                    {/* Floating stars around trust badge */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400/60 rounded-full"
                        style={{
                          top: `${20 + i * 25}%`,
                          right: `${10 + i * 15}%`,
                        }}
                        animate={{
                          y: [0, -8, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                      />
                    ))}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 text-center">Instant Credibility</h3>
                  <p className="text-white/70 text-center leading-relaxed text-sm md:text-base">Premium design that builds trust at first glance</p>
                </div>
              </motion.div>

              {/* More Revenue - Animated Money Flow */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-rose-500/20 rounded-2xl md:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60 group-hover:opacity-100"></div>
                <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-white/20 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-purple-500/10">
                  
                  {/* Animated Revenue Growth Visual */}
                  <div className="relative w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6">
                    <motion.div 
                      className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500/20 to-rose-500/20 border border-purple-400/30"
                      animate={{ 
                        scale: [1, 1.08, 1],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    
                    {/* Dollar signs floating upward */}
                    <div className="absolute inset-2 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-600/30 to-rose-600/30 flex items-center justify-center overflow-hidden">
                      <motion.svg 
                        className="w-6 h-6 md:w-8 md:h-8 text-purple-300 z-10" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </motion.svg>
                      
                      {/* Floating dollar symbols */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-emerald-400/40 text-xs md:text-sm font-bold"
                          style={{ left: `${30 + i * 20}%` }}
                          animate={{
                            y: [20, -20, 20],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeInOut"
                          }}
                        >
                          $
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Revenue growth arrow */}
                    <motion.div
                      className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-3 h-3 md:w-4 md:h-4 bg-emerald-400/80 rounded-full flex items-center justify-center"
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 0 0px rgba(52, 211, 153, 0.4)",
                          "0 0 0 8px rgba(52, 211, 153, 0)",
                          "0 0 0 0px rgba(52, 211, 153, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <svg className="w-1.5 h-1.5 md:w-2 md:h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 17a.5.5 0 01-.5-.5V5.707L5.354 9.854a.5.5 0 11-.708-.708l5-5a.5.5 0 01.708 0l5 5a.5.5 0 01-.708.708L10.5 5.707V16.5a.5.5 0 01-.5.5z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 text-center">More Revenue</h3>
                  <p className="text-white/70 text-center leading-relaxed text-sm md:text-base">Convert visitors into high-paying clients</p>
                </div>
              </motion.div>

              {/* Automated Growth - Animated Gear System */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-amber-500/20 rounded-2xl md:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60 group-hover:opacity-100"></div>
                <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-white/20 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-rose-500/10">
                  
                  {/* Animated Automation Gears */}
                  <div className="relative w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6">
                    <motion.div 
                      className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-400/30"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    
                    {/* Main automation gear */}
                    <div className="absolute inset-2 rounded-lg md:rounded-xl bg-gradient-to-br from-rose-600/30 to-amber-600/30 flex items-center justify-center">
                      <motion.svg 
                        className="w-6 h-6 md:w-8 md:h-8 text-rose-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </motion.svg>
                    </div>
                    
                    {/* Smaller rotating gears */}
                    <motion.div
                      className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-4 h-4 md:w-6 md:h-6 bg-amber-400/20 rounded-full flex items-center justify-center border border-amber-400/40"
                      animate={{ rotate: -360 }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    >
                      <svg className="w-2 h-2 md:w-3 md:h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    
                    <motion.div
                      className="absolute -bottom-0.5 -left-0.5 md:-bottom-1 md:-left-1 w-3 h-3 md:w-5 md:h-5 bg-orange-400/20 rounded-full flex items-center justify-center border border-orange-400/40"
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    >
                      <svg className="w-1.5 h-1.5 md:w-2 md:h-2 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="2" />
                      </svg>
                    </motion.div>
                    
                    {/* Automation particles */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-emerald-400/80 rounded-full"
                        style={{
                          top: `${25 + (i % 2) * 50}%`,
                          left: `${25 + (i % 2) * 50}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                      />
                    ))}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 text-center">Automated Growth</h3>
                  <p className="text-white/70 text-center leading-relaxed text-sm md:text-base">Systems that work while you focus on coaching</p>
                </div>
              </motion.div>
            </motion.div>

            {/* World-Class Audit CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16 px-4"
            >
              {/* Email Audit Button */}
              <motion.button
                onClick={() => {
                  if (!isClient || typeof window === 'undefined') return; // SSR safety check
                  
                  try {
                    const emailBody = `Hi TheWebTailors Team,

I'd like to request a FREE website audit for my coaching business. Here are my details:

Name: [Your Name]
Business Name: [Your Business Name]
Current Website: [Your Website URL]
Phone: [Your Phone Number]
Best time to call: [Your Availability]

Looking forward to hearing from you!

Best regards,
[Your Name]`;
                    window.location.href = `mailto:info@thewebtailors.com?subject=FREE Website Audit Request&body=${encodeURIComponent(emailBody)}`;
                  } catch (error) {
                    console.error('Error opening email client:', error);
                  }
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 rounded-2xl text-white font-semibold text-sm md:text-base shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:shadow-2xl transition-all duration-500 border border-white/20 backdrop-blur-xl"
              >
                {/* Sophisticated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/50 via-purple-700/50 to-rose-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Apple-style glass morphism */}
                <div className="absolute inset-0 bg-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xl"></div>
                
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative flex items-center justify-center gap-2 md:gap-3">
                  {/* Enhanced email icon with subtle animation */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  
                  <span className="font-medium tracking-wide">Get FREE Audit via Email</span>
                  
                  {/* Sophisticated arrow animation */}
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatDelay: 2,
                      ease: [0.4, 0, 0.2, 1] // Apple's easing curve
                    }}
                    className="ml-1"
                  >
                    <svg className="w-4 h-4 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </span>
              </motion.button>

              {/* WhatsApp Audit Button */}
              <motion.button
                onClick={() => {
                  if (!isClient || typeof window === 'undefined') return; // SSR safety check
                  
                  try {
                    const message = encodeURIComponent("Hi! I'd like to get a FREE website audit for my coaching business. Can we chat?");
                    const whatsappUrl = `https://wa.me/447591092103?text=${message}`;
                    window.open(whatsappUrl, '_blank');
                  } catch (error) {
                    console.error('Error opening WhatsApp:', error);
                    // Fallback: try direct navigation
                    window.location.href = `https://wa.me/447591092103`;
                  }
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-purple-600 via-rose-600 to-indigo-600 hover:from-purple-700 hover:via-rose-700 hover:to-indigo-700 rounded-2xl text-white font-semibold text-sm md:text-base shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:shadow-2xl transition-all duration-500 border border-white/20 backdrop-blur-xl"
              >
                {/* Sophisticated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700/50 via-rose-700/50 to-indigo-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Apple-style glass morphism */}
                <div className="absolute inset-0 bg-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xl"></div>
                
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative flex items-center justify-center gap-2 md:gap-3">
                  {/* Enhanced WhatsApp icon with subtle animation */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="relative"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                    </svg>
                    
                    {/* Subtle pulse effect for WhatsApp */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-white/20"
                    />
                  </motion.div>
                  
                  <span className="font-medium tracking-wide">Get FREE Audit via WhatsApp</span>
                  
                  {/* Sophisticated chat bubble animation */}
                  <motion.div
                    animate={{ 
                      y: [0, -2, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      repeatDelay: 1.5,
                      ease: [0.4, 0, 0.2, 1] // Apple's easing curve
                    }}
                    className="ml-1"
                  >
                    <svg className="w-4 h-4 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>



          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#181622]/80 pointer-events-none z-0" />
      </div>

      {/* Apple-Style Floating Mobile CTA */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              mass: 0.8
            }}
            className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
          >
            <motion.button
              onClick={handleGetAudit}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl shadow-black/20 text-white font-semibold text-base"
              style={{
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.9) 50%, rgba(236, 72, 153, 0.9) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)"
              }}
            >
              <div className="flex items-center justify-center gap-3">
                <Calendar className="w-5 h-5" />
                <span>Get Your Free Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
