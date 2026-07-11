"use client"

import { useRef, useState } from "react"
import { AlertTriangle, Loader2, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import ImageUpload, { type UploadedImage } from "@/components/shared/ImageUpload"
import PrivacyNotice from "@/components/shared/PrivacyNotice"
import { PROPERTY_CATEGORY_OPTIONS } from "@/content/form-options"
import { validateForm, type FieldErrors } from "@/lib/form-validation"
import type { RequestTab } from "./tabs"
import { cn } from "@/lib/utils"

const PROPERTY_TYPE_CARDS = [
  { value: "house", icon: "🏠", labelTh: "บ้านเดี่ยว/บ้านแฝด", labelEn: "House" },
  { value: "condo", icon: "🏢", labelTh: "คอนโดมิเนียม", labelEn: "Condo" },
  { value: "townhome", icon: "🏡", labelTh: "ทาวโฮม", labelEn: "Townhome" },
  { value: "land", icon: "🌳", labelTh: "ที่ดิน", labelEn: "Land" },
] as const

const FIELD_LABELS: Record<
  RequestTab,
  {
    location: { th: string; en: string }
    budget: { th: string; en: string }
    images: { th: string; en: string }
  }
> = {
  "list-property": {
    location: { th: "ทำเลที่ตั้งทรัพย์ / แลนด์มาร์คใกล้เคียง", en: "Property Location / Nearby Landmarks" },
    budget: { th: "ราคาที่ต้องการขาย/ปล่อยเช่า", en: "Asking Price" },
    images: { th: "แนบรูปทรัพย์เพื่อให้ทีมงานประเมินเบื้องต้น", en: "Upload property photos for a quick assessment" },
  },
  matchmaking: {
    location: { th: "ทำเล / พื้นที่ / แลนด์มาร์คที่ต้องการ", en: "Preferred Location / Landmarks" },
    budget: { th: "งบประมาณที่ตั้งไว้", en: "Budget" },
    images: { th: "แนบรูปตัวอย่างทรัพย์ที่ชอบ (ถ้ามี)", en: "Upload example photos (Optional)" },
  },
  "co-agent": {
    location: { th: "ทำเลที่ตั้งทรัพย์ที่จะฝาก", en: "Listing Location" },
    budget: { th: "ราคาทรัพย์", en: "Property Price" },
    images: { th: "แนบรูปทรัพย์ที่จะฝากขาย/เช่า", en: "Upload photos of your listing" },
  },
}

const PLACEHOLDERS: Partial<
  Record<RequestTab, Partial<Record<"location" | "budget" | "name" | "phone", string>>>
> = {
  matchmaking: {
    location: "เช่น อ่อนนุช, สุขุมวิท 77, บ้านบึง, โซน EEC... | e.g. On Nut, Sukhumvit 77, Ban Bueng, EEC...",
    budget: "เช่น ซื้อ 2.5 ล้าน หรือ เช่า 15,000/เดือน | e.g. Buy 2.5M or Rent 15,000/mo",
    name: "คุณชื่ออะไรคะ? | Your full name",
    phone: "ช่องทางที่สะดวกให้ติดต่อกลับ... | Phone or LINE ID",
  },
}

function Field({
  labelTh,
  labelEn,
  required,
  error,
  children,
}: {
  labelTh: string
  labelEn: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {labelTh}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        <span className="ml-1.5 text-xs font-normal text-gray-400">{labelEn}</span>
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertTriangle className="size-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

async function uploadImages(
  images: UploadedImage[],
  setImages: (imgs: UploadedImage[]) => void,
): Promise<string[]> {
  const toUpload = images.filter((img) => !img.error && !img.url)
  const alreadyUploaded = images.filter((img) => img.url).map((img) => img.url!)
  if (toUpload.length === 0) return alreadyUploaded

  setImages(images.map((img) => (!img.error && !img.url ? { ...img, uploading: true } : img)))

  const formData = new FormData()
  for (const img of toUpload) formData.append("files", img.file)

  const res = await fetch("/api/upload-images", { method: "POST", body: formData })
  const body = await res.json()

  if (!res.ok || !body.success) {
    setImages(
      images.map((img) =>
        img.uploading ? { ...img, uploading: false, error: "อัปโหลดไม่สำเร็จ" } : img,
      ),
    )
    throw new Error(body.error ?? "Upload failed")
  }

  const uploadedUrls: string[] = body.urls ?? []
  let uploadIdx = 0
  setImages(
    images.map((img) => {
      if (!img.error && !img.url && uploadIdx < uploadedUrls.length) {
        return { ...img, uploading: false, url: uploadedUrls[uploadIdx++] }
      }
      return img
    }),
  )

  return [...alreadyUploaded, ...uploadedUrls]
}

function PropertyTypeCards({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5">
        {PROPERTY_TYPE_CARDS.map((opt) => (
          <label key={opt.value} className="cursor-pointer">
            <input
              type="radio"
              name="propertyType"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
              aria-invalid={error ? true : undefined}
            />
            <div
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3.5 text-center transition-colors",
                value === opt.value
                  ? "border-primary bg-[#f0fdf4] text-primary shadow-sm"
                  : "border-input bg-[#fafafa] text-gray-600 hover:border-primary/40",
              )}
            >
              <span className="text-2xl" aria-hidden>
                {opt.icon}
              </span>
              <span className="text-xs font-bold leading-tight">{opt.labelTh}</span>
              <span className="text-[0.65rem] font-medium text-muted-foreground">{opt.labelEn}</span>
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
          <AlertTriangle className="size-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

function MatchmakingTrustBadge() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <span className="text-lg" aria-hidden>
        🛡️
      </span>
      <p className="text-xs leading-relaxed text-slate-600">
        <strong className="text-slate-800">ปลอดภัย 100%</strong> ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุดตามมาตรฐาน
        PDPA เราจะติดต่อกลับเพื่อพูดคุยรายละเอียด โดยไม่มีค่าใช้จ่ายแอบแฝง
        <span className="mt-1 block text-slate-500">
          <strong>100% Secure.</strong> Your information is strictly confidential (PDPA compliant). No hidden
          fees.
        </span>
      </p>
    </div>
  )
}

export default function RequestForm({ requestType }: { requestType: RequestTab }) {
  const labels = FIELD_LABELS[requestType]
  const placeholders = PLACEHOLDERS[requestType] ?? {}
  const isMatchmaking = requestType === "matchmaking"
  const formRef = useRef<HTMLFormElement>(null)

  const [data, setData] = useState<Record<string, string>>({})
  const [images, setImages] = useState<UploadedImage[]>([])
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update(name: string, value: string) {
    setData((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  function inputProps(name: string) {
    return {
      value: data[name] ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => update(name, e.target.value),
      "aria-invalid": fieldErrors[name] ? true : undefined,
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = validateForm(`request-${requestType}`, data)
    if (!result.valid) {
      setFieldErrors(result.errors)
      setError("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน | Please complete the required fields")
      formRef.current
        ?.querySelector("[aria-invalid]")
        ?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setSubmitting(true)
    setError(null)
    setFieldErrors({})

    try {
      let imageUrls: string[] = []
      const validImages = images.filter((img) => !img.error)
      if (validImages.length > 0) {
        imageUrls = await uploadImages(images, setImages)
      }

      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType,
          ...data,
          ...(imageUrls.length > 0 ? { imageUrls } : {}),
        }),
      })

      const body = await res.json()
      if (!res.ok || !body.success) {
        setError(body.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง | Something went wrong, please try again")
        return
      }

      setSubmitted(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : ""
      if (msg.includes("Upload failed") || msg.includes("อัปโหลด")) {
        setError("อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง | Image upload failed, please try again")
      } else {
        setError("ไม่สามารถส่งข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต | Could not submit, please check your connection")
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <p className="text-5xl">🎉</p>
        <h3 className="mt-4 text-lg font-bold text-[#1B4D3E]">
          ส่งคำขอเรียบร้อยแล้ว ขอบคุณค่ะ
          <span className="mt-1 block text-sm font-medium text-gray-400">
            Your request has been sent — thank you!
          </span>
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          ทีมงานบ้านไออุ่นจะติดต่อกลับโดยเร็วที่สุด
          <span className="mt-0.5 block text-xs text-gray-400">
            Our team will get back to you as soon as possible.
          </span>
        </p>
        <button
          type="button"
          onClick={() => {
            setData({})
            setImages([])
            setSubmitted(false)
            setError(null)
          }}
          className="mt-6 rounded-lg border border-[#1B4D3E] px-6 py-2 text-sm font-semibold text-[#1B4D3E] transition-colors hover:bg-[#1B4D3E]/5"
        >
          ส่งคำขอใหม่ | Submit Another Request
        </button>
      </div>
    )
  }

  const propertyTypeField = isMatchmaking ? (
    <Field
      labelTh="ประเภททรัพย์ที่สนใจ"
      labelEn="Property Type"
      required
      error={fieldErrors.propertyType}
    >
      <PropertyTypeCards
        value={data.propertyType ?? ""}
        onChange={(v) => update("propertyType", v)}
        error={fieldErrors.propertyType}
      />
    </Field>
  ) : (
    <Field labelTh="ประเภททรัพย์" labelEn="Property Type" required error={fieldErrors.propertyType}>
      <select
        name="propertyType"
        value={data.propertyType ?? ""}
        onChange={(e) => update("propertyType", e.target.value)}
        aria-invalid={fieldErrors.propertyType ? true : undefined}
        className={`focus:border-ring focus:ring-ring/50 h-10 w-full rounded-lg border bg-white px-3 text-sm text-gray-700 transition-colors outline-none focus:ring-2 ${
          fieldErrors.propertyType ? "border-red-400 ring-1 ring-red-200" : "border-input"
        }`}
      >
        <option value="" disabled>
          เลือกประเภททรัพย์ | Select property type
        </option>
        {PROPERTY_CATEGORY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  )

  const locationField = (
    <Field
      labelTh={labels.location.th}
      labelEn={labels.location.en}
      required
      error={fieldErrors.location}
    >
      <Input
        name="location"
        placeholder={
          placeholders.location ??
          "เช่น บ้านบึง ชลบุรี ใกล้นิคมอมตะ | e.g. Ban Bueng, Chonburi, near Amata"
        }
        className="h-10"
        {...inputProps("location")}
      />
    </Field>
  )

  const budgetField = (
    <Field labelTh={labels.budget.th} labelEn={labels.budget.en} error={fieldErrors.budget}>
      <Input
        name="budget"
        placeholder={placeholders.budget ?? "เช่น 2,500,000 บาท | e.g. 2,500,000 THB"}
        className="h-10"
        {...inputProps("budget")}
      />
    </Field>
  )

  const imagesField = (
    <Field labelTh={labels.images.th} labelEn={labels.images.en}>
      <ImageUpload images={images} onChange={setImages} disabled={submitting} />
      {isMatchmaking && (
        <p className="mt-3 rounded-md bg-[#dcfce7] px-3 py-2.5 text-xs font-medium leading-relaxed text-[#166534]">
          💡 สามารถแคปหน้าจอรูปภาพบ้านจากที่อื่น ส่งมาให้เราช่วยจัดหาแบบเดียวกันในราคาที่ดีกว่าได้เลยค่ะ
          <span className="mt-1 block text-[#166534]/80">
            Feel free to screenshot listings you like from other sites so we can find similar matches.
          </span>
        </p>
      )}
    </Field>
  )

  const contactFields = (
    <>
      <Field labelTh="ชื่อ-นามสกุล" labelEn="Full Name" required error={fieldErrors.name}>
        <Input
          name="name"
          placeholder={placeholders.name ?? "ชื่อ-นามสกุล | Full name"}
          className="h-10"
          {...inputProps("name")}
        />
      </Field>

      <Field
        labelTh={isMatchmaking ? "เบอร์โทร / LINE ID" : "เบอร์โทร / WhatsApp / LINE"}
        labelEn={isMatchmaking ? "Phone / LINE ID" : "Phone / WhatsApp / LINE"}
        required
        error={fieldErrors.phone}
      >
        <Input
          name="phone"
          placeholder={
            placeholders.phone ??
            "เช่น 0812345678 หรือ LINE ID | e.g. 0812345678 or LINE ID"
          }
          className="h-10"
          {...inputProps("phone")}
        />
      </Field>

      <Field labelTh="อีเมล" labelEn="Email" required error={fieldErrors.email}>
        <Input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="h-10"
          {...inputProps("email")}
        />
      </Field>
    </>
  )

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {isMatchmaking ? (
        <>
          {propertyTypeField}
          {locationField}
          {budgetField}
          {imagesField}
          <hr className="border-border" />
          {contactFields}
        </>
      ) : (
        <>
          {contactFields}
          {propertyTypeField}
          {locationField}
          {budgetField}
          {imagesField}
        </>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-lg bg-[#1B4D3E] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#163f33] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {submitting
          ? "กำลังส่ง... | Sending..."
          : isMatchmaking
            ? "ส่งโจทย์ให้ทีมงานช่วยหา 🚀"
            : "ส่งคำขอ | Submit Request"}
      </button>

      {isMatchmaking ? <MatchmakingTrustBadge /> : <PrivacyNotice />}
    </form>
  )
}
