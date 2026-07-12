import type { Metadata } from "next"
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

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    pathname: "/contact",
    title: CONTACT_SEO.title,
    description: CONTACT_SEO.description,
  })
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "ติดต่อบ้านไออุ่น พร็อพเพอร์ตี้",
  url: `${BASE_URL}/contact`,
}

export default async function Page() {
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
