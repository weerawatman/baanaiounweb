"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guard"
import { propertySchema } from "@/lib/validations/property"

export interface ActionState {
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function createProperty(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin()

  const raw = Object.fromEntries(formData)
  const parsed = propertySchema.safeParse({
    ...raw,
    featured: raw.featured === "true",
    images: formData.getAll("images"),
    amenities: formData.getAll("amenities"),
    tags: formData.getAll("tags"),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("properties").insert([parsed.data])

  if (error) return { error: error.message }

  revalidatePath("/")
  revalidatePath("/admin/properties")
  redirect("/admin/properties")
}

export async function updateProperty(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()

  const raw = Object.fromEntries(formData)
  const parsed = propertySchema.safeParse({
    ...raw,
    featured: raw.featured === "true",
    images: formData.getAll("images"),
    amenities: formData.getAll("amenities"),
    tags: formData.getAll("tags"),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("properties")
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/")
  revalidatePath("/admin/properties")
  revalidatePath(`/property/${parsed.data.slug}`)
  redirect("/admin/properties")
}

export async function archiveProperty(id: string): Promise<ActionState> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase
    .from("properties")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/")
  revalidatePath("/admin/properties")
  return {}
}

export async function restoreProperty(id: string): Promise<ActionState> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase.from("properties").update({ deleted_at: null }).eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/properties")
  return {}
}
