import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import { getPropertyBySlug } from "@/lib/queries/properties"
import { getProfile } from "@/lib/queries/profile"
import { createServerSupabase } from "@/lib/supabase"
import { mapProperty } from "@/lib/mappers"
import type { Locale } from "@/i18n/routing"
import { buildPageMetadata } from "@/lib/i18n/metadata"
import { localizedOrFallback, pickLocalized } from "@/lib/i18n/pick-localized"
import PropertyDetailClient from "./PropertyDetailClient"

export const revalidate = 3600

export async function generateStaticParams() {
  const supabase = createServerSupabase()
  if (!supabase) return []
  const { data } = await supabase
    .from("properties")
    .select("slug")
    .eq("status", "ACTIVE")
    .is("deleted_at", null)
    .limit(500)
  return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  const { slug } = await params
  const row = await getPropertyBySlug(slug)
  const notFoundTitle = pickLocalized(locale, {
    th: "ทรัพย์สิน | บ้านไออุ่น",
    en: "Property | Baan Ai Oun",
  })
  if (!row) return { title: notFoundTitle }

  const property = mapProperty(row)
  const title = localizedOrFallback(locale, property.title, property.titleEn)
  const locationLabel =
    property.location.subdistrict || property.location.district
      ? pickLocalized(locale, {
          th: `ย่าน ${property.location.subdistrict}, ${property.location.district}`,
          en: `${property.location.subdistrict}, ${property.location.district}`,
        })
      : ""
  const description = [
    title,
    locationLabel,
    pickLocalized(locale, {
      th: "— บ้านไออุ่น อสังหาริมทรัพย์",
      en: "— Baan Ai Oun Property",
    }),
  ]
    .filter(Boolean)
    .join(" ")
  const pageTitle = pickLocalized(locale, {
    th: `${title} | บ้านไออุ่น`,
    en: `${title} | Baan Ai Oun`,
  })

  return {
    ...buildPageMetadata({
      locale,
      pathname: `/property/${slug}`,
      title: pageTitle,
      description,
    }),
    openGraph: {
      title: pageTitle,
      description,
      images: property.images?.[0] ? [{ url: property.images[0] }] : [],
    },
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [row, profile] = await Promise.all([getPropertyBySlug(slug), getProfile()])
  const property = row ? mapProperty(row) : null

  return (
    <PropertyDetailClient
      property={property}
      pimAvatarUrl={profile.avatarUrl}
      pimName={profile.name}
      lineUrl={profile.lineUrl}
      phone={profile.phone}
    />
  )
}
