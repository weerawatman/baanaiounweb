import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { pickLocalized, pickPipeBilingual } from "@/lib/i18n/pick-localized"
import PrivacyPolicyPage from "./PrivacyPolicyPage"

const PRIVACY_SEO = {
  title: "นโยบายความเป็นส่วนตัว | Privacy Policy — บ้านไออุ่น พร็อพเพอร์ตี้",
  description: {
    th: "นโยบายความเป็นส่วนตัวของบ้านไออุ่น พร็อพเพอร์ตี้ — วิธีที่เราเก็บรวบรวม ใช้ และดูแลรักษาข้อมูลส่วนบุคคลของท่าน ตาม PDPA",
    en: "How Baan Ai Oun Property collects, uses, and protects your personal data, in accordance with Thailand's PDPA.",
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  const { buildPageMetadata } = await import("@/lib/i18n/metadata")

  return buildPageMetadata({
    locale,
    pathname: "/privacy-policy",
    title: pickPipeBilingual(locale, PRIVACY_SEO.title),
    description: pickLocalized(locale, PRIVACY_SEO.description),
  })
}

export default function Page() {
  return <PrivacyPolicyPage />
}
