import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { SuccessStoryForm } from "../SuccessStoryForm"
import { createSuccessStory } from "@/actions/success-stories"

export const metadata = { title: "เพิ่มผลงานก่อน-หลัง" }

export default function NewSuccessStoryPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <Link
          href="/admin/success-stories"
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="size-4" />
          กลับ
        </Link>
        <h1 className="text-foreground text-2xl font-bold">เพิ่มผลงานใหม่</h1>
      </div>
      <SuccessStoryForm action={createSuccessStory} submitLabel="บันทึกผลงาน" />
    </div>
  )
}
