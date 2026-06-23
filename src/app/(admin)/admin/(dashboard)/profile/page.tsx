import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getProfile } from "@/lib/queries/profile"
import { ProfileForm } from "@/components/admin/ProfileForm"
import { upsertProfile } from "@/actions/profile"

export const metadata = { title: "โปรไฟล์" }

export default async function ProfilePage() {
  const profile = await getProfile()

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ChevronLeft className="size-4" />
          กลับ
        </Link>
        <h1 className="text-2xl font-bold text-foreground">โปรไฟล์</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          ข้อมูลพิม + ช่องทางติดต่อ + โซเชียล + ข้อมูลเว็บ แก้แล้วอัปเดตทุกหน้าทันที
        </p>
      </div>

      <ProfileForm defaultValues={profile} action={upsertProfile} />
    </div>
  )
}
