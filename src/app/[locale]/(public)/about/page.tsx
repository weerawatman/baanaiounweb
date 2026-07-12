import type { Metadata } from "next"
import { getProfile } from "@/lib/queries/profile"
import { getPageFaqs } from "@/lib/faq-items"
import { SITE_CONFIG } from "@/config/site"
import { createPageMetadata } from "@/lib/i18n/metadata"
import AboutPage from "./AboutPage"

export const revalidate = 3600

const ABOUT_SEO = {
  title: "เกี่ยวกับเรา | About Baan Ai Oun Property — อสังหาในไทย กรุงเทพ ปริมณฑล EEC ชลบุรี",
  description: {
    th: "บ้านไออุ่น พร็อพเพอร์ตี้ เชื่อมโยงทุกความต้องการอสังหาฯ ด้วยประสบการณ์นักลงทุน กรุงเทพฯ ปริมณฑล EEC ชลบุรี",
    en: "Connecting real estate goals through investor-led expertise — Bangkok, EEC, Chonburi, and across Thailand.",
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    pathname: "/about",
    title: ABOUT_SEO.title,
    description: ABOUT_SEO.description,
  })
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent"],
  name: SITE_CONFIG.name,
  alternateName: SITE_CONFIG.nameEn,
  url: BASE_URL,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address,
    addressLocality: "บางพลี",
    addressRegion: "สมุทรปราการ",
    postalCode: "10540",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.595,
    longitude: 100.823,
  },
  areaServed: [
    "กรุงเทพฯ",
    "สมุทรปราการ (บางพลี, เมกาบางนา)",
    "ชลบุรี",
    "ฉะเชิงเทรา",
    "EEC",
    "บ้านบึง",
  ],
  founder: {
    "@type": "Person",
    name: SITE_CONFIG.pim.name,
    jobTitle: "Real Estate Investment & Renovation Expert",
    knowsAbout: ["Real Estate Investment", "Renovation", "อสังหาริมทรัพย์"],
  },
  knowsAbout: [
    "Real Estate",
    "อสังหาริมทรัพย์",
    "บ้านบึง",
    "นิคมอมตะ",
    "เหมราช",
    "EEC",
    "ชลบุรี",
    "ฉะเชิงเทรา",
  ],
}

export default async function Page() {
  const [profile, faqs] = await Promise.all([getProfile(), getPageFaqs("about")])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <AboutPage profile={profile} faqs={faqs} />
    </>
  )
}
