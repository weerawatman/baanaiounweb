import { getProperties } from "@/lib/queries/properties"
import { mapProperty } from "@/lib/mappers"
import LandPage from "./LandPage"

export default async function LandRoute() {
  const rows = await getProperties()
  const properties = rows
    .filter((p) => p.type === "LAND" && p.status === "ACTIVE")
    .map(mapProperty)

  return <LandPage properties={properties} />
}
