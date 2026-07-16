'use client'

import { useState } from 'react'
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/lib/constants'

type FormState = 'idle' | 'loading' | 'success' | 'error'
interface FormData { name: string; email: string; subject: string; message: string }

const FIELD =
  'w-full border border-[var(--line-strong)] bg-[rgba(10,20,32,.5)] px-3 py-2.5 text-[15px] text-[var(--body)] outline-none transition-colors placeholder:text-[var(--label)]/60 focus:border-[var(--acc)]'
const LABEL = 'font-bpmono mb-1.5 block text-[10px] tracking-[2px] uppercase text-[var(--label)]'

export default function Contact() {
  const [state, setState] = useState<FormState>('idle')
  const [data, setData] = useState<FormData>({ name: '', email: '', subject: '', message: '' })

  const update = (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData(d => ({ ...d, [f]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setState('success')
      setData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setState('idle'), 4000)
    } catch {
      setState('error')
    }
  }

  return (
    <section id="contact" className="mt-10 sm:mt-16">
      <div className="-rotate-[0.3deg] border-2 border-[var(--acc)] px-5 py-6 sm:px-10 sm:py-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="font-marker text-[28px] text-[var(--ink)] sm:text-[34px]">
              LET&apos;S BUILD SOMETHING GREAT.
            </div>
            <p className="mt-3 max-w-[480px] text-[15px] leading-[24px] text-[var(--body-2)]">
              Have a project in mind or want to discuss an opportunity? Open to full-time roles,
              freelance projects, and consulting engagements.
            </p>
            <div className="font-bpmono mt-4 text-[13px] leading-6 text-[var(--body-3)]">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <br />
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">github.com/jao347</a> ·{' '}
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">linkedin/jay-cris-bahandi</a>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="font-bpmono rotate-[3deg] rounded border-2 border-[var(--stamp)] px-3.5 py-2 text-[11px] font-bold tracking-[2px] text-[var(--stamp)]">
              REPLIES &lt; 24H
            </div>
            <div className="font-shadows -rotate-1 text-[17px] text-[var(--label)]">
              Cebu, Philippines · GMT+8
            </div>
          </div>
        </div>

        {/* form */}
        {state === 'success' ? (
          <p className="font-marker mt-8 text-[22px] text-[var(--acc)]">Message sent — talk soon! ✎</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 border-t border-dashed border-[var(--line-strong)] pt-6 sm:mt-8 sm:pt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={LABEL}>Your Name</label>
                <input id="name" required value={data.name} onChange={update('name')} className={FIELD} placeholder="John Smith" />
              </div>
              <div>
                <label htmlFor="email" className={LABEL}>Email</label>
                <input id="email" type="email" required value={data.email} onChange={update('email')} className={FIELD} placeholder="john@company.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className={LABEL}>Subject</label>
              <input id="subject" required value={data.subject} onChange={update('subject')} className={FIELD} placeholder="Project inquiry, job opportunity..." />
            </div>
            <div>
              <label htmlFor="message" className={LABEL}>Message</label>
              <textarea id="message" required rows={5} value={data.message} onChange={update('message')} className={`${FIELD} resize-none`} placeholder="Tell me about your project, timeline, or anything else..." />
            </div>

            {state === 'error' && (
              <p role="alert" className="text-[15px] text-[var(--stamp)]">
                Couldn&apos;t send. Email me directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'loading'}
              className="font-bpmono self-start rounded border-2 border-[var(--acc)] px-6 py-2.5 text-xs font-bold tracking-[2px] uppercase text-[var(--acc)] transition-colors hover:bg-[var(--acc)] hover:text-[var(--desk)] disabled:opacity-60"
            >
              {state === 'loading' ? 'SENDING...' : 'SEND MESSAGE ✉'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
