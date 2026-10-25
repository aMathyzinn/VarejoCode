import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://varejocode.com.br'
  const lastReviewed = new Date('2026-10-25T00:00:00.000Z')

  return [
    { url: `${baseUrl}/por-que-barato/`, lastModified: lastReviewed, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${baseUrl}/`,
      lastModified: lastReviewed,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio/`,
      lastModified: lastReviewed,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tecnologias/`,
      lastModified: lastReviewed,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/termos/`,
      lastModified: lastReviewed,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacidade/`,
      lastModified: lastReviewed,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
