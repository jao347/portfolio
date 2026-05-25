'use client'

import { useEffect, useState, useCallback } from 'react'
import { Command } from 'cmdk'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Home, User, Code2, Briefcase, Clock, Mail,
  Download, ExternalLink, Search,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/shared/icons'
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '@/lib/constants'

const SECTIONS = [
  { label: 'Home', icon: Home, href: '#home' },
  { label: 'About', icon: User, href: '#about' },
  { label: 'Skills', icon: Code2, href: '#skills' },
  { label: 'Projects', icon: Briefcase, href: '#projects' },
  { label: 'Experience', icon: Clock, href: '#experience' },
  { label: 'Contact', icon: Mail, href: '#contact' },
]

const LINKS = [
  { label: 'GitHub', icon: GithubIcon, href: GITHUB_URL, external: true },
  { label: 'LinkedIn', icon: LinkedinIcon, href: LINKEDIN_URL, external: true },
  { label: 'Download Resume', icon: Download, href: RESUME_URL, external: true },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((fn: () => void) => {
    setOpen(false)
    fn()
  }, [])

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed left-1/2 top-[20%] z-[201] w-full max-w-lg -translate-x-1/2 px-4"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <Command
                className="rounded-xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden"
                label="Command Menu"
              >
                <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
                  <Search className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                  <Command.Input
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Search commands..."
                    className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
                  />
                  <kbd className="hidden sm:flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500">
                    ESC
                  </kbd>
                </div>

                <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-none">
                  <Command.Empty className="py-8 text-center text-sm text-zinc-500">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigate">
                    {SECTIONS.map(item => (
                      <Command.Item
                        key={item.label}
                        value={item.label}
                        onSelect={() =>
                          runCommand(() => {
                            document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
                          })
                        }
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors aria-selected:bg-indigo-500/10 aria-selected:text-zinc-100 hover:bg-white/5 hover:text-zinc-100"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Separator className="my-2 h-px bg-white/[0.07] mx-2" />

                  <Command.Group heading="Links">
                    {LINKS.map(item => (
                      <Command.Item
                        key={item.label}
                        value={item.label}
                        onSelect={() =>
                          runCommand(() => {
                            window.open(item.href, item.external ? '_blank' : '_self')
                          })
                        }
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors aria-selected:bg-indigo-500/10 aria-selected:text-zinc-100 hover:bg-white/5 hover:text-zinc-100"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {item.external && <ExternalLink className="ml-auto h-3 w-3 opacity-50" />}
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>

                <div className="border-t border-white/[0.07] px-4 py-2.5 flex items-center gap-4">
                  <span className="text-[11px] text-zinc-600 flex items-center gap-1.5">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px]">↑↓</kbd>
                    navigate
                  </span>
                  <span className="text-[11px] text-zinc-600 flex items-center gap-1.5">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px]">↵</kbd>
                    select
                  </span>
                  <span className="text-[11px] text-zinc-600 flex items-center gap-1.5">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px]">Ctrl K</kbd>
                    toggle
                  </span>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
