import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getProfile } from "@/lib/queries/profile"
import { ProfileForm } from "@/components/admin/ProfileForm"
import { upsertProfile } from "@/actions/profile"

export const metadata = { title: "โปรไฟล์" }

export default async function ProfilePage() {
  const profile = await getProfile()

  return (
    <div className="flex max-w-4xl flex-col gap-6">
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
          ข้อมูลพิม + ช่องทางติดต่อ + โซเชียล + ข้อมูลเว็บ แก้แล้วอัปเดตทุกหน้าทันที
        </p>
      </div>

      <ProfileForm defaultValues={profile} action={upsertProfile} />
    </div>
  )
}
