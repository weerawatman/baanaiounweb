import { getProperties } from "@/lib/queries/properties"
import { mapProperty } from "@/lib/mappers"
import BuyPage from "./BuyPage"

export default async function BuyRoute() {
  const rows = await getProperties()
  const properties = rows
    .filter((p) => p.type === "SALE" && p.status === "ACTIVE")
    .map(mapProperty)

  return <BuyPage properties={properties} />
}
