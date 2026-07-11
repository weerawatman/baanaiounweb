import Link from "next/link"
import { Home, Search, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export type ServiceLeadTab = "list-property" | "matchmaking" | "co-agent"

const TABS: {
  id: ServiceLeadTab
  href: string
  icon: typeof Home
  labelTh: string
  labelEn: string
}[] = [
  {
    id: "list-property",
    href: "/list-property",
    icon: Home,
    labelTh: "ฝากขาย/ปล่อยเช่า",
    labelEn: "List Property",
  },
  {
    id: "matchmaking",
    href: "/find-property",
    icon: Search,
    labelTh: "จัดหาทรัพย์ตามต้องการ",
    labelEn: "Property Match",
  },
  {
    id: "co-agent",
    href: "/co-agent",
    icon: Users,
    labelTh: "ร่วมเป็น Co-Agent",
    labelEn: "Join Co-Agent",
  },
]

interface ServiceLeadTabsProps {
  active: ServiceLeadTab
}

export default function ServiceLeadTabs({ active }: ServiceLeadTabsProps) {
  return (
    <nav
      className="mb-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
      aria-label="บริการหลัก | Main services"
      data-testid="service-lead-tabs"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon
        const isActive = tab.id === active
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
            <span>
              <span className="block">{tab.labelTh}</span>
              <span
                className={cn(
                  "mt-0.5 block text-xs font-medium",
                  isActive ? "text-primary-foreground/75" : "text-muted-foreground",
                )}
              >
                {tab.labelEn}
              </span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
