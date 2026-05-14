import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Logo from "./Logo"
import { NAV_LINKS } from "@/data/siteContent"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-8",
        scrolled
          ? "optical-glass border-b border-glass-border shadow-lg shadow-blue-luminous/5"
          : "bg-transparent"
      )}
      style={{ backdropFilter: scrolled ? "blur(20px)" : "none" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-18">
        {/* Left - Logo */}
        <a href="#" className="flex items-center gap-2">
          <Logo />
        </a>

        {/* Center - Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-blue-ice/50 hover:text-blue-ice/90 transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right - CTA */}
        <div className="hidden md:block">
          <a
            href="#demo"
            className="text-sm px-5 py-2 rounded-full bg-blue-luminous/10 border border-blue-luminous/20 text-blue-ice hover:bg-blue-luminous/20 transition-all duration-300"
          >
            Book Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-blue-ice/70 hover:text-blue-ice p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden optical-glass-strong border-t border-glass-border"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-blue-ice/60 hover:text-blue-ice transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#demo"
                onClick={() => setMobileOpen(false)}
                className="text-sm px-5 py-2.5 rounded-full bg-blue-luminous/10 border border-blue-luminous/20 text-blue-ice text-center"
              >
                Book Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
