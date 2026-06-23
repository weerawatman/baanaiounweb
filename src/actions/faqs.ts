"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guard"
import { faqSchema } from "@/lib/validations/faq"
import type { ActionState } from "./properties"

export async function upsertFaq(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()

  const raw = Object.fromEntries(formData)
  const parsed = faqSchema.safeParse(raw)

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()

  if (id) {
    const { error } = await supabase.from("faqs").update(parsed.data).eq("id", id)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from("faqs").insert([parsed.data])
    if (error) return { error: error.message }
  }

  revalidatePath("/admin/faqs")
  return {}
}

export async function deleteFaq(id: string): Promise<{ error?: string }> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase.from("faqs").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/admin/faqs")
  return {}
}
