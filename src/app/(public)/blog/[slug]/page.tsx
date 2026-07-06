import type { Metadata } from "next"
import { getBlogPostBySlug } from "@/lib/queries/blog"
import { getRelatedProperties } from "@/lib/queries/properties"
import { getProfile } from "@/lib/queries/profile"
import { createServerSupabase } from "@/lib/supabase"
import { mapBlogPost, mapProperty } from "@/lib/mappers"
import { SITE_CONFIG } from "@/config/site"
import BlogPostClient from "./BlogPostClient"

export const revalidate = 86400

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

export async function generateStaticParams() {
  const supabase = createServerSupabase()
  if (!supabase) return []
  const { data } = await supabase.from("blog_posts").select("slug").eq("published", true).limit(200)
  return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const row = await getBlogPostBySlug(slug)
  if (!row) return { title: "บทความ | บ้านไออุ่น" }
  const post = mapBlogPost(row)
  const description = post.excerpt || `${post.title} — บทความอสังหาริมทรัพย์จาก บ้านไออุ่น`
  return {
    title: `${post.title} | บ้านไออุ่น`,
    description,
    openGraph: {
      title: `${post.title} | บ้านไออุ่น`,
      description,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  }
}

function buildBlogPostingJsonLd(
  post: ReturnType<typeof mapBlogPost>,
  authorName: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.featuredImage ? [post.featuredImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: "Real Estate Investment & Renovation Expert",
      knowsAbout: ["Real Estate", "อสังหาริมทรัพย์", "การรีโนเวท"],
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      alternateName: SITE_CONFIG.nameEn,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    inLanguage: ["th", "en"],
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [row, profile] = await Promise.all([getBlogPostBySlug(slug), getProfile()])
  const post = row ? mapBlogPost(row) : null

  const relatedProperties = post?.relatedPropertyIds.length
    ? (await getRelatedProperties(post.relatedPropertyIds)).map(mapProperty)
    : []

  const blogPostingJsonLd = post
    ? buildBlogPostingJsonLd(post, profile.name || SITE_CONFIG.pim.name)
    : null

  return (
    <>
      {blogPostingJsonLd && (
        <script
          type="application/ld+json"
          data-testid="blog-posting-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
        />
      )}
      <BlogPostClient
        post={post}
        relatedProperties={relatedProperties}
        lineUrl={profile.lineUrl}
      />
    </>
  )
}
