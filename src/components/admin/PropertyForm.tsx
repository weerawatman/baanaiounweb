"use client"

import { useForm, useFieldArray, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useActionState, useTransition } from "react"
import { AlertTriangle, Plus, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { propertySchema, type PropertyFormValues } from "@/lib/validations/property"
import type { Property } from "@/lib/types/property"
import type { ActionState } from "@/actions/properties"
import { cn } from "@/lib/utils"

interface PropertyFormProps {
  defaultValues?: Partial<Property>
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>
  submitLabel?: string
}

export function PropertyForm({
  defaultValues,
  action,
  submitLabel = "บันทึก",
}: PropertyFormProps) {
  const [state, formAction, isPending] = useActionState(action, {})

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema) as Resolver<PropertyFormValues>,
    defaultValues: {
      title: defaultValues?.title ?? "",
      slug: defaultValues?.slug ?? "",
      type: defaultValues?.type ?? "SALE",
      sub_type: defaultValues?.sub_type ?? undefined,
      price: defaultValues?.price ?? 0,
      price_label: defaultValues?.price_label ?? "",
      area_sqm: defaultValues?.area_sqm ?? 0,
      bedrooms: defaultValues?.bedrooms ?? 0,
      bathrooms: defaultValues?.bathrooms ?? 0,
      description: defaultValues?.description ?? "",
      emotional_desc: defaultValues?.emotional_desc ?? "",
      pim_insight: defaultValues?.pim_insight ?? "",
      status: defaultValues?.status ?? "ACTIVE",
      featured: defaultValues?.featured ?? false,
      images: defaultValues?.images ?? [],
      image_primary: defaultValues?.image_primary ?? "",
      district: defaultValues?.district ?? "",
      subdistrict: defaultValues?.subdistrict ?? "",
      lat: defaultValues?.lat ?? undefined,
      lng: defaultValues?.lng ?? undefined,
      distance_amata: defaultValues?.distance_amata ?? "",
      distance_hospital: defaultValues?.distance_hospital ?? "",
      distance_market: defaultValues?.distance_market ?? "",
      nearest_estate: defaultValues?.nearest_estate ?? "",
      amenities: defaultValues?.amenities ?? [],
      video_url: defaultValues?.video_url ?? "",
      tags: defaultValues?.tags ?? [],
    },
  })

  const {
    fields: amenityFields,
    append: appendAmenity,
    remove: removeAmenity,
  } = useFieldArray({ control, name: "amenities" as never })

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({ control, name: "tags" as never })

  const images = watch("images")

  function onSubmit(data: PropertyFormValues) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => formData.append(key, v))
      } else if (val != null && val !== "") {
        formData.append(key, String(val))
      }
    })
    formData.set("featured", String(data.featured))
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

      {/* ─── Section 1: ข้อมูลพื้นฐาน ─────────────── */}
      <section className="rounded-xl border bg-white p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-foreground">ข้อมูลพื้นฐาน</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="ชื่อทรัพย์" error={errors.title?.message} required>
            <Input {...register("title")} placeholder="บ้านเดี่ยว 2 ชั้น ซอยเกษมราษฎร์" />
          </FormField>

          <FormField label="Slug (URL)" error={errors.slug?.message} required>
            <Input {...register("slug")} placeholder="ban-diao-2-chan-soi-kasem" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="ประเภท" error={errors.type?.message} required>
            <select {...register("type")} className={selectCls}>
              <option value="SALE">ขาย</option>
              <option value="RENT">เช่า</option>
              <option value="LAND">ที่ดิน</option>
            </select>
          </FormField>

          <FormField label="ประเภทย่อย" error={errors.sub_type?.message}>
            <select {...register("sub_type")} className={selectCls}>
              <option value="">— เลือก —</option>
              <option value="new">ใหม่</option>
              <option value="renovated">รีโนเวท</option>
              <option value="townhome">ทาวน์โฮม</option>
              <option value="residential">หมู่บ้าน</option>
              <option value="investment">เพื่อการลงทุน</option>
            </select>
          </FormField>

          <FormField label="สถานะ" error={errors.status?.message} required>
            <select {...register("status")} className={selectCls}>
              <option value="ACTIVE">เผยแพร่</option>
              <option value="SOLD">ขายแล้ว</option>
              <option value="RENTED">เช่าแล้ว</option>
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="ราคา (บาท)" error={errors.price?.message} required>
            <Input type="number" min={0} {...register("price")} />
          </FormField>
          <FormField label="ข้อความแสดงราคา" error={errors.price_label?.message} required>
            <Input {...register("price_label")} placeholder="3,500,000 บาท หรือ 8,000 บาท/เดือน" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="พื้นที่ (ตร.ม.)" error={errors.area_sqm?.message}>
            <Input type="number" min={0} step={0.5} {...register("area_sqm")} />
          </FormField>
          <FormField label="ห้องนอน" error={errors.bedrooms?.message}>
            <Input type="number" min={0} {...register("bedrooms")} />
          </FormField>
          <FormField label="ห้องน้ำ" error={errors.bathrooms?.message}>
            <Input type="number" min={0} {...register("bathrooms")} />
          </FormField>
        </div>

        <div className="flex items-center gap-3">
          <Controller
            control={control}
            name="featured"
            render={({ field }) => (
              <input
                type="checkbox"
                id="featured"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="size-4 rounded border-border accent-primary"
              />
            )}
          />
          <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
            ทรัพย์แนะนำ (แสดงในหน้าแรก)
          </label>
        </div>
      </section>

      {/* ─── Section 2: คำบรรยาย ──────────────────── */}
      <section className="rounded-xl border bg-white p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-foreground">คำบรรยาย</h2>

        <FormField label="รายละเอียดทั่วไป" error={errors.description?.message}>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="รายละเอียดทรัพย์..."
            className={textareaCls}
          />
        </FormField>

        <FormField label="คำบรรยายอารมณ์" error={errors.emotional_desc?.message}>
          <textarea
            {...register("emotional_desc")}
            rows={3}
            placeholder="บ้านหลังนี้เหมาะกับ..."
            className={textareaCls}
          />
        </FormField>

        <FormField label="มุมมองพิม" error={errors.pim_insight?.message}>
          <textarea
            {...register("pim_insight")}
            rows={3}
            placeholder="พิมคิดว่าทรัพย์นี้..."
            className={textareaCls}
          />
        </FormField>
      </section>

      {/* ─── Section 3: ทำเล ─────────────────────── */}
      <section className="rounded-xl border bg-white p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-foreground">ทำเล</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="อำเภอ" error={errors.district?.message}>
            <Input {...register("district")} placeholder="บ้านบึง" />
          </FormField>
          <FormField label="ตำบล" error={errors.subdistrict?.message}>
            <Input {...register("subdistrict")} placeholder="บ้านบึง" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <FormField label="ระยะนิคมอมตะ" error={errors.distance_amata?.message}>
            <Input {...register("distance_amata")} placeholder="5 กม." />
          </FormField>
          <FormField label="ระยะโรงพยาบาล" error={errors.distance_hospital?.message}>
            <Input {...register("distance_hospital")} placeholder="3 กม." />
          </FormField>
          <FormField label="ระยะตลาด" error={errors.distance_market?.message}>
            <Input {...register("distance_market")} placeholder="1 กม." />
          </FormField>
          <FormField label="หมู่บ้าน/โครงการ" error={errors.nearest_estate?.message}>
            <Input {...register("nearest_estate")} placeholder="ชื่อโครงการ" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Latitude (ละติจูด)" error={errors.lat?.message}>
            <Input type="number" step="any" {...register("lat")} placeholder="13.5678" />
          </FormField>
          <FormField label="Longitude (ลองจิจูด)" error={errors.lng?.message}>
            <Input type="number" step="any" {...register("lng")} placeholder="101.1234" />
          </FormField>
        </div>
      </section>

      {/* ─── Section 4: รูปภาพ ───────────────────── */}
      <section className="rounded-xl border bg-white p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-foreground">รูปภาพ</h2>

        <ImageUploader value={images} onChange={(urls) => setValue("images", urls)} />

        {images.length > 0 && (
          <FormField label="รูปหลัก (URL)" error={errors.image_primary?.message}>
            <select
              {...register("image_primary")}
              className={selectCls}
            >
              <option value="">— เลือกรูปหลัก —</option>
              {images.map((url, i) => (
                <option key={url} value={url}>
                  รูปที่ {i + 1}
                </option>
              ))}
            </select>
          </FormField>
        )}

        <FormField label="URL วิดีโอ (ถ้ามี)" error={errors.video_url?.message}>
          <Input {...register("video_url")} placeholder="https://youtube.com/..." />
        </FormField>
      </section>

      {/* ─── Section 5: Tags & Amenities ─────────── */}
      <section className="rounded-xl border bg-white p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-foreground">Tags และสิ่งอำนวยความสะดวก</h2>

        <div>
          <p className="text-sm font-medium mb-2">Tags</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {tagFields.map((field, i) => (
              <div key={field.id} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <Input
                  {...register(`tags.${i}` as const)}
                  className="h-auto border-none bg-transparent p-0 text-sm w-24 focus-visible:ring-0"
                />
                <button type="button" onClick={() => removeTag(i)}>
                  <X className="size-3 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendTag("" as never)}
              className="rounded-full gap-1"
            >
              <Plus className="size-3" />
              เพิ่ม tag
            </Button>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">สิ่งอำนวยความสะดวก</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {amenityFields.map((field, i) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...register(`amenities.${i}` as const)}
                  placeholder="เช่น แอร์, เครื่องซัก"
                  className="text-sm"
                />
                <button type="button" onClick={() => removeAmenity(i)}>
                  <X className="size-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendAmenity("" as never)}
            className="mt-2 gap-1"
          >
            <Plus className="size-3" />
            เพิ่มรายการ
          </Button>
        </div>
      </section>

      {/* ─── Submit ───────────────────────────────── */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          ยกเลิก
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="gap-2 bg-primary text-white hover:bg-primary/90"
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
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

const selectCls = cn(
  "h-10 w-full rounded-md border border-input bg-background px-3 py-2",
  "text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
)

const textareaCls = cn(
  "w-full rounded-md border border-input bg-background px-3 py-2",
  "text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 resize-y",
)
