"use client"

import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useActionState } from "react"
import { AlertTriangle, Loader2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { testimonialSchema, type TestimonialFormValues } from "@/lib/validations/testimonial"
import type { Testimonial } from "@/lib/types/property"
import type { ActionState } from "@/actions/properties"
import { PROPERTY_CATEGORY_OPTIONS } from "@/content/form-options"
import { cn } from "@/lib/utils"

interface TestimonialFormProps {
  defaultValues?: Partial<Testimonial>
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>
  submitLabel?: string
}

export function TestimonialForm({
  defaultValues,
  action,
  submitLabel = "บันทึก",
}: TestimonialFormProps) {
  const [state, formAction, isPending] = useActionState(action, {})

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema) as Resolver<TestimonialFormValues>,
    defaultValues: {
      client_name: defaultValues?.client_name ?? "",
      quote: defaultValues?.quote ?? "",
      property_type: defaultValues?.property_type ?? "",
      rating: defaultValues?.rating ?? 5,
      avatar_url: defaultValues?.avatar_url ?? "",
      published: defaultValues?.published ?? true,
      sort_order: defaultValues?.sort_order ?? 0,
    },
  })

  const rating = watch("rating")

  function onSubmit(data: TestimonialFormValues) {
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
              ชื่อลูกค้า <span className="text-red-500">*</span>
            </label>
            <Input {...register("client_name")} placeholder="คุณสมชาย ใจดี" />
            {errors.client_name && (
              <p className="text-xs text-red-500">{errors.client_name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">ประเภททรัพย์</label>
            <select {...register("property_type")} className={selectCls}>
              <option value="">— เลือก —</option>
              {PROPERTY_CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.labelTh}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            คำรีวิว <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("quote")}
            rows={4}
            placeholder="พิมดูแลอย่างดีมาก..."
            className={textareaCls}
          />
          {errors.quote && <p className="text-xs text-red-500">{errors.quote.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">คะแนน</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setValue("rating", star)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    "size-7 transition-colors",
                    star <= rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-100 text-gray-300",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">URL รูป Avatar</label>
          <Input {...register("avatar_url")} placeholder="https://..." />
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
              เผยแพร่
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

const selectCls = cn(
  "w-full rounded-md border border-input bg-background px-3 py-2",
  "text-sm focus:outline-none focus:ring-2 focus:ring-ring",
)
