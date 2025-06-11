"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Pacifico, Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Phone, Mail, Clock } from "lucide-react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const contactRef = useRef<HTMLDivElement>(null)
  
  const [formData, setFormData] = useState({
    phone: "",
    budget: "",
    availability: "",
    message: ""
  })

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!contactRef.current) return
      
      const rect = contactRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate an API call (replace with actual implementation)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Show success message
      toast.success("Message sent successfully! We'll be in touch soon.")
      
      // Reset form
      setFormData({
        phone: "",
        budget: "",
        availability: "",
        message: ""
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Connection error. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      id="contact" 
      ref={contactRef}
      className="relative w-full py-24 overflow-hidden bg-[#030303]"
    >
      {/* Dynamic background gradient that follows mouse */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 blur-3xl"
        style={{
          backgroundPosition: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
          transition: 'background-position 0.5s ease-out'
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.1, 0.3, 0.1], scale: 1, rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-[15%] w-64 h-64 rounded-full border border-indigo-500/10 blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.05, 0.2, 0.05], scale: 1, rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 left-[10%] w-96 h-96 rounded-full border border-purple-500/10 blur-sm"
        />
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Ready to Get
            </span>{" "}
            <span className={cn(
              "bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-rose-400",
              pacifico.className
            )}>
              Fully Booked?
            </span>
          </h2>
          <p className={cn(
            "text-lg text-white/70 max-w-2xl mx-auto",
            poppins.className
          )}>
            Let's have a quick chat about turning your website into a client magnet. No pressure, just real talk about getting you more bookings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact form - 3 columns wide */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative p-1 rounded-3xl overflow-hidden">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-rose-600/20 rounded-3xl blur-sm"></div>
              
              <div className="relative bg-[#0A0A0A]/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/5">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-white/80 text-sm">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        placeholder="Your phone number"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-[52px] text-base rounded-xl"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-white/80 text-sm">
                        Estimated Budget
                      </label>
                      <Input
                        id="budget"
                        placeholder="Your estimated budget"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-[52px] text-base rounded-xl"
                        value={formData.budget}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="availability" className="text-white/80 text-sm">
                      Preferred Availability
                    </label>
                    <Input
                      id="availability"
                      placeholder="e.g., Weekdays after 3 PM, Monday mornings, etc."
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-[52px] text-base rounded-xl"
                      value={formData.availability}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-white/80 text-sm">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[120px] text-base rounded-xl resize-none"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 text-base bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-700 hover:via-purple-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-indigo-900/20 rounded-xl"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending Message
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send Message
                        </span>
                      )}
                    </Button>
                  </motion.div>
                  
                  <p className="text-white/50 text-sm text-center mt-4">
                    We aim to respond to all inquiries within 24-48 hours during business days.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
          
          {/* Contact info and features - 2 columns wide */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              {/* Contact methods */}
              <div className="bg-[#0A0A0A] backdrop-blur-sm p-6 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <Mail className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm">Email</h4>
                      <p className="text-white/60 text-sm mt-1">info@thewebtailors.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <Phone className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm">Phone</h4>
                      <p className="text-white/60 text-sm mt-1">
                        <a 
                          href="tel:+447591092103" 
                          className="hover:text-indigo-400 transition-colors duration-300"
                        >
                          +44 7591 092103
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm">Client Support Available 24/7</h4>
                      <p className="text-white/60 text-sm">We're here to help anytime</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Premium features */}
              <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm p-6 rounded-3xl border border-indigo-500/10">
                <h3 className="text-xl font-bold text-white mb-6">Premium Rated Service</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm">Priority Response</h4>
                      <p className="text-white/60 text-xs mt-1">30-minute emergency response time</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm">Expert Support</h4>
                      <p className="text-white/60 text-xs mt-1">Master certified tradespeople</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm">Satisfaction Guarantee</h4>
                      <p className="text-white/60 text-xs mt-1">We're not happy until you're thrilled with the result</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-white/70 text-sm">5-Star Rated Service</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 