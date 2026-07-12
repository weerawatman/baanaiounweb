"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { Home, Search, Users, type LucideIcon } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageHeroBanner from "@/components/shared/PageHeroBanner"
import RequestForm from "./RequestForm"
import { REQUEST_TABS, type RequestTab } from "./tabs"
import type { Locale } from "@/i18n/routing"
import { homeCrumb, localizedCrumb } from "@/lib/i18n/breadcrumbs"
import { pickLocalized } from "@/lib/i18n/pick-localized"

const REQUEST_CRUMB = { th: "ส่งคำขอบริการ", en: "Service Request" } as const

const TAB_META: Record<
  RequestTab,
  { icon: LucideIcon; title: { th: string; en: string }; tagline: { th: string; en: string } }
> = {
  "list-property": {
    icon: Home,
    title: { th: "ฝากขาย/ปล่อยเช่า", en: "List Your Property" },
    tagline: {
      th: "ฝากทรัพย์กับเรา ทีมงานดูแลการตลาดครบวงจรจนปิดดีล",
      en: "List with us — full-service marketing until the deal closes.",
    },
  },
  matchmaking: {
    icon: Search,
    title: { th: "จัดหาทรัพย์ตามต้องการ", en: "Property Matchmaking" },
    tagline: {
      th: "บอกความต้องการของคุณ เราคัดทรัพย์ที่ใช่มาให้เลือก",
      en: "Tell us what you need — we curate properties that match.",
    },
  },
  "co-agent": {
    icon: Users,
    title: { th: "ร่วมเป็น Co-Agent", en: "Join as a Co-Agent" },
    tagline: {
      th: "ส่งทรัพย์เข้าระบบ ร่วมปิดดีลไปด้วยกันแบบ Co-Agent",
      en: "Submit your listings and close deals together as Co-Agents.",
    },
  },
}

export default function RequestPage({ initialTab }: { initialTab: RequestTab }) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const [tab, setTab] = useState<RequestTab>(initialTab)
  const meta = TAB_META[tab]

  function selectTab(next: RequestTab) {
    setTab(next)
    router.replace(`/request?tab=${next}`, { scroll: false })
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            homeCrumb(locale),
            localizedCrumb(locale, REQUEST_CRUMB),
          ]}
        />
      </div>

      <PageHeroBanner
        titleTh="ส่งคำขอบริการ"
        titleEn="Service Request"
        subtitleTh="เลือกบริการที่ต้องการ กรอกฟอร์มสั้นๆ ทีมงานจะติดต่อกลับโดยเร็วที่สุด"
        subtitleEn="Pick a service, fill in a short form, and our team will get back to you shortly."
      />

      <main className="bg-muted pb-16">
        <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" role="tablist">
            {REQUEST_TABS.map((key) => {
              const m = TAB_META[key]
              const Icon = m.icon
              const active = key === tab
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectTab(key)}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 px-4 py-4 text-center transition-all ${
                    active
                      ? "border-primary bg-primary text-white shadow-lg"
                      : "border-transparent bg-card text-muted-foreground shadow-sm hover:border-primary/30 hover:shadow-md"
                  }`}
                >
                  <Icon className={`size-6 ${active ? "text-secondary" : "text-primary"}`} />
                  <span className="text-sm leading-snug font-semibold">
                    {pickLocalized(locale, m.title)}
                  </span>
                </button>
              )
            })}
          </div>

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 rounded-2xl bg-card p-6 shadow-[0_10px_30px_rgba(45,90,39,0.04)] ring-1 ring-black/5 sm:p-8"
          >
            <div className="mb-6 text-center">
              <h2 className="text-lg font-bold text-primary">
                {pickLocalized(locale, meta.title)}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {pickLocalized(locale, meta.tagline)}
              </p>
            </div>
            <RequestForm requestType={tab} />
          </motion.div>
        </div>
      </main>
    </>
  )
}
