"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { profile } from "@/lib/profile"
import { Github, Linkedin } from "lucide-react"

export function Contact() {
  const [pending, setPending] = useState(false)
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    setPending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("Failed")
      toast({ title: "Message sent", description: "Thanks! I will get back to you soon." })
      form.reset()
    } catch {
      toast({ title: "Something went wrong", description: "Please try again in a moment." })
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
      <h2 className="text-balance text-2xl font-semibold md:text-3xl">Contact</h2>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.45 }}
      >
        <Card className="mt-6 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-6">
            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="rounded-md border border-input bg-background/60 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="rounded-md border border-input bg-background/60 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="md:col-span-2 grid gap-2">
                <label htmlFor="message" className="text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="rounded-md border border-input bg-background/60 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex items-center justify-between md:col-span-2">
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                  <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1">
                    ✉ Email
                  </a>
                </div>
                <Button type="submit" disabled={pending}>
                  {pending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
