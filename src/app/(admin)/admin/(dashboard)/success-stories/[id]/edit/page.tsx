import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { SuccessStoryForm } from "../../SuccessStoryForm"
import { updateSuccessStory } from "@/actions/success-stories"
import { getSuccessStoryById } from "@/lib/queries/success-stories"

export const metadata = { title: "แก้ไขผลงานก่อน-หลัง" }

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditSuccessStoryPage({ params }: Props) {
  const { id } = await params
  const story = await getSuccessStoryById(id)

  if (!story) notFound()

  const action = updateSuccessStory.bind(null, id)

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
        <h1 className="text-foreground text-2xl font-bold">แก้ไขผลงาน: {story.title}</h1>
      </div>
      <SuccessStoryForm
        defaultValues={story}
        action={action}
        submitLabel="บันทึกการเปลี่ยนแปลง"
      />
    </div>
  )
}
