"use client"

import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import GallerySection from "@/components/gallery-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

export default function Home() {
  return (
    <main className="bg-[#030303]">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
