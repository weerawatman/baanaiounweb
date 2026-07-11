import Link from "next/link"
import { Plus } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { getAllSuccessStories } from "@/lib/queries/success-stories"
import { SuccessStoriesTable } from "./SuccessStoriesTable"
import { cn } from "@/lib/utils"

export const metadata = { title: "ผลงานก่อน-หลัง" }

export default async function SuccessStoriesPage() {
  const stories = await getAllSuccessStories()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">ผลงานก่อน-หลัง</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            อัปโหลดรูปก่อน-หลังรีโนเวท — แสดงบนหน้าแรกในโซนความไว้วางใจจากลูกค้า
          </p>
        </div>
        <Link
          href="/admin/success-stories/new"
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-primary hover:bg-primary/90 gap-2 text-white",
          )}
        >
          <Plus className="size-4" />
          เพิ่มผลงาน
        </Link>
      </div>

      <SuccessStoriesTable stories={stories} />
    </div>
  )
}
