"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guard"
import { blogSchema } from "@/lib/validations/blog"
import type { ActionState } from "./properties"

export async function createBlogPost(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()

  const raw = Object.fromEntries(formData)
  const parsed = blogSchema.safeParse({
    ...raw,
    published: raw.published === "true",
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const insertData = {
    ...parsed.data,
    published_at: parsed.data.published ? new Date().toISOString() : null,
  }

  const { error } = await supabase.from("blog_posts").insert([insertData])

  if (error) return { error: error.message }

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
  redirect("/admin/blog")
}

export async function updateBlogPost(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()

  const raw = Object.fromEntries(formData)
  const parsed = blogSchema.safeParse({
    ...raw,
    published: raw.published === "true",
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const updateData = {
    ...parsed.data,
    updated_at: new Date().toISOString(),
    published_at: parsed.data.published ? new Date().toISOString() : null,
  }

  const { error } = await supabase
    .from("blog_posts")
    .update(updateData)
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/blog")
  revalidatePath(`/blog/${parsed.data.slug}`)
  revalidatePath("/admin/blog")
  redirect("/admin/blog")
}

export async function deleteBlogPost(id: string): Promise<{ error?: string }> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
  return {}
}
