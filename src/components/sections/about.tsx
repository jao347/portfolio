import SectionHeading from '@/components/shared/section-heading'

const CAPABILITIES = [
  'Full-Stack Web Development',
  'AI & Automation Systems',
  'Web3 & Blockchain Apps',
  'Enterprise Architecture',
  'API Design & Integration',
  'UI/UX Implementation',
]

const STACK = [
  'Next.js 15', 'TypeScript', 'NestJS', 'PostgreSQL',
  'Tailwind CSS', 'Framer Motion', 'Wagmi', 'Docker',
]

export default function About() {
  return (
    <section id="about" className="mt-16">
      <SectionHeading title="ABOUT ME" caption="building products with purpose & craft ✎" />

      <div className="mt-4 flex flex-col gap-9 lg:flex-row">
        {/* left column */}
        <div className="lg:flex-[1.5]">
          <p className="text-[15px] leading-[26px] text-[var(--body)]">
            I&apos;m a passionate full-stack developer with over 6 years of experience building
            production-grade applications across different industries — from enterprise procurement
            systems to blockchain-powered marketplaces.
          </p>
          <p className="mt-3.5 text-[15px] leading-[26px] text-[var(--body)]">
            My approach combines strong engineering principles with product-focused thinking. I care
            deeply about both the technical quality of the code and the experience it creates for end
            users — whether it&apos;s designing a scalable API architecture or crafting pixel-perfect
            interfaces.
          </p>
          <p className="mt-3.5 text-[15px] leading-[26px] text-[var(--body)]">
            Beyond traditional web development, I&apos;ve been deeply involved in{' '}
            <span className="border-b-[3px] border-[var(--acc)]">AI automation workflows</span> and{' '}
            <span className="border-b-[3px] border-[var(--acc)]">Web3 applications</span> — areas I
            believe represent the next wave of transformative software.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {CAPABILITIES.map(c => (
              <span
                key={c}
                className="font-bpmono rounded-[3px] border border-[var(--line-strong)] px-3 py-1.5 text-[11px] tracking-[1px] text-[var(--body-3)]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* right column — info cards */}
        <div className="flex flex-col gap-4 lg:flex-1">
          <div className="border border-[var(--line-strong)] bg-[var(--card)] px-5 py-4">
            <div className="font-bpmono text-[10px] tracking-[2px] text-[var(--label)]">BASED IN</div>
            <div className="font-marker mt-1 text-[26px] text-[var(--ink)]">Cebu, Philippines</div>
            <div className="mt-1 text-[13px] leading-5 text-[var(--body-3)]">GMT+8 · open to remote work worldwide</div>
          </div>

          <div className="border border-[var(--line-strong)] bg-[var(--card)] px-5 py-4">
            <div className="font-bpmono text-[10px] tracking-[2px] text-[var(--label)]">STATUS</div>
            <div className="font-marker mt-1 text-[22px] text-[var(--acc)]">Open to opportunities</div>
            <div className="mt-1 text-[13px] leading-5 text-[var(--body-3)]">
              full-time roles, freelance projects, or consulting work
            </div>
            <div className="mt-2.5 flex gap-2">
              {['REMOTE', 'FULL-TIME', 'FREELANCE'].map(t => (
                <span
                  key={t}
                  className="font-bpmono rounded-[3px] border border-[var(--stamp)] px-2 py-[3px] text-[10px] text-[var(--stamp)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="border border-[var(--line-strong)] bg-[var(--card)] px-5 py-4">
            <div className="font-bpmono text-[10px] tracking-[2px] text-[var(--label)]">CURRENT STACK</div>
            <div className="font-bpmono mt-1.5 text-[12px] leading-[22px] text-[var(--body-3)]">
              {STACK.join(' · ')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
