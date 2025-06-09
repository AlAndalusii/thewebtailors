import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"

// Lazy load components that are not immediately visible
const ServicesSection = dynamic(() => import("@/components/services-section"), {
  loading: () => <div className="min-h-screen bg-[#030303] animate-pulse" />,
})

const GallerySection = dynamic(() => import("@/components/gallery-section"), {
  loading: () => <div className="min-h-screen bg-[#030303] animate-pulse" />,
})

const FAQSection = dynamic(() => import("@/components/faq-section"), {
  loading: () => <div className="min-h-[50vh] bg-[#030303] animate-pulse" />,
})

const ContactSection = dynamic(() => import("@/components/contact-section"), {
  loading: () => <div className="min-h-[50vh] bg-[#030303] animate-pulse" />,
})

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-20 bg-[#030303] animate-pulse" />,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] relative">
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
