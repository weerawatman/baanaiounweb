import { getPropertyBySlug } from "@/lib/queries/properties"
import { getProfile } from "@/lib/queries/profile"
import { mapProperty } from "@/lib/mappers"
import PropertyDetailClient from "./PropertyDetailClient"

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
