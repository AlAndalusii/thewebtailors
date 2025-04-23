import { cn } from "@/lib/utils"
import { Pacifico } from "next/font/google"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export function Logo({ className, size = "default" }: { className?: string; size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "h-8",
    default: "h-10",
    large: "h-12",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full blur-sm opacity-70" />
        <div className="relative flex items-center justify-center w-10 h-10 bg-black rounded-full border border-white/10">
          <span className={cn("text-xl font-bold text-white", pacifico.className)}>T</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold leading-none">TheWeb</span>
        <span
          className={cn(
            "text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-rose-300",
            pacifico.className,
          )}
        >
          Tailors
        </span>
      </div>
    </div>
  )
}
