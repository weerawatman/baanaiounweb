"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guard"
import { testimonialSchema } from "@/lib/validations/testimonial"
import type { ActionState } from "./properties"

export async function createTestimonial(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()

  const raw = Object.fromEntries(formData)
  const parsed = testimonialSchema.safeParse({
    ...raw,
    published: raw.published === "true",
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("testimonials").insert([parsed.data])

  if (error) return { error: error.message }

  revalidatePath("/admin/testimonials")
  redirect("/admin/testimonials")
}

export async function updateTestimonial(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()

  const raw = Object.fromEntries(formData)
  const parsed = testimonialSchema.safeParse({
    ...raw,
    published: raw.published === "true",
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("testimonials")
    .update(parsed.data)
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/testimonials")
  redirect("/admin/testimonials")
}

export async function deleteTestimonial(
  id: string,
): Promise<{ error?: string }> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase.from("testimonials").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/testimonials")
  return {}
}
