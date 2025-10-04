"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useRef } from "react"

type Project = {
  title: string
  summary: string
  tags: string[]
  repo?: string
  demo?: string
  comingSoon?: boolean
  image: string
}

const projects: Project[] = [
  {
    title: "Rozzgari – Job Portal",
    summary:
      "Full-stack MERN recruitment platform with role-based authentication, secure sessions, real-time notifications, and responsive analytics dashboard.",
    tags: ["React", "Node", "Express", "MongoDB", "Tailwind", "Socket.io", "JWT"],
    repo: "https://github.com/Bhumit9416/ROZZGARIFINAL",
    demo: "https://your-demo-url.com/rozzgari",
    image: "/images/projects/rozzgari1.png",
  },
  {
    title: "Medfolio – Health Record Manager",
    summary:
      "Secure record management with scalable CRUD and interactive visualizations. Optimized queries for fast analytics.",
    tags: ["React", "Node", "Express", "MongoDB", "MySQL", "Tailwind", "Chart.js"],
    repo: "https://github.com/Bhumit9416/MEDFOLIOFINAL",
    demo: "https://your-demo-url.com/medfolio",
    image: "/images/projects/medfolio1.jpg",
  },
  {
    title: "Streamify – Video Chat App",
    summary:
      "Real-time video chat with WebRTC and live messaging via WebSockets. Focused on low-latency and mobile performance.",
    tags: ["React", "Node", "Express", "MongoDB", "WebRTC", "WebSockets", "Tailwind"],
    repo: "https://github.com/Bhumit9416/Streamify",
    demo: "https://your-demo-url.com/streamify",
    image: "/images/projects/streamify1.png",
  },
  {
    title: "TaskFlow-Pro",
    summary:
      "TaskFlow-Pro is a modern, full-stack Task Management System designed to help individuals and teams organize work, manage deadlines, and stay productive. Clean UI, robust features, and responsive design.",
    tags: ["Next.js", "React", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind", "JWT"],
    repo: "https://github.com/Bhumit9416/Taskflow",
    demo: "https://taskforpanscience.vercel.app/",
    image: "/images/projects/taskflow-pro1.png",
  },
  {
    title: "Directed Energy Weapon Dashboard",
    summary:
      "A full-stack dashboard to visualize and manage research data on Directed Energy Weapons (DEWs), featuring interactive charts, secure access, and modern UI built with Next.js, TypeScript, and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Node.js", "Dashboard", "Vercel"],
    repo: "https://github.com/Bhumit9416/DRDO-project",
    demo: "https://drdo-project-theta.vercel.app/",
    image: "/images/projects/dew-dashboard1.png",
  },
  {
    title: "School Payment Dashboard",
    summary:
      "A complete full-stack school payment system built as part of a developer assessment. Features include a real-time dashboard in React, secure REST APIs with Node.js and Express, and a responsive interface for students and admins.",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST API", "Dashboard", "Real-time", "Tailwind"],
    repo: "https://github.com/bhumit22/school_payment_edviron-main",
    demo: "https://edvironassign-lyxa2vku4-bhumitmonu9416-4329s-projects.vercel.app/",
    image: "/images/projects/school-payment1.png",
  },
]

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2
    const rotX = ((y - midY) / midY) * -6
    const rotY = ((x - midX) / midX) * 6
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = ""
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  )
}

export function Projects() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <h2 className="text-balance text-2xl font-semibold md:text-3xl">Projects</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: idx * 0.03 }}
            className="group"
          >
            <TiltCard>
              <Card className="bg-card/60 backdrop-blur-xl transition-transform duration-300 ease-out">
                <CardContent className="p-6">
                  <div className="aspect-video w-full overflow-hidden rounded-md border border-border/60">
                    <img
                      alt={p.title}
                      className="h-full w-full object-cover"
                      src={p.image}
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/60 bg-background/60 px-2 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {p.comingSoon ? (
                      <Button variant="secondary" size="sm" className="pointer-events-none opacity-70">
                        Coming Soon
                      </Button>
                    ) : (
                      <>
                        {p.repo && (
                          <a href={p.repo} target="_blank" rel="noreferrer">
                            <Button size="sm" variant="outline">
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </Button>
                          </a>
                        )}
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noreferrer">
                            <Button size="sm">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live
                            </Button>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
