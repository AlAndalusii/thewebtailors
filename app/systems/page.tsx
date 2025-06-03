"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Clock, BarChart } from "lucide-react";
import Link from "next/link";

export default function SystemsPage() {
  const handleBookDemo = () => {
    // Implement booking demo functionality
    window.location.href = "mailto:contact@example.com?subject=Book a Demo - Systems";
  };

  return (
    <main className="bg-[#030303] min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Automated Systems
              </span>
            </motion.h1>
            <motion.p 
              className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Streamline your business operations with our intelligent automation systems.
              From lead capture to customer follow-up, we've got you covered.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Lead Management",
                description: "Automatically capture, qualify, and nurture leads 24/7",
                icon: Zap,
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                title: "Customer Follow-up",
                description: "Never miss a follow-up with automated reminders and scheduling",
                icon: Clock,
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Performance Analytics",
                description: "Track and optimize your business performance in real-time",
                icon: BarChart,
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: "Security & Compliance",
                description: "Enterprise-grade security with GDPR compliance built-in",
                icon: Shield,
                gradient: "from-amber-500 to-orange-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-xl p-6 border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              onClick={handleBookDemo}
              className="bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white px-8 py-6 text-lg rounded-full"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 