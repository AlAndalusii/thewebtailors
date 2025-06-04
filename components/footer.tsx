import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative py-16 bg-gradient-to-b from-[#030303] to-[#050505] overflow-hidden border-t border-white/5">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-rose-500/[0.02]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full filter blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <Logo className="mb-6" />
            <p className="text-white/60 max-w-md leading-relaxed">
              Premium web design exclusively for UK locksmiths — transforming outdated sites into emergency call-generating platforms that build trust.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/60">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-sm">MLA Certified</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-4 h-4 text-rose-400" />
                <span className="text-sm">24/7 Emergency</span>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-white font-semibold mb-6 text-lg">Our Services</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 text-indigo-400" />
                <span>Emergency Call Websites</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 text-indigo-400" />
                <span>Local SEO for Locksmiths</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 text-indigo-400" />
                <span>24/7 Lead Capture</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 text-indigo-400" />
                <span>Trust Building Design</span>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-6 text-lg">Get in Touch</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-indigo-400 mt-1" />
                <div>
                  <p className="text-white/60 text-sm">Emergency Support</p>
                  <a href="tel:+447591092103" className="text-white hover:text-indigo-400 transition-colors">+44 7591 092 103</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-400 mt-1" />
                <div>
                  <p className="text-white/60 text-sm">Head Office</p>
                  <p className="text-white">London, United Kingdom</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">Free Website Audit</h4>
                <form className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                  <Button 
                    type="submit"
                    className="w-full gap-2 bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 transition-all duration-300 py-3"
                  >
                    Get Free Audit
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} TheWebTailors. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy" className="text-white/40 hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-white/40 hover:text-white/60 transition-colors">Terms of Service</a>
              <a href="/accessibility" className="text-white/40 hover:text-white/60 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
