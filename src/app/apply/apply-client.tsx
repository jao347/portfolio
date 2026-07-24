'use client'

import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }
type Chat = { id: string; title: string; messages: Msg[]; updatedAt: number }

const KEY_STORAGE = 'apply_key'
const CHATS_STORAGE = 'apply_chats'
const LEGACY_THREAD = 'apply_thread'

function makeTitle(text: string) {
  const t = text.replace(/\s+/g, ' ').trim()
  return t.length > 46 ? t.slice(0, 46) + '…' : t || 'Untitled draft'
}

function relTime(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function ApplyClient() {
  const [authed, setAuthed] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [gateError, setGateError] = useState('')
  const [checking, setChecking] = useState(false)

  const [chats, setChats] = useState<Chat[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const endRef = useRef<HTMLDivElement>(null)

  const activeChat = chats.find(c => c.id === activeId) ?? null
  const messages = activeChat?.messages ?? []

  // ── load persisted state (once) ──
  useEffect(() => {
    const savedKey = sessionStorage.getItem(KEY_STORAGE)
    if (savedKey) {
      setPasscode(savedKey)
      setAuthed(true)
    }
    const raw = localStorage.getItem(CHATS_STORAGE)
    if (raw) {
      try {
        const parsed: Chat[] = JSON.parse(raw)
        setChats(parsed)
        setActiveId(parsed[0]?.id ?? null)
      } catch {
        /* corrupt — ignore */
      }
    } else {
      // migrate the old single-thread format into one chat
      const legacy = localStorage.getItem(LEGACY_THREAD)
      if (legacy) {
        try {
          const msgs: Msg[] = JSON.parse(legacy)
          if (Array.isArray(msgs) && msgs.length) {
            const first = msgs.find(m => m.role === 'user')
            const chat: Chat = {
              id: crypto.randomUUID(),
              title: makeTitle(first?.content ?? 'Draft'),
              messages: msgs,
              updatedAt: Date.now(),
            }
            setChats([chat])
            setActiveId(chat.id)
          }
        } catch {
          /* ignore */
        }
        localStorage.removeItem(LEGACY_THREAD)
      }
    }
    setLoaded(true)
  }, [])

  // ── persist chats (after initial load, so we never clobber storage with []) ──
  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(CHATS_STORAGE, JSON.stringify(chats))
  }, [chats, loaded])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeId])

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    if (!passcode.trim()) return
    setChecking(true)
    setGateError('')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-apply-key': passcode },
        body: JSON.stringify({ verify: true }),
      })
      if (res.ok) {
        sessionStorage.setItem(KEY_STORAGE, passcode)
        setAuthed(true)
      } else {
        setGateError('Wrong passcode.')
      }
    } catch {
      setGateError('Could not reach the server.')
    } finally {
      setChecking(false)
    }
  }

  function newChat() {
    setActiveId(null)
    setError('')
    setSidebarOpen(false)
  }

  function selectChat(id: string) {
    setActiveId(id)
    setError('')
    setSidebarOpen(false)
  }

  function deleteChat(id: string) {
    setChats(cs => cs.filter(c => c.id !== id))
    if (activeId === id) setActiveId(null)
  }

  async function send() {
    const text = input.trim()
    if (!text || streaming) return
    setError('')

    const base = activeChat?.messages ?? []
    const thread: Msg[] = [...base, { role: 'user', content: text }]
    const now = Date.now()

    let chatId = activeId
    if (!chatId) {
      chatId = crypto.randomUUID()
      setChats(cs => [{ id: chatId!, title: makeTitle(text), messages: thread, updatedAt: now }, ...cs])
      setActiveId(chatId)
    } else {
      setChats(cs => cs.map(c => (c.id === chatId ? { ...c, messages: thread, updatedAt: now } : c)))
    }

    setInput('')
    setStreaming(true)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 90_000)

    const rollback = () => {
      setInput(text) // let the user retry
      if (base.length === 0) {
        setChats(cs => cs.filter(c => c.id !== chatId))
        setActiveId(null)
      } else {
        setChats(cs => cs.map(c => (c.id === chatId ? { ...c, messages: base } : c)))
      }
    }

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-apply-key': passcode },
        body: JSON.stringify({ messages: thread }),
        signal: controller.signal,
      })
      const data = await res.json().catch(() => ({}) as { text?: string; error?: string })

      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem(KEY_STORAGE)
          setAuthed(false)
        }
        setError(data.error || `Request failed (${res.status}).`)
        rollback()
        return
      }
      if (!data.text) {
        setError('Empty response from the model.')
        rollback()
        return
      }
      setChats(cs =>
        cs.map(c =>
          c.id === chatId
            ? { ...c, messages: [...thread, { role: 'assistant', content: data.text! }], updatedAt: Date.now() }
            : c
        )
      )
    } catch (err) {
      setError(
        err instanceof DOMException && err.name === 'AbortError'
          ? 'Timed out after 90s — try again.'
          : 'Network error while drafting.'
      )
      rollback()
    } finally {
      clearTimeout(timeout)
      setStreaming(false)
    }
  }

  function copy(text: string, idx: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx)
      setTimeout(() => setCopied(null), 1500)
    })
  }

  // ── Lock screen ──
  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--desk)] p-4">
        <form
          onSubmit={unlock}
          className="bp-sheet w-full max-w-[420px] border border-[var(--line)] px-6 py-10 shadow-[0_12px_40px_rgba(0,0,0,.6)] sm:px-10"
        >
          <div className="font-bpmono flex justify-end">
            <span className="rotate-2 rounded border-2 border-[var(--stamp)] px-2.5 py-1 text-[10px] font-bold tracking-[2px] text-[var(--stamp)]">
              CONFIDENTIAL
            </span>
          </div>
          <h1 className="font-marker mt-4 text-[34px] leading-none text-[var(--ink)]">RESTRICTED</h1>
          <p className="font-shadows -rotate-[0.8deg] text-[16px] text-[var(--acc)]">
            application drafter — authorized use only
          </p>

          <label htmlFor="pass" className="font-bpmono mt-8 mb-1.5 block text-[10px] tracking-[2px] uppercase text-[var(--label)]">
            Passcode
          </label>
          <input
            id="pass"
            type="password"
            autoFocus
            value={passcode}
            onChange={e => setPasscode(e.target.value)}
            className="font-bpmono w-full border border-[var(--line-strong)] bg-[rgba(10,20,32,.5)] px-3 py-2.5 text-[15px] text-[var(--body)] outline-none transition-colors focus:border-[var(--acc)]"
            placeholder="••••••••"
          />
          {gateError && <p role="alert" className="font-bpmono mt-2 text-[12px] text-[var(--stamp)]">{gateError}</p>}

          <button
            type="submit"
            disabled={checking}
            className="font-bpmono mt-5 w-full rounded border-2 border-[var(--acc)] px-6 py-2.5 text-xs font-bold tracking-[2px] uppercase text-[var(--acc)] transition-colors hover:bg-[var(--acc)] hover:text-[var(--desk)] disabled:opacity-60"
          >
            {checking ? 'CHECKING…' : 'UNLOCK ↵'}
          </button>
        </form>
      </main>
    )
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <button
        onClick={newChat}
        className="font-bpmono w-full rounded border-2 border-[var(--acc)] px-3 py-2 text-[11px] font-bold tracking-[2px] uppercase text-[var(--acc)] transition-colors hover:bg-[var(--acc)] hover:text-[var(--desk)]"
      >
        + New draft
      </button>
      <div className="font-bpmono mt-5 mb-2 text-[10px] tracking-[2px] uppercase text-[var(--label)]">Recents</div>
      <div className="-mr-1 flex-1 space-y-1 overflow-y-auto pr-1">
        {chats.length === 0 && (
          <p className="font-bpmono text-[11px] leading-5 text-[var(--label)]/70">No drafts yet.</p>
        )}
        {chats.map(c => {
          const active = c.id === activeId
          return (
            <div
              key={c.id}
              className={`group flex items-center gap-1 border-l-2 px-2 py-1.5 transition-colors ${
                active
                  ? 'border-[var(--acc)] bg-[rgba(232,182,76,.08)]'
                  : 'border-transparent hover:bg-[rgba(140,190,230,.06)]'
              }`}
            >
              <button onClick={() => selectChat(c.id)} className="min-w-0 flex-1 text-left">
                <div className={`truncate text-[13px] ${active ? 'text-[var(--ink)]' : 'text-[var(--body-2)]'}`}>{c.title}</div>
                <div className="font-bpmono text-[9px] tracking-[1px] text-[var(--label)]">{relTime(c.updatedAt)}</div>
              </button>
              <button
                onClick={() => deleteChat(c.id)}
                aria-label="Delete draft"
                className="flex-none px-1 text-[13px] text-[var(--label)] opacity-0 transition-opacity hover:text-[var(--stamp)] group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )

  // ── Chat ──
  return (
    <main className="min-h-screen bg-[var(--desk)] p-3 sm:p-6">
      <div className="bp-sheet mx-auto flex min-h-[calc(100vh-24px)] w-full max-w-[1040px] border border-[var(--line)] shadow-[0_12px_40px_rgba(0,0,0,.6)] sm:min-h-[calc(100vh-48px)]">
        {/* desktop sidebar */}
        <aside className="hidden w-60 flex-none border-r border-[var(--line-strong)] p-5 sm:block">{sidebar}</aside>

        {/* mobile drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 sm:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <aside className="bp-sheet absolute inset-y-0 left-0 w-72 border-r border-[var(--line-strong)] p-5">{sidebar}</aside>
          </div>
        )}

        {/* main column */}
        <div className="flex min-w-0 flex-1 flex-col px-4 py-6 sm:px-8 sm:py-8">
          <header className="flex items-center justify-between gap-3 border-b border-dashed border-[var(--line-strong)] pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="Open recents"
                className="font-bpmono flex-none rounded-[3px] border border-[var(--line-strong)] px-2 py-1.5 text-[13px] text-[var(--body-3)] sm:hidden"
              >
                ☰
              </button>
              <div>
                <h1 className="font-marker text-[22px] leading-none text-[var(--ink)] sm:text-[26px]">APPLICATION DRAFTER</h1>
                <p className="font-shadows -rotate-[0.8deg] text-[15px] text-[var(--acc)]">paste a job description — get a tailored draft</p>
              </div>
            </div>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto py-6">
            {messages.length === 0 && !streaming && (
              <div className="font-bpmono mx-auto mt-10 max-w-[460px] text-center text-[13px] leading-6 text-[var(--label)]">
                Paste a job description below. Add an instruction if you like —
                &ldquo;make it a short recruiter message&rdquo;, &ldquo;more formal&rdquo;,
                &ldquo;answer their screening questions&rdquo;. Defaults to a tailored cover letter.
              </div>
            )}

            {messages.map((m, i) => {
              const isUser = m.role === 'user'
              return (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="font-bpmono flex items-center gap-2 text-[10px] tracking-[2px] uppercase">
                    <span style={{ color: isUser ? 'var(--label)' : 'var(--acc)' }}>{isUser ? 'You' : 'Draft'}</span>
                    {!isUser && m.content && (
                      <button
                        onClick={() => copy(m.content, i)}
                        className="rounded-[3px] border border-[var(--line)] px-1.5 py-0.5 text-[9px] tracking-[1px] text-[var(--body-3)] transition-colors hover:border-[var(--acc)] hover:text-[var(--acc)]"
                      >
                        {copied === i ? 'COPIED ✓' : 'COPY'}
                      </button>
                    )}
                  </div>
                  <div
                    className={`whitespace-pre-wrap border px-4 py-3 text-[14px] leading-[23px] ${
                      isUser
                        ? 'border-[var(--line)] bg-[rgba(10,20,32,.35)] text-[var(--body-2)]'
                        : 'border-[var(--line-strong)] bg-[rgba(10,20,32,.55)] text-[var(--body)]'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              )
            })}

            {streaming && (
              <div aria-live="polite" className="font-bpmono text-[12px] tracking-[1px] text-[var(--label)]">
                drafting…
              </div>
            )}
            <div ref={endRef} />
          </div>

          {error && <p role="alert" className="font-bpmono mb-2 text-[12px] text-[var(--stamp)]">{error}</p>}

          <div className="border-t border-dashed border-[var(--line-strong)] pt-4">
            <label htmlFor="jd" className="sr-only">Job description or instruction</label>
            <textarea
              id="jd"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={3}
              placeholder="Paste the job description here…  (Enter to send · Shift+Enter for a new line)"
              className="font-bpmono max-h-52 w-full resize-y border border-[var(--line-strong)] bg-[rgba(10,20,32,.5)] px-3 py-2.5 text-[14px] leading-[22px] text-[var(--body)] outline-none transition-colors placeholder:text-[var(--label)]/60 focus:border-[var(--acc)]"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="font-bpmono text-[10px] tracking-[1px] text-[var(--label)]">
                {streaming ? 'DRAFTING…' : 'GROUNDED IN YOUR PORTFOLIO'}
              </span>
              <button
                onClick={send}
                disabled={streaming || !input.trim()}
                className="font-bpmono rounded border-2 border-[var(--acc)] px-6 py-2 text-xs font-bold tracking-[2px] uppercase text-[var(--acc)] transition-colors hover:bg-[var(--acc)] hover:text-[var(--desk)] disabled:opacity-40"
              >
                {streaming ? 'DRAFTING…' : 'DRAFT ↵'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
