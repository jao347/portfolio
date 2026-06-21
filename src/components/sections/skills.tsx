'use client'

import { motion } from 'framer-motion'
import { Monitor, Server, Database, Boxes, Bot, Wrench, type LucideIcon } from 'lucide-react'
import { skillCategories } from '@/data/skills'
import SectionHeading from '@/components/shared/section-heading'
import { cn } from '@/lib/utils'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  databases: Database,
  blockchain: Boxes,
  automation: Bot,
  tools: Wrench,
}

const CATEGORY_COLORS: Record<string, { border: string; bg: string; glow: string; bar: string }> = {
  frontend:   { border: 'border-[#00ADB5]/20',   bg: 'bg-[#00ADB5]/[0.07]',    glow: 'rgba(0, 173, 181,0.15)',   bar: 'from-[#00ADB5] to-[#00ADB5]' },
  backend:    { border: 'border-[#00ADB5]/20',  bg: 'bg-[#00ADB5]/[0.07]',  glow: 'rgba(0, 173, 181,0.15)',   bar: 'from-[#00ADB5] to-[#00ADB5]' },
  databases:  { border: 'border-[#00ADB5]/20', bg: 'bg-[#00ADB5]/[0.07]', glow: 'rgba(0, 173, 181,0.15)',   bar: 'from-[#00ADB5] to-[#00ADB5]' },
  blockchain: { border: 'border-[#00ADB5]/20',  bg: 'bg-[#00ADB5]/[0.07]',  glow: 'rgba(0, 173, 181,0.15)',   bar: 'from-[#00ADB5] to-[#00ADB5]' },
  automation: { border: 'border-[#00ADB5]/20',    bg: 'bg-[#00ADB5]/[0.07]',    glow: 'rgba(0, 173, 181,0.15)',    bar: 'from-[#00ADB5] to-[#00ADB5]' },
  tools:      { border: 'border-[#00ADB5]/20',  bg: 'bg-[#00ADB5]/[0.07]',  glow: 'rgba(0, 173, 181,0.15)',   bar: 'from-[#00ADB5] to-[#00ADB5]' },
}

const CATEGORY_LABELS: Record<string, string> = {
  frontend:   'Frontend',
  backend:    'Backend',
  databases:  'Databases',
  blockchain: 'Blockchain & Web3',
  automation: 'AI & Automation',
  tools:      'Tools & DevOps',
}

function SkillBar({ name, level, bar, delay }: { name: string; level: number; bar: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3"
    >
      <span className="w-28 flex-shrink-0 text-xs text-zinc-400 truncate">{name}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={cn('h-full rounded-full bg-gradient-to-r', bar)}
        />
      </div>
      <span className="w-8 flex-shrink-0 text-right text-[10px] text-zinc-600">{level}%</span>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I"
          titleHighlight="work with"
          description="A curated set of tools and technologies I use to build scalable, production-ready applications."
          centered
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, catIndex) => {
            const colors = CATEGORY_COLORS[cat.id] ?? CATEGORY_COLORS.tools

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: catIndex * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={cn(
                  'glass gradient-border-hover group relative rounded-2xl p-6 transition-all duration-300 overflow-hidden',
                )}
                style={{
                  ['--glow-color' as string]: colors.glow,
                }}
              >
                {/* Background glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(300px circle at 50% -20%, ${colors.glow}, transparent 70%)`,
                  }}
                />

                {/* Header */}
                <div className="relative mb-6 flex items-center gap-3">
                  <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl border', colors.border, colors.bg)}>
                    {(() => {
                      const Icon = CATEGORY_ICONS[cat.id] ?? Wrench
                      return <Icon className="h-4 w-4 text-[#00ADB5]" strokeWidth={1.75} />
                    })()}
                  </div>
                  <p className="font-semibold text-zinc-100 text-sm">{CATEGORY_LABELS[cat.id]}</p>
                </div>

                {/* Skills */}
                <div className="relative space-y-3.5">
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      bar={colors.bar}
                      delay={catIndex * 0.05 + si * 0.04}
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center"
        >
          {[
            { label: 'Languages', value: '8+' },
            { label: 'Frameworks', value: '12+' },
            { label: 'Tools', value: '20+' },
            { label: 'Years Learning', value: '6+' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold gradient-text">{s.value}</span>
              <span className="text-xs text-zinc-600">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
