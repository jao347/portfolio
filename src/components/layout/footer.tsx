'use client'

import { motion } from 'framer-motion'
import { Mail, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/shared/icons'
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/lib/constants'

const SOCIALS = [
  { icon: GithubIcon, label: 'GitHub', href: GITHUB_URL },
  { icon: LinkedinIcon, label: 'LinkedIn', href: LINKEDIN_URL },
  { icon: Mail, label: 'Email', href: `mailto:${EMAIL}` },
]

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center">
                <span className="gradient-text text-sm font-bold">J</span>
              </div>
              <span className="text-sm font-medium text-zinc-300">Jay Cris Bahandi</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Full-stack developer building scalable applications, AI automations, and modern digital experiences.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-zinc-400 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-400"
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-600">Navigation</p>
            <ul className="space-y-2.5">
              {NAV.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={e => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-200 link-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-600">Status</p>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm text-emerald-400">Available for work</span>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Open to full-time roles, freelance projects, and consulting opportunities.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors link-hover"
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Jay Cris Bahandi. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-zinc-600">
            Built with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> in Cebu, Philippines
          </p>
        </div>
      </div>
    </footer>
  )
}
