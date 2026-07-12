import type { Metadata } from "next"
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

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    pathname: "/request",
    title: REQUEST_SEO.title,
    description: REQUEST_SEO.description,
  })
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const initialTab: RequestTab = isRequestTab(tab) ? tab : "list-property"

  return <RequestPage initialTab={initialTab} />
}
