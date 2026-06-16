import { getFaqs } from "@/lib/queries/faqs"
import { FaqsManager } from "./FaqsManager"

export const metadata = { title: "FAQ" }

export default async function FaqsPage() {
  const faqs = await getFaqs()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">FAQ</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          จัดการคำถามที่พบบ่อย (แก้ไขได้ตรงในตาราง)
        </p>
      </div>

      <FaqsManager initialFaqs={faqs} />
    </div>
  )
}
