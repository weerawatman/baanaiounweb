import { BASE_URL } from "@/config/site"
import type { Metadata } from "next"
import { prompt, notoSansThai } from "@/lib/fonts"
import "../globals.css"


export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "แอดมิน — บ้านไออุ่น พร็อพเพอร์ตี้",
    template: "%s — บ้านไออุ่น พร็อพเพอร์ตี้",
  },
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="th"
      data-scroll-behavior="smooth"
      className={`${prompt.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  )
}
