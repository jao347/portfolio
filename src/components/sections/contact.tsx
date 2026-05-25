'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, ArrowUpRight, CheckCircle, Loader2 } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/shared/icons'
import SectionHeading from '@/components/shared/section-heading'
import { cn } from '@/lib/utils'
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/lib/constants'

const SOCIALS = [
  {
    label: 'GitHub',
    handle: '@jao347',
    href: GITHUB_URL,
    icon: GithubIcon,
    color: 'hover:border-zinc-500/40 hover:bg-zinc-500/10 hover:text-zinc-200',
  },
  {
    label: 'LinkedIn',
    handle: 'Jay Cris Bahandi',
    href: LINKEDIN_URL,
    icon: LinkedinIcon,
    color: 'hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300',
  },
  {
    label: 'Email',
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    color: 'hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300',
  },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

function Input({
  label,
  id,
  type = 'text',
  required,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string
  id: string
  type?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-xs font-medium text-zinc-400">
        {label}
        {required && <span className="ml-1 text-indigo-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all focus:border-indigo-500/50 focus:bg-indigo-500/[0.04] focus:ring-1 focus:ring-indigo-500/30"
      />
    </div>
  )
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const update = (field: keyof FormData) => (value: string) =>
    setData(d => ({ ...d, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')

    // Simulate form submission
    await new Promise(res => setTimeout(res, 1500))
    setFormState('success')
    setData({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setFormState('idle'), 4000)
  }

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          titleHighlight="great together"
          description="Have a project in mind or want to discuss an opportunity? I'd love to hear from you."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Availability */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <p className="text-xs font-medium text-emerald-400 uppercase tracking-widest">Available Now</p>
              </div>
              <h3 className="font-semibold text-zinc-100 text-base mb-2">Ready to collaborate</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                I&apos;m currently open to full-time roles, freelance projects, and consulting engagements.
                Response time: within 24 hours.
              </p>
              <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-indigo-400" />
                Cebu, Philippines · GMT+8
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-2.5">
              {SOCIALS.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className={cn(
                    'flex items-center gap-3 glass rounded-xl p-4 text-zinc-400 transition-all duration-200',
                    'border border-white/[0.07]', s.color
                  )}
                >
                  <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.04]">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-600">{s.label}</p>
                    <p className="text-sm font-medium truncate">{s.handle}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="h-16 w-16 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100">Message sent!</h3>
                  <p className="text-sm text-zinc-500 max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Your Name"
                      id="name"
                      required
                      value={data.name}
                      onChange={update('name')}
                      placeholder="John Smith"
                    />
                    <Input
                      label="Email Address"
                      id="email"
                      type="email"
                      required
                      value={data.email}
                      onChange={update('email')}
                      placeholder="john@company.com"
                    />
                  </div>

                  <Input
                    label="Subject"
                    id="subject"
                    required
                    value={data.subject}
                    onChange={update('subject')}
                    placeholder="Project inquiry, job opportunity, consultation..."
                  />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-zinc-400">
                      Message <span className="text-indigo-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      value={data.message}
                      onChange={e => update('message')(e.target.value)}
                      placeholder="Tell me about your project, timeline, budget, or anything else you'd like to discuss..."
                      rows={5}
                      className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all focus:border-indigo-500/50 focus:bg-indigo-500/[0.04] focus:ring-1 focus:ring-indigo-500/30 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formState === 'loading'}
                    whileHover={{ scale: formState === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: formState === 'loading' ? 1 : 0.98 }}
                    className={cn(
                      'flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold text-white transition-all',
                      'disabled:opacity-70 disabled:cursor-not-allowed',
                    )}
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      boxShadow: '0 0 20px rgba(99,102,241,0.35)',
                    }}
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-zinc-600">
                    Or email me directly at{' '}
                    <a href={`mailto:${EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                      {EMAIL}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
