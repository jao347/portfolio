import { buildCandidateProfile } from '@/lib/apply-profile'

export const runtime = 'nodejs'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

const systemPrompt = (profile: string) => `You are an expert job-application writer working on behalf of Jay Cris Bahandi, a senior full-stack developer.

Given a job description (and any instructions) from the user, produce the application material they ask for — a cover letter, a short recruiter outreach message, tailored resume bullets, answers to screening questions, and so on. If they don't specify a format, write a concise, tailored cover letter.

HARD RULES — do not break these:
- Truth only. Use ONLY the background below. NEVER claim experience, domains, tools, certifications, or years the candidate does not have. If the job asks for something absent from the background (e.g. payment/PCI/3DS, .NET, a specific framework), do NOT fabricate it. Instead, honestly lead with the closest transferable strengths and express genuine ability and eagerness to ramp up fast. It is better to be honest about a gap than to invent experience.
- Never inflate tenure. The candidate has 6+ years of experience — do not round up to match a job's ask.
- Use the candidate's REAL identity from the background: name "Jay Cris Bahandi", the real email, GitHub, and LinkedIn. NEVER use bracketed placeholders like [Your Name], [Company], [Date], [LinkedIn]. Do not include a date line at all.

STYLE:
- Mirror the job's language and keywords only where it is truthful.
- Be specific and results-oriented; avoid generic filler and clichés.
- Confident, professional, human tone. Return ready-to-send text.

CANDIDATE BACKGROUND
${profile}`

export async function POST(req: Request) {
  // ── passcode gate — protects the OpenAI spend ──
  // ponytail: plain compare + per-request header; add signed cookie/session if this ever goes multi-user
  const expected = process.env.APPLY_PASSCODE
  const provided = req.headers.get('x-apply-key') ?? ''
  if (!expected || provided !== expected) return json({ error: 'Invalid passcode.' }, 401)

  let body: { verify?: boolean; messages?: { role: string; content: string }[] }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Bad request.' }, 400)
  }

  // lock-screen ping: passcode already validated above
  if (body.verify) return json({ ok: true })

  const messages = body.messages
  if (!Array.isArray(messages) || messages.length === 0) {
    return json({ error: 'No messages provided.' }, 400)
  }

  const key = process.env.OPENAI_API_KEY
  if (!key) return json({ error: 'OpenAI API key is not configured on the server.' }, 500)
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  // Non-streaming: return the full completion as JSON. Streaming responses get
  // buffered/held by local proxy/AV in this environment (plain JSON works fine),
  // so a single response is the robust choice for a personal tool.
  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt(buildCandidateProfile()) }, ...messages],
    }),
  })

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => '')
    return json({ error: `OpenAI request failed (${upstream.status}).`, detail: detail.slice(0, 300) }, 502)
  }

  const data = await upstream.json().catch(() => null)
  const text = data?.choices?.[0]?.message?.content
  if (!text) return json({ error: 'Empty response from the model.' }, 502)
  return json({ text })
}
