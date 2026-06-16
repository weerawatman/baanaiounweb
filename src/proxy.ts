import { type NextRequest } from "next/server"
import { updateSession } from "./lib/supabase/proxy"

/**
 * Next.js 16 Proxy (formerly middleware).
 * Refreshes the Supabase session and protects /admin routes.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  // Run only on admin routes (login is handled inside updateSession).
  matcher: ["/admin/:path*"],
}
