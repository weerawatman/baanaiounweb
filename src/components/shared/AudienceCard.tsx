import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AudienceCardProps {
  href: string
  icon: LucideIcon
  accentColor: string
  titleTh: string
  titleEn: string
  descTh: string
  descEn: string
  highlightTh?: string
  highlightEn?: string
  className?: string
  /** "dark" = การ์ดพื้นเขียวเข้มแบบหน้าแรก (mockup), default = การ์ดขาว */
  variant?: "light" | "dark"
  /** ปุ่มหลัก + ปุ่มรอง (mockup หน้าแรก) */
  ctaTh?: string
  ctaEn?: string
  secondaryHref?: string
}

export default function AudienceCard({
  href,
  icon: Icon,
  accentColor,
  titleTh,
  titleEn,
  descTh,
  descEn,
  highlightTh,
  highlightEn,
  className,
  variant = "light",
  ctaTh,
  ctaEn,
  secondaryHref,
}: AudienceCardProps) {
  if (variant === "dark") {
    return (
      <div
        className={cn(
          "flex h-full flex-col items-center rounded-2xl bg-primary p-6 text-center shadow-sm",
          className,
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <Icon size={30} className="text-white" />
        </div>

        <h3 className="mt-4 text-base font-bold leading-snug">
          <span className="block text-white">{titleTh}</span>
          <span className="block text-sm font-medium text-white/70">{titleEn}</span>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/90">{descTh}</p>
        <p className="mt-1 text-xs leading-relaxed text-white/60">{descEn}</p>

        <div className="mt-5 flex w-full flex-col gap-2">
          <Link
            href={href}
            className="rounded-full bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90"
          >
            {ctaTh ?? titleTh}
            {ctaEn && (
              <span className="mt-0.5 block text-xs font-medium opacity-90">{ctaEn}</span>
            )}
          </Link>
          {secondaryHref && (
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              อ่านรายละเอียด | Learn More
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${accentColor}18` }}
      >
        <Icon size={24} style={{ color: accentColor }} />
      </div>

      <h3 className="mt-4 text-base font-bold leading-snug">
        <span className="block text-foreground">{titleTh}</span>
        <span className="block text-sm font-medium text-muted-foreground">{titleEn}</span>
      </h3>

      {highlightTh && (
        <p className="mt-2 text-xs font-semibold text-primary">
          {highlightTh}
          {highlightEn && (
            <span className="mt-0.5 block font-normal text-muted-foreground">{highlightEn}</span>
          )}
        </p>
      )}

      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/90">{descTh}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{descEn}</p>

      <span
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors"
        style={{ color: accentColor }}
      >
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
