"use client"

import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useActionState } from "react"
import { AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SingleImageField } from "@/components/admin/SingleImageField"
import { successStorySchema, type SuccessStoryFormValues } from "@/lib/validations/success-story"
import { UPLOAD_STORAGE_FOLDERS } from "@/lib/upload-storage"
import type { SuccessStory } from "@/lib/types/property"
import type { ActionState } from "@/actions/properties"
import { cn } from "@/lib/utils"

interface SuccessStoryFormProps {
  defaultValues?: Partial<SuccessStory>
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>
  submitLabel?: string
}

export function SuccessStoryForm({
  defaultValues,
  action,
  submitLabel = "บันทึก",
}: SuccessStoryFormProps) {
  const [state, formAction, isPending] = useActionState(action, {})

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SuccessStoryFormValues>({
    resolver: zodResolver(successStorySchema) as Resolver<SuccessStoryFormValues>,
    defaultValues: {
      title: defaultValues?.title ?? "",
      title_en: defaultValues?.title_en ?? "",
      description: defaultValues?.description ?? "",
      description_en: defaultValues?.description_en ?? "",
      location: defaultValues?.location ?? "",
      before_image_url: defaultValues?.before_image_url ?? "",
      after_image_url: defaultValues?.after_image_url ?? "",
      published: defaultValues?.published ?? true,
      sort_order: defaultValues?.sort_order ?? 0,
    },
  })

  function onSubmit(data: SuccessStoryFormValues) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, String(val))
    })
    formData.set("published", String(data.published))
    formAction(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {state.error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="size-4 shrink-0" />
          {state.error}
        </div>
      )}

      <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              หัวข้อ (ไทย) <span className="text-red-500">*</span>
            </label>
            <Input {...register("title")} placeholder="รีโนเวทบ้านเดี่ยว บ้านบึง" />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">หัวข้อ (English)</label>
            <Input {...register("title_en")} placeholder="Renovated single house" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">ทำเล</label>
          <Input {...register("location")} placeholder="บ้านบึง ชลบุรี" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">คำอธิบาย (ไทย)</label>
          <textarea {...register("description")} rows={3} className={textareaCls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">คำอธิบาย (English)</label>
          <textarea {...register("description_en")} rows={3} className={textareaCls} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              รูปก่อนรีโนเวท <span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="before_image_url"
              render={({ field }) => (
                <SingleImageField
                  value={field.value}
                  onChange={field.onChange}
                  label="อัปโหลดรูปก่อนรีโนเวท"
                  aspect="wide"
                  uploadFolder={UPLOAD_STORAGE_FOLDERS.successStories}
                />
              )}
            />
            {errors.before_image_url && (
              <p className="text-xs text-red-500">{errors.before_image_url.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              รูปหลังรีโนเวท <span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="after_image_url"
              render={({ field }) => (
                <SingleImageField
                  value={field.value}
                  onChange={field.onChange}
                  label="อัปโหลดรูปหลังรีโนเวท"
                  aspect="wide"
                  uploadFolder={UPLOAD_STORAGE_FOLDERS.successStories}
                />
              )}
            />
            {errors.after_image_url && (
              <p className="text-xs text-red-500">{errors.after_image_url.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">ลำดับแสดงผล</label>
            <Input type="number" {...register("sort_order")} />
          </div>
          <div className="flex items-end gap-3 pb-1">
            <Controller
              control={control}
              name="published"
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="published"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="border-border accent-primary size-4 rounded"
                />
              )}
            />
            <label htmlFor="published" className="cursor-pointer text-sm font-medium">
              เผยแพร่บนหน้าแรก
            </label>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          ยกเลิก
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-primary/90 gap-2 text-white"
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

const textareaCls = cn(
  "w-full rounded-md border border-input bg-background px-3 py-2",
  "text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y",
)
