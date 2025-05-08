"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export default function CTASection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    availability: "",
    message: ""
  })
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus("idle")

    try {
      // Send form data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        // Show success message
        setFormStatus("success")
        toast.success("Message sent successfully! We'll be in touch soon.")
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          budget: "",
          availability: "",
          message: ""
        })
      } else {
        // Show error message
        setFormStatus("error")
        toast.error("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus("error")
      toast.error("Connection error. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative snap-section bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] to-rose-500/[0.05]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24 min-h-screen max-h-screen flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Get Your Website
            </span>
            <span
              className={cn(
                " ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300",
                pacifico.className,
              )}
            >
              Tailored Today
            </span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Ready to transform your online presence? Let's start crafting your perfect website.
          </p>
        </motion.div>

        <div className="scrollable-content flex-1 overflow-y-auto pr-0 sm:pr-2">
          <div className="max-w-2xl mx-auto px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative p-4 sm:p-8 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl" />
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="name" className="text-white/80 text-xs sm:text-sm">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="email" className="text-white/80 text-xs sm:text-sm">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="phone" className="text-white/80 text-xs sm:text-sm">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="budget" className="text-white/80 text-xs sm:text-sm">
                      Estimated Budget
                    </label>
                    <Input
                      id="budget"
                      placeholder="Your estimated budget"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm"
                      value={formData.budget}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label htmlFor="availability" className="text-white/80 text-xs sm:text-sm">
                    Preferred Availability
                  </label>
                  <Input
                    id="availability"
                    placeholder="e.g., Weekdays after 3 PM, Monday mornings, etc."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm"
                    value={formData.availability}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label htmlFor="message" className="text-white/80 text-xs sm:text-sm">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[100px] sm:min-h-[120px] text-sm"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="text-center pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 w-full text-sm sm:text-base",
                      formStatus === "success" && "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
                      formStatus === "error" && "from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        Sending...
                      </span>
                    ) : formStatus === "success" ? (
                      "Message Sent!"
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                  <p className="mt-4 text-white/50 text-sm">
                    We aim to respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
