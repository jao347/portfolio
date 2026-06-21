import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Public endpoint = trust boundary. Validate before doing anything.
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const subject = String(body.subject ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || !message || !isEmail(email)) {
    return NextResponse.json({ error: 'Missing or invalid fields.' }, { status: 400 })
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json({ error: 'Input too long.' }, { status: 400 })
  }

  const { SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env
  if (!SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ error: 'Email not configured.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // ponytail: local antivirus/proxy MITMs TLS and breaks cert verification.
    // Relax ONLY in dev; production stays strict. Proper fix: NODE_EXTRA_CA_CERTS.
    ...(process.env.NODE_ENV !== 'production' && {
      tls: { rejectUnauthorized: false },
    }),
  })

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${SMTP_USER}>`, // ponytail: Gmail forces from = authed account; replyTo carries the sender.
      to: CONTACT_TO || SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: subject || `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send.' }, { status: 502 })
  }
}
