'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  titleHighlight?: string
  description?: string
  centered?: boolean
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  titleHighlight,
  description,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn('mb-16', centered && 'text-center', className)}
    >
      {eyebrow && (
        <div className={cn('mb-5 inline-flex items-center gap-3', centered && 'justify-center')}>
          <span className="h-1.5 w-1.5 bg-[#00ADB5]" />
          <span className="mono-label">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}{' '}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}
