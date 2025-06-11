"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Head from 'next/head'
import { cn } from "@/lib/utils"
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

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

I'm interested in the Follow-Up System for my coaching business. Here are my details:

Name: [Your Name]
Business Name: [Your Business Name]
Phone: [Your Phone Number]
Best time to call: [Your Availability]

Looking forward to hearing from you!

Best regards,
[Your Name]`;

    window.location.href = `mailto:info@thewebtailors.com?subject=Follow-Up System Demo Request&body=${encodeURIComponent(emailBody)}`;
  }

  // Animated follow-up sequence for coaches
  const followUpSequence = [
    { 
      time: "0 min", 
      action: "Lead submits discovery call form", 
      status: "received",
      type: "form"
    },
    { 
      time: "2 min", 
      action: "Automated welcome email sent", 
      status: "sent",
      type: "email"
    },
    { 
      time: "5 min", 
      action: "Calendar link texted to lead", 
      status: "sent",
      type: "sms"
    },
    { 
      time: "24 hrs", 
      action: "Reminder: Book your strategy call", 
      status: "sent",
      type: "email"
    },
    { 
      time: "3 days", 
      action: "Value-packed case study shared", 
      status: "sent",
      type: "email"
    },
    { 
      time: "1 week", 
      action: "Personal video message", 
      status: "sent",
      type: "video"
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [timesSaved, setTimesSaved] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % followUpSequence.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  // Animate time saved counter
  useEffect(() => {
    const timer = setInterval(() => {
      setTimesSaved(prev => {
        if (prev >= 15) return 0;
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Automated Follow-Up Systems for Coaches | Never Lose a Lead Again | TheWebTailors</title>
        <meta 
          name="description" 
          content="Automated follow-up systems for coaches. Turn website visitors into booked clients with smart sequences that work 24/7. Save 15+ hours per week."
        />
        <meta name="keywords" content="coach follow-up automation, coaching lead nurturing, discovery call booking, coach client acquisition, automated email sequences for coaches" />
      </Head>
      
      <main className="bg-[#030303] text-white overflow-hidden">
        <Navigation />
        
        {/* Hero Section - Fortune 500 Design */}
        <section className="min-h-screen relative flex items-center pt-20 bg-gradient-to-br from-[#0a0a13] via-[#18182a] to-[#0a0a13]">
          {/* Premium Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/20 via-purple-700/15 to-rose-400/10 rounded-full filter blur-[200px]"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-400/10 via-pink-400/10 to-indigo-400/15 rounded-full filter blur-[160px]"
              animate={{ 
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
              
              {/* Left: Premium Headline & Value Prop */}
              <div className="flex flex-col justify-center space-y-8">
                
                {/* Trust Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-full shadow-2xl w-fit"
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className={cn("text-white/90 font-medium", poppins.className)}>
                    Save 15+ Hours Per Week
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg 
                        key={i} 
                        className="w-4 h-4 text-amber-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </motion.svg>
                    ))}
                  </div>
                </motion.div>

                {/* Main Headline */}
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]"
                >
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/90">
                    Never Lose a Lead
                  </span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-rose-300 mt-2">
                    Again
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={cn("text-2xl md:text-3xl text-white/70 max-w-2xl font-light leading-relaxed", poppins.className)}
                >
                  Automated follow-up sequences that turn website visitors into booked discovery calls
                </motion.p>

                {/* Time Savings Counter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex items-center gap-6"
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
                      key={timesSaved}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {timesSaved}+
                    </motion.div>
                    <div className="text-white/60 text-sm font-medium">Hours Saved/Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      85%
                    </div>
                    <div className="text-white/60 text-sm font-medium">More Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-400">
                      24/7
                    </div>
                    <div className="text-white/60 text-sm font-medium">Follow-Up</div>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 pt-4"
                >
                  <Button 
                    className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-indigo-500/25 border-0 hover:scale-105 transition-all duration-300"
                    onClick={handleBookDemo}
                  >
                    <span>Get Your System</span>
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </Button>
                  <button className="text-lg font-medium text-white/80 hover:text-white transition-colors underline underline-offset-4 decoration-white/40 hover:decoration-white">
                    See How It Works
                  </button>
                </motion.div>
              </div>

              {/* Right: Premium Animated Follow-Up Mockup */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md mx-auto relative">
                  
                  {/* Main Follow-Up System Mockup */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl shadow-black/20 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-white/60 text-xs font-medium">Follow-Up Sequence</div>
                      </div>
                    </div>

                    {/* Animated Follow-Up Timeline */}
                    <div className="space-y-2.5">
                      {followUpSequence.map((step, index) => (
                        <motion.div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                            index === currentStep 
                              ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30' 
                              : 'bg-white/[0.02] border border-white/5'
                          }`}
                          animate={{
                            scale: index === currentStep ? 1.02 : 1,
                            opacity: index <= currentStep ? 1 : 0.4
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Step Icon */}
                          <motion.div 
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              index === currentStep 
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
                                : 'bg-white/10'
                            }`}
                            animate={{
                              boxShadow: index === currentStep 
                                ? ["0 0 0 0px rgba(99, 102, 241, 0.4)", "0 0 0 8px rgba(99, 102, 241, 0)", "0 0 0 0px rgba(99, 102, 241, 0)"]
                                : "0 0 0 0px rgba(99, 102, 241, 0)"
                            }}
                            transition={{ duration: 2, repeat: index === currentStep ? Infinity : 0 }}
                          >
                            {step.type === 'form' && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            )}
                            {step.type === 'email' && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )}
                            {step.type === 'sms' && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                            )}
                            {step.type === 'video' && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </motion.div>

                          {/* Step Content */}
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-white/60 font-medium">{step.time}</div>
                            <div className="text-sm text-white font-medium truncate">{step.action}</div>
                          </div>

                          {/* Status Indicator */}
                          <motion.div 
                            className={`w-2 h-2 rounded-full ${
                              index <= currentStep ? 'bg-emerald-400' : 'bg-white/20'
                            }`}
                            animate={{
                              scale: index === currentStep ? [1, 1.3, 1] : 1
                            }}
                            transition={{ duration: 1, repeat: index === currentStep ? Infinity : 0 }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-xs text-white/60 mb-2">
                        <span>Progress</span>
                        <span>{Math.round(((currentStep + 1) / followUpSequence.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5">
                        <motion.div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full"
                          animate={{ 
                            width: `${((currentStep + 1) / followUpSequence.length) * 100}%` 
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute -right-6 top-1/4 bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-xl"
                  >
                    <div className="text-center">
                      <motion.div 
                        className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        94%
                      </motion.div>
                      <div className="text-xs text-white/60">Response</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="absolute -left-6 bottom-1/4 bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-xl"
                  >
                    <div className="text-center">
                      <motion.div 
                        className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        2x
                      </motion.div>
                      <div className="text-xs text-white/60">Bookings</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Apple-Style */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Focus on Coaching,
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
                  Not Follow-Ups
                </span>
              </h2>
              <p className={cn("text-xl text-white/70 max-w-2xl mx-auto leading-relaxed", poppins.className)}>
                Your system works 24/7 so you don't have to
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Instant Response",
                  description: "Lead submits form. System responds in under 60 seconds.",
                  icon: "⚡",
                  gradient: "from-yellow-400/20 to-orange-500/20",
                  time: "< 1 min"
                },
                {
                  title: "Smart Nurturing", 
                  description: "Perfect sequence keeps leads warm until they're ready to book.",
                  icon: "🧠",
                  gradient: "from-purple-400/20 to-pink-500/20",
                  time: "7 days"
                },
                {
                  title: "Calendar Booking",
                  description: "Direct calendar links get calls booked without back-and-forth.",
                  icon: "📅",
                  gradient: "from-green-400/20 to-emerald-500/20", 
                  time: "Automatic"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500`} />
                  
                  <motion.div 
                    className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-6">{benefit.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                      <p className="text-white/70 leading-relaxed mb-6">{benefit.description}</p>
                      
                      <motion.div 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full"
                        animate={{ 
                          boxShadow: [
                            "0 0 0 0px rgba(255, 255, 255, 0.1)",
                            "0 0 0 10px rgba(255, 255, 255, 0)",
                            "0 0 0 0px rgba(255, 255, 255, 0)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-sm text-white/80 font-medium">{benefit.time}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Time Savings Showcase */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
                  Reclaim 15+ Hours
                </span>
                <br />
                <span className="text-white/90">Every Single Week</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              
              {/* Before vs After */}
              <div className="space-y-8">
                {/* Before */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-red-400 mb-4">❌ Before Our System</h3>
                  <ul className="space-y-3 text-white/70">
                    <li>• Check email every 30 minutes</li>
                    <li>• Write individual follow-up emails</li>
                    <li>• Send calendar links manually</li>
                    <li>• Chase leads who go quiet</li>
                    <li>• Miss leads after hours</li>
                  </ul>
                  <div className="mt-4 text-red-400 font-bold">= 15+ hours/week wasted</div>
                </motion.div>

                {/* After */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-indigo-400 mb-4">✅ With Our System</h3>
                  <ul className="space-y-3 text-white/70">
                    <li>• Instant automated responses</li>
                    <li>• Smart follow-up sequences</li>
                    <li>• Direct calendar booking</li>
                    <li>• Never miss a lead again</li>
                    <li>• Works 24/7/365</li>
                  </ul>
                  <div className="mt-4 text-indigo-400 font-bold">= Focus on coaching clients</div>
                </motion.div>
              </div>

              {/* Visual Time Savings */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-8">Your Time Back</h3>
                  
                  {/* Clock Visual */}
                  <div className="relative w-48 h-48 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full" />
                    <div className="absolute inset-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <motion.div 
                          className="text-4xl font-bold text-white"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          15+
                        </motion.div>
                        <div className="text-white/80 text-sm">Hours/Week</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-indigo-400">60+ hrs</div>
                      <div className="text-white/60 text-sm">Saved/Month</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">720+ hrs</div>
                      <div className="text-white/60 text-sm">Saved/Year</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  Ready to Never Miss
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Another Lead?
                </span>
              </h2>
              
              <p className={cn("text-xl text-white/70 mb-12 leading-relaxed", poppins.className)}>
                Get your automated follow-up system and start booking more discovery calls this week
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Button 
                  className="px-12 py-6 text-xl font-semibold rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-indigo-500/25 border-0 hover:scale-105 transition-all duration-300"
                  onClick={handleBookDemo}
                >
                  <span>Get Your System Now</span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 ml-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </Button>
                
                <div className="text-center">
                  <div className="text-white/60 text-sm">Setup in 24 hours</div>
                  <div className="text-white/60 text-sm">Start booking more calls immediately</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
} 