import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Phone, MapPin, Mail, Award, Users, Zap, Building, Wrench, Home } from "lucide-react"

export default function Footer() {
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get('email')
    
    const emailBody = `Hi TheWebTailors Team,

Free website audit request:

Email: ${email}
Trade: [Your Trade Type]
Website: [Current URL or "None"]

Thanks!`

    window.location.href = `mailto:info@thewebtailors.com?subject=Free Website Audit&body=${encodeURIComponent(emailBody)}`
  }

  return (
    <footer className="relative py-20 bg-gradient-to-b from-[#030303] via-[#040408] to-[#060609] overflow-hidden border-t border-white/10">
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-purple-500/[0.02] to-rose-500/[0.03]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/8 rounded-full filter blur-[150px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-rose-500/8 rounded-full filter blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-500/5 rounded-full filter blur-[100px] animate-pulse" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-4">
            <Logo className="mb-6" />
            <p className="text-white/70 max-w-md leading-relaxed text-lg mb-6">
              Professional web design for UK trades. Turn visitors into customers.
            </p>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-white/60">
                <Shield className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-medium">Certified</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">Award-Winning</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">500+ Trades</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">Fast Results</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
              <p className="text-white/90 text-sm italic mb-2">
                "240% more quotes in 3 months!"
              </p>
              <p className="text-white/60 text-xs">— Mike, Birmingham Roofing</p>
            </div>
          </div>

          {/* Services Section - Enhanced */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <Building className="w-5 h-5 text-indigo-400" />
              Services
            </h4>
            <ul className="space-y-3 text-white/60">
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                <span>Website Design</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                <span>Lead Systems</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                <span>Local SEO</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                <span>Mobile Design</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                <span>Quote Forms</span>
              </li>
            </ul>
          </div>

          {/* Trade Specialties */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <Wrench className="w-5 h-5 text-rose-400" />
              Trades
            </h4>
            <ul className="space-y-3 text-white/60">
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Home className="w-4 h-4 text-rose-400" />
                <span>Roofers</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Home className="w-4 h-4 text-rose-400" />
                <span>Driveways</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Home className="w-4 h-4 text-rose-400" />
                <span>Loft Conversion</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Home className="w-4 h-4 text-rose-400" />
                <span>Kitchens</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors group">
                <Home className="w-4 h-4 text-rose-400" />
                <span>Bathrooms</span>
              </li>
            </ul>
          </div>

          {/* Contact Section - Enhanced */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold mb-6 text-lg">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-indigo-400 mt-1" />
                <div>
                  <p className="text-white/60 text-sm">Call</p>
                  <a href="tel:+447591092103" className="text-white hover:text-indigo-400 transition-colors font-medium">+44 7591 092 103</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <a href="mailto:info@thewebtailors.com" className="text-white hover:text-purple-400 transition-colors font-medium">info@thewebtailors.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-400 mt-1" />
                <div>
                  <p className="text-white/60 text-sm">Area</p>
                  <p className="text-white font-medium">All UK</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} TheWebTailors. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Shield className="w-3 h-3" />
                <span>UK Company • GDPR Compliant</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy" className="text-white/50 hover:text-white/70 transition-colors">Privacy</a>
              <a href="/terms" className="text-white/50 hover:text-white/70 transition-colors">Terms</a>
              <a href="/cookies" className="text-white/50 hover:text-white/70 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
