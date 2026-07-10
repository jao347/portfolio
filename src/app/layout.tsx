import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Permanent_Marker, Gochi_Hand, Shadows_Into_Light } from 'next/font/google'
import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const marker = Permanent_Marker({
  weight: '400',
  variable: '--font-marker',
  subsets: ['latin'],
})

const gochi = Gochi_Hand({
  weight: '400',
  variable: '--font-gochi',
  subsets: ['latin'],
})

const shadows = Shadows_Into_Light({
  weight: '400',
  variable: '--font-shadows',
  subsets: ['latin'],
})

const SITE_URL = 'https://jcnbahandi.vercel.app'
const OG_DESCRIPTION =
  'Senior full-stack developer specializing in React, Next.js, Web3, and AI automation systems.'

export const metadata: Metadata = {
  title: 'Jay Cris Bahandi — Full-Stack Developer',
  description:
    'Senior full-stack developer from Cebu, Philippines with 6+ years of experience specializing in React, Next.js, Node.js, Web3, and AI automation. Building scalable applications and exceptional digital experiences.',
  keywords: [
    'Jay Cris Bahandi',
    'full-stack developer',
    'React developer',
    'Next.js developer',
    'Node.js developer',
    'TypeScript developer',
    'Web3 developer',
    'blockchain developer',
    'AI automation',
    'NestJS',
    'PostgreSQL',
    'Cebu Philippines developer',
    'remote developer',
    'freelance developer',
    'senior software engineer',
    'frontend developer',
    'backend developer',
    'software engineer Philippines',
    'hire developer Philippines',
  ],
  authors: [{ name: 'Jay Cris Bahandi', url: SITE_URL }],
  creator: 'Jay Cris Bahandi',
  applicationName: 'Jay Cris Bahandi Portfolio',
  category: 'technology',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Jay Cris Bahandi — Full-Stack Developer',
    description: OG_DESCRIPTION,
    siteName: 'Jay Cris Bahandi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jay Cris Bahandi — Full-Stack Developer',
    description: OG_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#101319',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${marker.variable} ${gochi.variable} ${shadows.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jay Cris Bahandi',
              url: 'https://jcnbahandi.vercel.app',
              jobTitle: 'Senior Full-Stack Developer',
              description:
                'Senior full-stack developer from Cebu, Philippines with 6+ years of experience building production applications in React, Next.js, Node.js, Web3, and AI automation.',
              image: 'https://jcnbahandi.vercel.app/opengraph-image',
              email: 'jcnbahandi@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cebu City',
                addressCountry: 'PH',
              },
              sameAs: [
                'https://github.com/jao347',
                'https://www.linkedin.com/in/jay-cris-bahandi-0a3b9821a/',
              ],
              knowsAbout: [
                'React', 'Next.js', 'Node.js', 'TypeScript', 'NestJS',
                'PostgreSQL', 'Web3', 'Blockchain', 'AI Automation',
                'Docker', 'AWS', 'Full-Stack Development',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
