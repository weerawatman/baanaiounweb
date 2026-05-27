import type { MetadataRoute } from "next"
import { MOCK_PROPERTIES } from "@/data/properties"
import { MOCK_BLOG_POSTS } from "@/data/blog-posts"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // ─── Static pages ──────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/buy`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/rent`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/land`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/owners`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/co-agent`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/academy`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ]

  // ─── Property pages ────────────────────────────────────────────────
  const propertyPages: MetadataRoute.Sitemap = MOCK_PROPERTIES.map((p) => ({
    url: `${BASE_URL}/property/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // ─── Blog pages ────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = MOCK_BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...propertyPages, ...blogPages]
}
