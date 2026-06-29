import type { Metadata } from "next"
import { getBlogPostBySlug } from "@/lib/queries/blog"
import { getProperties } from "@/lib/queries/properties"
import { mapBlogPost, mapProperty } from "@/lib/mappers"
import BlogPostClient from "./BlogPostClient"

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
  const row = await getBlogPostBySlug(slug)
  const post = row ? mapBlogPost(row) : null

  let relatedProperties: ReturnType<typeof mapProperty>[] = []
  if (post && post.relatedPropertyIds.length > 0) {
    const allRows = await getProperties()
    relatedProperties = allRows
      .filter((p) => post.relatedPropertyIds.includes(p.id))
      .map(mapProperty)
  }

  return <BlogPostClient post={post} relatedProperties={relatedProperties} />
}
