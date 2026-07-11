import Link from "next/link"
import { Suspense } from "react"
import { ChevronLeft } from "lucide-react"
import { getProfile } from "@/lib/queries/profile"
import { getFaqs, groupFaqsByPage } from "@/lib/queries/faqs"
import { ProfileForm } from "@/components/admin/ProfileForm"
import { upsertProfile } from "@/actions/profile"

export const metadata = { title: "โปรไฟล์" }

function ProfileFormSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border bg-white p-6">
      <div className="mb-6 flex gap-2 border-b pb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 rounded-lg bg-muted" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 rounded bg-muted/70" />
        ))}
      </div>
    </div>
  )
}

async function ProfileFormSection() {
  const [profile, faqs] = await Promise.all([getProfile(), getFaqs()])
  const faqsByPage = groupFaqsByPage(faqs)

  return (
    <ProfileForm defaultValues={profile} faqsByPage={faqsByPage} action={upsertProfile} />
  )
}

export default function ProfilePage() {
  return (
    <div className="flex max-w-5xl flex-col gap-6">
      <div>
        <Link
          href="/admin"
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="size-4" />
          กลับ
        </Link>
        <h1 className="text-foreground text-2xl font-bold">โปรไฟล์</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          ข้อมูลพิม + รูปภาพ + FAQ ต่อหน้าเว็บ — แก้แล้วอัปเดตทุกหน้าทันที
        </p>
      </div>

      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfileFormSection />
      </Suspense>
    </div>
  )
}
