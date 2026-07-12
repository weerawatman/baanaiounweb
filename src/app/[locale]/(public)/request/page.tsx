import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { createPageMetadata } from "@/lib/i18n/metadata"
import RequestPage from "./RequestPage"
import { isRequestTab, type RequestTab } from "./tabs"

const REQUEST_SEO = {
  title: "ส่งคำขอบริการ | Service Request — บ้านไออุ่น พร็อพเพอร์ตี้",
  description: {
    th: "ฝากขาย/ปล่อยเช่า จัดหาทรัพย์ตามต้องการ หรือร่วมเป็น Co-Agent กับบ้านไออุ่น พร็อพเพอร์ตี้ — กรอกฟอร์มเดียว ทีมงานติดต่อกลับทันที",
    en: "List your property, request property matchmaking, or join as a Co-Agent — one form, fast follow-up.",
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return createPageMetadata({
    locale,
    pathname: "/request",
    title: REQUEST_SEO.title,
    description: REQUEST_SEO.description,
  })
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ tab?: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const { tab } = await searchParams
  const initialTab: RequestTab = isRequestTab(tab) ? tab : "list-property"

  return <RequestPage initialTab={initialTab} />
}
