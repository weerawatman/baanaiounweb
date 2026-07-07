"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guard"
import { profileSchema } from "@/lib/validations/profile"
import type { ActionState } from "./properties"

export async function upsertProfile(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin()

  const raw = Object.fromEntries(formData)
  const parsed = profileSchema.safeParse(raw)

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()

  const { map_lat, map_lng, ...rest } = parsed.data
  const row = {
    id: 1,
    ...rest,
    map_lat: map_lat.trim() ? Number(map_lat) : null,
    map_lng: map_lng.trim() ? Number(map_lng) : null,
  }

  const { error } = await supabase.from("agent_profile").upsert(row)

  if (error) return { error: error.message }

  // profile แสดงเกือบทุกหน้า public → revalidate กว้างๆ
  revalidatePath("/", "layout")

  return {}
}
