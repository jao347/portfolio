import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Skills from '@/components/sections/skills'
import Projects from '@/components/sections/projects'
import Experience from '@/components/sections/experience'
import Contact from '@/components/sections/contact'
import Footer from '@/components/layout/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--desk)] p-3 sm:p-6">
      <div className="bp-sheet relative w-full border border-[var(--line)] px-4 py-8 shadow-[0_12px_40px_rgba(0,0,0,.6)] sm:px-12 sm:pt-14 sm:pb-16 lg:px-16">
        {/* drafting title block */}
        <div className="font-bpmono absolute right-0 top-0 hidden border-b border-l border-[var(--line-strong)] px-4 py-2.5 text-right text-[10px] leading-[18px] tracking-[1px] text-[var(--label)] sm:block">
          PROJECT: PORTFOLIO — J.C. BAHANDI<br />
          SCALE: 1:1 · SHEET 1 OF 1 · REV 06<br />
          CEBU, PH · GMT+8
        </div>

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
