import { getRentProperties } from "@/lib/queries/properties"
import { mapProperty } from "@/lib/mappers"
import RentPage from "./RentPage"

export const revalidate = 1800

export default async function RentRoute() {
  const rows = await getRentProperties()
  const properties = rows.map(mapProperty)

  return <RentPage properties={properties} />
}
