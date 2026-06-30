import { cache } from "react"
import { createClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/types/property"

const LIST_FIELDS =
  "id, slug, title, excerpt, featured_image, category_slug, published, published_at, created_at"

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select(LIST_FIELDS)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(100)
  if (error) throw new Error(error.message)
  return (data as BlogPost[]) ?? []
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return (data as BlogPost[]) ?? []
}

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error) return null
  return data as BlogPost
})

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

  if (error) return null
  return data as BlogPost
}
