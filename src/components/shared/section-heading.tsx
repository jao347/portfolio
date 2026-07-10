interface SectionHeadingProps {
  title: string
  caption: string
}

/* Blueprint section heading: marker title + dashed baseline rule, with a
   rotated handwritten caption beneath. Static so it's always visible
   (no scroll-gated reveal that can leave it blank). */
export default function SectionHeading({ title, caption }: SectionHeadingProps) {
  return (
    <div>
      <h2 className="font-marker flex items-baseline gap-3.5 text-[28px] text-[var(--ink)] sm:text-[32px]">
        {title}
        <span className="bp-rule" />
      </h2>
      <div className="font-shadows mt-1.5 -rotate-[0.8deg] text-[17px] text-[var(--acc)]">
        {caption}
      </div>
    </div>
  )
}
