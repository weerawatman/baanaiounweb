import type { MetadataRoute } from "next"
import { getProperties } from "@/lib/queries/properties"
import { getBlogPosts } from "@/lib/queries/blog"
import { routing } from "@/i18n/routing"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

const STATIC_PATHS = [
  "/",
  "/properties",
  "/find-property",
  "/request",
  "/services",
  "/list-property",
  "/co-agent",
  "/agent-course",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
] as const

function pathForLocale(locale: (typeof routing.locales)[number], pathname: string): string {
  if (locale === routing.defaultLocale) {
    return pathname === "/" ? BASE_URL : `${BASE_URL}${pathname}`
  }
  return pathname === "/" ? `${BASE_URL}/en` : `${BASE_URL}/en${pathname}`
}

function staticEntry(
  pathname: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap {
  const now = new Date().toISOString()
  return routing.locales.map((locale) => ({
    url: pathForLocale(locale, pathname),
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, pathForLocale(l, pathname)]),
      ),
    },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const staticPages = STATIC_PATHS.flatMap((path) => {
    const priority =
      path === "/" ? 1.0 : path === "/properties" ? 0.9 : path === "/contact" || path === "/about" ? 0.5 : 0.7
    const changeFrequency =
      path === "/properties" ? "daily" : path === "/" || path === "/blog" ? "weekly" : "monthly"
    return staticEntry(path, priority, changeFrequency)
  })

  const propertyRows = await getProperties()
  const propertyPages: MetadataRoute.Sitemap = propertyRows.flatMap((p) =>
    routing.locales.map((locale) => ({
      url: pathForLocale(locale, `/property/${p.slug}`),
      lastModified: p.updated_at ?? p.created_at,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, pathForLocale(l, `/property/${p.slug}`)]),
        ),
      },
    })),
  )

  const blogRows = (await getBlogPosts()).filter((p) => p.published)
  const blogPages: MetadataRoute.Sitemap = blogRows.flatMap((post) =>
    routing.locales.map((locale) => ({
      url: pathForLocale(locale, `/blog/${post.slug}`),
      lastModified: post.published_at ?? post.updated_at ?? post.created_at ?? now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, pathForLocale(l, `/blog/${post.slug}`)]),
        ),
      },
    })),
  )

  return [...staticPages, ...propertyPages, ...blogPages]
}
