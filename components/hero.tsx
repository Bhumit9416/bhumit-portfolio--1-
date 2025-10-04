"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/profile"
import { FloatingObjects } from "./three/floating-objects"
import { ArrowRight, Download } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const titles = ["Software Development Engineer", "Full-Stack Developer", "Mentor"]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % titles.length), 2000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28 md:pb-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-sm text-muted-foreground">{profile.location}</p>
          <h1 className="text-pretty text-5xl md:text-8xl font-semibold leading-[1.05] tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">{profile.headline}</p>

          {/* Rotating subtitle */}
          <div className="text-primary text-xs md:text-sm font-medium mt-1">
            {titles[idx]}
            <span className="sr-only">SDE </span>
          </div>

          <p className="text-muted-foreground">
            Software Development Engineer focused on scalable systems, robust APIs, and polished user experiences.
            Strength across frontend and backend with React, Next.js, Node.js, Express, and MongoDB.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#projects">
              <Button size="lg" className="group">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
            <a href={profile.links.resume} download>
              <Button size="lg" variant="secondary" className="backdrop-blur-md">
                <Download className="mr-2 h-4 w-4" />
                Download Résumé
              </Button>
            </a>
          </div>

          {/* Tech marquee */}
          <div className="relative mt-4 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap text-xs text-muted-foreground">
              <span className="mx-3">React</span>
              <span className="mx-3">Next.js</span>
              <span className="mx-3">Node.js</span>
              <span className="mx-3">Express</span>
              <span className="mx-3">MongoDB</span>
              <span className="mx-3">MySQL</span>
              <span className="mx-3">WebRTC</span>
              <span className="mx-3">Socket.io</span>
              <span className="mx-3">TypeScript</span>
              <span className="mx-3">TailwindCSS</span>
              <span className="mx-3">JWT</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="relative h-[320px] w-full md:h-[420px]"
        >
          <div className="absolute inset-0 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-sm">
            <FloatingObjects />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-2xl ring-1 ring-primary/10"
          />
          {/* Hovering word chips: Mentor, SDE (abbr), Full‑Stack */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span
              className="absolute left-3 top-4 md:left-4 md:top-6 rounded-full border border-primary/25 bg-primary/10 px-3 md:px-4 py-1.5 text-xs md:text-sm text-primary shadow-sm animate-float-bob"
              style={{ animationDelay: "0.2s" }}
            >
              Mentor
            </span>
            <span
              className="absolute right-4 top-10 md:right-6 md:top-14 rounded-full border border-accent/25 bg-accent/10 px-4 md:px-5 py-2 text-sm md:text-base text-accent shadow-sm animate-float-bob"
              style={{ animationDelay: "0.5s" }}
            >
              <abbr title="Software Development Engineer">SDE</abbr>
            </span>
            <span
              className="absolute bottom-6 right-10 md:bottom-8 md:right-14 rounded-full border border-primary/25 bg-primary/10 px-4 md:px-5 py-2 text-sm md:text-base text-primary shadow-sm animate-float-bob"
              style={{ animationDelay: "0.8s" }}
            >
              Full‑Stack
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
