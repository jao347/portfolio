import { experiences } from '@/data/experience'
import SectionHeading from '@/components/shared/section-heading'

export default function Experience() {
  return (
    <section id="experience" className="mt-10 sm:mt-16">
      <SectionHeading title="WHERE I'VE WORKED" caption="shipping products, leading features, growing as an engineer" />

      <div className="mt-5 flex flex-col gap-4 sm:gap-[22px]">
        {experiences.map(exp => (
          <div
            key={exp.id}
            className="flex flex-col gap-3 border border-[var(--line)] bg-[rgba(10,20,32,.4)] px-4 py-4 sm:flex-row sm:gap-6 sm:px-6 sm:py-5"
          >
            {/* left rail */}
            <div className="flex-none sm:w-[150px]">
              <div className="font-bpmono text-[11px] leading-[18px] text-[var(--label)]">{exp.period}</div>
              <div className="font-bpmono mt-1.5 text-[10px] tracking-[1px] text-[var(--stamp)]">
                {exp.type.replace('-', ' ').toUpperCase()} · {exp.duration.toUpperCase()}
              </div>
              <div className="mt-1.5 text-sm text-[var(--label)]">{exp.location}</div>
            </div>

            {/* right content */}
            <div className="flex-1">
              <div className="font-gochi text-[22px] text-[var(--ink)]">
                {exp.role} <span className="text-[var(--acc)]">@ {exp.company}</span>
              </div>
              <div className="mt-1.5 text-[14px] leading-[22px] text-[var(--body-2)]">{exp.description}</div>
              <div className="mt-2.5 flex flex-col gap-1.5">
                {exp.achievements.map((a, i) => (
                  <div key={i} className="flex gap-2.5 text-[13px] leading-5 text-[var(--body-3)]">
                    <span className="text-[var(--acc)]">→</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
              <div className="font-bpmono mt-2.5 border-t border-dashed border-[var(--line)] pt-2 text-[11px] text-[var(--label)]">
                {exp.tech.join(' · ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
