"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Atom,
  BadgeCheck,
  Bolt,
  Braces,
  Code2,
  Database,
  FileCode,
  Flame,
  GitBranch,
  Github,
  Globe,
  KeyRound,
  Layers,
  Network,
  PanelTop,
  Radio,
  Server,
  Table,
  Terminal,
  Type,
  Video,
  Wind,
  Workflow,
} from "lucide-react"

const skills: { label: string; Icon: React.ComponentType<any> }[] = [
  // Programming Languages
  { label: "C++", Icon: Code2 },
  { label: "Python", Icon: Terminal },
  { label: "Java", Icon: Bolt },
  { label: "JavaScript", Icon: Braces },
  { label: "TypeScript", Icon: Type },
  { label: "SQL", Icon: Table },
  { label: "HTML", Icon: FileCode },
  { label: "CSS", Icon: Layers },

  // Frameworks & Libraries
  { label: "React.js", Icon: Atom },
  { label: "Next.js", Icon: Globe },
  { label: "Node.js", Icon: Server },
  { label: "Express.js", Icon: Workflow },
  { label: "TailwindCSS", Icon: Wind },
  { label: "Socket.io", Icon: Radio },
  { label: "WebRTC", Icon: Video },

  // Databases & Tools
  { label: "MongoDB", Icon: Database },
  { label: "MySQL", Icon: Database },
  { label: "Git", Icon: GitBranch },
  { label: "GitHub", Icon: Github },
  { label: "Postman", Icon: BadgeCheck },
  { label: "VS Code", Icon: PanelTop },

  // Core Development
  { label: "REST APIs", Icon: Globe },
  { label: "Auth (JWT)", Icon: KeyRound },
  { label: "Firebase", Icon: Flame },
  { label: "Realtime", Icon: Network },
]

export function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <h2 className="text-balance text-2xl font-semibold md:text-3xl">Skills</h2>

      <Card className="mt-6 bg-card/60 backdrop-blur-xl">
        <CardContent className="relative overflow-hidden p-6">
          {/* subtle radial accent */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]">
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
          </div>

          {/* Floating icon chips */}
          <div className="flex flex-wrap items-start gap-3">
            {skills.map(({ label, Icon }, i) => (
              <motion.span
                key={label}
                className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-3 py-2 text-xs text-muted-foreground shadow-sm animate-float-bob"
                style={{ animationDelay: `${(i % 10) * 0.12}s` }}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.02 }}
              >
                <Icon className="h-4 w-4 text-foreground/80" />
                {label}
              </motion.span>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
