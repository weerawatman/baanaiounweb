import createIntlMiddleware from "next-intl/middleware"
import { type NextRequest } from "next/server"
import { routing } from "./i18n/routing"
import { updateSession } from "./lib/supabase/proxy"

const intlMiddleware = createIntlMiddleware(routing)

/**
 * Next.js 16 Proxy (formerly middleware).
 * Public routes: locale detection / prefix. Admin routes: Supabase session.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    return updateSession(request)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    "/",
    "/(th|en)/:path*",
    "/((?!api|_next|_vercel|admin|.*\\..*).*)",
    "/admin/:path*",
  ],
}
