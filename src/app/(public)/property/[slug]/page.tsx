import type { Metadata } from "next"
import { getPropertyBySlug } from "@/lib/queries/properties"
import { getProfile } from "@/lib/queries/profile"
import { createServerSupabase } from "@/lib/supabase"
import { mapProperty } from "@/lib/mappers"
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
  const { slug } = await params
  const row = await getPropertyBySlug(slug)
  if (!row) return { title: "ทรัพย์สิน | บ้านไออุ่น" }
  const property = mapProperty(row)
  const description = [
    property.title,
    property.location ? `ย่าน ${property.location}` : "",
    "— บ้านไออุ่น อสังหาริมทรัพย์",
  ]
    .filter(Boolean)
    .join(" ")
  return {
    title: `${property.title} | บ้านไออุ่น`,
    description,
    openGraph: {
      title: `${property.title} | บ้านไออุ่น`,
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
