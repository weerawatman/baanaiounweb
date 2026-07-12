import type { Metadata } from "next"
import { getPublishedBlogPosts } from "@/lib/queries/blog"
import { getProfile } from "@/lib/queries/profile"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { mapBlogPost, mapFaq } from "@/lib/mappers"
import { mapFaqsToItems } from "@/lib/faq-items"
import BlogPage from "./BlogPage"

export const revalidate = 1800

export const metadata: Metadata = {
  title: "บทความน่าอ่าน จากบ้านไออุ่น | Baan Ai Oun Blog",
  description:
    "ความรู้ด้านอสังหาริมทรัพย์ บ้านบึง ชลบุรี EEC จากทีมบ้านไออุ่น — เรื่องกู้บ้าน วางแผนการเงิน เจาะลึกทำเล",
  openGraph: {
    title: "บทความน่าอ่าน จากบ้านไออุ่น | Baan Ai Oun Blog",
    description:
      "Real estate knowledge from Baan Ai Oun — home loans, financial planning, location insights for Ban Bueng, Chonburi, EEC.",
  },
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
  const faqs = mapFaqsToItems(faqRows.map(mapFaq))

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
