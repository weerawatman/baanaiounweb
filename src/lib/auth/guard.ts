import { cache } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { User } from "@supabase/supabase-js"

/**
 * Ensures the current request is from an authenticated admin.
 * Call at the top of every admin Server Component / Server Action.
 *
 * Defense in depth: proxy.ts already redirects unauthenticated users,
 * but Server Actions can be invoked directly, so we re-check here.
 */
export const requireAdmin = cache(async (): Promise<User> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return user
})
