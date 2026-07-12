import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import { getPublishedBlogPosts } from "@/lib/queries/blog"
import { getProfile } from "@/lib/queries/profile"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { mapBlogPost, mapFaq } from "@/lib/mappers"
import { getLocalizedFaqItems } from "@/lib/faq-items"
import type { Locale } from "@/i18n/routing"
import { pickLocalized, pickPipeBilingual } from "@/lib/i18n/pick-localized"
import BlogPage from "./BlogPage"

export const revalidate = 1800

const BLOG_SEO = {
  title: "บทความน่าอ่าน จากบ้านไออุ่น | Baan Ai Oun Blog",
  description: {
    th: "ความรู้ด้านอสังหาริมทรัพย์ บ้านบึง ชลบุรี EEC จากทีมบ้านไออุ่น — เรื่องกู้บ้าน วางแผนการเงิน เจาะลึกทำเล",
    en: "Real estate knowledge from Baan Ai Oun — home loans, financial planning, location insights for Ban Bueng, Chonburi, EEC.",
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  const { buildPageMetadata } = await import("@/lib/i18n/metadata")

  return buildPageMetadata({
    locale,
    pathname: "/blog",
    title: pickPipeBilingual(locale, BLOG_SEO.title),
    description: pickLocalized(locale, BLOG_SEO.description),
  })
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "บทความบ้านไออุ่น พร็อพเพอร์ตี้",
  url: `${BASE_URL}/blog`,
  description: "ความรู้ด้านอสังหาริมทรัพย์ บ้านบึง ชลบุรี EEC จากทีมบ้านไออุ่น",
  publisher: {
    "@type": "Organization",
    name: "บ้านไออุ่น พร็อพเพอร์ตี้",
  },
}

export default async function BlogRoute() {
  const [rows, profile, faqRows] = await Promise.all([
    getPublishedBlogPosts(),
    getProfile(),
    getFaqsByPage("blog"),
  ])
  const posts = rows.map(mapBlogPost)
  const faqs = await getLocalizedFaqItems(faqRows.map(mapFaq))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogPage
        posts={posts}
        faqs={faqs}
        blogHeroImage={profile.blogHeroImage || profile.heroImageUrl}
      />
    </>
  )
}
