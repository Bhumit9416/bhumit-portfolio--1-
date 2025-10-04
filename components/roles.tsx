"use client"

import { motion } from "framer-motion"
import { Cpu, Network, Server, Wrench } from "lucide-react"

const roles = [
  {
    title: "Frontend Engineering",
    icon: Cpu,
    points: [
      "React/Next.js, TypeScript, TailwindCSS",
      "Responsive UI, accessibility, performance",
      "Data viz and interactive dashboards",
    ],
  },
  {
    title: "Backend & APIs",
    icon: Server,
    points: ["Node.js, Express, RESTful design", "Auth with JWT, sessions, RBAC", "MongoDB, MySQL, query optimization"],
  },
  {
    title: "Realtime Systems",
    icon: Network,
    points: ["WebSockets & Socket.io", "WebRTC rooms & media", "Low-latency event handling"],
  },
  {
    title: "DevOps & Workflow",
    icon: Wrench,
    points: [
      "Clean Git flows, reviews",
      "Postman testing, basic observability",
      "Secure configs & environments",
      "Code quality & performance ownership",
      "Systems design & trade-offs",
    ],
  },
]

export default function Roles() {
  return (
    <section id="roles" className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <div className="mb-6 md:mb-8">
        <h2 className="text-balance text-2xl md:text-3xl font-semibold text-foreground">
          Software Development Engineer
        </h2>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          Problem solver across frontend, backend, realtime, and systems — delivering reliable, user-focused software.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((r, i) => {
          const Icon = r.icon
          return (
            <motion.div
              key={r.title}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-background/70 p-4 md:p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background">
                  <Icon className="h-5 w-5 text-foreground" />
                </span>
                <h3 className="text-lg font-medium text-foreground">{r.title}</h3>
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-muted-foreground">
                {r.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
