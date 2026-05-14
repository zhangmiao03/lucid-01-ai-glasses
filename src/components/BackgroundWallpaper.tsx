import { useEffect, useRef } from "react"

export default function BackgroundWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Particles
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      })
    }

    // Grid lines data
    const gridLinesH: number[] = []
    const gridLinesV: number[] = []
    for (let i = 0; i < 20; i++) gridLinesH.push(i * 60)
    for (let i = 0; i < 30; i++) gridLinesV.push(i * 60)

    // Digital numbers
    const digits: { x: number; y: number; text: string; alpha: number; speed: number }[] = []
    for (let i = 0; i < 12; i++) {
      digits.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: Math.random().toString(36).substring(2, 8).toUpperCase(),
        alpha: Math.random() * 0.12 + 0.03,
        speed: Math.random() * 0.1 + 0.05,
      })
    }

    const animate = () => {
      time += 0.005
      const w = canvas.width
      const h = canvas.height

      // Base gradient - deep navy
      const baseGrad = ctx.createRadialGradient(w / 2, h * 0.4, 0, w / 2, h * 0.4, w * 0.8)
      baseGrad.addColorStop(0, "#0a1a2e")
      baseGrad.addColorStop(0.5, "#06111f")
      baseGrad.addColorStop(1, "#040a14")
      ctx.fillStyle = baseGrad
      ctx.fillRect(0, 0, w, h)

      // Luminous blue light field 1
      const light1X = w * 0.3 + Math.sin(time * 0.3) * w * 0.15
      const light1Y = h * 0.35 + Math.cos(time * 0.4) * h * 0.1
      const grad1 = ctx.createRadialGradient(light1X, light1Y, 0, light1X, light1Y, w * 0.4)
      grad1.addColorStop(0, "rgba(74, 158, 255, 0.12)")
      grad1.addColorStop(0.5, "rgba(74, 158, 255, 0.04)")
      grad1.addColorStop(1, "rgba(74, 158, 255, 0)")
      ctx.fillStyle = grad1
      ctx.fillRect(0, 0, w, h)

      // Luminous light field 2
      const light2X = w * 0.7 + Math.sin(time * 0.25 + 2) * w * 0.1
      const light2Y = h * 0.6 + Math.cos(time * 0.35 + 1) * h * 0.12
      const grad2 = ctx.createRadialGradient(light2X, light2Y, 0, light2X, light2Y, w * 0.3)
      grad2.addColorStop(0, "rgba(0, 212, 255, 0.08)")
      grad2.addColorStop(0.5, "rgba(0, 212, 255, 0.03)")
      grad2.addColorStop(1, "rgba(0, 212, 255, 0)")
      ctx.fillStyle = grad2
      ctx.fillRect(0, 0, w, h)

      // Subtle grid lines
      ctx.strokeStyle = "rgba(74, 158, 255, 0.03)"
      ctx.lineWidth = 0.5
      gridLinesH.forEach((y) => {
        const offset = y + Math.sin(time + y * 0.01) * 2
        ctx.beginPath()
        ctx.moveTo(0, offset % h)
        ctx.lineTo(w, offset % h)
        ctx.stroke()
      })
      gridLinesV.forEach((x) => {
        const offset = x + Math.cos(time + x * 0.01) * 2
        ctx.beginPath()
        ctx.moveTo(offset % w, 0)
        ctx.lineTo(offset % w, h)
        ctx.stroke()
      })

      // Digital numbers
      digits.forEach((d) => {
        const alpha = d.alpha + Math.sin(time * 2 + d.x) * 0.03
        ctx.font = "10px JetBrains Mono, monospace"
        ctx.fillStyle = `rgba(102, 227, 255, ${alpha})`
        ctx.fillText(d.text, d.x + Math.sin(time * d.speed + d.y) * 5, d.y + Math.cos(time * d.speed + d.x) * 5)
      })

      // Glass haze overlay
      const hazeGrad = ctx.createRadialGradient(w / 2, h * 0.5, 0, w / 2, h * 0.5, w * 0.7)
      hazeGrad.addColorStop(0, "rgba(180, 210, 255, 0.04)")
      hazeGrad.addColorStop(0.5, "rgba(180, 210, 255, 0.02)")
      hazeGrad.addColorStop(1, "rgba(180, 210, 255, 0)")
      ctx.fillStyle = hazeGrad
      ctx.fillRect(0, 0, w, h)

      // Particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const pulse = p.alpha + Math.sin(time * 2 + p.x * 0.01) * 0.1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 210, 255, ${Math.max(0.05, pulse)})`
        ctx.fill()
      })

      // Light streaks
      ctx.strokeStyle = "rgba(74, 158, 255, 0.03)"
      ctx.lineWidth = 1
      for (let i = 0; i < 3; i++) {
        const sx = w * 0.2 + i * w * 0.3 + Math.sin(time + i) * w * 0.1
        const sy = 0
        const ex = sx + Math.sin(time + i * 2) * 50
        const ey = h
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.quadraticCurveTo(sx + 30, h * 0.5, ex, ey)
        ctx.stroke()
      }

      // Silver-white glow at center
      const glowGrad = ctx.createRadialGradient(w / 2, h * 0.4, 0, w / 2, h * 0.4, w * 0.2)
      glowGrad.addColorStop(0, "rgba(200, 220, 255, 0.06)")
      glowGrad.addColorStop(1, "rgba(200, 220, 255, 0)")
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, w, h)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
