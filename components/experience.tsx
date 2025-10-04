"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const items = [
  {
    role: "Web Development Intern",
    org: "Defence Research and Development Organisation (DRDO)",
    time: "Jun 2025 – Jul 2025",
    bullets: [
      "Built a secure and responsive MERN dashboard for research datasets, enhancing accessibility and visualization.",
      "Designed REST APIs, integrated dynamic charts & file uploads, optimized queries; 65% faster retrieval.",
      "Contributed to scalable schema design for efficient storage and retrieval of research records.",
    ],
  },
  {
    role: "Mentor",
    org: "GirlScript Summer of Code (GSSoC)",
    time: "Oct 2024 – Nov 2024",
    bullets: [
      "Mentored 100+ students on MERN projects: code reviews, debugging, and milestone completion.",
      "Provided tailored guidance and resources, helping launch multiple open-source projects.",
    ],
  },
]

export function Experience() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
      <h2 className="text-balance text-2xl font-semibold md:text-3xl">Experience</h2>

      <div className="mt-8 grid gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.role}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
          >
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 h-full w-px bg-border/70" />
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary" />
              <Card className="bg-card/60 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-lg font-medium">{item.role}</div>
                    <div className="text-sm text-muted-foreground">{item.time}</div>
                  </div>
                  <div className="text-muted-foreground">{item.org}</div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
