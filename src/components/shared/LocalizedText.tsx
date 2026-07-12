import { getLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { pickLocalized, type BilingualPair } from "@/lib/i18n/pick-localized"

interface LocalizedTextProps {
  pair: BilingualPair
  as?: "span" | "p" | "div"
  className?: string
}

/** Server component: renders one language from a th/en content pair. */
export default async function LocalizedText({
  pair,
  as: Tag = "span",
  className,
}: LocalizedTextProps) {
  const locale = (await getLocale()) as Locale
  return <Tag className={className}>{pickLocalized(locale, pair)}</Tag>
}
