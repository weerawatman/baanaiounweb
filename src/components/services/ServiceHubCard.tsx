import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/routing"
import { pickLocalized, type BilingualPair } from "@/lib/i18n/pick-localized"
import { ThaiText } from "@/lib/thai-wrap"

interface ServiceHubCardProps {
  href: string
  emoji: string
  title: BilingualPair
  description: BilingualPair
  locale: Locale
  linkLabel?: BilingualPair
  className?: string
}

const DEFAULT_LINK: BilingualPair = { th: "ดูรายละเอียด ➔", en: "Learn more ➔" }

export default function ServiceHubCard({
  href,
  emoji,
  title,
  description,
  locale,
  linkLabel = DEFAULT_LINK,
  className,
}: ServiceHubCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm",
        "transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md",
        className,
      )}
    >
      <div
        className="mb-5 flex size-[60px] items-center justify-center rounded-xl bg-primary-subtle text-3xl"
        aria-hidden
      >
        {emoji}
      </div>

      <h3 className="text-lg font-bold leading-snug text-foreground">
        <ThaiText text={pickLocalized(locale, title)} />
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        <ThaiText text={pickLocalized(locale, description)} />
      </p>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors group-hover:text-secondary">
        {pickLocalized(locale, linkLabel)}
      </span>
    </Link>
  )
}
