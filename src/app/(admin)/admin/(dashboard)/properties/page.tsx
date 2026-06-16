import Link from "next/link"
import { Plus } from "lucide-react"
import { buttonVariants } from "@/lib/button-variants"
import { getProperties } from "@/lib/queries/properties"
import { PropertiesTable } from "./PropertiesTable"
import { cn } from "@/lib/utils"

export const metadata = { title: "ทรัพย์" }

export default async function PropertiesPage() {
  const properties = await getProperties()
  const active = properties.filter((p) => !p.deleted_at)
  const archived = properties.filter((p) => !!p.deleted_at)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">ทรัพย์</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            จัดการรายการทรัพย์ทั้งหมด
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className={cn(
            buttonVariants({ variant: "default" }),
            "gap-2 bg-primary text-white hover:bg-primary/90",
          )}
        >
          <Plus className="size-4" />
          เพิ่มทรัพย์
        </Link>
      </div>

      <PropertiesTable active={active} archived={archived} />
    </div>
  )
}
