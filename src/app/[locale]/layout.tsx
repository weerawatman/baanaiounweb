import type { Metadata } from "next"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { prompt, notoSansThai } from "@/lib/fonts"
import "../globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

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
    siteName: "บ้านไออุ่น พร็อพเพอร์ตี้",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "บ้านไออุ่น พร็อพเพอร์ตี้" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${prompt.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
