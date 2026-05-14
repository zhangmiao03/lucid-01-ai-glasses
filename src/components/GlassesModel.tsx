import { useEffect, useRef } from "react"

interface GlassesModelProps {
  color?: string
  className?: string
}

export default function GlassesModel({ color = "#c0cbd9", className = "" }: GlassesModelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const w = 360
    const h = 200
    canvas.width = w
    canvas.height = h

    let time = 0

    const animate = () => {
      time += 0.02
      ctx.clearRect(0, 0, w, h)

      ctx.save()
      ctx.translate(w / 2, h / 2 + 10)

      // Slight rotation
      const rot = Math.sin(time * 0.5) * 0.08
      ctx.rotate(rot)

      // Frame dimensions
      const lensW = 105
      const lensH = 52
      const bridge = 18

      // Left lens gradient
      const leftGrad = ctx.createLinearGradient(-lensW - 5, -lensH, -lensW - 5, lensH)
      leftGrad.addColorStop(0, color)
      leftGrad.addColorStop(1, color === "#c0cbd9" ? "#8aa8c0" : color)
      ctx.strokeStyle = leftGrad
      ctx.lineWidth = 3.5
      ctx.beginPath()
      ctx.roundRect(-lensW - bridge / 2, -lensH / 2, lensW, lensH, 10)
      ctx.stroke()

      // Right lens
      const rightGrad = ctx.createLinearGradient(5, -lensH, 5, lensH)
      rightGrad.addColorStop(0, color)
      rightGrad.addColorStop(1, color === "#c0cbd9" ? "#8aa8c0" : color)
      ctx.strokeStyle = rightGrad
      ctx.beginPath()
      ctx.roundRect(bridge / 2, -lensH / 2, lensW, lensH, 10)
      ctx.stroke()

      // Bridge
      ctx.strokeStyle = color
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(-6, -2)
      ctx.quadraticCurveTo(0, -8, 6, -2)
      ctx.stroke()

      // Temples (arms)
      ctx.lineWidth = 2.5
      ctx.strokeStyle = color

      // Left temple
      ctx.beginPath()
      ctx.moveTo(-lensW - bridge / 2, -lensH / 2 + 8)
      ctx.lineTo(-lensW - bridge / 2 - 75, -lensH / 2 + 2)
      ctx.lineTo(-lensW - bridge / 2 - 85, -lensH / 2 + 5)
      ctx.stroke()

      // Right temple
      ctx.beginPath()
      ctx.moveTo(lensW + bridge / 2, -lensH / 2 + 8)
      ctx.lineTo(lensW + bridge / 2 + 75, -lensH / 2 + 2)
      ctx.lineTo(lensW + bridge / 2 + 85, -lensH / 2 + 5)
      ctx.stroke()

      // Lens reflection (left)
      if (color !== "#2a2d35") {
        const refGrad1 = ctx.createLinearGradient(-lensW - bridge / 2 + 10, -lensH / 2 + 5, -lensW - bridge / 2 + lensW - 10, lensH / 2 - 5)
        refGrad1.addColorStop(0, "rgba(255,255,255,0)")
        refGrad1.addColorStop(0.3, "rgba(255,255,255,0.12)")
        refGrad1.addColorStop(0.6, "rgba(255,255,255,0.04)")
        refGrad1.addColorStop(1, "rgba(255,255,255,0)")
        ctx.fillStyle = refGrad1
        ctx.beginPath()
        ctx.roundRect(-lensW - bridge / 2 + 8, -lensH / 2 + 6, lensW - 16, lensH - 12, 6)
        ctx.fill()
      }

      // Lens reflection (right)
      if (color !== "#2a2d35") {
        const refGrad2 = ctx.createLinearGradient(bridge / 2 + 10, -lensH / 2 + 5, bridge / 2 + lensW - 10, lensH / 2 - 5)
        refGrad2.addColorStop(0, "rgba(255,255,255,0)")
        refGrad2.addColorStop(0.3, "rgba(255,255,255,0.12)")
        refGrad2.addColorStop(0.6, "rgba(255,255,255,0.04)")
        refGrad2.addColorStop(1, "rgba(255,255,255,0)")
        ctx.fillStyle = refGrad2
        ctx.beginPath()
        ctx.roundRect(bridge / 2 + 8, -lensH / 2 + 6, lensW - 16, lensH - 12, 6)
        ctx.fill()
      }

      // Subtle glow
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, lensW + 20)
      glow.addColorStop(0, `rgba(74, 158, 255, 0.06)`)
      glow.addColorStop(1, `rgba(74, 158, 255, 0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(0, 0, lensW + 20, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: 360, height: 200, maxWidth: "100%" }}
      aria-label={`LUCID/01 glasses in ${color}`}
    />
  )
}
