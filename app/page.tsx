import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { ParticlesBG } from "@/components/particles-bg"
import { Achievements } from "@/components/achievements"
import Roles from "@/components/roles"
import { GithubCard } from "@/components/activity/github-card"
import { LeetCodeCard } from "@/components/activity/leetcode-card"
import { ContactQuick } from "@/components/contact-quick"

export default function HomePage() {
  return (
    <main className="relative">
      {/* Background animation */}
      <ParticlesBG />

      {/* Content */}
      <section id="hero" className="relative">
        <Hero />
      </section>

      <section id="about" className="relative">
        <About />
      </section>

      <section id="experience" className="relative">
        <Experience />
      </section>

      <section id="roles" className="relative">
        <Roles />
      </section>

      <section id="achievements" className="relative">
        <Achievements />
      </section>

      <section id="projects" className="relative">
        <Projects />
      </section>

      <section id="skills" className="relative">
        <Skills />
      </section>

      <section id="activity" className="relative">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-pretty">Activity & Contact</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <GithubCard className="md:col-span-1" />
            <LeetCodeCard className="md:col-span-1" />
            <ContactQuick className="md:col-span-1" />
          </div>
        </div>
      </section>

      <section id="contact" className="relative">
        <Contact />
      </section>
    </main>
  )
}
