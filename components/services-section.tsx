"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { Palette, ArrowRight, BarChart, Compass, Code, Zap, Bot, MessageCircle, LineChart, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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
          <div className="h-full w-[200%] absolute -left-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </div>
      </div>
      
      {/* Card content background */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-colors duration-300 rounded-xl z-0" />
      
      {/* Card content */}
      <div className="relative z-20 p-7 flex flex-col h-full">
        {/* Animated icon container */}
        <div className="relative mb-5 w-14 h-14">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-rose-500/30 rounded-xl opacity-70 group-hover:opacity-100 blur-md group-hover:blur-lg transition-all duration-300 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-rose-500/30 rounded-xl transform group-hover:scale-110 transition-transform duration-300" />
          <div className="relative h-full w-full rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="w-7 h-7 text-white transform group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
        
        {/* Text content */}
        <div>
          <h4 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 group-hover:from-indigo-200 group-hover:to-white transition-colors duration-300">{title}</h4>
          <p className="text-white/70 text-sm leading-relaxed">{description}</p>
        </div>
        
        {/* Animated underline */}
        <div className="mt-auto pt-5">
          <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500/60 to-rose-500/60 transition-all duration-300 rounded-full" />
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  const openCalendly = () => {
    setIsCalendlyOpen(true)
  }

  return (
    <section id="services" className="relative py-24 bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-rose-500/[0.03]" />
      
      {/* Background elements */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-rose-500/5 rounded-full filter blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
            We turn outdated websites into experiences your audience will love—and that actually get you results. Design that works, plain and simple.
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
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/New.jpg"
                    alt="Website Redesign"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 inline-block mb-3">
                      <span className="text-xs font-medium text-white/90">Premium Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
                Website Redesign
              </h3>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Your outdated site deserves better. We'll create a fresh design that wows your visitors and actually grows your business. Beautiful meets functional.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500/30 to-rose-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Modern, responsive design</h4>
                    <p className="text-white/60 text-sm">Perfectly adapts to all devices, from mobile phones to large desktop screens</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500/30 to-rose-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Enhanced user experience</h4>
                    <p className="text-white/60 text-sm">Strategic layout and intuitive navigation that guide visitors toward conversion</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500/30 to-rose-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Brand-aligned design</h4>
                    <p className="text-white/60 text-sm">Visual storytelling that reinforces your brand identity and messaging</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
              >
                Start Your Redesign 
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* AI Chatbot Feature */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                AI-Powered Chatbots
              </h3>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Transform your website with cutting-edge AI chatbots that engage visitors 24/7, answer questions instantly, and convert prospects into customers even while you sleep.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">GPT-powered intelligence</h4>
                    <p className="text-white/60 text-sm">Leverage cutting-edge AI for natural, human-like conversations that understand context</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Custom-tailored for your business</h4>
                    <p className="text-white/60 text-sm">Trained on your products, services, and brand voice to perfectly represent your company</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Conversion-focused interactions</h4>
                    <p className="text-white/60 text-sm">Strategic conversation paths designed to qualify leads and guide users toward booking or purchase</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="/chatbots" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
              >
                Explore Chatbot Solutions
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-64 h-64 bg-indigo-500/30 rounded-full filter blur-[80px] opacity-30 z-0"></div>
                
                {/* Dashboard Preview */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 w-full max-w-md mx-auto"
                >
                  <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-indigo-500/10">
                    <Image
                      src="/hotel-bot-dashboard.svg"
                      alt="Hotel Booking Chatbot Dashboard"
                      width={800}
                      height={500}
                      className="w-full"
                    />
                  </div>
                </motion.div>
                
                {/* Conversation Preview */}
                <motion.div
                  initial={{ opacity: 1, x: 0, y: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -bottom-8 -right-8 z-20 w-48 lg:w-60"
                >
                  <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-purple-500/10">
                    <Image
                      src="/hotel-chatbot-conversation.svg"
                      alt="Hotel Booking Chatbot Conversation"
                      width={360}
                      height={500}
                      className="w-full"
                    />
                  </div>
                  
                  {/* Animated particles */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.5, 0.2]
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
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.6, 0.2]
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
                A structured, transparent approach to transforming your digital presence
                with strategic planning and expert execution.
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
              title="Discovery & Strategy" 
              description="We begin by understanding your business goals, target audience, and current challenges. This research informs a comprehensive strategy that aligns your website with your business objectives and user needs."
              delay={0.2}
              icon={Compass}
            />
            
            <ProcessStep 
              number="2" 
              title="Design & Prototyping" 
              description="Our designers create wireframes and visual designs that bring your brand to life. We focus on both aesthetics and functionality, ensuring an intuitive user experience that encourages engagement and conversion."
              delay={0.4}
              icon={Palette}
            />
            
            <ProcessStep 
              number="3" 
              title="Development & Testing" 
              description="Our development team builds your website with clean, efficient code following modern best practices. We rigorously test across all devices and browsers to ensure flawless performance and compatibility."
              delay={0.6}
              icon={Code}
            />
            
            <ProcessStep 
              number="4" 
              title="Launch & Optimization" 
              description="After launch, we don't just walk away. We monitor performance metrics, gather user feedback, and make data-driven improvements to continuously enhance your website's effectiveness and ROI."
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
          className="mb-20 relative"
        >
          {/* Background elements */}
          <div className="absolute -top-10 left-1/4 w-72 h-72 bg-indigo-500/5 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-rose-500/5 rounded-full filter blur-3xl" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300 relative z-10">
                  Results-Driven Approach
                </span>
                <div className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500/70 to-rose-500/70 rounded-full"></div>
              </h3>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed"
            >
              We measure success not just in design aesthetics, but in tangible business outcomes.
              Every decision is made with your goals in mind.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            <ResultCard
              icon={Zap}
              title="Increased Conversion Rates"
              description="Strategic design and user experience improvements that turn more visitors into customers and generate measurable ROI."
              delay={0.2}
            />
            
            <ResultCard
              icon={BarChart}
              title="Enhanced Performance Metrics"
              description="Faster loading times, improved engagement, and higher search rankings that drive more quality traffic to your website."
              delay={0.4}
            />
            
            <ResultCard
              icon={Compass}
              title="Strategic Brand Positioning"
              description="Thoughtful design that communicates your unique value proposition and establishes credibility in your market."
              delay={0.6}
            />
            
            <ResultCard
              icon={Bot}
              title="AI-Powered Assistance"
              description="Smart chatbots that handle inquiries 24/7, qualify leads, and guide users through personalized customer journeys."
              delay={0.2}
            />
            
            <ResultCard
              icon={MessageCircle}
              title="Enhanced Customer Experience"
              description="Instant responses and personalized interactions that boost customer satisfaction and build lasting relationships."
              delay={0.4}
            />
            
            <ResultCard
              icon={LineChart}
              title="Measurable Business Impact"
              description="Data-driven decisions with analytics dashboards that track ROI and optimize your marketing investment."
              delay={0.6}
            />
          </div>
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
          <button 
            onClick={openCalendly}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
          >
            Schedule a Consultation 
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Calendly Modal */}
      <Dialog open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 bg-transparent border-none">
          <div className="relative w-full">
            <button
              onClick={() => setIsCalendlyOpen(false)}
              className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="calendly-inline-widget" data-url="https://calendly.com/zak-thewebtailors?primary_color=c084fc" style={{ minWidth: 320, height: 700 }}></div>
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
