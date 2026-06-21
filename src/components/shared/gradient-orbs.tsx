'use client'

// ponytail: flat "engineered" look — one faint teal wash, not a field of glow blobs.
export default function GradientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-48 left-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #00ADB5 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  )
}
