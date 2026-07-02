import type { Metadata } from "next"
import { getActiveProperties } from "@/lib/queries/properties"
import { mapProperty } from "@/lib/mappers"
import PropertiesPage from "./PropertiesPage"

export const revalidate = 900

export const metadata: Metadata = {
  title: "ทรัพย์ทั้งหมด | All Properties — บ้านไออุ่น พร็อพเพอร์ตี้",
  description:
    "รายการบ้านขาย บ้านเช่า และที่ดินทั้งหมดจากบ้านไออุ่น พร็อพเพอร์ตี้ ในเขตบ้านบึง ชลบุรี ใกล้นิคมอมตะ เหมราช EEC",
}

export default async function PropertiesRoute() {
  const rows = await getActiveProperties()
  const properties = rows.map(mapProperty)
  return <PropertiesPage properties={properties} />
}
