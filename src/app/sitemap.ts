import type { MetadataRoute } from 'next'
import { SERVICES } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://usalatinoprime.com'
  const now = new Date()

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/sobre-nosotros`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...SERVICES.map((s) => ({
      url: `${base}/servicios/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}
