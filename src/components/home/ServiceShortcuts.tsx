import Link from "next/link"
import { ArrowRight, Home, Search, Users, GraduationCap } from "lucide-react"
import { SERVICES_HEADING, SERVICE_CARDS } from "@/content/homepage"

const ICON_MAP = { Home, Search, Users, GraduationCap } as const

export default function ServiceShortcuts() {
  return (
    <section className="bg-white py-14">
      <div className="container mx-auto max-w-6xl px-4">
        {/* H2 หัวข้อหมวดหมู่ */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">{SERVICES_HEADING.th}</h2>
          <p className="mt-1 text-base font-medium text-gray-500">{SERVICES_HEADING.en}</p>
        </div>

        {/* 4 การ์ด — desktop แนวนอน / มือถือเรียงตั้ง */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CARDS.map((card) => {
            const Icon = ICON_MAP[card.icon]
            return (
              <div
                key={card.href}
                className="flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg"
              >
                {/* Icon บนสุด */}
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${card.color}18` }}
                >
                  <Icon size={28} style={{ color: card.color }} />
                </div>

                {/* H3 ไทย | English */}
                <h3 className="mt-4 text-center text-base leading-snug font-bold">
                  <span className="block" style={{ color: card.color }}>
                    {card.titleTh}
                  </span>
                  <span className="block text-sm text-gray-500">{card.titleEn}</span>
                </h3>

                {/* ปัญหา + ทางออก (2 ภาษา) */}
                <div className="mt-3 flex flex-1 flex-col gap-1.5 text-sm">
                  <p className="font-medium text-gray-700">{card.painTh}</p>
                  <p className="text-xs text-gray-500">{card.painEn}</p>
                  <p className="mt-1 text-gray-700">{card.solutionTh}</p>
                  <p className="text-xs text-gray-500">{card.solutionEn}</p>
                </div>

                {/* ปุ่ม CTA แยกสีต่อใบ — ไทยบรรทัดบน อังกฤษบรรทัดล่าง */}
                <Link
                  href={card.href}
                  className="mt-5 inline-flex flex-col items-center justify-center rounded-lg px-4 py-2.5 text-center text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: card.color }}
                >
                  <span className="text-sm leading-snug font-semibold">{card.ctaTh}</span>
                  {card.ctaEn && (
                    <span className="text-xs leading-snug font-medium text-white/85">
                      {card.ctaEn}
                    </span>
                  )}
                  <ArrowRight className="mt-1 size-4" aria-hidden />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
