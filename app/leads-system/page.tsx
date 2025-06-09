"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Head from 'next/head'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const shimmer = {
  hidden: { backgroundPosition: "200% 0" },
  visible: { 
    backgroundPosition: "0% 0",
    transition: { 
      repeat: Infinity,
      repeatType: "mirror" as const,
      duration: 3
    }
  }
}

export default function LeadsSystemPage() {
  const handleBookDemo = () => {
    const emailBody = `Hi TheWebTailors Team,

I'm interested in the Leads System for my trade business. Here are my details:

Name: [Your Name]
Business Name: [Your Business Name]
Phone: [Your Phone Number]
Best time to call: [Your Availability]

Looking forward to hearing from you!

Best regards,
[Your Name]`;

    window.location.href = `mailto:info@thewebtailors.com?subject=Leads System Demo Request&body=${encodeURIComponent(emailBody)}`;
  }
  
  // Animated chat messages for the mockup
  const chatMessages = [
    { sender: "user", text: "Looking for someone to install a new driveway" },
    { sender: "bot", text: "I can connect you with local specialists! What's your name and postcode?" },
    { sender: "user", text: "Sarah Johnson, B15 3HY" },
    { sender: "bot", text: "Thanks Sarah! What type of driveway? Block paving, tarmac, or something else?" },
    { sender: "user", text: "Block paving, about 30m2. When could you start?" },
    { sender: "bot", text: "Perfect! I've sent your details to 3 local installers. Expect calls within the hour!" },
  ];

  const [displayedMessages, setDisplayedMessages] = useState<{ sender: string; text: string }[]>([]);
  const [typingIndex, setTypingIndex] = useState(0);
  const [showTypingDots, setShowTypingDots] = useState(false);
  const [showBulletPoints, setShowBulletPoints] = useState(false);
  const [currentBulletIndex, setCurrentBulletIndex] = useState(0);

  const bulletPoints = [
    "Capture every trade enquiry—instant replies keep leads warm!",
    "Boost local visibility—dominate quotes in your area!",
    "Streamline job booking—get to customers faster than competitors!"
  ];

  useEffect(() => {
    if (typingIndex < chatMessages.length) {
      setShowTypingDots(true);
      // Simulate a delay before the next message appears
      const typingDelay = setTimeout(() => {
        setShowTypingDots(false);
        setDisplayedMessages((prev) => [...prev, chatMessages[typingIndex]]);
        setTypingIndex((prev) => prev + 1);
      }, 1200 + Math.random() * 600); // Delay before message appears
      return () => clearTimeout(typingDelay);
    }
  }, [typingIndex]);

  useEffect(() => {
    // Show bullet points after a short delay
    const timer = setTimeout(() => {
      setShowBulletPoints(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showBulletPoints && currentBulletIndex < bulletPoints.length) {
      const timer = setTimeout(() => {
        setCurrentBulletIndex(prev => prev + 1);
      }, 1000); // Delay between each bullet point
      return () => clearTimeout(timer);
    }
  }, [showBulletPoints, currentBulletIndex]);

  return (
    <>
      <Head>
        <title>Leads System for UK Trades | 24/7 Job Enquiry Response & Booking | TheWebTailors</title>
        <meta 
          name="description" 
          content="Transform your trade business with our Leads System. Handle job enquiries, schedule site visits & provide instant quotes 24/7. Perfect for roofers, driveway installers & loft specialists. Book a free demo today."
        />
        <meta name="keywords" content="trade leads system, AI assistant for trades, 24/7 job enquiry response, trade booking system, roofer leads, driveway installer leads, loft conversion leads, UK trade business automation" />
      </Head>
      <main className="bg-[#030303] text-white overflow-hidden">
        <Navigation />
        
        {/* Hero Section */}
        <section className="min-h-[700px] relative flex items-center pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-[#0a0a13] via-[#18182a] to-[#0a0a13]">
          {/* Background Elements - Premium effect */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/30 via-purple-700/20 to-pink-400/10 rounded-full filter blur-[160px] opacity-40 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-400/10 via-pink-400/10 to-indigo-400/10 rounded-full filter blur-[120px] opacity-30 animate-pulse" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[600px]">
              {/* Left: Headline & CTA */}
              <div className="flex flex-col justify-start h-full pt-24">
                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-4 text-left">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e0d7f7] via-[#b6c7ff] to-[#ffe9b6] animate-gradient-x">
                      Lead Capture System for UK Trades
                    </span>
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl font-bold text-left">
                    Reply within 15 minutes. Never miss a job enquiry. Our system turns trade leads into booked jobs—guaranteed results.
                  </p>
                  
                  {/* Animated Bullet Points */}
                  <div className="mt-8 space-y-4">
                    <AnimatePresence>
                      {bulletPoints.map((bullet, index) => (
                        index <= currentBulletIndex && (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex items-start gap-4"
                          >
                            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-2 flex-shrink-0"></div>
                            <p className="text-lg text-gray-300 font-bold">
                              {bullet}
                            </p>
                          </motion.div>
                        )
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
                {/* CTA Buttons */}
                <div className="flex flex-row gap-6 items-center mt-16 lg:mt-20 pb-4 lg:pb-6">
                  <Button 
                    className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-[#f7e9c6] via-[#e0b7ff] to-[#a3b8ff] text-gray-900 shadow-lg border border-amber-200/60 hover:from-[#ffe9b6] hover:to-[#b6c7ff] transition-all duration-300 focus:ring-4 focus:ring-amber-200/30 focus:outline-none"
                    style={{ boxShadow: '0 4px 32px 0 rgba(247, 233, 198, 0.10), 0 1.5px 8px 0 rgba(99, 102, 241, 0.10)' }}
                    onClick={handleBookDemo}
                  >
                    <span>Book a Demo</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                  <a 
                    href="#how-it-works" 
                    className="text-lg font-medium text-white hover:text-amber-300 transition-colors underline underline-offset-4 decoration-amber-200/60"
                  >
                    Learn how it works
                  </a>
                </div>
              </div>
              {/* Right: AI Mockup */}
              <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-lg mx-auto relative flex flex-col justify-center" style={{ minHeight: 550, maxHeight: 700 }}>
                  {/* Glassmorphism AI mockup */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 via-indigo-900/30 to-black/40 backdrop-blur-2xl shadow-2xl min-h-[550px] max-h-[700px] flex flex-col" style={{ boxShadow: '0 8px 40px 0 rgba(99,102,241,0.18), 0 2px 8px 0 rgba(0,0,0,0.10)' }}>
                    <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="p-6 pt-16 flex-1 overflow-y-auto">
                      <div className="space-y-4 mb-20">
                        {displayedMessages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}>
                            <div className={`${msg.sender === "user" ? "bg-slate-700/60" : "bg-indigo-600/40"} rounded-lg p-2 max-w-[80%]`}>
                              <p className="text-white text-sm">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                        {(showTypingDots) && (
                          <div className={`flex ${chatMessages[typingIndex]?.sender === "user" ? "justify-start" : "justify-end"}`}>
                            <div className={`${chatMessages[typingIndex]?.sender === "user" ? "bg-slate-700/60" : "bg-indigo-600/40"} rounded-lg p-2 max-w-[80%]`}>
                              <p className="text-white text-sm">
                                <span className="inline-flex gap-1">
                                  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                </span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Message bar */}
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <div className="flex-1 relative">
                          <input 
                            type="text" 
                            placeholder="Type your message..." 
                            className="w-full bg-slate-800/80 border border-slate-700/50 rounded-full px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50"
                            disabled
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition-colors" disabled>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section - Optimized for mobile */}
        <section id="how-it-works" className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              className="text-center mb-12 md:mb-16"
              initial="visible"
              animate="visible"
              variants={fadeIn}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Business</span> Management Made Easy
              </h2>
              <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                Follow up with leads fast so you don't lose jobs
              </p>
              <p className="mt-2 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                Our system replies within 15 mins to help turn leads into paying customers.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
              variants={staggerContainer}
              initial="visible"
              animate="visible"
            >
              {[
                {
                  title: "Fast Replies",
                  description: "Send quick follow-ups so leads stay warm and don't go cold.",
                  gradient: "from-blue-600 to-indigo-600",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: "Quote Follow-Ups",
                  description: "Gather info and remind clients to approve your quote.",
                  gradient: "from-purple-600 to-pink-600",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                },
                {
                  title: "24/7 Support",
                  description: "Answer questions anytime—even when you're busy.",
                  gradient: "from-pink-600 to-rose-600",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 relative group"
                  variants={fadeIn}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                  
                  <div className="absolute -top-5 -left-5 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="pt-6 md:pt-8 relative z-10">
                    <h3 className="text-xl md:text-2xl font-bold mt-4">{step.title}</h3>
                    <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed">{step.description}</p>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-4xl font-bold text-gray-700/50">0{index + 1}</span>
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial="visible"
              animate="visible"
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Professional</span> Follow-Up
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                Win more work with fast replies made for UK trades
              </p>
              <p className="mt-2 text-xl text-gray-300 max-w-2xl mx-auto">
                Our system follows up within 15 mins to keep customers interested.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="visible"
              animate="visible"
            >
              {[
                {
                  title: "Job Intake",
                  description: "Reply fast, get job details, and book site visits with ease.",
                  gradient: "from-blue-600 to-indigo-600",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  ),
                },
                {
                  title: "Job Reminders",
                  description: "Send clear messages so clients don't miss their bookings.",
                  gradient: "from-purple-600 to-pink-600",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: "Info Collection",
                  description: "Securely gather and save details from every lead.",
                  gradient: "from-pink-600 to-rose-600",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                }
              ].map((useCase, index) => (
                <motion.div 
                  key={index}
                  className="relative group rounded-2xl overflow-hidden"
                  variants={fadeIn}
                >
                  <div className={`h-full bg-gradient-to-br ${useCase.gradient} opacity-10 absolute inset-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  <div className="border border-white/10 bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300 relative">
                    <motion.div 
                      className="mb-6 text-white/80"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {useCase.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {useCase.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-4xl font-bold text-gray-700/50">0{index + 1}</span>
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Features Section - Optimized for mobile */}
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              className="text-center mb-12 md:mb-16"
              initial="visible"
              animate="visible"
              variants={fadeIn}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Smart Follow-Up <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">System</span>
              </h2>
              <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                Powerful tools that help you convert more job leads
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="visible"
              animate="visible"
            >
              {[
                {
                  title: "15-Min Follow-Up",
                  description: "Contact leads fast before they lose interest or hire someone else.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Lead Capture",
                  description: "Grab customer details and send them to your phone or inbox.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: "24/7 Response",
                  description: "Never miss an enquiry—even when you're busy on the job.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Custom Setup",
                  description: "Tailor follow-up replies to match your services and tone.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  ),
                },
                {
                  title: "Insights Dashboard",
                  description: "See what jobs people ask for and when they drop off.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
                {
                  title: "Easy Integration",
                  description: "Set it up quickly—no tech skills or extra tools needed.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group"
                  variants={fadeIn}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:from-indigo-600 group-hover:to-purple-600 transition-colors duration-300">
                    <div className="text-indigo-400 group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section - Optimized for mobile */}
        <section className="py-16 md:py-20 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg rounded-3xl p-6 md:p-12 border border-white/10 shadow-2xl"
              initial="visible"
              animate="visible"
              variants={fadeIn}
            >
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Transform</span> Your Business?
                </h2>
                <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  Book a demo today and see how our AI assistant can help you manage your trade business more efficiently.
                </p>
                
                <motion.div 
                  className="mt-8 md:mt-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button 
                    className="w-full sm:w-auto px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:via-purple-500 hover:to-rose-500 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                    onClick={handleBookDemo}
                  >
                    <span>Book a Demo</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </main>
    </>
  )
} 