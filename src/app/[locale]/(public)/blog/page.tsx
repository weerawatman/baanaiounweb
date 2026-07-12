import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { getPublishedBlogPosts } from "@/lib/queries/blog"
import { getProfile } from "@/lib/queries/profile"
import { getPageFaqs } from "@/lib/faq-items"
import { mapBlogPost } from "@/lib/mappers"
import { createPageMetadata } from "@/lib/i18n/metadata"
import BlogPage from "./BlogPage"

export const revalidate = 1800

const BLOG_SEO = {
  title: "บทความน่าอ่าน จากบ้านไออุ่น | Baan Ai Oun Blog",
  description: {
    th: "ความรู้ด้านอสังหาริมทรัพย์ บ้านบึง ชลบุรี EEC จากทีมบ้านไออุ่น — เรื่องกู้บ้าน วางแผนการเงิน เจาะลึกทำเล",
    en: "Real estate knowledge from Baan Ai Oun — home loans, financial planning, location insights for Ban Bueng, Chonburi, EEC.",
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return createPageMetadata({
    locale,
    pathname: "/blog",
    title: BLOG_SEO.title,
    description: BLOG_SEO.description,
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

export default async function BlogRoute({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const [rows, profile, faqs] = await Promise.all([
    getPublishedBlogPosts(),
    getProfile(),
    getPageFaqs("blog"),
  ])
  const posts = rows.map(mapBlogPost)

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
