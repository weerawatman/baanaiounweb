import type { MetadataRoute } from "next"
import { getProperties } from "@/lib/queries/properties"
import { getBlogPosts } from "@/lib/queries/blog"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  // ─── Static pages (canonical URLs, no redirected paths) ────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/find-property`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/list-property`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/co-agent`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/agent-course`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ]

  // ─── Property pages (from Supabase) ────────────────────────────────
  const propertyRows = await getProperties()
  const propertyPages: MetadataRoute.Sitemap = propertyRows.map((p) => ({
    url: `${BASE_URL}/property/${p.slug}`,
    lastModified: p.updated_at ?? p.created_at,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // ─── Blog pages (published, from Supabase) ─────────────────────────
  const blogRows = (await getBlogPosts()).filter((p) => p.published)
  const blogPages: MetadataRoute.Sitemap = blogRows.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.published_at ?? post.updated_at ?? post.created_at,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...propertyPages, ...blogPages]
}
