"use client"

import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Home, Search, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

export type ServiceLeadTab = "list-property" | "matchmaking" | "co-agent"

const TABS: {
  id: ServiceLeadTab
  href: string
  icon: typeof Home
  label: { th: string; en: string }
}[] = [
  {
    id: "list-property",
    href: "/list-property",
    icon: Home,
    label: { th: "ฝากขาย/ปล่อยเช่า", en: "List Property" },
  },
  {
    id: "matchmaking",
    href: "/find-property",
    icon: Search,
    label: { th: "จัดหาทรัพย์ตามต้องการ", en: "Property Match" },
  },
  {
    id: "co-agent",
    href: "/co-agent",
    icon: Users,
    label: { th: "ร่วมเป็น Co-Agent", en: "Join Co-Agent" },
  },
]

interface ServiceLeadTabsProps {
  active: ServiceLeadTab
}

export default function ServiceLeadTabs({ active }: ServiceLeadTabsProps) {
  const locale = useLocale() as Locale

  return (
    <nav
      className="mb-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
      aria-label={locale === "en" ? "Main services" : "บริการหลัก"}
      data-testid="service-lead-tabs"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon
        const isActive = tab.id === active
        const label = pickLocalized(locale, tab.label)
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-center text-sm font-bold transition-all",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted/50",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="size-5 shrink-0" aria-hidden />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
