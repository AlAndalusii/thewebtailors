"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { Palette, ArrowRight, BarChart, Compass, Code, Zap } from "lucide-react"
import Image from "next/image"

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
      className="relative p-6 rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-black/10 transition-all duration-500 border border-white/10 flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm transition-opacity duration-500 group-hover:bg-white/[0.05]" />
      
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-rose-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
        <p className="text-white/60 text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
                Results-Driven Approach
              </span>
            </h3>
            <p className="text-white/70 max-w-3xl mx-auto text-lg">
              We measure success not just in design aesthetics, but in tangible business outcomes.
              Every decision is made with your goals in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
          >
            Schedule a Consultation 
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
