import { getBlogPosts } from "@/lib/queries/blog"
import { mapBlogPost } from "@/lib/mappers"
import BlogPage from "./BlogPage"

export default async function BlogRoute() {
  const rows = await getBlogPosts()
  const posts = rows
    .filter((p) => p.published)
    .map(mapBlogPost)

  return <BlogPage posts={posts} />
}
