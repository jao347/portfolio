import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Jay Cris Bahandi — Senior Full-Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TECH = ['React', 'Next.js', 'Node.js', 'TypeScript', 'Web3', 'AI']

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#222831',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 173, 181,0.18) 0%, transparent 65%)',
          }}
        />

        {/* content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            position: 'relative',
          }}
        >
          {/* availability badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(0, 173, 181,0.1)',
              border: '1px solid rgba(0, 173, 181,0.25)',
              borderRadius: 999,
              padding: '10px 24px',
              color: '#34d399',
              fontSize: 18,
              fontWeight: 500,
              marginBottom: 36,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
            Available for new projects
          </div>

          {/* name */}
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-2px',
              marginBottom: 20,
            }}
          >
            Jay Cris&nbsp;
            <span style={{ color: '#00ADB5' }}>Bahandi</span>
          </div>

          {/* subtitle */}
          <div
            style={{
              fontSize: 28,
              color: '#71717a',
              fontWeight: 400,
              marginBottom: 40,
            }}
          >
            Senior Full-Stack Developer · Cebu, Philippines
          </div>

          {/* tech badges */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
            {TECH.map(tech => (
              <div
                key={tech}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '10px 22px',
                  color: '#d4d4d8',
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* domain */}
          <div style={{ fontSize: 22, color: '#3f3f46', fontWeight: 400 }}>
            jcnbahandi.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
