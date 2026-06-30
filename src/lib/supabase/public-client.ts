import { createClient } from "@supabase/supabase-js"

/**
 * Module-level Supabase client for reading PUBLIC data only.
 * Does NOT call cookies() — keeps public routes out of dynamic rendering.
 * Use this in any server query that doesn't require the user's auth session.
 * Admin queries that need the auth session still use src/lib/supabase/server.ts.
 */
export const publicClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)
