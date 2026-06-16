import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { PropertyForm } from "@/components/admin/PropertyForm"
import { updateProperty } from "@/actions/properties"
import { getPropertyById } from "@/lib/queries/properties"

export const metadata = { title: "แก้ไขทรัพย์" }

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params
  const property = await getPropertyById(id)

  if (!property) notFound()

  const action = updateProperty.bind(null, id)

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ChevronLeft className="size-4" />
          กลับ
        </Link>
        <h1 className="text-2xl font-bold text-foreground">
          แก้ไขทรัพย์: {property.title}
        </h1>
      </div>

      <PropertyForm
        defaultValues={property}
        action={action}
        submitLabel="บันทึกการเปลี่ยนแปลง"
      />
    </div>
  )
}
