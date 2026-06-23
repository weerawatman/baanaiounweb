import Link from "next/link"
import { Plus } from "lucide-react"
import { buttonVariants } from "@/lib/button-variants"
import { getTestimonials } from "@/lib/queries/testimonials"
import { TestimonialsTable } from "./TestimonialsTable"
import { cn } from "@/lib/utils"

export const metadata = { title: "รีวิว" }

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">รีวิว</h1>
          <p className="text-muted-foreground mt-1 text-sm">จัดการรีวิวจากลูกค้า</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-primary hover:bg-primary/90 gap-2 text-white",
          )}
        >
          <Plus className="size-4" />
          เพิ่มรีวิว
        </Link>
      </div>

      <TestimonialsTable testimonials={testimonials} />
    </div>
  )
}
