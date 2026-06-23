import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { TestimonialForm } from "../TestimonialForm"
import { createTestimonial } from "@/actions/testimonials"

export const metadata = { title: "เพิ่มรีวิว" }

export default function NewTestimonialPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <Link
          href="/admin/testimonials"
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="size-4" />
          กลับ
        </Link>
        <h1 className="text-foreground text-2xl font-bold">เพิ่มรีวิวใหม่</h1>
      </div>
      <TestimonialForm action={createTestimonial} submitLabel="บันทึกรีวิว" />
    </div>
  )
}
