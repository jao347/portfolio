'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/shared/section-heading'
import { experiences } from '@/data/experience'
import { cn } from '@/lib/utils'

const TYPE_COLORS: Record<string, string> = {
  'full-time': 'border-indigo-500/20 bg-indigo-500/10 text-indigo-400',
  'contract':  'border-amber-500/20 bg-amber-500/10 text-amber-400',
  'freelance': 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
  'part-time': 'border-violet-500/20 bg-violet-500/10 text-violet-400',
}

const COMPANY_GRADIENTS: Record<string, string> = {
  codebox:    'from-indigo-500 to-violet-500',
  vertex:     'from-blue-500 to-cyan-500',
  blocklabs:  'from-purple-500 to-pink-500',
  virginia:   'from-emerald-500 to-teal-500',
  ripeconcepts: 'from-orange-500 to-amber-500',
  wisebox:    'from-rose-500 to-red-500',
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've"
          titleHighlight="worked"
          description="A journey through companies where I've shipped products, led teams, and grown as an engineer."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/30 via-white/[0.05] to-transparent hidden lg:block" />

          <div className="space-y-4">
            {experiences.map((exp, i) => {
              const gradient = COMPANY_GRADIENTS[exp.id] ?? 'from-indigo-500 to-violet-500'

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex gap-6 lg:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="relative hidden lg:flex flex-col items-center absolute -left-3">
                    <div
                      className={cn(
                        'absolute -left-[46px] top-6 h-3 w-3 rounded-full border-2 border-zinc-950',
                        'bg-gradient-to-r', gradient
                      )}
                    />
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass gradient-border-hover group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        {/* Company icon */}
                        <div className={cn(
                          'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.07]',
                          'bg-gradient-to-br opacity-80', gradient
                        )}>
                          <Briefcase className="h-5 w-5 text-white" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-zinc-100 text-base">{exp.role}</h3>
                          <p className="text-sm font-medium text-indigo-400">{exp.company}</p>

                          <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={cn('rounded-full border px-3 py-1 text-[11px] font-medium', TYPE_COLORS[exp.type])}>
                          {exp.type.replace('-', ' ')}
                        </span>
                        <span className="text-[11px] text-zinc-600 border border-white/[0.06] bg-white/[0.03] rounded-full px-3 py-1">
                          {exp.duration}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-sm text-zinc-400 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="mb-5 space-y-2">
                      {exp.achievements.map((a, ai) => (
                        <motion.li
                          key={ai}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 + ai * 0.04 + 0.2 }}
                          className="flex items-start gap-2 text-sm text-zinc-500"
                        >
                          <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-indigo-500" />
                          {a}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map(t => (
                        <span
                          key={t}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
