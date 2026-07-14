import createIntlMiddleware from "next-intl/middleware"
import { NextResponse, type NextRequest } from "next/server"
import { MAINTENANCE_MODE } from "./config/maintenance"
import { routing } from "./i18n/routing"
import { updateSession } from "./lib/supabase/proxy"

const intlMiddleware = createIntlMiddleware(routing)

function isMaintenancePassthrough(pathname: string): boolean {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname === "/under-construction" ||
    pathname.startsWith("/under-construction/")
  )
}

/**
 * Next.js 16 Proxy (formerly middleware).
 * Public routes: locale detection / prefix. Admin routes: Supabase session.
 * Optional hard gate: when MAINTENANCE_MODE is true, public visitors see Under Construction.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    return updateSession(request)
  }

  if (MAINTENANCE_MODE && !isMaintenancePassthrough(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = "/under-construction"
    return NextResponse.rewrite(url)
  }

  if (pathname === "/under-construction" || pathname.startsWith("/under-construction/")) {
    return NextResponse.next()
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
