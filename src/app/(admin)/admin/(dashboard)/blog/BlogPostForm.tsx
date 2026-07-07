"use client"

import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useActionState } from "react"
import { AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlogEditor } from "@/components/admin/BlogEditor"
import { blogSchema, type BlogFormValues } from "@/lib/validations/blog"
import type { BlogPost } from "@/lib/types/property"
import type { ActionState } from "@/actions/properties"
import { cn } from "@/lib/utils"

interface BlogPostFormProps {
  defaultValues?: Partial<BlogPost>
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>
  submitLabel?: string
}

export function BlogPostForm({ defaultValues, action, submitLabel = "บันทึก" }: BlogPostFormProps) {
  const [state, formAction, isPending] = useActionState(action, {})

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema) as Resolver<BlogFormValues>,
    defaultValues: {
      title: defaultValues?.title ?? "",
      slug: defaultValues?.slug ?? "",
      category: defaultValues?.category ?? "",
      category_slug: defaultValues?.category_slug ?? "",
      excerpt: defaultValues?.excerpt ?? "",
      content: defaultValues?.content ?? "",
      reading_time: defaultValues?.reading_time ?? "",
      featured_image: defaultValues?.featured_image ?? "",
      published: defaultValues?.published ?? false,
    },
  })

  function onSubmit(data: BlogFormValues) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, val]) => {
      if (val != null && val !== "") formData.append(key, String(val))
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

      {/* ─── ข้อมูลพื้นฐาน ─── */}
      <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
        <h2 className="text-foreground font-semibold">ข้อมูลพื้นฐาน</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="ชื่อบทความ" error={errors.title?.message} required>
            <Input {...register("title")} placeholder="5 เหตุผลที่ควรซื้อบ้านในบ้านบึง" />
          </FormField>
          <FormField label="Slug (URL)" error={errors.slug?.message} required>
            <Input {...register("slug")} placeholder="5-reasons-buy-home-ban-bueng" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="หมวดหมู่" error={errors.category?.message}>
            <Input {...register("category")} placeholder="ซื้อบ้าน" />
          </FormField>
          <FormField label="Slug หมวดหมู่" error={errors.category_slug?.message}>
            <Input {...register("category_slug")} placeholder="buy-home" />
          </FormField>
        </div>

        <FormField label="URL รูปปก" error={errors.featured_image?.message}>
          <Input {...register("featured_image")} placeholder="https://..." />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="เวลาอ่าน" error={errors.reading_time?.message}>
            <Input {...register("reading_time")} placeholder="5 นาที" />
          </FormField>
          <FormField label="สถานะ" error={errors.published?.message}>
            <Controller
              control={control}
              name="published"
              render={({ field }) => (
                <select
                  value={field.value ? "active" : "cancelled"}
                  onChange={(e) => field.onChange(e.target.value === "active")}
                  className={selectCls}
                >
                  <option value="active">ใช้งาน — แสดงบนหน้าเว็บ</option>
                  <option value="cancelled">ยกเลิก — ไม่แสดงบนหน้าเว็บ</option>
                </select>
              )}
            />
          </FormField>
        </div>
      </section>

      {/* ─── คำย่อ ─── */}
      <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
        <h2 className="text-foreground font-semibold">คำย่อ (Excerpt)</h2>
        <textarea
          {...register("excerpt")}
          rows={3}
          placeholder="สรุปบทความสั้นๆ..."
          className={textareaCls}
        />
      </section>

      {/* ─── เนื้อหา (Tiptap) ─── */}
      <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
        <h2 className="text-foreground font-semibold">เนื้อหา</h2>
        <Controller
          control={control}
          name="content"
          render={({ field }) => <BlogEditor value={field.value} onChange={field.onChange} />}
        />
      </section>

      {/* ─── Submit ─── */}
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

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-foreground text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

const textareaCls = cn(
  "w-full rounded-md border border-input bg-background px-3 py-2",
  "text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y",
)

const selectCls = cn(
  "h-9 w-full rounded-md border border-input bg-background px-3 py-1",
  "text-sm focus:outline-none focus:ring-2 focus:ring-ring",
)
