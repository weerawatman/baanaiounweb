"use client"

import { useRef, useState } from "react"
import { AlertTriangle, Loader2, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import ImageUpload, { type UploadedImage } from "@/components/shared/ImageUpload"
import PrivacyNotice from "@/components/shared/PrivacyNotice"
import { REQUEST_PROPERTY_TYPE_OPTIONS } from "@/content/form-options"
import { validateForm, type FieldErrors } from "@/lib/form-validation"
import type { RequestTab } from "./tabs"

// ─── Per-tab field labels (structure identical, wording adapts) ──────────

const FIELD_LABELS: Record<
  RequestTab,
  { location: { th: string; en: string }; budget: { th: string; en: string }; images: { th: string; en: string } }
> = {
  "list-property": {
    location: { th: "ทำเลที่ตั้งทรัพย์ / แลนด์มาร์คใกล้เคียง", en: "Property Location / Nearby Landmarks" },
    budget: { th: "ราคาที่ต้องการขาย/ปล่อยเช่า", en: "Asking Price" },
    images: { th: "แนบรูปทรัพย์เพื่อให้ทีมงานประเมินเบื้องต้น", en: "Upload property photos for a quick assessment" },
  },
  matchmaking: {
    location: { th: "ทำเล / พื้นที่ / แลนด์มาร์คที่ต้องการ", en: "Preferred Location / Area / Key Landmarks" },
    budget: { th: "งบประมาณ", en: "Budget" },
    images: { th: "แนบรูปตัวอย่างทรัพย์ที่ชอบ (ถ้ามี)", en: "Upload example photos of properties you like (optional)" },
  },
  "co-agent": {
    location: { th: "ทำเลที่ตั้งทรัพย์ที่จะฝาก", en: "Listing Location" },
    budget: { th: "ราคาทรัพย์", en: "Property Price" },
    images: { th: "แนบรูปทรัพย์ที่จะฝากขาย/เช่า", en: "Upload photos of your listing" },
  },
}

// ─── Small field wrapper ─────────────────────────────────────────────────

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

// ─── Upload helper (mirrors PropertyForm's flow) ─────────────────────────

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

// ─── Form ────────────────────────────────────────────────────────────────

export default function RequestForm({ requestType }: { requestType: RequestTab }) {
  const labels = FIELD_LABELS[requestType]
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

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <Field labelTh="ชื่อ" labelEn="Name" required error={fieldErrors.name}>
        <Input
          name="name"
          placeholder="ชื่อ-นามสกุล | Full name"
          className="h-10"
          {...inputProps("name")}
        />
      </Field>

      <Field
        labelTh="เบอร์โทร / WhatsApp / LINE"
        labelEn="Phone / WhatsApp / LINE"
        required
        error={fieldErrors.phone}
      >
        <Input
          name="phone"
          placeholder="เช่น 0812345678 หรือ LINE ID | e.g. 0812345678 or LINE ID"
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

      <Field
        labelTh="ประเภททรัพย์"
        labelEn="Property Type"
        required
        error={fieldErrors.propertyType}
      >
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
          {REQUEST_PROPERTY_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        labelTh={labels.location.th}
        labelEn={labels.location.en}
        required
        error={fieldErrors.location}
      >
        <Input
          name="location"
          placeholder="เช่น บ้านบึง ชลบุรี ใกล้นิคมอมตะ | e.g. Ban Bueng, Chonburi, near Amata"
          className="h-10"
          {...inputProps("location")}
        />
      </Field>

      <Field labelTh={labels.budget.th} labelEn={labels.budget.en} error={fieldErrors.budget}>
        <Input
          name="budget"
          placeholder="เช่น 2,500,000 บาท | e.g. 2,500,000 THB"
          className="h-10"
          {...inputProps("budget")}
        />
      </Field>

      <Field labelTh={labels.images.th} labelEn={labels.images.en}>
        <ImageUpload images={images} onChange={setImages} disabled={submitting} />
      </Field>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1B4D3E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#163f33] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {submitting ? "กำลังส่ง... | Sending..." : "ส่งคำขอ | Submit Request"}
      </button>

      <PrivacyNotice />
    </form>
  )
}
