import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import LoadingScreen from '@/components/shared/loading-screen'
import CustomCursor from '@/components/shared/cursor'
import ScrollProgress from '@/components/shared/scroll-progress'
import CommandPalette from '@/components/shared/command-palette'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Jay Cris Bahandi — Full-Stack Developer',
  description:
    'Senior full-stack developer from Cebu, Philippines specializing in React, Next.js, Node.js, Web3, and AI automation. Building scalable applications and exceptional digital experiences.',
  keywords: [
    'full-stack developer', 'React developer', 'Next.js developer', 'Node.js',
    'TypeScript', 'Web3', 'blockchain', 'AI automation', 'NestJS', 'PostgreSQL',
    'Cebu Philippines', 'remote developer', 'freelance developer',
  ],
  authors: [{ name: 'Jay Cris Bahandi', url: 'https://jaycris.dev' }],
  creator: 'Jay Cris Bahandi',
  metadataBase: new URL('https://jaycris.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jaycris.dev',
    title: 'Jay Cris Bahandi — Full-Stack Developer',
    description:
      'Senior full-stack developer specializing in React, Next.js, Web3, and AI automation systems.',
    siteName: 'Jay Cris Bahandi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jay Cris Bahandi — Full-Stack Developer',
    description:
      'Senior full-stack developer specializing in React, Next.js, Web3, and AI automation systems.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#09090b] text-zinc-50 antialiased selection:bg-indigo-500/30 selection:text-white">
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <CommandPalette />
        {children}
      </body>
    </html>
  )
}
