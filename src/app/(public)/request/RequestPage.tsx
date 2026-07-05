"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Search, Users, type LucideIcon } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import RequestForm from "./RequestForm"
import { REQUEST_TABS, type RequestTab } from "./tabs"

const TAB_META: Record<
  RequestTab,
  { icon: LucideIcon; th: string; en: string; taglineTh: string; taglineEn: string }
> = {
  "list-property": {
    icon: Home,
    th: "ฝากขาย/ปล่อยเช่า",
    en: "List Your Property",
    taglineTh: "ฝากทรัพย์กับเรา ทีมงานดูแลการตลาดครบวงจรจนปิดดีล",
    taglineEn: "List with us — full-service marketing until the deal closes.",
  },
  matchmaking: {
    icon: Search,
    th: "จัดหาทรัพย์ตามต้องการ",
    en: "Property Matchmaking",
    taglineTh: "บอกความต้องการของคุณ เราคัดทรัพย์ที่ใช่มาให้เลือก",
    taglineEn: "Tell us what you need — we curate properties that match.",
  },
  "co-agent": {
    icon: Users,
    th: "ร่วมเป็น Co-Agent",
    en: "Join as a Co-Agent",
    taglineTh: "ส่งทรัพย์เข้าระบบ ร่วมปิดดีลไปด้วยกันแบบ Co-Broke",
    taglineEn: "Submit your listings and close deals together, co-broke style.",
  },
}

// ─── Page ────────────────────────────────────────────────────────────────

export default function RequestPage({ initialTab }: { initialTab: RequestTab }) {
  const router = useRouter()
  const [tab, setTab] = useState<RequestTab>(initialTab)
  const meta = TAB_META[tab]

  function selectTab(next: RequestTab) {
    setTab(next)
    router.replace(`/request?tab=${next}`, { scroll: false })
  }

  return (
    <main className="bg-[#F5F0E8] pb-16">
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "ส่งคำขอบริการ" }]} />

        {/* Heading */}
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">
            ส่งคำขอบริการ
            <span className="mt-1 block text-lg font-medium text-gray-400">Service Request</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
            เลือกบริการที่ต้องการ กรอกฟอร์มสั้นๆ ทีมงานจะติดต่อกลับโดยเร็วที่สุด
            <span className="mt-0.5 block text-xs text-gray-400">
              Pick a service, fill in a short form, and our team will get back to you shortly.
            </span>
          </p>
        </div>

        {/* Modern segmented tab selector */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3" role="tablist">
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
                    ? "border-[#1B4D3E] bg-[#1B4D3E] text-white shadow-lg"
                    : "border-transparent bg-white text-gray-600 shadow-sm hover:border-[#1B4D3E]/30 hover:shadow-md"
                }`}
              >
                <Icon className={`size-6 ${active ? "text-[#D4A843]" : "text-[#1B4D3E]"}`} />
                <span className="text-sm leading-snug font-semibold">{m.th}</span>
                <span
                  className={`text-xs leading-snug ${active ? "text-white/75" : "text-gray-400"}`}
                >
                  {m.en}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active form card */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 sm:p-8"
        >
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-[#1B4D3E]">
              {meta.th} <span className="font-medium text-gray-400">| {meta.en}</span>
            </h2>
            <p className="mt-1 text-sm text-gray-600">{meta.taglineTh}</p>
            <p className="text-xs text-gray-400">{meta.taglineEn}</p>
          </div>
          <RequestForm requestType={tab} />
        </motion.div>
      </div>
    </main>
  )
}
