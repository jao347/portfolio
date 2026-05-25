'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(to right, #6366f1, #8b5cf6, #ec4899)',
      }}
    />
  )
}
