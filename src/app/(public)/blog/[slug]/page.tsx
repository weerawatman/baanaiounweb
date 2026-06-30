import type { Metadata } from "next"
import { getBlogPostBySlug } from "@/lib/queries/blog"
import { getRelatedProperties } from "@/lib/queries/properties"
import { createServerSupabase } from "@/lib/supabase"
import { mapBlogPost, mapProperty } from "@/lib/mappers"
import BlogPostClient from "./BlogPostClient"

export const revalidate = 86400

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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // getBlogPostBySlug is React.cache() — second call (from generateMetadata) is free
  const row = await getBlogPostBySlug(slug)
  const post = row ? mapBlogPost(row) : null

  const relatedProperties = post?.relatedPropertyIds.length
    ? (await getRelatedProperties(post.relatedPropertyIds)).map(mapProperty)
    : []

  return <BlogPostClient post={post} relatedProperties={relatedProperties} />
}
