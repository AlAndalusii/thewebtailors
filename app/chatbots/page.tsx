"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import CalendlyModal from "@/components/calendly-modal"

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

export default function ChatbotsPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  
  const handleBookDemo = () => {
    const emailBody = `Hello TheWebTailors Team,

I'm interested in enhancing my therapy practice with a premium website. Here are my details:

Name: [Your Full Name]
Practice Name: [Your Practice Name]
Phone Number: [Your Contact Number]
Preferred Contact Time: [Best days/times to chat]
Current Website: [Yes/No, if yes please provide URL]
Practice Type: [Private Practice/Group Practice/Other]
Specialties: [Your Therapy Specialties]
Target Clients: [Your Ideal Client Demographics]

I'm particularly interested in:
- Modern, professional design
- HIPAA-compliant features
- Client portal integration
- Online booking system
- Therapy-specific AI chatbot

Please contact me to discuss how we can transform my online presence.

Best regards,
[Your Name]`;

    window.location.href = `mailto:info@thewebtailors.com?subject=Therapy Practice Website Redesign&body=${encodeURIComponent(emailBody)}`;
  }
  
  return (
    <main className="bg-[#030303] text-white overflow-hidden">
      <Navigation />
      
      {/* Calendly Modal */}
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center pt-32 pb-20">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-500 rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-sky-500 rounded-full mix-blend-screen filter blur-[90px] opacity-10 animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
            <motion.div 
              className="lg:w-1/2"
              initial="visible"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  AI Assistant for Therapists
                </span>
                <br /> 
                <span>Simplify Your Practice</span>
              </h1>
              <motion.p 
                className="mt-6 text-xl text-gray-300 leading-relaxed max-w-xl"
                variants={fadeIn}
                initial="visible"
                animate="visible"
              >
                Let AI handle client inquiries, schedule appointments, and answer common questions 24/7. Focus on what matters most - your clients.
              </motion.p>
              
              <motion.div 
                className="mt-10 space-x-4 flex items-center"
                variants={fadeIn}
                initial="visible"
                animate="visible"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
              >
                <Button 
                    className="px-8 py-6 text-lg font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:via-purple-500 hover:to-rose-500 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                  onClick={() => setIsCalendlyOpen(true)}
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
                <a href="#how-it-works" className="text-lg font-medium text-gray-300 hover:text-white transition-colors flex items-center group">
                  Learn how it works
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              initial="visible"
              animate="visible"
              variants={fadeIn}
            >
              <div className="w-full aspect-square relative">
                {/* Chatbot interface mockup */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl">
                  <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-16">
                    <div className="flex flex-col space-y-4">
                      <div className="self-end max-w-[70%] bg-indigo-600 rounded-2xl rounded-br-none p-4">
                        <p>What are your current availability and rates?</p>
                      </div>
                      
                      <div className="self-start max-w-[70%] bg-gray-800 rounded-2xl rounded-bl-none p-4">
                        <p className="text-gray-200">I have weekday slots available between 9 AM - 7 PM. Individual sessions are $120/hour, and I offer a free 15-minute consultation. Would you like to schedule a time?</p>
                      </div>
                      
                      <div className="self-end max-w-[70%] bg-indigo-600 rounded-2xl rounded-br-none p-4">
                        <p>Yes, I'd like to book a consultation.</p>
                      </div>
                      
                      <div className="self-start max-w-[70%] bg-gray-800 rounded-2xl rounded-bl-none p-4">
                        <p className="text-gray-200">I'll show you my available slots for next week. Just pick a time that works for you, and I'll send a confirmation email right away.</p>
                      </div>
                      
                      <div className="mt-4 flex">
                        <div className="flex-1">
                          <motion.div 
                            className="h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full relative"
                            variants={shimmer}
                            animate="visible"
                            initial="hidden"
                            style={{ backgroundSize: "200% 100%" }}
                          >
                            <div className="absolute inset-0 flex items-center px-4 text-white">
                              Type your message...
                            </div>
                          </motion.div>
                        </div>
                        <button className="ml-2 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="absolute bottom-6 right-6 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-1"
                      animate={{ 
                        rotate: 360,
                        boxShadow: ["0 0 15px rgba(129, 140, 248, 0.5)", "0 0 25px rgba(129, 140, 248, 0.5)", "0 0 15px rgba(129, 140, 248, 0.5)"]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-2xl font-bold">AI</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="visible"
            animate="visible"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Practice</span> Management Made Easy
            </h2>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Streamline your therapy practice with AI that handles the details while you focus on client care
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="visible"
            animate="visible"
          >
            {[
              {
                title: "Smart Scheduling",
                description: "Automatically manage appointments, send reminders, and handle rescheduling requests.",
                gradient: "from-blue-600 to-indigo-600",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Client Screening",
                description: "Gather essential information and conduct initial assessments before the first session.",
                gradient: "from-purple-600 to-pink-600",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                title: "Instant Support",
                description: "Answer common questions about services, insurance, and policies 24/7.",
                gradient: "from-cyan-600 to-blue-600",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                ),
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 relative group"
                variants={fadeIn}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                
                <div className="absolute -top-5 -left-5 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                
                <div className="pt-8 relative z-10">
                  <h3 className="text-2xl font-bold mt-4">{step.title}</h3>
                  <p className="mt-3 text-gray-300 leading-relaxed">{step.description}</p>
                  
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Compassionate</span> Support
            </h2>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Streamline your practice with AI solutions designed specifically for mental health professionals
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
                title: "Client Intake",
                description: "Automate initial consultations, gather essential mental health information, and schedule follow-up sessions with care and confidentiality.",
                gradient: "from-blue-600 to-indigo-600",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                ),
              },
              {
                title: "Appointment Reminders",
                description: "Proactively notify clients of upcoming sessions with gentle, supportive communication.",
                gradient: "from-purple-600 to-pink-600",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Secure Documentation",
                description: "Safely collect and organize client information through HIPAA-compliant conversational workflows.",
                gradient: "from-cyan-600 to-blue-600",
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="visible"
            animate="visible"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Cutting-Edge <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Features</span>
            </h2>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced capabilities that set our chatbots apart
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="visible"
            animate="visible"
          >
            {[
              {
                title: "GPT-4 Powered",
                description: "Leverage cutting-edge language AI for natural, human-like conversations.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: "Lead Capture",
                description: "Automatically collect visitor information and integrate with your CRM.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "24/7 Availability",
                description: "Provide instant responses to customer inquiries around the clock.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Custom Training",
                description: "Teach your chatbot about your specific products, services, and brand voice.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
              },
              {
                title: "Analytics Dashboard",
                description: "Gain insights into customer questions, pain points, and conversion rates.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                title: "Seamless Integration",
                description: "Easily embed on your website with no coding required from your team.",
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
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg rounded-3xl p-12 border border-white/10 shadow-2xl"
            initial="visible"
            animate="visible"
            variants={fadeIn}
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Transform</span> Your Practice?
              </h2>
              <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
                Book a demo today and see how our AI assistant can help you manage your therapy practice more efficiently.
              </p>
              
              <motion.div 
                className="mt-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  className="px-8 py-6 text-lg font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:via-purple-500 hover:to-rose-500 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                  onClick={() => setIsCalendlyOpen(true)}
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
  )
} 