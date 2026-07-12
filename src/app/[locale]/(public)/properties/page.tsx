import type { Metadata } from "next"
import { Suspense } from "react"
import { setRequestLocale } from "next-intl/server"
import type { LocaleParams } from "@/i18n/routing"
import { getActiveProperties } from "@/lib/queries/properties"
import { getProfile } from "@/lib/queries/profile"
import { mapProperty } from "@/lib/mappers"
import { createPageMetadata } from "@/lib/i18n/metadata"
import PropertiesPage from "./PropertiesPage"

export const revalidate = 900

const PROPERTIES_SEO = {
  title: "ทรัพย์ทั้งหมด | All Properties — บ้านไออุ่น พร็อพเพอร์ตี้",
  description: {
    th: "รายการบ้านขาย บ้านเช่า และที่ดินทั้งหมดจากบ้านไออุ่น พร็อพเพอร์ตี้ ในเขตบ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช EEC",
    en: "All homes for sale, rent, and land listings from Baan Ai Oun Property in Ban Bueng, Chonburi — near Amata, Hemaraj, and EEC zones.",
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
    pathname: "/properties",
    title: PROPERTIES_SEO.title,
    description: PROPERTIES_SEO.description,
  })
}

export default async function PropertiesRoute({
  params,
}: {
  params: LocaleParams
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const [rows, profile] = await Promise.all([getActiveProperties(), getProfile()])
  const properties = rows.map(mapProperty)
  return (
    <Suspense>
      <PropertiesPage properties={properties} heroImage={profile.heroImageUrl} />
    </Suspense>
  )
}
