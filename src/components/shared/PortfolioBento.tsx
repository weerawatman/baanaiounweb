import Image from "next/image"
import { ImageIcon } from "lucide-react"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"
import { cn } from "@/lib/utils"

export interface BentoItem {
  image?: string
  alt: string
  badgeTh: string
  badgeEn: string
  badgeVariant?: "primary" | "orange"
}

interface PortfolioBentoProps {
  items: BentoItem[]
  /** inline = compact grid inside split-layout left column (find/list property) */
  variant?: "default" | "inline"
  className?: string
  locale?: Locale
}

function BentoCell({
  item,
  className,
  sizes,
  locale,
}: {
  item: BentoItem
  className: string
  sizes: string
  locale?: Locale
}) {
  const badge = locale
    ? pickLocalized(locale, { th: item.badgeTh, en: item.badgeEn })
    : item.badgeTh

  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-muted", className)}>
      {item.image ? (
        <Image src={item.image} alt={item.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="flex h-full min-h-[88px] flex-col items-center justify-center gap-2 p-3 text-center text-muted-foreground">
          <ImageIcon className="size-7 opacity-40" aria-hidden />
          <p className="text-[0.65rem] leading-snug sm:text-xs">
            {locale === "en" ? "Upload in Admin > Profile" : "อัปโหลดรูปใน Admin > โปรไฟล์"}
          </p>
        </div>
      )}
      <div
        className={cn(
          "absolute bottom-2 left-2 max-w-[calc(100%-1rem)] rounded-full px-2.5 py-1 text-[0.6rem] font-bold shadow-sm sm:bottom-2.5 sm:left-2.5 sm:px-3 sm:py-1.5 sm:text-[0.65rem]",
          item.badgeVariant === "orange"
            ? "bg-white/95 text-secondary"
            : "bg-white/95 text-primary",
        )}
      >
        {locale ? (
          badge
        ) : (
          <>
            {item.badgeTh}
            <span
              className={cn(
                "mt-0.5 block font-medium",
                item.badgeVariant === "orange" ? "text-secondary/75" : "text-primary/75",
              )}
            >
              {item.badgeEn}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default function PortfolioBento({
  items,
  variant = "default",
  className,
  locale,
}: PortfolioBentoProps) {
  if (items.length === 0) return null

  const [main, ...rest] = items
  const isInline = variant === "inline"

  return (
    <div
      className={cn(
        isInline
          ? "grid h-full min-h-[180px] grid-cols-2 grid-rows-2 gap-3"
          : "mt-8 grid grid-cols-2 gap-3 sm:gap-4",
        className,
      )}
      data-testid="portfolio-bento"
    >
      <BentoCell
        item={main}
        locale={locale}
        className={
          isInline
            ? "col-span-2 row-span-1 min-h-[120px] sm:col-span-1 sm:row-span-2 sm:min-h-0"
            : "col-span-2 aspect-[16/10] sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:min-h-[280px]"
        }
        sizes={isInline ? "(max-width: 1024px) 100vw, 30vw" : "(max-width: 640px) 100vw, 40vw"}
      />
      {rest.map((item) => (
        <BentoCell
          key={item.alt}
          item={item}
          locale={locale}
          className={isInline ? "min-h-[88px] sm:min-h-0" : "aspect-[4/3]"}
          sizes={isInline ? "(max-width: 1024px) 50vw, 20vw" : "(max-width: 640px) 50vw, 25vw"}
        />
      ))}
    </div>
  )
}
