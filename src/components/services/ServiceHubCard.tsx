import Link from "next/link"
import { cn } from "@/lib/utils"

interface ServiceHubCardProps {
  href: string
  emoji: string
  titleTh: string
  titleEn: string
  descTh: string
  descEn: string
  linkTh?: string
  linkEn?: string
  className?: string
}

export default function ServiceHubCard({
  href,
  emoji,
  titleTh,
  titleEn,
  descTh,
  descEn,
  linkTh = "ดูรายละเอียด ➔",
  linkEn = "Learn more ➔",
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
        className="mb-5 flex size-[60px] items-center justify-center rounded-xl bg-[#f0fdf4] text-3xl"
        aria-hidden
      >
        {emoji}
      </div>

      <h3 className="text-lg font-bold leading-snug text-foreground">
        {titleTh}
        <span className="mt-1 block text-sm font-medium text-muted-foreground">{titleEn}</span>
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{descTh}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground/80">{descEn}</p>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors group-hover:text-secondary">
        {linkTh}
        <span className="sr-only"> | {linkEn}</span>
      </span>
    </Link>
  )
}
