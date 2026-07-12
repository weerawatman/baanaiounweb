import { notFound } from "next/navigation"

/**
 * Catch-all for unmatched localized paths — renders the [locale] not-found
 * page. Required because the root layout was split per next-intl's
 * multiple-root-layouts setup, so 404s must resolve inside [locale].
 */
export default function CatchAllPage() {
  notFound()
}
