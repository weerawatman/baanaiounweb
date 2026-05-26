import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// ─── Client-side Supabase (lazy singleton) ───────────────────────────────

let _client: SupabaseClient | null = null

export function getSupabase() {
  if (_client) return _client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    console.warn("[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
    return null
  }

  _client = createClient(url, anonKey)
  return _client
}

// ─── Server-side Supabase (service role, for API routes) ─────────────────

export function createServerSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    console.warn("[Supabase] Missing env vars — database operations will be skipped")
    return null
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}
