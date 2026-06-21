'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Zap, Coffee, Code2, Globe } from 'lucide-react'
import SectionHeading from '@/components/shared/section-heading'
import { MagicBentoGrid, MagicCard } from '@/components/shared/magic-bento'

const STATS = [
  { label: 'Years Experience', value: '6+', icon: Calendar },
  { label: 'Projects Shipped', value: '30+', icon: Code2 },
  { label: 'Clients Served', value: '15+', icon: Globe },
  { label: 'Cups of Coffee', value: '∞', icon: Coffee },
]

const SPECIALTIES = [
  'Full-Stack Web Development',
  'AI & Automation Systems',
  'Web3 & Blockchain Apps',
  'Enterprise Architecture',
  'API Design & Integration',
  'UI/UX Implementation',
]

function BentoCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      <MagicCard className="glass h-full rounded-2xl p-6">{children}</MagicCard>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About Me"
          title="Building products with"
          titleHighlight="purpose & craft"
          description="I'm a full-stack developer from Cebu, Philippines with 6+ years of experience shipping production applications across industries."
        />

        {/* Bento Grid */}
        <MagicBentoGrid
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto"
          enableMagnetism={false}
          enableTilt={false}
        >
          {/* Bio - large card */}
          <BentoCard className="md:col-span-2 md:row-span-2" delay={0}>
            <div className="flex flex-col h-full">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl border border-[#00ADB5]/20 bg-[#00ADB5]/10 flex items-center justify-center">
                  <span className="gradient-text font-bold text-lg">J</span>
                </div>
                <div>
                  <p className="font-semibold text-zinc-100">Jay Cris Bahandi</p>
                  <p className="text-xs text-zinc-500">Senior Full-Stack Developer</p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  I&apos;m a passionate full-stack developer with over 6 years of experience building
                  production-grade applications across different industries — from enterprise procurement
                  systems to blockchain-powered marketplaces.
                </p>
                <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                  My approach combines strong engineering principles with product-focused thinking.
                  I care deeply about both the technical quality of the code and the experience
                  it creates for end users. Whether it&apos;s designing a scalable API architecture
                  or crafting pixel-perfect interfaces, I bring the same level of attention to detail.
                </p>
                <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                  Beyond traditional web development, I&apos;ve been deeply involved in AI automation
                  workflows and Web3 applications — areas I believe represent the next wave of
                  transformative software.
                </p>
              </div>

              {/* Specialties */}
              <div className="mt-6 flex flex-wrap gap-2">
                {SPECIALTIES.map(s => (
                  <span
                    key={s}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Location */}
          <BentoCard delay={0.1}>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#00ADB5]/10">
                <MapPin className="h-4 w-4 text-[#00ADB5]" />
              </div>
              <div>
                <p className="font-medium text-zinc-200 text-sm">Location</p>
                <p className="text-xs text-zinc-500 mt-0.5">Based in</p>
              </div>
            </div>
            <p className="text-2xl font-semibold text-zinc-100">Cebu,</p>
            <p className="text-2xl font-semibold gradient-text">Philippines</p>
            <p className="mt-3 text-xs text-zinc-600">GMT+8 · Open to remote work worldwide</p>
          </BentoCard>

          {/* Availability */}
          <BentoCard delay={0.15}>
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ADB5] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ADB5]" />
              </span>
              <p className="text-xs font-medium text-[#00ADB5] uppercase tracking-widest">Available</p>
            </div>
            <p className="font-semibold text-zinc-100 text-sm">Open to Opportunities</p>
            <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
              Actively looking for exciting full-time roles, freelance projects, or consulting work.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Remote', 'Full-time', 'Freelance'].map(t => (
                <span key={t} className="rounded-md border border-[#00ADB5]/20 bg-[#00ADB5]/10 px-2.5 py-1 text-[11px] text-[#00ADB5]">
                  {t}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Stats row */}
          {STATS.map((stat, i) => (
            <BentoCard key={stat.label} delay={0.2 + i * 0.05} className="text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-[#00ADB5]" />
                </div>
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-zinc-500 text-center leading-tight">{stat.label}</p>
              </div>
            </BentoCard>
          ))}

          {/* Currently working with */}
          <BentoCard delay={0.3} className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-[#00ADB5]" />
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Current Stack</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Next.js 15', 'TypeScript', 'NestJS', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'Wagmi', 'Docker'].map(tech => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-[#00ADB5]/30 hover:bg-[#00ADB5]/[0.08] hover:text-[#00ADB5]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </BentoCard>
        </MagicBentoGrid>
      </div>
    </section>
  )
}
