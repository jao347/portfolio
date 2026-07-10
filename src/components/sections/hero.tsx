import { GITHUB_URL, LINKEDIN_URL, EMAIL, RESUME_URL } from '@/lib/constants'

const STATS = [
  { n: '6+', label: 'years experience' },
  { n: '30+', label: 'projects shipped' },
  { n: '15+', label: 'clients served' },
  { n: '∞', label: 'cups of coffee' },
]

const LINKS = [
  { label: 'GITHUB ↗', href: GITHUB_URL, ext: true },
  { label: 'LINKEDIN ↗', href: LINKEDIN_URL, ext: true },
  { label: 'EMAIL ✉', href: `mailto:${EMAIL}`, ext: false },
  { label: 'RESUME ↗', href: RESUME_URL, ext: true },
]

export default function Hero() {
  return (
    <section id="home" className="mt-6">
      <div className="flex flex-col items-start gap-10 sm:flex-row sm:gap-10">
        {/* taped photo */}
        <div className="relative flex-none -rotate-[2.5deg] bg-[#e9e4d6] p-[10px] pb-[30px] shadow-[0_6px_16px_rgba(0,0,0,.45)]">
          <div className="absolute -top-3 left-11 h-6 w-[76px] rotate-[4deg] bg-[rgba(220,220,215,.5)] shadow-[0_1px_3px_rgba(0,0,0,.2)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photo.jpg"
            alt="Jay Cris Bahandi"
            className="h-[210px] w-[190px] object-cover"
          />
          <div className="font-shadows mt-1.5 text-center text-base text-[#555]">
            the developer, on site
          </div>
        </div>

        {/* intro column */}
        <div className="pt-1.5">
          <div className="font-gochi -rotate-1 text-xl text-[var(--acc)]">spec sheet — hello, I&apos;m</div>
          <h1 className="font-marker mt-1 text-[40px] leading-[1.1] text-[var(--ink)] sm:text-[54px]">
            JAY CRIS BAHANDI
          </h1>
          <div className="font-bpmono mt-2.5 text-[13px] tracking-[2px] text-[var(--label)]">
            SENIOR FULL-STACK DEVELOPER · CEBU, PHILIPPINES
          </div>
          <p className="mt-4 max-w-[600px] text-[15px] leading-[26px] text-[var(--body)]">
            I build scalable applications, AI-powered automations, and modern digital
            systems that deliver exceptional user experiences — from backend APIs to
            blockchain integrations.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3.5">
            <div
              className="font-bpmono rounded border-[3px] border-[var(--stamp)] px-3.5 py-2 text-xs font-bold tracking-[2px] text-[var(--stamp)]"
              style={{ '--rot': '2deg', transform: 'rotate(2deg)', animation: 'bp-thump .2s ease-out' } as React.CSSProperties}
            >
              AVAILABLE FOR WORK
            </div>
            {LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="font-bpmono rounded border border-[var(--line-strong)] px-3.5 py-[9px] text-xs tracking-[1px] text-[var(--body-3)] no-underline transition-colors hover:border-[var(--acc)] hover:text-[var(--acc)]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="mt-10 grid grid-cols-2 border border-[var(--line-strong)] sm:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-5 py-4 sm:border-r sm:last:border-r-0 border-[var(--line-strong)] ${i < 2 ? 'border-b sm:border-b-0' : ''} ${i % 2 === 0 ? 'border-r sm:border-r' : ''}`}
          >
            <div className="font-marker text-[36px] leading-none text-[var(--acc)]">{s.n}</div>
            <div className="font-bpmono mt-1 text-[10px] uppercase tracking-[1px] text-[var(--label)]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
