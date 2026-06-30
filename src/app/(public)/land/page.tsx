import { getLandProperties } from "@/lib/queries/properties"
import { mapProperty } from "@/lib/mappers"
import LandPage from "./LandPage"

export const revalidate = 1800

export default async function LandRoute() {
  const rows = await getLandProperties()
  const properties = rows.map(mapProperty)

  return <LandPage properties={properties} />
}
