import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import { SITE_CONFIG } from "@/config/site";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_CONFIG.name,
  alternateName: SITE_CONFIG.nameEn,
  description: "นายหน้าอสังหาริมทรัพย์ จ.สมุทรปราการ ให้บริการซื้อ-ขาย-เช่า บ้าน คอนโด ที่ดิน บ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช",
  url: BASE_URL,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "107/57 เดอะคัลเลอร์เลคเชอร์ ซ.มหาชัย ม.13",
    addressLocality: "บางพลีใหญ่",
    addressRegion: "สมุทรปราการ",
    postalCode: "10540",
    addressCountry: "TH",
  },
  sameAs: [
    SITE_CONFIG.facebook,
    SITE_CONFIG.tiktok,
    SITE_CONFIG.youtube,
    SITE_CONFIG.lineUrl,
  ],
  areaServed: {
    "@type": "City",
    name: SITE_CONFIG.areaServed,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "บ้านไออุ่น พร็อพเพอร์ตี้ — มากกว่าที่พัก คือพลังกายพลังใจให้คุณไปต่อ",
    template: "%s — บ้านไออุ่น พร็อพเพอร์ตี้",
  },
  description:
    "บ้านไออุ่น คัดสรรบ้านขาย บ้านเช่า ที่ดิน ในเขตบ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช โดยพิม นายหน้าที่ดูแลด้วยหัวใจ",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
