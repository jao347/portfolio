'use client'

export default function GradientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Top-left indigo orb */}
      <div
        className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Top-right violet orb */}
      <div
        className="absolute -top-20 right-0 h-[500px] w-[500px] rounded-full opacity-[0.10]"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Center pink orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Bottom-right teal orb */}
      <div
        className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Bottom-left orb */}
      <div
        className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  )
}
