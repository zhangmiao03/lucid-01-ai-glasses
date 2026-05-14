"use client"

import { motion } from "framer-motion"
import { ArrowRight, Eye, ShoppingBag } from "lucide-react"
import Logo from "./Logo"
import { NAV_LINKS } from "@/data/siteContent"
import { CLOSING_HEADLINE, CLOSING_SUBHEADLINE } from "@/data/siteContent"

export default function ClosingFooter() {
  return (
    <footer className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-blue-ice mb-4 leading-tight">
            {CLOSING_HEADLINE}
          </h2>
          <p className="text-lg text-blue-ice/40 mb-10">
            {CLOSING_SUBHEADLINE}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#vision-demo"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-luminous/20 to-cyan-bright/10 border border-blue-luminous/30 text-blue-ice hover:bg-blue-luminous/30 transition-all duration-300 text-sm group"
            >
              Experience the HUD
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#demo"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-glass-border text-blue-ice/60 hover:bg-glass-bg hover:text-blue-ice transition-all duration-300 text-sm"
            >
              <Eye size={16} />
              Book Private Demo
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-luminous/20 to-transparent mb-12" />

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <Logo />

          <div className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-blue-ice/40 hover:text-blue-ice/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-xs text-blue-ice/20 font-mono">
            &copy; 2026 LUCID/01
          </div>
        </div>
      </div>
    </footer>
  )
}
