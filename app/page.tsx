import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { TechMarquee } from "@/components/tech-marquee"
import { ProjectsGrid } from "@/components/projects-grid"
import { Certifications } from "@/components/certifications"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />
      <Hero />
      <About />
      <TechMarquee />
      <Experience />
      <ProjectsGrid />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
