'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Download, ChevronDown, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/shared/icons'
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

const TITLES = [
  'Full-Stack Developer',
  'AI Automation Expert',
  'Web3 Engineer',
  'Systems Architect',
]

const TECH_BADGES = [
  { label: 'React', x: '10%', y: '18%', delay: 0 },
  { label: 'Next.js', x: '80%', y: '12%', delay: 0.1 },
  { label: 'TypeScript', x: '5%', y: '65%', delay: 0.2 },
  { label: 'Node.js', x: '85%', y: '55%', delay: 0.3 },
  { label: 'PostgreSQL', x: '72%', y: '78%', delay: 0.15 },
  { label: 'Docker', x: '18%', y: '82%', delay: 0.25 },
  { label: 'NestJS', x: '88%', y: '30%', delay: 0.05 },
]

const FULL_NAME_FIRST = 'Jay Cris '
const FULL_NAME_LAST = 'Bahandi'
const FULL_NAME = FULL_NAME_FIRST + FULL_NAME_LAST

function useTypingEffect(text: string, startDelay = 600, speed = 68) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, startDelay, speed])

  return { displayed, done }
}

function TypingName() {
  const { displayed, done } = useTypingEffect(FULL_NAME, 600, 130)

  const firstPart = displayed.slice(0, Math.min(displayed.length, FULL_NAME_FIRST.length))
  const lastPart = displayed.length > FULL_NAME_FIRST.length
    ? displayed.slice(FULL_NAME_FIRST.length)
    : ''

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
      style={{ lineHeight: 1.1 }}
    >
      <span className="text-white">{firstPart}</span>
      <span className="gradient-text">{lastPart}</span>
      {/* blinking cursor — hides once typing is done */}
      {!done && (
        <span
          className="ml-0.5 inline-block w-[3px] rounded-sm bg-[#00ADB5] align-middle"
          style={{
            height: '0.85em',
            animation: 'typing-cursor 0.8s step-end infinite',
          }}
        />
      )}
    </motion.h1>
  )
}

function TitleCycler() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % TITLES.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-10 sm:h-12 lg:h-14 overflow-hidden relative flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={TITLES[index]}
          initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="gradient-text text-2xl font-semibold sm:text-3xl lg:text-4xl absolute whitespace-nowrap"
        >
          {TITLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function FloatingBadge({ label, x, y, delay }: { label: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 1.2, duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'absolute hidden lg:flex items-center gap-1.5 rounded-full border border-white/[0.09]',
        'bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-zinc-300',
        'shadow-lg select-none'
      )}
      style={{ left: x, top: y, animation: `float ${8 + delay * 2}s ease-in-out infinite ${delay}s` }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#00ADB5]" />
      {label}
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { damping: 30, stiffness: 200 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), { damping: 30, stiffness: 200 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Floating tech badges */}
      {TECH_BADGES.map(badge => (
        <FloatingBadge key={badge.label} {...badge} />
      ))}

      {/* Center grid glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          className="h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, #00ADB5 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#00ADB5]/20 bg-[#00ADB5]/10 px-4 py-2 text-sm text-[#00ADB5]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ADB5] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ADB5]" />
          </span>
          Available for new projects
          <Sparkles className="h-3.5 w-3.5" />
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mb-3 text-base font-medium text-zinc-400 sm:text-lg"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name — typing effect */}
        <TypingName />

        {/* Cycling title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00ADB5]" />
          <TitleCycler />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00ADB5]" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mb-12 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          I build scalable applications, AI-powered automations, and modern digital
          systems that deliver exceptional user experiences — from backend APIs to
          blockchain integrations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #00ADB5, #00ADB5)',
              boxShadow: '0 0 24px rgba(0, 173, 181,0.4), 0 4px 15px rgba(0,0,0,0.3)',
            }}
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-zinc-200 backdrop-blur-sm transition-all hover:border-white/[0.18] hover:bg-white/[0.07]"
          >
            Contact Me
          </motion.button>

          {/* Download Resume */}
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-xl border border-white/[0.07] px-6 py-3.5 text-sm font-medium text-zinc-400 transition-all hover:border-white/[0.12] hover:text-zinc-200"
          >
            <Download className="h-4 w-4" />
            Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-10 flex items-center gap-4"
        >
          {[
            { icon: GithubIcon, href: GITHUB_URL, label: 'GitHub' },
            { icon: LinkedinIcon, href: LINKEDIN_URL, label: 'LinkedIn' },
          ].map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-500 transition-all hover:border-[#00ADB5]/30 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5]"
            >
              <s.icon className="h-4.5 w-4.5" />
            </motion.a>
          ))}

          <div className="h-4 w-px bg-zinc-800" />

          <span className="text-sm text-zinc-600">Cebu, Philippines</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-400"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  )
}
