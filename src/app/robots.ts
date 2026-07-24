import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/apply' },
    sitemap: 'https://jcnbahandi.vercel.app/sitemap.xml',
  }
}
