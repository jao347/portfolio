'use client'

import { motion } from 'framer-motion'
import { skillCategories } from '@/data/skills'
import SectionHeading from '@/components/shared/section-heading'

const COUNTS = [
  { n: '8+', label: 'LANGUAGES' },
  { n: '12+', label: 'FRAMEWORKS' },
  { n: '20+', label: 'TOOLS' },
  { n: '6+', label: 'YEARS LEARNING' },
]

// design labels the automation group "AI & Automation"
const label = (id: string, title: string) => (id === 'automation' ? 'AI & Automation' : title)

export default function Skills() {
  return (
    <section id="skills" className="mt-16">
      <SectionHeading title="THE STACK" caption="technologies I work with, honestly graded" />

      <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map(cat => (
          <div key={cat.id} className="border border-[var(--line)] bg-[var(--card)] px-4 py-3.5">
            <div className="font-marker mb-2.5 text-[17px] text-[var(--ink)]">{label(cat.id, cat.title)}</div>
            <div className="flex flex-col gap-2">
              {cat.skills.map(s => (
                <div key={s.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[14px] text-[var(--body)]">{s.name}</span>
                    <span className="font-bpmono text-[10px] text-[var(--label)]">{s.level}%</span>
                  </div>
                  <div className="mt-1 h-[4px] rounded-sm bg-[rgba(140,190,230,.15)]">
                    <motion.div
                      className="h-[4px] rounded-sm bg-[var(--acc)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="font-bpmono mt-5 flex flex-wrap gap-x-9 gap-y-2 text-[12px] tracking-[1px] text-[var(--label)]">
        {COUNTS.map(c => (
          <span key={c.label}>
            <b className="text-[15px] text-[var(--acc)]">{c.n}</b> {c.label}
          </span>
        ))}
      </div>
    </section>
  )
}
