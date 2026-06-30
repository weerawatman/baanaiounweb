import { getPublishedBlogPosts } from "@/lib/queries/blog"
import { mapBlogPost } from "@/lib/mappers"
import BlogPage from "./BlogPage"

export const revalidate = 1800

export default async function BlogRoute() {
  const rows = await getPublishedBlogPosts()
  const posts = rows.map(mapBlogPost)

  return <BlogPage posts={posts} />
}
