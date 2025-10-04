"use client"

import { motion } from "framer-motion"
import { profile } from "@/lib/profile"
import { Card, CardContent } from "@/components/ui/card"

export function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">About Me</h2>
        <Card className="mt-6 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-6">
            <p className="text-pretty text-muted-foreground">
              I&apos;m {profile.name}, a full-stack Software Development Engineer focused on building scalable, clean,
              and user-centric products. I enjoy designing robust APIs, crafting performant client-server architectures,
              and delivering responsive, accessible interfaces that feel premium and intuitive.
            </p>
            
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
