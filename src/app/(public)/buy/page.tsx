import { getSaleProperties } from "@/lib/queries/properties"
import { mapProperty } from "@/lib/mappers"
import BuyPage from "./BuyPage"

export const revalidate = 1800

export default async function BuyRoute() {
  const rows = await getSaleProperties()
  const properties = rows.map(mapProperty)

  return <BuyPage properties={properties} />
}
