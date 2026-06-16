import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { TestimonialForm } from "../../TestimonialForm"
import { updateTestimonial } from "@/actions/testimonials"
import { getTestimonialById } from "@/lib/queries/testimonials"

export const metadata = { title: "แก้ไขรีวิว" }

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params
  const testimonial = await getTestimonialById(id)

  if (!testimonial) notFound()

  const action = updateTestimonial.bind(null, id)

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <Link
          href="/admin/testimonials"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ChevronLeft className="size-4" />
          กลับ
        </Link>
        <h1 className="text-2xl font-bold text-foreground">
          แก้ไขรีวิว: {testimonial.client_name}
        </h1>
      </div>
      <TestimonialForm
        defaultValues={testimonial}
        action={action}
        submitLabel="บันทึกการเปลี่ยนแปลง"
      />
    </div>
  )
}
