'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const dotSpringConfig = { damping: 50, stiffness: 600, mass: 0.2 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16)
      mouseY.set(e.clientY - 16)
    }

    const handleMouseDown = () => {
      cursorRef.current?.classList.add('scale-75')
      dotRef.current?.classList.add('scale-150')
    }

    const handleMouseUp = () => {
      cursorRef.current?.classList.remove('scale-75')
      dotRef.current?.classList.remove('scale-150')
    }

    const handleLinkHover = () => {
      cursorRef.current?.classList.add('scale-150', 'border-indigo-400', 'bg-indigo-500/10')
    }

    const handleLinkLeave = () => {
      cursorRef.current?.classList.remove('scale-150', 'border-indigo-400', 'bg-indigo-500/10')
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const links = document.querySelectorAll('a, button, [role="button"]')
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover)
      link.addEventListener('mouseleave', handleLinkLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover)
        link.removeEventListener('mouseleave', handleLinkLeave)
      })
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border border-indigo-500/50 transition-all duration-150 hidden lg:block"
        style={{ left: cursorX, top: cursorY }}
      />
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] h-1.5 w-1.5 translate-x-[13px] translate-y-[13px] rounded-full bg-indigo-400 transition-all duration-150 hidden lg:block"
        style={{ left: dotX, top: dotY }}
      />
    </>
  )
}
