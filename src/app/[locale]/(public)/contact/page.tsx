import { BASE_URL } from "@/config/site"
import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import type { LocaleParams } from "@/i18n/routing"
import { getProfile } from "@/lib/queries/profile"
import { createPageMetadata } from "@/lib/i18n/metadata"
import ContactPage from "./ContactPage"

export const revalidate = 3600

const CONTACT_SEO = {
  title: "ติดต่อเรา | Contact Us — บ้านไออุ่น พร็อพเพอร์ตี้",
  description: {
    th: "ติดต่อบ้านไออุ่น พร็อพเพอร์ตี้ ผ่าน LINE, WhatsApp, โทรศัพท์ หรืออีเมล ปรึกษาเรื่องซื้อ ขาย เช่าบ้านฟรี!",
    en: "Contact us via LINE, WhatsApp, phone or email. Free consultation on buying, selling, and renting property.",
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: LocaleParams
}): Promise<Metadata> {
  const { locale } = await params
  return createPageMetadata({
    locale,
    pathname: "/contact",
    title: CONTACT_SEO.title,
    description: CONTACT_SEO.description,
  })
}


const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "ติดต่อบ้านไออุ่น พร็อพเพอร์ตี้",
  url: `${BASE_URL}/contact`,
}

export default async function Page({ params }: { params: LocaleParams }) {
  const { locale } = await params
  setRequestLocale(locale)
  const profile = await getProfile()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactPage profile={profile} />
    </>
  )
}
