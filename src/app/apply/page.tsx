import type { Metadata } from 'next'
import ApplyClient from './apply-client'

export const metadata: Metadata = {
  title: 'Apply',
  robots: { index: false, follow: false },
}

export default function ApplyPage() {
  return <ApplyClient />
}
