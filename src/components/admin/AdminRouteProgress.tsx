"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * Thin top bar on admin link clicks — instant feedback before RSC navigation completes.
 */
export default function AdminRouteProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [active, setActive] = useState(false)
  const routeKey = useRef(`${pathname}?${searchParams.toString()}`)

  useEffect(() => {
    const nextKey = `${pathname}?${searchParams.toString()}`
    if (nextKey !== routeKey.current) {
      routeKey.current = nextKey
      setActive(false)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as HTMLElement).closest("a[href]")
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return

      const href = anchor.getAttribute("href")
      if (!href || !href.startsWith("/admin")) return

      const url = new URL(href, window.location.origin)
      const current = `${pathname}?${searchParams.toString()}`
      const next = `${url.pathname}${url.search}`
      if (next !== current) setActive(true)
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [pathname, searchParams])

  if (!active) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 overflow-hidden bg-primary/15"
      aria-hidden
    >
      <div className="h-full w-1/3 animate-[admin-route-progress_0.9s_ease-in-out_infinite] bg-primary" />
    </div>
  )
}
