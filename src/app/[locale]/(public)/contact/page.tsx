import type { Metadata } from "next"
import { getProfile } from "@/lib/queries/profile"
import ContactPage from "./ContactPage"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "ติดต่อเรา | Contact Us — บ้านไออุ่น พร็อพเพอร์ตี้",
  description:
    "ติดต่อบ้านไออุ่น พร็อพเพอร์ตี้ ผ่าน LINE, WhatsApp, โทรศัพท์ หรืออีเมล ปรึกษาเรื่องซื้อ ขาย เช่าบ้านฟรี!",
  openGraph: {
    title: "ติดต่อเรา | Contact Baan Ai Oun Property",
    description:
      "Contact us via LINE, WhatsApp, phone or email. Free consultation on buying, selling, and renting property.",
  },
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
