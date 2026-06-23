import { getPropertyBySlug } from "@/lib/queries/properties"
import { mapProperty } from "@/lib/mappers"
import PropertyDetailClient from "./PropertyDetailClient"

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const row = await getPropertyBySlug(slug)
  const property = row ? mapProperty(row) : null

  return <PropertyDetailClient property={property} />
}
