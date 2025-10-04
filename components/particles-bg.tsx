"use client"

import { useEffect, useRef } from "react"

type P = { x: number; y: number; vx: number; vy: number }

export function ParticlesBG() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * DPR
    canvas.height = height * DPR
    ctx.scale(DPR, DPR)

    const particles: P[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }))

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // soft background glow using tokens through opacity
      const grd = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, Math.max(width, height))
      grd.addColorStop(0, "rgba(0,0,0,0)") // transparent center
      grd.addColorStop(1, "rgba(0,0,0,0.06)")
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.5)"
        ctx.fill()
      })

      // connect near particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 110) {
            ctx.strokeStyle = "rgba(255,255,255,0.08)"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onResize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * DPR
      canvas.height = height * DPR
      ctx.scale(DPR, DPR)
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 h-full w-full" aria-hidden="true" />
}
