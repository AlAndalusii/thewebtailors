"use client"

import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import GallerySection from "@/components/gallery-section"
import FAQSection from "@/components/faq-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import CallPopup from "@/components/call-popup"

export default function Home() {
  return (
    <main className="bg-[#030303]">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <FAQSection />
      <CTASection />
      <Footer />
      <CallPopup />
    </main>
  )
}
