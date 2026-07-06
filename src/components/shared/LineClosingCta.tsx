import Link from "next/link"
import { MessageCircle, Phone } from "lucide-react"
import PageSection from "@/components/layout/PageSection"
import { cn } from "@/lib/utils"

interface LineClosingCtaProps {
  lineUrl: string
  phoneUrl?: string
  variant?: "primary" | "warm"
  titleTh?: string
  titleEn?: string
  subtitleTh?: string
  lineTestId?: string
  secondaryLinks?: { href: string; label: string }[]
}

export default function LineClosingCta({
  lineUrl,
  phoneUrl,
  variant = "primary",
  titleTh = "ปรึกษาเรื่องอสังหาฯ ฟรีกับพิม",
  titleEn = "Free real estate consultation with Pim",
  subtitleTh = "คุยง่าย ตรงไปตรงมา ไม่มีค่าใช้จ่ายในการปรึกษา",
  lineTestId,
  secondaryLinks,
}: LineClosingCtaProps) {
  const isPrimary = variant === "primary"

  return (
    <PageSection variant={variant}>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2
          className={cn(
            "text-2xl font-bold sm:text-3xl",
            isPrimary ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {titleTh}
          <span
            className={cn(
              "mt-1 block text-lg font-medium",
              isPrimary ? "text-primary-foreground/80" : "text-muted-foreground",
            )}
          >
            {titleEn}
          </span>
        </h2>
        <p
          className={cn(
            "text-base",
            isPrimary ? "text-primary-foreground/90" : "text-muted-foreground",
          )}
        >
          {subtitleTh}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={lineTestId}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold shadow-md transition-opacity hover:opacity-90",
              isPrimary
                ? "bg-card text-primary"
                : "bg-[#06C755] text-white",
            )}
          >
            <MessageCircle className="size-5" />
            ทักแชทปรึกษาฟรี | Free LINE Chat
          </a>
          {phoneUrl && (
            <a
              href={phoneUrl}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border-2 px-8 py-3 text-sm font-semibold transition-colors",
                isPrimary
                  ? "border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
              )}
            >
              <Phone className="size-5" />
              โทรด่วน | Call Now
            </a>
          )}
        </div>
        {secondaryLinks && secondaryLinks.length > 0 && (
          <p
            className={cn(
              "text-sm",
              isPrimary ? "text-primary-foreground/75" : "text-muted-foreground",
            )}
          >
            {secondaryLinks.map((link, i) => (
              <span key={link.href}>
                {i > 0 && " · "}
                <Link href={link.href} className="underline-offset-2 hover:underline">
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </PageSection>
  )
}
