import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { TestimonialForm } from "../TestimonialForm"
import { createTestimonial } from "@/actions/testimonials"

export const metadata = { title: "เพิ่มรีวิว" }

export default function NewTestimonialPage() {
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
        <h1 className="text-2xl font-bold text-foreground">เพิ่มรีวิวใหม่</h1>
      </div>
      <TestimonialForm action={createTestimonial} submitLabel="บันทึกรีวิว" />
    </div>
  )
}
