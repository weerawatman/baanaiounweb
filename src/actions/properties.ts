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

/**
 * revalidatePath() sends the path as an HTTP header value, which can only
 * hold Latin-1 bytes — a non-ASCII slug throws and aborts the whole action
 * before the redirect runs (this is exactly what happened in production on
 * 2026-07-17 with a Thai-character slug). The slug schema now rejects
 * non-ASCII values before we get here, but this stays as a safety net so a
 * bad path can never take down the save/redirect flow.
 */
function safeRevalidatePath(path: string): void {
  try {
    revalidatePath(path)
  } catch (err) {
    console.error(`[revalidatePath] Failed for "${path}":`, err)
  }
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

  safeRevalidatePath("/")
  safeRevalidatePath("/admin/properties")
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

  safeRevalidatePath("/")
  safeRevalidatePath("/admin/properties")
  safeRevalidatePath(`/property/${parsed.data.slug}`)
  redirect("/admin/properties")
}

export async function toggleFeaturedProperty(id: string, featured: boolean): Promise<ActionState> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase
    .from("properties")
    .update({ featured, updated_at: new Date().toISOString() })
    .eq("id", id)

  if (error) return { error: error.message }

  safeRevalidatePath("/")
  safeRevalidatePath("/admin/properties")
  return {}
}

export async function archiveProperty(id: string): Promise<ActionState> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase
    .from("properties")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)

  if (error) return { error: error.message }

  safeRevalidatePath("/")
  safeRevalidatePath("/admin/properties")
  return {}
}

export async function restoreProperty(id: string): Promise<ActionState> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase.from("properties").update({ deleted_at: null }).eq("id", id)

  if (error) return { error: error.message }

  safeRevalidatePath("/admin/properties")
  return {}
}
