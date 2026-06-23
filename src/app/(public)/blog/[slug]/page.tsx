import { getBlogPostBySlug } from "@/lib/queries/blog"
import { getProperties } from "@/lib/queries/properties"
import { mapBlogPost, mapProperty } from "@/lib/mappers"
import BlogPostClient from "./BlogPostClient"

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
