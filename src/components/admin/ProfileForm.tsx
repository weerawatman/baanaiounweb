"use client"

import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useActionState } from "react"
import { AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SingleImageField } from "@/components/admin/SingleImageField"
import { profileSchema, type ProfileFormValues } from "@/lib/validations/profile"
import type { Profile } from "@/types"
import type { ActionState } from "@/actions/properties"
import { cn } from "@/lib/utils"

interface ProfileFormProps {
  defaultValues: Profile
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>
}

export function ProfileForm({ defaultValues, action }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(action, {})

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as Resolver<ProfileFormValues>,
    defaultValues: {
      name: defaultValues.name,
      full_name: defaultValues.fullName,
      role: defaultValues.role,
      bio: defaultValues.bio,
      vision: defaultValues.vision,
      avatar_url: defaultValues.avatarUrl,
      hero_image_url: defaultValues.heroImageUrl,
      home_hero_image: defaultValues.homeHeroImage,
      trust_renovation_image: defaultValues.trustRenovationImage,
      trust_network_image: defaultValues.trustNetworkImage,
      trust_shopper_image: defaultValues.trustShopperImage,
      match_team_image: defaultValues.matchTeamImage,
      phone: defaultValues.phone,
      line_id: defaultValues.lineId,
      line_url: defaultValues.lineUrl,
      email: defaultValues.email,
      facebook: defaultValues.facebook,
      tiktok: defaultValues.tiktok,
      youtube: defaultValues.youtube,
      site_name: defaultValues.siteName,
      slogan: defaultValues.slogan,
      address: defaultValues.address,
    },
  })

  function onSubmit(data: ProfileFormValues) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, val]) => {
      if (val != null) formData.append(key, String(val))
    })
    formAction(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {state.error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="size-4 shrink-0" />
          {state.error}
        </div>
      )}

      {/* ─── ข้อมูลพิม ───────────────────────────── */}
      <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
        <h2 className="text-foreground font-semibold">ข้อมูลพิม</h2>

        <FormField label="ชื่อเรียก" hint="เช่น พิม">
          <Input {...register("name")} placeholder="พิม" />
        </FormField>

        <FormField label="ชื่อเต็ม (หัวเรื่อง)" error={errors.full_name?.message} required>
          <Input {...register("full_name")} placeholder="คุณพิม — นายหน้าอสังหาริมทรัพย์" />
        </FormField>

        <FormField label="ตำแหน่ง/บทบาท" hint="แสดงใต้ชื่อในหน้าเกี่ยวกับ">
          <Input {...register("role")} placeholder="นายหน้าอสังหาริมทรัพย์ บ้านบึง ชลบุรี" />
        </FormField>

        <FormField label="คำบรรยาย (Bio)" error={errors.bio?.message}>
          <textarea
            {...register("bio")}
            rows={4}
            placeholder="ประวัติ/แนะนำตัวพิม..."
            className={textareaCls}
          />
        </FormField>

        <FormField label="วิสัยทัศน์ (Vision)" error={errors.vision?.message}>
          <textarea
            {...register("vision")}
            rows={3}
            placeholder="พิมมุ่งมั่น..."
            className={textareaCls}
          />
        </FormField>

        <FormField label="รูป Avatar (รูปเล็ก หน้า detail ทรัพย์)">
          <Controller
            control={control}
            name="avatar_url"
            render={({ field }) => (
              <SingleImageField
                value={field.value}
                onChange={field.onChange}
                label="อัปโหลดรูป avatar"
                aspect="square"
              />
            )}
          />
        </FormField>

        <FormField label="รูป Hero (รูปใหญ่ หน้าเกี่ยวกับ/บริการ)">
          <Controller
            control={control}
            name="hero_image_url"
            render={({ field }) => (
              <SingleImageField
                value={field.value}
                onChange={field.onChange}
                label="อัปโหลดรูป hero"
                aspect="wide"
              />
            )}
          />
        </FormField>
      </section>

      {/* ─── รูปภาพประกอบหน้า Website ────────────── */}
      <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
        <h2 className="text-foreground font-semibold">รูปภาพประกอบหน้า Website</h2>

        <FormField label="รูปพื้นหลัง Hero หน้าแรก" hint="ถ้าไม่ใส่ จะใช้รูป Hero ด้านบนแทน">
          <Controller
            control={control}
            name="home_hero_image"
            render={({ field }) => (
              <SingleImageField
                value={field.value}
                onChange={field.onChange}
                label="อัปโหลดรูปพื้นหลังหน้าแรก"
                aspect="wide"
              />
            )}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="รูปผลงานรีโนเวท" hint="แนะนำภาพเปรียบเทียบ Before & After">
            <Controller
              control={control}
              name="trust_renovation_image"
              render={({ field }) => (
                <SingleImageField
                  value={field.value}
                  onChange={field.onChange}
                  label="อัปโหลดรูป"
                  aspect="wide"
                />
              )}
            />
          </FormField>
          <FormField label="รูปนายหน้ามืออาชีพ" hint="ภาพบรรยากาศทีมงาน">
            <Controller
              control={control}
              name="trust_network_image"
              render={({ field }) => (
                <SingleImageField
                  value={field.value}
                  onChange={field.onChange}
                  label="อัปโหลดรูป"
                  aspect="wide"
                />
              )}
            />
          </FormField>
          <FormField label="รูปบริการจัดหาบ้านฟรี" hint="ภาพลูกค้า/การให้คำปรึกษา">
            <Controller
              control={control}
              name="trust_shopper_image"
              render={({ field }) => (
                <SingleImageField
                  value={field.value}
                  onChange={field.onChange}
                  label="อัปโหลดรูป"
                  aspect="wide"
                />
              )}
            />
          </FormField>
        </div>
      </section>

      {/* ─── รูปภาพหน้างานหาทรัพย์ ───────────────── */}
      <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
        <h2 className="text-foreground font-semibold">รูปภาพหน้างานหาทรัพย์ (Property Match)</h2>

        <FormField
          label="รูปทีมงานให้คำปรึกษาลูกค้า"
          hint="แสดงใต้ข้อความฝั่งซ้ายของหน้างานหาทรัพย์ (ยังไม่อัปโหลด = แสดงกล่องสำรองแทน)"
        >
          <Controller
            control={control}
            name="match_team_image"
            render={({ field }) => (
              <SingleImageField
                value={field.value}
                onChange={field.onChange}
                label="อัปโหลดรูปทีมงาน"
                aspect="wide"
              />
            )}
          />
        </FormField>
      </section>

      {/* ─── ช่องทางติดต่อ ───────────────────────── */}
      <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
        <h2 className="text-foreground font-semibold">ช่องทางติดต่อ</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="เบอร์โทร" error={errors.phone?.message}>
            <Input {...register("phone")} placeholder="086-4149960" />
          </FormField>
          <FormField label="อีเมล" error={errors.email?.message}>
            <Input {...register("email")} placeholder="supansa.m@baanaioun.com" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="LINE ID" error={errors.line_id?.message}>
            <Input {...register("line_id")} placeholder="@baan-ai-oun" />
          </FormField>
          <FormField label="LINE URL" error={errors.line_url?.message}>
            <Input {...register("line_url")} placeholder="https://line.me/ti/p/..." />
          </FormField>
        </div>

        <FormField
          label="ที่อยู่ (สำหรับแสดง + สร้างแผนที่ Google Map หน้าติดต่อ)"
          error={errors.address?.message}
          hint="แก้ที่อยู่นี้แล้วแผนที่หน้า 'ติดต่อ' จะอัปเดตตามอัตโนมัติ"
        >
          <textarea
            {...register("address")}
            rows={2}
            placeholder="107/57 เดอะคัลเลอร์เลคเชอร์ ซ.มหาชัย ม.13 ต.บางพลีใหญ่ อ.บางพลี จ.สมุทรปราการ 10540"
            className={textareaCls}
          />
        </FormField>
      </section>

      {/* ─── โซเชียล ────────────────────────────── */}
      <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
        <h2 className="text-foreground font-semibold">โซเชียลมีเดีย</h2>

        <FormField label="Facebook" error={errors.facebook?.message}>
          <Input {...register("facebook")} placeholder="https://www.facebook.com/..." />
        </FormField>
        <FormField label="TikTok" error={errors.tiktok?.message}>
          <Input {...register("tiktok")} placeholder="https://www.tiktok.com/@..." />
        </FormField>
        <FormField label="YouTube" error={errors.youtube?.message}>
          <Input {...register("youtube")} placeholder="https://youtube.com/@..." />
        </FormField>
      </section>

      {/* ─── ข้อมูลเว็บ ──────────────────────────── */}
      <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
        <h2 className="text-foreground font-semibold">ข้อมูลเว็บไซต์</h2>

        <FormField label="ชื่อเว็บไซต์" error={errors.site_name?.message} required>
          <Input {...register("site_name")} placeholder="บ้านไออุ่น พร็อพเพอร์ตี้" />
        </FormField>
        <FormField label="สโลแกน" error={errors.slogan?.message}>
          <Input {...register("slogan")} placeholder="บ้านไออุ่น: มากกว่าที่พัก..." />
        </FormField>
      </section>

      {/* ─── Submit ─────────────────────────────── */}
      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-primary/90 gap-2 text-white"
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}
          บันทึกโปรไฟล์
        </Button>
      </div>
    </form>
  )
}

function FormField({
  label,
  error,
  required,
  hint,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-foreground text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

const textareaCls = cn(
  "w-full rounded-md border border-input bg-background px-3 py-2",
  "text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 resize-y",
)
