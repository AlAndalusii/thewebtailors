import { Logo } from "./logo"

export default function Footer() {
  return (
    <footer className="relative py-12 bg-[#030303] overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-white/40 max-w-md">
              We transform outdated websites into modern experiences that captivate your audience and drive real results. Simple, effective, powerful.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-white/40">
              <li>Web Design</li>
              <li>UI/UX Design</li>
              <li>Responsive Development</li>
              <li>Animation & Motion</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/40">
              <li>info@thewebtailors.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center text-white/30 text-sm">
          © {new Date().getFullYear()} TheWebTailors. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
