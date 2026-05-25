'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowUpRight, Star } from 'lucide-react'
import { GithubIcon } from '@/components/shared/icons'
import SectionHeading from '@/components/shared/section-heading'
import { projects } from '@/data/projects'
import { GITHUB_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

const FILTERS = ['All', 'Automation', 'Enterprise', 'Web3', 'Analytics', 'Data']

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass gradient-border-hover group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* Visual header */}
      <div className="relative h-44 overflow-hidden">
        {/* Gradient background */}
        <div className={cn('absolute inset-0 bg-gradient-to-br', project.gradient, 'opacity-25')} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/90" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating glow */}
        <div
          className="absolute inset-0 rounded-full opacity-40 blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 60%, var(--tw-gradient-from, #6366f1), transparent 70%)`,
          }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Featured star */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] text-amber-400">
              <Star className="h-2.5 w-2.5 fill-amber-400" />
              Featured
            </span>
          </div>
        )}

        {/* Links overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center gap-3"
            >
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-indigo-500/30"
                  aria-label="View on GitHub"
                >
                  <GithubIcon className="h-4 w-4" />
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-indigo-500/30"
                  aria-label="View live"
                >
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-zinc-100 text-base leading-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-zinc-600 transition-all group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        <p className="mb-4 text-sm text-zinc-500 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="mb-5 grid grid-cols-2 gap-2">
          {project.metrics.slice(0, 4).map(m => (
            <div key={m.label} className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2">
              <p className="text-xs font-semibold text-zinc-200">{m.value}</p>
              <p className="text-[10px] text-zinc-600 leading-tight">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map(tech => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-400"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-500">
              +{project.stack.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter || p.tags.includes(activeFilter))

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've"
          titleHighlight="built"
          description="Production-grade projects spanning enterprise SaaS, Web3 platforms, analytics systems, and AI automation tools."
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200',
                activeFilter === f
                  ? 'bg-indigo-500 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)]'
                  : 'border border-white/[0.07] bg-white/[0.03] text-zinc-400 hover:border-white/[0.12] hover:text-zinc-200'
              )}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/[0.08] hover:text-indigo-300"
          >
            <GithubIcon className="h-4 w-4" />
            View more on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
