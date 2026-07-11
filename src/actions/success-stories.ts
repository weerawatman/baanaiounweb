"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guard"
import { successStorySchema } from "@/lib/validations/success-story"
import type { ActionState } from "./properties"

function revalidateSuccessStories() {
  revalidateTag("success-stories", "max")
  revalidatePath("/")
  revalidatePath("/admin/success-stories")
}

export async function createSuccessStory(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()

  const raw = Object.fromEntries(formData)
  const parsed = successStorySchema.safeParse({
    ...raw,
    published: raw.published === "true",
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("success_stories").insert([parsed.data])

  if (error) return { error: error.message }

  revalidateSuccessStories()
  redirect("/admin/success-stories")
}

export async function updateSuccessStory(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()

  const raw = Object.fromEntries(formData)
  const parsed = successStorySchema.safeParse({
    ...raw,
    published: raw.published === "true",
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("success_stories").update(parsed.data).eq("id", id)

  if (error) return { error: error.message }

  revalidateSuccessStories()
  redirect("/admin/success-stories")
}

export async function deleteSuccessStory(id: string): Promise<{ error?: string }> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase.from("success_stories").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidateSuccessStories()
  return {}
}
