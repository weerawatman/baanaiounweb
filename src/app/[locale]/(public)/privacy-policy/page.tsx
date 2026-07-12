import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/i18n/metadata"
import PrivacyPolicyPage from "./PrivacyPolicyPage"

const PRIVACY_SEO = {
  title: "นโยบายความเป็นส่วนตัว | Privacy Policy — บ้านไออุ่น พร็อพเพอร์ตี้",
  description: {
    th: "นโยบายความเป็นส่วนตัวของบ้านไออุ่น พร็อพเพอร์ตี้ — วิธีที่เราเก็บรวบรวม ใช้ และดูแลรักษาข้อมูลส่วนบุคคลของท่าน ตาม PDPA",
    en: "How Baan Ai Oun Property collects, uses, and protects your personal data, in accordance with Thailand's PDPA.",
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    pathname: "/privacy-policy",
    title: PRIVACY_SEO.title,
    description: PRIVACY_SEO.description,
  })
}

export default function Page() {
  return <PrivacyPolicyPage />
}
