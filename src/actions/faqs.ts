"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guard"
import { faqSchema } from "@/lib/validations/faq"
import type { ActionState } from "./properties"

export type FaqActionState = ActionState & { id?: string }

function revalidateFaqCaches() {
  revalidateTag("faqs", "max")
  revalidatePath("/admin/faqs")
  revalidatePath("/admin/profile")
}

export async function upsertFaq(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<FaqActionState> {
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
    revalidateFaqCaches()
    return { id }
  }

  const { data, error } = await supabase.from("faqs").insert([parsed.data]).select("id").single()
  if (error) return { error: error.message }

  revalidateFaqCaches()
  return { id: data.id }
}

export async function deleteFaq(id: string): Promise<{ error?: string }> {
  await requireAdmin()

  const supabase = await createClient()
  const { error } = await supabase.from("faqs").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidateFaqCaches()
  return {}
}
