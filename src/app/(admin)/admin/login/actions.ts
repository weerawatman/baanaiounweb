"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export interface LoginState {
  error?: string
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const redirectTo = String(formData.get("redirect") ?? "/admin")

  if (!email || !password) {
    return { error: "กรุณากรอกอีเมลและรหัสผ่าน" }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }
  }

  // Only allow internal redirect targets (prevent open redirect).
  const safeTarget = redirectTo.startsWith("/admin") ? redirectTo : "/admin"
  redirect(safeTarget)
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}
