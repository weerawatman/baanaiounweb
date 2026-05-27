import { MOCK_PROPERTIES } from "@/data/properties"
import PropertyDetailClient from "./PropertyDetailClient"

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = MOCK_PROPERTIES.find((p) => p.slug === slug) ?? null

  return <PropertyDetailClient property={property} />
}
