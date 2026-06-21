'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Command } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/[0.06] bg-zinc-950/85 backdrop-blur-2xl'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('#home')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative h-8 w-8 rounded-lg border border-[#00ADB5]/30 bg-[#00ADB5]/10 flex items-center justify-center transition-all group-hover:border-[#00ADB5]/60 group-hover:bg-[#00ADB5]/20">
              <span className="gradient-text text-sm font-bold">J</span>
            </div>
            <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
              Jay Cris
            </span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  'relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg',
                  activeSection === link.href.replace('#', '')
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                )}
              >
                {activeSection === link.href.replace('#', '') && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-lg bg-white/[0.06]"
                    transition={{ type: 'spring', duration: 0.3 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true })
                document.dispatchEvent(event)
              }}
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500 transition-all hover:border-white/[0.12] hover:text-zinc-300"
            >
              <Command className="h-3 w-3" />
              <span>K</span>
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#contact')}
              className="rounded-lg bg-[#00ADB5] px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-[#00ADB5]"
              style={{ boxShadow: '0 0 16px rgba(0, 173, 181,0.35)' }}
            >
              Hire me
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex md:hidden items-center justify-center rounded-lg border border-white/[0.07] p-2 text-zinc-400"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-zinc-950/98 backdrop-blur-2xl pt-20 px-6 pb-8 md:hidden"
          >
            <div className="flex flex-col gap-1 mt-4">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => scrollTo(link.href)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-lg font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileOpen(false)
                  scrollTo('#contact')
                }}
                className="w-full rounded-xl bg-[#00ADB5] py-3.5 text-center font-medium text-white"
                style={{ boxShadow: '0 0 20px rgba(0, 173, 181,0.4)' }}
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
