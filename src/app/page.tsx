import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import GradientOrbs from '@/components/shared/gradient-orbs'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Skills from '@/components/sections/skills'
import Projects from '@/components/sections/projects'
import Experience from '@/components/sections/experience'
import Contact from '@/components/sections/contact'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden dot-grid">
      <GradientOrbs />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
