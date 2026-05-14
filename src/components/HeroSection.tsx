"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ShoppingBag } from "lucide-react"
import GlassesModel from "./GlassesModel"
import {
  HERO_BADGE,
  HERO_HEADLINE,
  HERO_SUBHEADLINE,
  FLOATING_LABELS,
  HERO_METRICS,
} from "@/data/siteContent"

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  // Animated HUD particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Floating HUD rings
    const rings = [
      { x: 0.3, y: 0.4, r: 60, speed: 0.3 },
      { x: 0.6, y: 0.55, r: 80, speed: 0.2 },
      { x: 0.45, y: 0.5, r: 100, speed: 0.15 },
    ]

    // Scan dots
    const dots: { x: number; y: number; size: number; alpha: number; phase: number }[] = []
    for (let i = 0; i < 15; i++) {
      dots.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const animate = () => {
      t += 0.02
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // Animated rings
      rings.forEach((ring) => {
        const cx = ring.x * w
        const cy = ring.y * h
        const pulse = Math.sin(t * ring.speed) * 10
        ctx.beginPath()
        ctx.arc(cx, cy, ring.r + pulse, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(0, 212, 255, 0.08)"
        ctx.lineWidth = 0.8
        ctx.stroke()

        // Second ring
        ctx.beginPath()
        ctx.arc(cx, cy, ring.r * 0.6 + pulse * 0.5, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(74, 158, 255, 0.05)"
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      // Dots
      dots.forEach((d) => {
        const x = d.x * w + Math.sin(t * 0.5 + d.phase) * 5
        const y = d.y * h + Math.cos(t * 0.7 + d.phase) * 5
        ctx.beginPath()
        ctx.arc(x, y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(102, 227, 255, ${d.alpha + Math.sin(t + d.phase) * 0.1})`
        ctx.fill()
      })

      // Scan line
      if (Math.sin(t * 0.5) > 0.8) {
        const scanY = ((t * 50) % h)
        ctx.beginPath()
        ctx.moveTo(0, scanY)
        ctx.lineTo(w, scanY)
        ctx.strokeStyle = `rgba(74, 158, 255, ${0.05 + Math.sin(t) * 0.03})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20" id="hero">
      {/* Background HUD canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full optical-glass text-xs text-cyan-bright/70 tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-bright/50 animate-pulse" />
              {HERO_BADGE}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl leading-tight text-blue-ice"
            >
              {HERO_HEADLINE}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-blue-ice/50 leading-relaxed max-w-lg"
            >
              {HERO_SUBHEADLINE}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#vision-demo"
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-luminous/20 to-cyan-bright/10 border border-blue-luminous/30 text-blue-ice hover:bg-blue-luminous/30 transition-all duration-300 text-sm font-medium"
              >
                See Through AI
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#product"
                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-glass-border text-blue-ice/70 hover:bg-glass-bg hover:text-blue-ice transition-all duration-300 text-sm"
              >
                <ShoppingBag size={16} />
                Choose Your Frame
              </a>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-8 pt-4"
            >
              {HERO_METRICS.map((metric) => (
                <div key={metric.label}>
                  <div className="font-mono text-lg text-cyan-bright/80">{metric.value}</div>
                  <div className="text-xs text-blue-ice/40 mt-1 tracking-wider">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Glow background */}
            <div
              className="absolute w-full h-full rounded-full blur-3xl opacity-30"
              style={{
                background: `radial-gradient(circle at ${mousePos.x * 0.05 + 50}% ${mousePos.y * 0.05 + 40}%, rgba(74, 158, 255, 0.2), rgba(0, 212, 255, 0.08), transparent)`,
                transition: "all 0.3s ease-out",
              }}
            />

            {/* Center glasses display */}
            <div className="relative z-10 flex flex-col items-center">
              <GlassesModel color="#c0cbd9" className="mb-6" />

              {/* Floating labels */}
              <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-xs">
                {FLOATING_LABELS.map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className="hud-panel rounded-lg px-3 py-2 text-xs text-cyan-bright/70 font-mono text-center"
                  >
                    {label}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
