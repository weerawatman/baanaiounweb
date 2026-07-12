import type { Metadata } from "next"

export const revalidate = 3600

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import StickyCTA from "@/components/layout/StickyCTA"
import MobileContactBar from "@/components/layout/MobileContactBar"
import { SITE_CONFIG } from "@/config/site"
import { getProfile } from "@/lib/queries/profile"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "บ้านไออุ่น พร็อพเพอร์ตี้",
    title: "บ้านไออุ่น พร็อพเพอร์ตี้ — มากกว่าที่พัก คือพลังกายพลังใจให้คุณไปต่อ",
    description:
      "บ้านไออุ่น คัดสรรบ้านขาย บ้านเช่า ที่ดิน ในเขตบ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช โดยพิม นายหน้าที่ดูแลด้วยหัวใจ",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      th: BASE_URL,
      en: BASE_URL,
      "x-default": BASE_URL,
    },
  },
}

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const profile = await getProfile()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: profile.siteName,
    alternateName: SITE_CONFIG.nameEn,
    description:
      "นายหน้าอสังหาริมทรัพย์ ให้บริการซื้อ-ขาย-เช่า บ้าน คอนโด ที่ดิน บ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช",
    url: BASE_URL,
    telephone: profile.phone,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "107/57 เดอะคัลเลอร์เลคเชอร์ ซ.มหาชัย ม.13",
      addressLocality: "บางพลีใหญ่",
      addressRegion: "สมุทรปราการ",
      postalCode: "10540",
      addressCountry: "TH",
    },
    sameAs: [
      profile.facebook,
      SITE_CONFIG.facebookPersonal,
      SITE_CONFIG.instagram,
      profile.tiktok,
      profile.youtube,
      profile.lineUrl,
    ].filter(Boolean),
    areaServed: {
      "@type": "City",
      name: SITE_CONFIG.areaServed,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header profile={profile} />
      <main className="flex-1">{children}</main>
      <Footer profile={profile} />
      {/* Spacer so the fixed MobileContactBar never covers footer links */}
      <div aria-hidden className="h-14 md:hidden" />
      <StickyCTA lineUrl={profile.lineUrl} />
      <MobileContactBar
        phone={profile.phone || SITE_CONFIG.phone}
        lineUrl={profile.lineUrl || SITE_CONFIG.lineUrl}
        whatsappUrl={SITE_CONFIG.whatsappUrl}
      />
    </>
  )
}
