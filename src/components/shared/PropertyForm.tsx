"use client"

import { useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { Send, User, Globe, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import PrivacyNotice from "./PrivacyNotice"
import {
  PROPERTY_TYPE_OPTIONS,
  OWNER_PURPOSE_OPTIONS,
  BUYER_REQUIREMENT_OPTIONS,
  COAGENT_RIGHTS_NOTICE,
} from "@/content/form-options"
import { validateForm, type FieldErrors } from "@/lib/form-validation"
import ImageUpload, { type UploadedImage } from "./ImageUpload"

// ─── Types ───────────────────────────────────────────────────────────────

type FormVariant = "owner" | "buyer" | "co-agent" | "academy"

interface PropertyFormProps {
  variant: FormVariant
  preselect?: "SALE" | "RENT" | "LAND"
  className?: string
}

type FormData = Record<string, string>

// ─── Reusable form elements with error display ──────────────────────────

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
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

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
  placeholder,
  required,
  error,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (name: string, value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
}) {
  return (
    <FormField label={label} required={required} error={error}>
      <select
        name={name}
        className={`focus:border-ring focus:ring-ring/50 h-9 w-full rounded-lg border bg-white px-3 text-sm text-foreground transition-colors outline-none focus:ring-2 ${
          error ? "border-red-400 ring-1 ring-red-200" : "border-input"
        }`}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      >
        <option value="">{placeholder ?? "กรุณาเลือก"}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  )
}

function TextAreaField({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string
  name: string
  placeholder?: string
  value: string
  onChange: (name: string, value: string) => void
  error?: string
}) {
  return (
    <FormField label={label} error={error}>
      <textarea
        name={name}
        className={`focus:border-ring focus:ring-ring/50 min-h-[80px] w-full resize-y rounded-lg border bg-white px-3 py-2 text-sm text-foreground transition-colors outline-none focus:ring-2 ${
          error ? "border-red-400 ring-1 ring-red-200" : "border-input"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </FormField>
  )
}

// ─── useFormState hook ───────────────────────────────────────────────────

function useFormState(initial: FormData = {}) {
  const [data, setData] = useState<FormData>(initial)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const update = useCallback((name: string, value: string) => {
    setData((prev) => ({ ...prev, [name]: value }))
    // Clear field error when user edits
    setFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
    setTouched((prev) => new Set(prev).add(name))
  }, [])

  const inputProps = useCallback(
    (name: string) => ({
      value: data[name] ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => update(name, e.target.value),
      onBlur: () => setTouched((prev) => new Set(prev).add(name)),
      "aria-invalid": fieldErrors[name] ? true : undefined,
    }),
    [data, update, fieldErrors],
  )

  const reset = useCallback(() => {
    setData(initial)
    setFieldErrors({})
    setSubmitted(false)
    setError(null)
    setTouched(new Set())
  }, [initial])

  return {
    data,
    update,
    inputProps,
    fieldErrors,
    setFieldErrors,
    submitting,
    setSubmitting,
    submitted,
    setSubmitted,
    error,
    setError,
    touched,
    reset,
  }
}

// ─── Upload images helper ────────────────────────────────────────────────

async function uploadImages(
  images: UploadedImage[],
  setImages: (imgs: UploadedImage[]) => void,
): Promise<string[]> {
  // Filter out images with validation errors and already-uploaded ones
  const toUpload = images.filter((img) => !img.error && !img.url)
  const alreadyUploaded = images.filter((img) => img.url).map((img) => img.url!)

  if (toUpload.length === 0) return alreadyUploaded

  // Mark all as uploading
  setImages(images.map((img) => (!img.error && !img.url ? { ...img, uploading: true } : img)))

  const formData = new FormData()
  for (const img of toUpload) {
    formData.append("files", img.file)
  }

  const res = await fetch("/api/upload-images", {
    method: "POST",
    body: formData,
  })

  const body = await res.json()

  if (!res.ok || !body.success) {
    // Mark upload failed
    setImages(
      images.map((img) =>
        img.uploading ? { ...img, uploading: false, error: "อัปโหลดไม่สำเร็จ" } : img,
      ),
    )
    throw new Error(body.error ?? "Upload failed")
  }

  // Merge URLs back into images (API returns a flat string[] under `urls`)
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

// ─── Submit handler with validation ─────────────────────────────────────

async function submitFormWithValidation(
  formTag: string,
  form: ReturnType<typeof useFormState>,
  scrollRef: React.RefObject<HTMLFormElement | null>,
  images?: UploadedImage[],
  setImages?: (imgs: UploadedImage[]) => void,
) {
  const result = validateForm(formTag, form.data)

  if (!result.valid) {
    form.setFieldErrors(result.errors)
    form.setError("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน")
    // Scroll to first error
    scrollRef.current?.querySelector("[aria-invalid]")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
    return
  }

  form.setSubmitting(true)
  form.setError(null)
  form.setFieldErrors({})

  try {
    // Upload images first (owner forms only)
    let imageUrls: string[] = []
    if (images && setImages && images.length > 0) {
      const validImages = images.filter((img) => !img.error)
      if (validImages.length > 0) {
        imageUrls = await uploadImages(images, setImages)
      }
    }

    const res = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formTag,
        ...form.data,
        ...(imageUrls.length > 0 ? { imageUrls } : {}),
      }),
    })

    const body = await res.json()

    if (!res.ok || !body.success) {
      form.setError(body.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
      return
    }

    form.setSubmitted(true)
  } catch (err) {
    const msg = err instanceof Error ? err.message : ""
    if (msg.includes("Upload failed") || msg.includes("อัปโหลด")) {
      form.setError("อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง")
    } else {
      form.setError("ไม่สามารถส่งข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต")
    }
  } finally {
    form.setSubmitting(false)
  }
}

// ─── Owner Form (Thai) ───────────────────────────────────────────────────

function OwnerFormThai({
  form,
  images,
  onImagesChange,
}: {
  form: ReturnType<typeof useFormState>
  images: UploadedImage[]
  onImagesChange: (imgs: UploadedImage[]) => void
}) {
  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล | Full Name" required error={e.name}>
        <Input
          placeholder="ชื่อ-นามสกุลของคุณ | Your name"
          className={e.name ? "border-red-400 ring-1 ring-red-200" : ""}
          {...form.inputProps("name")}
        />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์ | Phone" required error={e.phone}>
          <Input
            type="tel"
            placeholder="0812345678"
            className={e.phone ? "border-red-400 ring-1 ring-red-200" : ""}
            {...form.inputProps("phone")}
          />
        </FormField>
        <FormField label="ไอดีไลน์ | LINE ID">
          <Input placeholder="LINE ID" {...form.inputProps("lineId")} />
        </FormField>
      </div>

      {/* Purpose checkboxes */}
      <FormField label="จุดประสงค์ | Purpose" required error={e.purpose}>
        <div className="flex flex-col gap-2">
          {OWNER_PURPOSE_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="purpose"
                value={option.value}
                checked={form.data.purpose === option.value}
                onChange={(e) => {
                  if (e.target.checked) {
                    form.update("purpose", option.value)
                  } else if (form.data.purpose === option.value) {
                    form.update("purpose", "")
                  }
                }}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </FormField>

      <SelectField
        label="ประเภททรัพย์ | Property Type"
        name="propertyType"
        required
        error={e.propertyType}
        options={PROPERTY_TYPE_OPTIONS}
        value={form.data.propertyType ?? ""}
        onChange={form.update}
        placeholder="เลือก | Select"
      />
      <FormField label="ทำเลที่ตั้ง (จังหวัด/อำเภอ) | Location">
        <Input placeholder="เช่น ชลบุรี เมือง | e.g. Chonburi, Mueang" {...form.inputProps("location")} />
      </FormField>
      <FormField label="ราคาที่คาดหวัง | Expected Price">
        <Input type="text" placeholder="เช่น 2.5 ล้านบาท | e.g. 2.5 million THB" {...form.inputProps("price")} />
      </FormField>
      <TextAreaField
        label="รายละเอียดเพิ่มเติม หรือแนบลิงก์รูปภาพ | Additional Details or Photo Links"
        name="details"
        placeholder="จุดเด่น, สภาพทรัพย์... | Highlights, property condition..."
        value={form.data.details ?? ""}
        onChange={form.update}
      />
      <FormField label="รูปภาพทรัพย์ (ไม่บังคับ) | Property Images (Optional)">
        <ImageUpload images={images} onChange={onImagesChange} disabled={form.submitting} />
      </FormField>
    </div>
  )
}

// ─── Owner Form (Foreign) ────────────────────────────────────────────────

function OwnerFormForeign({
  form,
  images,
  onImagesChange,
}: {
  form: ReturnType<typeof useFormState>
  images: UploadedImage[]
  onImagesChange: (imgs: UploadedImage[]) => void
}) {
  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Full Name / ชื่อ-นามสกุล" required error={e.name}>
        <Input
          placeholder="Your full name"
          className={e.name ? "border-red-400 ring-1 ring-red-200" : ""}
          {...form.inputProps("name")}
        />
      </FormField>
      <FormField label="Nationality / สัญชาติ">
        <Input placeholder="e.g. Japanese, Chinese, American" {...form.inputProps("nationality")} />
      </FormField>
      <FormField label="Contact Information / ช่องทางติดต่อ" required error={e.contact}>
        <Input
          placeholder="WhatsApp, WeChat, Email, or Phone"
          className={e.contact ? "border-red-400 ring-1 ring-red-200" : ""}
          {...form.inputProps("contact")}
        />
      </FormField>

      {/* Purpose checkboxes */}
      <FormField label="Objective / วัตถุประสงค์" required error={e.purpose}>
        <div className="flex flex-col gap-2">
          {OWNER_PURPOSE_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="purpose"
                value={option.value}
                checked={form.data.purpose === option.value}
                onChange={(e) => {
                  if (e.target.checked) {
                    form.update("purpose", option.value)
                  } else if (form.data.purpose === option.value) {
                    form.update("purpose", "")
                  }
                }}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </FormField>

      <SelectField
        label="Property Type / ประเภททรัพย์"
        name="propertyType"
        required
        error={e.propertyType}
        options={PROPERTY_TYPE_OPTIONS}
        value={form.data.propertyType ?? ""}
        onChange={form.update}
        placeholder="Select | เลือก"
      />
      <FormField label="Property Size / ขนาดพื้นที่ (Sq.m. / Sq.w.)">
        <Input placeholder="e.g. 50 Sq.w. or 120 Sq.m." {...form.inputProps("propertySize")} />
      </FormField>
      <TextAreaField
        label="Property Location / ที่ตั้งทรัพย์"
        name="location"
        placeholder="Address or area description"
        value={form.data.location ?? ""}
        onChange={form.update}
      />
      <FormField label="Asking Price / ราคา (THB)">
        <Input type="number" placeholder="e.g. 2500000" {...form.inputProps("price")} />
      </FormField>
      <TextAreaField
        label="Additional Details / รายละเอียดเพิ่มเติม"
        name="details"
        placeholder="Highlights, property condition..."
        value={form.data.details ?? ""}
        onChange={form.update}
      />
      <FormField label="Property Images / รูปภาพทรัพย์ (Optional)">
        <ImageUpload images={images} onChange={onImagesChange} disabled={form.submitting} />
      </FormField>
    </div>
  )
}

// ─── Buyer Form (Thai) ───────────────────────────────────────────────────

function BuyerFormThai({
  form,
  preselect,
}: {
  form: ReturnType<typeof useFormState>
  preselect?: string
}) {
  // Map preselect to new requirements
  if (preselect && !form.data.requirement) {
    const defaultReq =
      preselect === "SALE"
        ? "buy"
        : preselect === "RENT"
          ? "rent"
          : preselect === "LAND"
            ? "buy"
            : ""
    if (defaultReq) form.update("requirement", defaultReq)
  }

  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล | Full Name" required error={e.name}>
        <Input
          placeholder="ชื่อ-นามสกุลของคุณ | Your name"
          className={e.name ? "border-red-400 ring-1 ring-red-200" : ""}
          {...form.inputProps("name")}
        />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์ | Phone" required error={e.phone}>
          <Input
            type="tel"
            placeholder="0812345678"
            className={e.phone ? "border-red-400 ring-1 ring-red-200" : ""}
            {...form.inputProps("phone")}
          />
        </FormField>
        <FormField label="ไอดีไลน์ | LINE ID">
          <Input placeholder="LINE ID" {...form.inputProps("lineId")} />
        </FormField>
      </div>

      {/* Requirement checkboxes */}
      <FormField label="ความต้องการ | I am looking to" required error={e.requirement}>
        <div className="flex flex-col gap-2">
          {BUYER_REQUIREMENT_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="requirement"
                value={option.value}
                checked={form.data.requirement === option.value}
                onChange={(e) => {
                  if (e.target.checked) {
                    form.update("requirement", option.value)
                  } else if (form.data.requirement === option.value) {
                    form.update("requirement", "")
                  }
                }}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </FormField>

      <SelectField
        label="ประเภททรัพย์ที่สนใจ | Property Type"
        name="propertyType"
        required
        error={e.propertyType}
        options={PROPERTY_TYPE_OPTIONS}
        value={form.data.propertyType ?? ""}
        onChange={form.update}
        placeholder="เลือก | Select"
      />
      <FormField label="ทำเลที่สนใจ | Preferred Location">
        <Input placeholder="เช่น ชลบุรี พัทยา | e.g. Chonburi, Pattaya" {...form.inputProps("location")} />
      </FormField>
      <FormField label="งบประมาณ (ราคาซื้อหรือค่าเช่า/เดือน) | Budget">
        <Input placeholder="เช่น 2 ล้านบาท หรือ 15,000 บาท/เดือน | e.g. 2M THB or 15,000 THB/month" {...form.inputProps("budget")} />
      </FormField>
      <TextAreaField
        label="รายละเอียดเพิ่มเติม (เช่น จำนวนห้องนอน, เลี้ยงสัตว์ได้) | Additional Details"
        name="details"
        placeholder="สเปกเบื้องต้น เช่น 2 ห้องนอน, หมาและแมวได้ | e.g. 2 bedrooms, pet-friendly"
        value={form.data.details ?? ""}
        onChange={form.update}
      />
    </div>
  )
}

// ─── Buyer Form (Foreign) ────────────────────────────────────────────────

function BuyerFormForeign({
  form,
  preselect,
}: {
  form: ReturnType<typeof useFormState>
  preselect?: string
}) {
  // Map preselect to new requirements
  if (preselect && !form.data.requirement) {
    const defaultReq =
      preselect === "SALE"
        ? "buy"
        : preselect === "RENT"
          ? "rent"
          : preselect === "LAND"
            ? "buy"
            : ""
    if (defaultReq) form.update("requirement", defaultReq)
  }

  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Full Name / ชื่อ-นามสกุล" required error={e.name}>
        <Input
          placeholder="Your full name"
          className={e.name ? "border-red-400 ring-1 ring-red-200" : ""}
          {...form.inputProps("name")}
        />
      </FormField>
      <FormField label="Nationality / สัญชาติ">
        <Input placeholder="e.g. Japanese, Chinese, American" {...form.inputProps("nationality")} />
      </FormField>
      <FormField label="Contact Information / ช่องทางติดต่อ" required error={e.contact}>
        <Input
          placeholder="WhatsApp, Email, WeChat, or Phone"
          className={e.contact ? "border-red-400 ring-1 ring-red-200" : ""}
          {...form.inputProps("contact")}
        />
      </FormField>

      {/* Requirement checkboxes */}
      <FormField label="I am looking to / ความต้องการ" required error={e.requirement}>
        <div className="flex flex-col gap-2">
          {BUYER_REQUIREMENT_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="requirement"
                value={option.value}
                checked={form.data.requirement === option.value}
                onChange={(e) => {
                  if (e.target.checked) {
                    form.update("requirement", option.value)
                  } else if (form.data.requirement === option.value) {
                    form.update("requirement", "")
                  }
                }}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </FormField>

      <SelectField
        label="Property Type / ประเภททรัพย์"
        name="propertyType"
        required
        error={e.propertyType}
        options={PROPERTY_TYPE_OPTIONS}
        value={form.data.propertyType ?? ""}
        onChange={form.update}
        placeholder="Select | เลือก"
      />
      <FormField label="Preferred Location / ทำเลที่สนใจ">
        <Input placeholder="e.g. Chonburi, Pattaya" {...form.inputProps("location")} />
      </FormField>
      <FormField label="Target Budget (THB) / งบประมาณ (บาท)">
        <Input placeholder="e.g. 2000000 or 15000/month" {...form.inputProps("budget")} />
      </FormField>
      <TextAreaField
        label="Additional Details / รายละเอียดเพิ่มเติม"
        name="details"
        placeholder="e.g. 2 bedrooms, pet-friendly | เช่น 2 ห้องนอน, เลี้ยงสัตว์ได้"
        value={form.data.details ?? ""}
        onChange={form.update}
      />
    </div>
  )
}

// ─── Co-Agent Form ───────────────────────────────────────────────────────

function CoAgentForm({ form }: { form: ReturnType<typeof useFormState> }) {
  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล (นายหน้า) | Agent Name" required error={e.name}>
        <Input
          placeholder="ชื่อ-นามสกุลของคุณ | Your name"
          className={e.name ? "border-red-400 ring-1 ring-red-200" : ""}
          {...form.inputProps("name")}
        />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์ | Phone" required error={e.phone}>
          <Input
            type="tel"
            placeholder="0812345678"
            className={e.phone ? "border-red-400 ring-1 ring-red-200" : ""}
            {...form.inputProps("phone")}
          />
        </FormField>
        <FormField label="ไอดีไลน์ | LINE ID" required error={e.lineId}>
          <Input
            placeholder="LINE ID (for quick coordination)"
            className={e.lineId ? "border-red-400 ring-1 ring-red-200" : ""}
            {...form.inputProps("lineId")}
          />
        </FormField>
      </div>
      <SelectField
        label="ประเภททรัพย์ | Property Type"
        name="propertyType"
        options={PROPERTY_TYPE_OPTIONS}
        value={form.data.propertyType ?? ""}
        onChange={form.update}
        placeholder="เลือก | Select"
      />
      <FormField label="ทำเลที่ตั้ง | Location">
        <Input placeholder="เช่น ชลบุรี, ศรีราชา | e.g. Chonburi, Sriracha" {...form.inputProps("location")} />
      </FormField>
      <FormField label="ราคาขาย-เช่า | Listing Price">
        <Input placeholder="เช่น 2.5 ล้านบาท | e.g. 2.5 million THB" {...form.inputProps("price")} />
      </FormField>
      <FormField label="เงื่อนไขคอมมิชชัน | Commission Offer">
        <Input placeholder="เช่น แบ่ง 50/50 หรือตามตกลง | e.g. 50/50 split or negotiable" {...form.inputProps("commission")} />
      </FormField>
      <TextAreaField
        label="ลิงก์ข้อมูลทรัพย์หรือรูปภาพ | Property Link or Photos"
        name="details"
        placeholder="แนบลิงก์รูปภาพหรือ URL ทรัพย์ | Paste image links or property URLs"
        value={form.data.details ?? ""}
        onChange={form.update}
      />
      <div className="mt-2 p-3 bg-muted rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">
          {COAGENT_RIGHTS_NOTICE.th} | {COAGENT_RIGHTS_NOTICE.en}
        </p>
      </div>
    </div>
  )
}

// ─── Academy Form ────────────────────────────────────────────────────────

function AcademyForm({ form }: { form: ReturnType<typeof useFormState> }) {
  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล | Full Name" required error={e.name}>
        <Input
          placeholder="ชื่อ-นามสกุลของคุณ | Your name"
          className={e.name ? "border-red-400 ring-1 ring-red-200" : ""}
          {...form.inputProps("name")}
        />
      </FormField>
      <FormField label="เบอร์โทรศัพท์ | Phone" required error={e.phone}>
        <Input
          type="tel"
          placeholder="0812345678"
          className={e.phone ? "border-red-400 ring-1 ring-red-200" : ""}
          {...form.inputProps("phone")}
        />
      </FormField>
      <FormField label="ไอดีไลน์ | LINE ID" required error={e.lineId}>
        <Input
          placeholder="LINE ID (เพื่อประสานงานรวดเร็ว)"
          className={e.lineId ? "border-red-400 ring-1 ring-red-200" : ""}
          {...form.inputProps("lineId")}
        />
      </FormField>
      <FormField label="อาชีพปัจจุบัน | Current Occupation">
        <Input placeholder="เช่น พนักงานออฟฟิศ, รับจ้างทั่วไป | e.g. Office worker, Freelancer" {...form.inputProps("occupation")} />
      </FormField>
      <TextAreaField
        label="เป้าหมายที่อยากได้จากคอร์ส (WHY ของคุณ) | Your Goal (WHY)"
        name="details"
        placeholder="เช่น อยากมีรายได้เสริมเพื่อเก็บเงินทำค่าเทอมลูก | e.g. Want extra income for kids' tuition"
        value={form.data.details ?? ""}
        onChange={form.update}
      />
      <div className="mt-2 p-3 bg-muted rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">
          ทีมงานจะติดต่อกลับเพื่อแจ้งรอบเรียนและสถานที่ | Our team will contact you with schedule and location.
        </p>
      </div>
    </div>
  )
}

// ─── Error summary banner ────────────────────────────────────────────────

function ErrorSummary({ error, fieldErrors }: { error: string | null; fieldErrors: FieldErrors }) {
  const errorCount = Object.keys(fieldErrors).length
  if (!error && errorCount === 0) return null

  return (
    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
      {error && (
        <p className="flex items-center gap-2 text-sm font-medium text-red-700">
          <AlertTriangle className="size-4 shrink-0" />
          {error}
        </p>
      )}
      {errorCount > 0 && (
        <p className="mt-1 text-xs text-red-500">มี {errorCount} ช่องที่ต้องแก้ไข</p>
      )}
    </div>
  )
}

// ─── Main PropertyForm ───────────────────────────────────────────────────

export default function PropertyForm({ variant, preselect, className }: PropertyFormProps) {
  const form = useFormState(preselect ? { preselect } : {})
  const [activeTab, setActiveTab] = useState("thai")
  const formRef = useRef<HTMLFormElement>(null)
  const [images, setImages] = useState<UploadedImage[]>([])

  const isOwner = variant === "owner"

  const getFormTag = () => {
    if (variant === "co-agent") return "co-agent"
    if (variant === "academy") return "academy"
    if (variant === "owner") return activeTab === "foreign" ? "owner-foreign" : "owner"
    return activeTab === "foreign" ? "buyer-foreign" : "buyer"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitFormWithValidation(
      getFormTag(),
      form,
      formRef,
      isOwner ? images : undefined,
      isOwner ? setImages : undefined,
    )
  }

  if (form.submitted) {
    return (
      <motion.div
        className={`ring-foreground/5 mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ${className ?? ""}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4 text-4xl">🎉</div>
        <h3 className="text-xl font-bold text-primary">ส่งข้อมูลเรียบร้อยแล้ว! | Submitted Successfully!</h3>
        <p className="mt-2 text-muted-foreground">
          ทีมงานบ้านไออุ่นจะรีบติดต่อกลับโดยเร็วที่สุดค่ะ | Our team will contact you as soon as possible!
        </p>
        <Button className="mt-6" variant="outline" onClick={form.reset}>
          กรอกฟอร์มใหม่ | Submit New Form
        </Button>
      </motion.div>
    )
  }

  const submitLabelMap: Record<FormVariant, string> = {
    owner: "ส่งข้อมูลให้ทีมงาน | Submit Information",
    buyer: "ส่งข้อมูลให้ทีมงาน | Submit Inquiry",
    "co-agent": "ส่งข้อมูลทรัพย์ Co-Agent | Submit Co-Agent Listing",
    academy: "สมัครคอร์สพลิกชีวิต | Register Now",
  }

  const submitSection = (
    <>
      <ErrorSummary error={form.error} fieldErrors={form.fieldErrors} />
      <Button
        type="submit"
        disabled={form.submitting}
        className="mt-6 w-full gap-2 bg-primary py-2.5 text-white hover:bg-primary/90 disabled:opacity-50"
        size="lg"
      >
        {form.submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            กำลังส่งข้อมูล... | Sending...
          </>
        ) : (
          <>
            <Send className="size-4" />
            {submitLabelMap[variant]}
          </>
        )}
      </Button>
      <PrivacyNotice />
    </>
  )

  if (variant === "academy") {
    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className={`ring-foreground/5 mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 sm:p-8 ${className ?? ""}`}
      >
        <h3 className="mb-6 text-lg font-bold text-primary">
          สมัครคอร์สพลิกชีวิต | Register for Life-Changing Course
        </h3>
        <AcademyForm form={form} />
        {submitSection}
      </form>
    )
  }

  if (variant === "co-agent") {
    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className={`ring-foreground/5 mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 sm:p-8 ${className ?? ""}`}
      >
        <h3 className="mb-6 text-lg font-bold text-primary">
          ส่งข้อมูลทรัพย์ Co-Agent | Submit Co-Agent Listing
        </h3>
        <CoAgentForm form={form} />
        {submitSection}
      </form>
    )
  }

  const title = isOwner
    ? "ฝากทรัพย์ง่ายๆ ใน 1 นาที | List Your Property in 1 Minute"
    : "แจ้งความต้องการ หาบ้านที่ใช่ | Tell Us What You Need"

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={`ring-foreground/5 mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 sm:p-8 ${className ?? ""}`}
    >
      <h3 className="mb-6 text-lg font-bold text-primary">{title}</h3>

      <Tabs
        defaultValue="thai"
        onValueChange={(v) => {
          setActiveTab(v)
          // Clear errors when switching tabs
          form.setFieldErrors({})
          form.setError(null)
        }}
      >
        <TabsList className="mb-6 w-full">
          <TabsTrigger value="thai" className="flex-1 gap-1.5">
            <User className="size-4" />
            {isOwner ? "เจ้าของทรัพย์ | Property Owner" : "ลูกค้าคนไทย | Thai Client"}
          </TabsTrigger>
          <TabsTrigger value="foreign" className="flex-1 gap-1.5">
            <Globe className="size-4" />
            {isOwner ? "Foreign Owner | เจ้าของทรัพย์ต่างชาติ" : "Foreign Client | ลูกค้าต่างชาติ"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="thai">
          {isOwner ? (
            <OwnerFormThai form={form} images={images} onImagesChange={setImages} />
          ) : (
            <BuyerFormThai form={form} preselect={preselect} />
          )}
        </TabsContent>
        <TabsContent value="foreign">
          {isOwner ? (
            <OwnerFormForeign form={form} images={images} onImagesChange={setImages} />
          ) : (
            <BuyerFormForeign form={form} preselect={preselect} />
          )}
        </TabsContent>
      </Tabs>

      {submitSection}
    </form>
  )
}
