import { unstable_cache } from "next/cache"
import { publicClient } from "@/lib/supabase/public-client"
import { createClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/types/property"

const LIST_FIELDS =
  "id, slug, title, title_en, excerpt, excerpt_en, category, category_slug, featured_image, published, published_at, created_at"

// ─── Public (ISR-cached) ─────────────────────────────────────────────────────

export const getPublishedBlogPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    const { data, error } = await publicClient
      .from("blog_posts")
      .select(LIST_FIELDS)
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(100)
    if (error) throw new Error(error.message)
    return (data as BlogPost[]) ?? []
  },
  ["published-blog-posts"],
  { revalidate: 900, tags: ["blog"] },
)

export const getBlogPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => {
    const { data, error } = await publicClient
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()
    if (error) return null
    return data as BlogPost
  },
  ["blog-post-by-slug"],
  { revalidate: 900, tags: ["blog"] },
)

// ─── Admin (dynamic, requires auth) ─────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return (data as BlogPost[]) ?? []
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()
  if (error) return null
  return data as BlogPost
}
