import type { Metadata } from "next"
import RequestPage from "./RequestPage"
import { isRequestTab, type RequestTab } from "./tabs"

export const metadata: Metadata = {
  title: "ส่งคำขอบริการ | Service Request — บ้านไออุ่น พร็อพเพอร์ตี้",
  description:
    "ฝากขาย/ปล่อยเช่า จัดหาทรัพย์ตามต้องการ หรือร่วมเป็น Co-Agent กับบ้านไออุ่น พร็อพเพอร์ตี้ — กรอกฟอร์มเดียว ทีมงานติดต่อกลับทันที | List your property, request property matchmaking, or join as a Co-Agent.",
  openGraph: {
    title: "ส่งคำขอบริการ | Service Request — Baan Ai Oun Property",
    description:
      "List your property, request property matchmaking, or join as a Co-Agent — one form, fast follow-up.",
  },
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
