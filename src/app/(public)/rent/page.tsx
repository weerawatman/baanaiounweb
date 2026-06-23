import { getProperties } from "@/lib/queries/properties"
import { mapProperty } from "@/lib/mappers"
import RentPage from "./RentPage"

export default async function RentRoute() {
  const rows = await getProperties()
  const properties = rows.filter((p) => p.type === "RENT" && p.status === "ACTIVE").map(mapProperty)

  return <RentPage properties={properties} />
}
