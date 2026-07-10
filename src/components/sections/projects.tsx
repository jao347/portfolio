'use client'

import { useState } from 'react'
import { projects } from '@/data/projects'
import { GITHUB_URL } from '@/lib/constants'
import SectionHeading from '@/components/shared/section-heading'
import { cn } from '@/lib/utils'

const FILTERS = ['All', 'Automation', 'Enterprise', 'Web3', 'Analytics', 'Data']

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter || p.tags.includes(filter))

  return (
    <section id="projects" className="mt-16">
      <SectionHeading title="THINGS I'VE BUILT" caption="enterprise SaaS, Web3 platforms, analytics & AI automation" />

      {/* filter pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'font-bpmono rounded-[3px] border px-3 py-1.5 text-[11px] tracking-[1px] uppercase transition-colors',
              filter === f
                ? 'border-[var(--acc)] text-[var(--acc)]'
                : 'border-[var(--line-strong)] text-[var(--body-3)] hover:border-[var(--acc)] hover:text-[var(--acc)]'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map(p => {
          const num = String(projects.indexOf(p) + 1).padStart(2, '0')
          return (
            <article
              key={p.id}
              className="flex flex-col border border-[var(--line)] bg-[rgba(10,20,32,.5)] px-5 py-4"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-bpmono text-sm font-bold text-[var(--acc)]">{num}</span>
                <span className="font-bpmono rounded-[3px] border border-[var(--line-strong)] px-2 py-0.5 text-[10px] uppercase tracking-[2px] text-[var(--label)]">
                  {p.category}
                </span>
                {p.featured && (
                  <span className="font-bpmono -rotate-2 rounded-[3px] border-2 border-[var(--stamp)] px-[7px] py-0.5 text-[10px] font-bold tracking-[2px] text-[var(--stamp)]">
                    FEATURED
                  </span>
                )}
              </div>
              <div className="font-gochi mt-2 text-[22px] leading-tight text-[var(--ink)]">{p.title}</div>
              <div className="mt-1.5 text-[14px] leading-[22px] text-[var(--body-2)]">{p.description}</div>
              <div className="font-bpmono mt-3 flex flex-col gap-1 text-[11px] text-[var(--label)]">
                {p.metrics.map(m => (
                  <span key={m.label}>{m.label.toUpperCase()}: {m.value}</span>
                ))}
              </div>
              <div className="font-bpmono mt-auto border-t border-dashed border-[var(--line)] pt-3 text-[11.5px] text-[var(--body-3)]">
                {p.stack.join(' / ')}
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-4 text-[14px]">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">view more on GitHub →</a>
      </div>
    </section>
  )
}
