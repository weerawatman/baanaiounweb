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
  BUYER_PURPOSE_OPTIONS,
  LOCATION_OPTIONS,
  REGION_OPTIONS,
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
      <label className="text-sm font-medium text-gray-700">
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
        className={`h-9 w-full rounded-lg border bg-white px-3 text-sm text-gray-700 outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50 ${
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
        className={`min-h-[80px] w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/50 resize-y ${
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
    [data, update, fieldErrors]
  )

  const reset = useCallback(() => {
    setData(initial)
    setFieldErrors({})
    setSubmitted(false)
    setError(null)
    setTouched(new Set())
  }, [initial])

  return {
    data, update, inputProps, fieldErrors, setFieldErrors,
    submitting, setSubmitting, submitted, setSubmitted,
    error, setError, touched, reset,
  }
}

// ─── Upload images helper ────────────────────────────────────────────────

async function uploadImages(
  images: UploadedImage[],
  setImages: (imgs: UploadedImage[]) => void
): Promise<string[]> {
  // Filter out images with validation errors and already-uploaded ones
  const toUpload = images.filter((img) => !img.error && !img.url)
  const alreadyUploaded = images.filter((img) => img.url).map((img) => img.url!)

  if (toUpload.length === 0) return alreadyUploaded

  // Mark all as uploading
  setImages(
    images.map((img) =>
      !img.error && !img.url ? { ...img, uploading: true } : img
    )
  )

  const formData = new FormData()
  for (const img of toUpload) {
    formData.append("images", img.file)
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
        img.uploading ? { ...img, uploading: false, error: "อัปโหลดไม่สำเร็จ" } : img
      )
    )
    throw new Error(body.error ?? "Upload failed")
  }

  // Merge URLs back into images
  const uploadedUrls: string[] = body.images.map((r: { url: string }) => r.url)
  let uploadIdx = 0
  setImages(
    images.map((img) => {
      if (!img.error && !img.url && uploadIdx < uploadedUrls.length) {
        return { ...img, uploading: false, url: uploadedUrls[uploadIdx++] }
      }
      return img
    })
  )

  return [...alreadyUploaded, ...uploadedUrls]
}

// ─── Submit handler with validation ─────────────────────────────────────

async function submitFormWithValidation(
  formTag: string,
  form: ReturnType<typeof useFormState>,
  scrollRef: React.RefObject<HTMLFormElement | null>,
  images?: UploadedImage[],
  setImages?: (imgs: UploadedImage[]) => void
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

function OwnerFormThai({ form, images, onImagesChange }: { form: ReturnType<typeof useFormState>; images: UploadedImage[]; onImagesChange: (imgs: UploadedImage[]) => void }) {
  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล" required error={e.name}>
        <Input placeholder="ชื่อ-นามสกุลของคุณ" className={e.name ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("name")} />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์" required error={e.phone}>
          <Input type="tel" placeholder="0812345678" className={e.phone ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("phone")} />
        </FormField>
        <FormField label="ไอดีไลน์">
          <Input placeholder="LINE ID" {...form.inputProps("lineId")} />
        </FormField>
      </div>
      <SelectField
        label="ประเภททรัพย์" name="propertyType" required error={e.propertyType}
        options={PROPERTY_TYPE_OPTIONS}
        value={form.data.propertyType ?? ""}
        onChange={form.update}
      />
      <FormField label="ขนาดพื้นที่ (ตร.ว. / ตร.ม.)">
        <Input placeholder="เช่น 50 ตร.ว. หรือ 120 ตร.ม." {...form.inputProps("propertySize")} />
      </FormField>
      <SelectField
        label="ที่ตั้งทรัพย์" name="location"
        options={LOCATION_OPTIONS}
        value={form.data.location ?? ""}
        onChange={form.update}
        placeholder="เลือกพื้นที่"
      />
      <TextAreaField
        label="รายละเอียดทรัพย์เพิ่มเติม" name="details"
        placeholder="จุดเด่น, สภาพบ้าน, สิ่งอำนวยความสะดวก..."
        value={form.data.details ?? ""}
        onChange={form.update}
      />
      <FormField label="ราคาที่คิดว่าจะขาย / ปล่อยเช่า (บาท)">
        <Input type="number" placeholder="เช่น 2500000" {...form.inputProps("price")} />
      </FormField>
      <FormField label="รูปภาพทรัพย์ (ไม่บังคับ)">
        <ImageUpload images={images} onChange={onImagesChange} disabled={form.submitting} />
      </FormField>
    </div>
  )
}

// ─── Owner Form (Foreign) ────────────────────────────────────────────────

function OwnerFormForeign({ form, images, onImagesChange }: { form: ReturnType<typeof useFormState>; images: UploadedImage[]; onImagesChange: (imgs: UploadedImage[]) => void }) {
  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Full Name / ชื่อ-นามสกุล" required error={e.name}>
        <Input placeholder="Your full name" className={e.name ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("name")} />
      </FormField>
      <FormField label="Nationality / สัญชาติ">
        <Input placeholder="e.g. Japanese, Chinese, American" {...form.inputProps("nationality")} />
      </FormField>
      <FormField label="Contact Information / ช่องทางติดต่อ" required error={e.contact}>
        <Input placeholder="WhatsApp, WeChat, Email, or Phone" className={e.contact ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("contact")} />
      </FormField>
      <SelectField
        label="Objective / วัตถุประสงค์" name="purpose"
        options={BUYER_PURPOSE_OPTIONS.map(o => ({ value: o.value, label: `${o.label} / ${o.value === "living" ? "For Living" : "For Investment"}` }))}
        value={form.data.purpose ?? ""}
        onChange={form.update}
      />
      <SelectField
        label="Property Type / ประเภททรัพย์" name="propertyType"
        options={PROPERTY_TYPE_OPTIONS}
        value={form.data.propertyType ?? ""}
        onChange={form.update}
      />
      <FormField label="Property Size / ขนาดพื้นที่ (Sq.m. / Sq.w.)">
        <Input placeholder="e.g. 50 Sq.w. or 120 Sq.m." {...form.inputProps("propertySize")} />
      </FormField>
      <TextAreaField
        label="Property Location / ที่ตั้งทรัพย์" name="location"
        placeholder="Address or area description"
        value={form.data.location ?? ""}
        onChange={form.update}
      />
      <FormField label="Asking Price / ราคา (THB)">
        <Input type="number" placeholder="e.g. 2500000" {...form.inputProps("price")} />
      </FormField>
      <FormField label="Property Images / รูปภาพทรัพย์ (Optional)">
        <ImageUpload images={images} onChange={onImagesChange} disabled={form.submitting} />
      </FormField>
    </div>
  )
}

// ─── Buyer Form (Thai) ───────────────────────────────────────────────────

function BuyerFormThai({ form, preselect }: { form: ReturnType<typeof useFormState>; preselect?: string }) {
  const requirementOptions = [
    { value: "buy-house", label: "ซื้อบ้าน" },
    { value: "rent-condo", label: "เช่าคอนโด" },
    { value: "rent-house", label: "เช่าบ้าน" },
    { value: "buy-land", label: "หาที่ดิน" },
    { value: "other", label: "อื่นๆ" },
  ]

  if (preselect && !form.data.requirement) {
    const defaultReq = preselect === "SALE" ? "buy-house" : preselect === "RENT" ? "rent-house" : preselect === "LAND" ? "buy-land" : ""
    if (defaultReq) form.update("requirement", defaultReq)
  }

  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล" required error={e.name}>
        <Input placeholder="ชื่อ-นามสกุลของคุณ" className={e.name ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("name")} />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์" required error={e.phone}>
          <Input type="tel" placeholder="0812345678" className={e.phone ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("phone")} />
        </FormField>
        <FormField label="ไอดีไลน์">
          <Input placeholder="LINE ID" {...form.inputProps("lineId")} />
        </FormField>
      </div>
      <SelectField
        label="ประเภททรัพย์ที่ต้องการ" name="requirement" required error={e.requirement}
        options={requirementOptions}
        value={form.data.requirement ?? ""}
        onChange={form.update}
      />
      <FormField label="ขนาดที่ต้องการเบื้องต้น">
        <Input placeholder="เช่น 2 ห้องนอน หรือ 50 ตร.ว." {...form.inputProps("preferredSize")} />
      </FormField>
      <SelectField
        label="ทำเล / ที่ตั้งที่สนใจ" name="location"
        options={LOCATION_OPTIONS}
        value={form.data.location ?? ""}
        onChange={form.update}
        placeholder="เลือกพื้นที่"
      />
      <FormField label="งบประมาณที่ตั้งไว้ (บาท)">
        <Input type="number" placeholder="เช่น 2000000" {...form.inputProps("budget")} />
      </FormField>
      <TextAreaField
        label="รายละเอียดเพิ่มเติมที่ต้องการ" name="details"
        placeholder="สเปกเบื้องต้น เช่น อยากได้บ้านมุม, เลี้ยงสัตว์ได้, ใกล้นิคมฯ..."
        value={form.data.details ?? ""}
        onChange={form.update}
      />
    </div>
  )
}

// ─── Buyer Form (Foreign) ────────────────────────────────────────────────

function BuyerFormForeign({ form, preselect }: { form: ReturnType<typeof useFormState>; preselect?: string }) {
  const requirementOptions = [
    { value: "buy-house", label: "Buy House / ซื้อบ้าน" },
    { value: "rent-condo", label: "Rent Condo / เช่าคอนโด" },
    { value: "rent-house", label: "Rent House / เช่าบ้าน" },
    { value: "buy-land", label: "Buy Land / ซื้อที่ดิน" },
    { value: "other", label: "Other / อื่นๆ" },
  ]

  if (preselect && !form.data.requirement) {
    const defaultReq = preselect === "SALE" ? "buy-house" : preselect === "RENT" ? "rent-house" : preselect === "LAND" ? "buy-land" : ""
    if (defaultReq) form.update("requirement", defaultReq)
  }

  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Full Name / ชื่อ-นามสกุล" required error={e.name}>
        <Input placeholder="Your full name" className={e.name ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("name")} />
      </FormField>
      <FormField label="Nationality / สัญชาติ">
        <Input placeholder="e.g. Japanese, Chinese, American" {...form.inputProps("nationality")} />
      </FormField>
      <FormField label="Contact Information / ช่องทางติดต่อ" required error={e.contact}>
        <Input placeholder="WhatsApp, Email, WeChat, or Phone" className={e.contact ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("contact")} />
      </FormField>
      <SelectField
        label="Purpose / วัตถุประสงค์" name="purpose"
        options={BUYER_PURPOSE_OPTIONS.map(o => ({ value: o.value, label: `${o.value === "living" ? "For Living" : "For Investment"} / ${o.label}` }))}
        value={form.data.purpose ?? ""}
        onChange={form.update}
      />
      <SelectField
        label="Requirement / ประเภททรัพย์" name="requirement"
        options={requirementOptions}
        value={form.data.requirement ?? ""}
        onChange={form.update}
      />
      <FormField label="Preferred Size & Functions / ขนาดและฟังก์ชัน">
        <Input placeholder="e.g. 2 Bedrooms, Pet-friendly" {...form.inputProps("preferredSize")} />
      </FormField>
      <SelectField
        label="Preferred Location / ทำเลที่สนใจ" name="location"
        options={LOCATION_OPTIONS}
        value={form.data.location ?? ""}
        onChange={form.update}
        placeholder="Select area"
      />
      <FormField label="Target Budget / งบประมาณ (THB)">
        <Input type="number" placeholder="e.g. 2000000" {...form.inputProps("budget")} />
      </FormField>
      <TextAreaField
        label="Additional Details / รายละเอียดเพิ่มเติม" name="details"
        placeholder="Any specific requirements..."
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
      <FormField label="ชื่อ-นามสกุล" required error={e.name}>
        <Input placeholder="ชื่อ-นามสกุลของคุณ" className={e.name ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("name")} />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์" required error={e.phone}>
          <Input type="tel" placeholder="0812345678" className={e.phone ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("phone")} />
        </FormField>
        <FormField label="ไอดีไลน์">
          <Input placeholder="LINE ID" {...form.inputProps("lineId")} />
        </FormField>
      </div>
      <TextAreaField
        label="รายละเอียดทรัพย์" name="details"
        placeholder="อธิบายจุดเด่นทรัพย์ที่ต้องการให้ช่วยขาย..."
        value={form.data.details ?? ""}
        onChange={form.update}
      />
      <SelectField
        label="ประเภททรัพย์" name="propertyType"
        options={PROPERTY_TYPE_OPTIONS}
        value={form.data.propertyType ?? ""}
        onChange={form.update}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField
          label="ภาค" name="region"
          options={REGION_OPTIONS}
          value={form.data.region ?? ""}
          onChange={form.update}
          placeholder="เลือกภาค"
        />
        <SelectField
          label="จังหวัด / ทำเลที่ตั้ง" name="location"
          options={LOCATION_OPTIONS}
          value={form.data.location ?? ""}
          onChange={form.update}
          placeholder="เลือกจังหวัด"
        />
      </div>
      <FormField label="ขนาดพื้นที่ (ตร.ว. / ตร.ม.)">
        <Input placeholder="เช่น 50 ตร.ว. หรือ 120 ตร.ม." {...form.inputProps("propertySize")} />
      </FormField>
      <FormField label="ราคาขาย / ราคาเช่า (บาท)">
        <Input type="number" placeholder="เช่น 2500000" {...form.inputProps("price")} />
      </FormField>
    </div>
  )
}

// ─── Academy Form ────────────────────────────────────────────────────────

function AcademyForm({ form }: { form: ReturnType<typeof useFormState> }) {
  const e = form.fieldErrors
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล" required error={e.name}>
        <Input placeholder="ชื่อ-นามสกุลของคุณ" className={e.name ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("name")} />
      </FormField>
      <FormField label="เบอร์โทรศัพท์" required error={e.phone}>
        <Input type="tel" placeholder="0812345678" className={e.phone ? "border-red-400 ring-1 ring-red-200" : ""} {...form.inputProps("phone")} />
      </FormField>
      <FormField label="ไอดีไลน์">
        <Input placeholder="LINE ID" {...form.inputProps("lineId")} />
      </FormField>
      <TextAreaField
        label="สิ่งที่สนใจ / คำถามเพิ่มเติม" name="details"
        placeholder="เช่น อยากรู้รายละเอียดคอร์ส, ค่าใช้จ่าย, ระยะเวลาเรียน..."
        value={form.data.details ?? ""}
        onChange={form.update}
      />
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
        <p className="mt-1 text-xs text-red-500">
          มี {errorCount} ช่องที่ต้องแก้ไข
        </p>
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
      isOwner ? setImages : undefined
    )
  }

  if (form.submitted) {
    return (
      <motion.div
        className={`mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-foreground/5 ${className ?? ""}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4 text-4xl">🎉</div>
        <h3 className="text-xl font-bold text-[#1B4D3E]">ส่งข้อมูลเรียบร้อยแล้ว!</h3>
        <p className="mt-2 text-gray-600">
          ทีมงานบ้านไออุ่นจะรีบติดต่อกลับโดยเร็วที่สุดค่ะ
        </p>
        <Button className="mt-6" variant="outline" onClick={form.reset}>
          กรอกฟอร์มใหม่
        </Button>
      </motion.div>
    )
  }

  const submitSection = (
    <>
      <ErrorSummary error={form.error} fieldErrors={form.fieldErrors} />
      <Button
        type="submit"
        disabled={form.submitting}
        className="mt-6 w-full gap-2 bg-[#1B4D3E] py-2.5 text-white hover:bg-[#2A6B56] disabled:opacity-50"
        size="lg"
      >
        {form.submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            กำลังส่งข้อมูล...
          </>
        ) : (
          <>
            <Send className="size-4" />
            ส่งข้อมูล
          </>
        )}
      </Button>
      <PrivacyNotice />
    </>
  )

  if (variant === "academy") {
    return (
      <form ref={formRef} onSubmit={handleSubmit} noValidate
        className={`mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-foreground/5 sm:p-8 ${className ?? ""}`}
      >
        <h3 className="mb-6 text-lg font-bold text-[#1B4D3E]">
          ลงทะเบียนสนใจคอร์สนายหน้าอสังหาฯ
        </h3>
        <AcademyForm form={form} />
        {submitSection}
      </form>
    )
  }

  if (variant === "co-agent") {
    return (
      <form ref={formRef} onSubmit={handleSubmit} noValidate
        className={`mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-foreground/5 sm:p-8 ${className ?? ""}`}
      >
        <h3 className="mb-6 text-lg font-bold text-[#1B4D3E]">
          ส่งทรัพย์เข้าระบบ / เสนอ Co-Broker
        </h3>
        <CoAgentForm form={form} />
        {submitSection}
      </form>
    )
  }

  const title = isOwner ? "กรอกข้อมูลฝากขาย / ปล่อยเช่า" : "กรอกสเปกให้เราช่วยหาบ้าน"

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate
      className={`mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-foreground/5 sm:p-8 ${className ?? ""}`}
    >
      <h3 className="mb-6 text-lg font-bold text-[#1B4D3E]">{title}</h3>

      <Tabs defaultValue="thai" onValueChange={(v) => {
        setActiveTab(v)
        // Clear errors when switching tabs
        form.setFieldErrors({})
        form.setError(null)
      }}>
        <TabsList className="mb-6 w-full">
          <TabsTrigger value="thai" className="flex-1 gap-1.5">
            <User className="size-4" />
            {isOwner ? "เจ้าของทรัพย์คนไทย" : "ลูกค้าคนไทย"}
          </TabsTrigger>
          <TabsTrigger value="foreign" className="flex-1 gap-1.5">
            <Globe className="size-4" />
            {isOwner ? "Foreign Owner" : "Foreign Buyer/Renter"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="thai">
          {isOwner ? <OwnerFormThai form={form} images={images} onImagesChange={setImages} /> : <BuyerFormThai form={form} preselect={preselect} />}
        </TabsContent>
        <TabsContent value="foreign">
          {isOwner ? <OwnerFormForeign form={form} images={images} onImagesChange={setImages} /> : <BuyerFormForeign form={form} preselect={preselect} />}
        </TabsContent>
      </Tabs>

      {submitSection}
    </form>
  )
}
