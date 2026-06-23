import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { PropertyForm } from "@/components/admin/PropertyForm"
import { createProperty } from "@/actions/properties"

export const metadata = { title: "เพิ่มทรัพย์" }

export default function NewPropertyPage() {
  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <Link
          href="/admin/properties"
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="size-4" />
          กลับ
        </Link>
        <h1 className="text-foreground text-2xl font-bold">เพิ่มทรัพย์ใหม่</h1>
      </div>

      <PropertyForm action={createProperty} submitLabel="เพิ่มทรัพย์" />
    </div>
  )
}
