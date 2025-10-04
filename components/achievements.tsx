"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Award, Github, Flame, Megaphone } from "lucide-react"

const items = [
  { icon: Trophy, title: "CIENA NASSCOM", desc: "Top 20 teams nationwide." },
  { icon: Award, title: "Accenture 2024", desc: "Top 10 innovator recognition." },
  { icon: Github, title: "Open Source", desc: "GSSoC, SWoC, Hacktoberfest contributor." },
  { icon: Flame, title: "DSA 400+", desc: "LeetCode, GFG, CodeStudio problems solved." },
  { icon: Megaphone, title: "Leadership", desc: "Hosted BDC event under NSS MAIT." },
]

export function Achievements() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <h2 className="text-balance text-2xl font-semibold md:text-3xl">Achievements</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: i * 0.03 }}
          >
            <Card className="bg-card/60 backdrop-blur-xl">
              <CardContent className="flex items-start gap-3 p-6">
                <a.icon className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.desc}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
