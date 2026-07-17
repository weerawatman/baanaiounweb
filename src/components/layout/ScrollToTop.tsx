"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Next.js's built-in scroll-to-top-on-navigate does not fire reliably when
 * the page you navigate FROM reads useSearchParams() inside a Suspense
 * boundary (e.g. /properties) — confirmed by reproduction: clicking a
 * property card from a scrolled listing landed the new page mid-scroll
 * instead of at the top. This force-resets scroll on every pathname change
 * as a robust, pathname-only trigger (query-string-only updates on the same
 * page, e.g. adjusting filters, do not re-trigger it).
 */
export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])

  return null
}
