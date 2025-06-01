import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative py-12 bg-[#030303] overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-white/40 max-w-md">
              We create professional websites for UK tradespeople that convert visitors into customers and showcase your expertise to potential clients.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-white/40">
              <li>Trade Business Website Design</li>
              <li>Tradesman Branding</li>
              <li>Online Booking Solutions</li>
              <li>Trade Business Chatbot Development</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/40">
              <li>info@thewebtailors.com</li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-4">Free Credibility Audit</h4>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500/50"
                />
                <Button 
                  type="submit"
                  className="w-full gap-2 bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 transition-all duration-300"
                >
                  Get 5-Point Audit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center text-white/30 text-sm">
          © {new Date().getFullYear()} TheWebTailors. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
