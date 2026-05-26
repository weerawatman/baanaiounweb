"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Send, User, Globe, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import PrivacyNotice from "./PrivacyNotice"
import {
  PROPERTY_TYPE_OPTIONS,
  BUYER_PURPOSE_OPTIONS,
  LOCATION_OPTIONS,
  REGION_OPTIONS,
} from "@/lib/page-content"

// ─── Types ───────────────────────────────────────────────────────────────

type FormVariant = "owner" | "buyer" | "co-agent" | "academy"

interface PropertyFormProps {
  variant: FormVariant
  preselect?: "SALE" | "RENT" | "LAND"
  className?: string
}

type FormData = Record<string, string>

// ─── Reusable form elements ──────────────────────────────────────────────

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
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
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (name: string, value: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <FormField label={label} required={required}>
      <select
        name={name}
        className="h-9 w-full rounded-lg border border-input bg-white px-3 text-sm text-gray-700 outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
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
}: {
  label: string
  name: string
  placeholder?: string
  value: string
  onChange: (name: string, value: string) => void
}) {
  return (
    <FormField label={label}>
      <textarea
        name={name}
        className="min-h-[80px] w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 resize-y"
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
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = useCallback((name: string, value: string) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const inputProps = useCallback(
    (name: string, opts?: { required?: boolean }) => ({
      value: data[name] ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => update(name, e.target.value),
      required: opts?.required,
    }),
    [data, update]
  )

  return { data, update, inputProps, submitting, setSubmitting, submitted, setSubmitted, error, setError }
}

// ─── Submit handler ─────────────────────────────────────────────────────

async function submitForm(
  formTag: string,
  data: FormData,
  setSubmitting: (v: boolean) => void,
  setSubmitted: (v: boolean) => void,
  setError: (v: string | null) => void
) {
  setSubmitting(true)
  setError(null)

  try {
    const res = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formTag, ...data }),
    })

    const result = await res.json()

    if (!res.ok || !result.success) {
      setError(result.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
      return
    }

    setSubmitted(true)
  } catch {
    setError("ไม่สามารถส่งข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต")
  } finally {
    setSubmitting(false)
  }
}

// ─── Owner Form (Thai) ───────────────────────────────────────────────────

function OwnerFormThai({ form }: { form: ReturnType<typeof useFormState> }) {
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล" required>
        <Input placeholder="ชื่อ-นามสกุลของคุณ" {...form.inputProps("name", { required: true })} />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์" required>
          <Input type="tel" placeholder="08x-xxx-xxxx" {...form.inputProps("phone", { required: true })} />
        </FormField>
        <FormField label="ไอดีไลน์">
          <Input placeholder="LINE ID" {...form.inputProps("lineId")} />
        </FormField>
      </div>
      <SelectField
        label="ประเภททรัพย์" name="propertyType"
        options={PROPERTY_TYPE_OPTIONS}
        value={form.data.propertyType ?? ""}
        onChange={form.update}
        required
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
    </div>
  )
}

// ─── Owner Form (Foreign) ────────────────────────────────────────────────

function OwnerFormForeign({ form }: { form: ReturnType<typeof useFormState> }) {
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Full Name / ชื่อ-นามสกุล" required>
        <Input placeholder="Your full name" {...form.inputProps("name", { required: true })} />
      </FormField>
      <FormField label="Nationality / สัญชาติ">
        <Input placeholder="e.g. Japanese, Chinese, American" {...form.inputProps("nationality")} />
      </FormField>
      <FormField label="Contact Information / ช่องทางติดต่อ" required>
        <Input placeholder="WhatsApp, WeChat, Email, or Phone" {...form.inputProps("contact", { required: true })} />
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

  // Set default requirement based on preselect (only once)
  if (preselect && !form.data.requirement) {
    const defaultReq = preselect === "SALE" ? "buy-house" : preselect === "RENT" ? "rent-house" : preselect === "LAND" ? "buy-land" : ""
    if (defaultReq) form.update("requirement", defaultReq)
  }

  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล" required>
        <Input placeholder="ชื่อ-นามสกุลของคุณ" {...form.inputProps("name", { required: true })} />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์" required>
          <Input type="tel" placeholder="08x-xxx-xxxx" {...form.inputProps("phone", { required: true })} />
        </FormField>
        <FormField label="ไอดีไลน์">
          <Input placeholder="LINE ID" {...form.inputProps("lineId")} />
        </FormField>
      </div>
      <SelectField
        label="ประเภททรัพย์ที่ต้องการ" name="requirement"
        options={requirementOptions}
        value={form.data.requirement ?? ""}
        onChange={form.update}
        required
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

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Full Name / ชื่อ-นามสกุล" required>
        <Input placeholder="Your full name" {...form.inputProps("name", { required: true })} />
      </FormField>
      <FormField label="Nationality / สัญชาติ">
        <Input placeholder="e.g. Japanese, Chinese, American" {...form.inputProps("nationality")} />
      </FormField>
      <FormField label="Contact Information / ช่องทางติดต่อ" required>
        <Input placeholder="WhatsApp, Email, WeChat, or Phone" {...form.inputProps("contact", { required: true })} />
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
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล" required>
        <Input placeholder="ชื่อ-นามสกุลของคุณ" {...form.inputProps("name", { required: true })} />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์" required>
          <Input type="tel" placeholder="08x-xxx-xxxx" {...form.inputProps("phone", { required: true })} />
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
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล" required>
        <Input placeholder="ชื่อ-นามสกุลของคุณ" {...form.inputProps("name", { required: true })} />
      </FormField>
      <FormField label="เบอร์โทรศัพท์" required>
        <Input type="tel" placeholder="08x-xxx-xxxx" {...form.inputProps("phone", { required: true })} />
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

// ─── Main PropertyForm ───────────────────────────────────────────────────

export default function PropertyForm({ variant, preselect, className }: PropertyFormProps) {
  const form = useFormState(
    preselect ? { preselect } : {}
  )
  const [activeTab, setActiveTab] = useState("thai")

  const getFormTag = () => {
    if (variant === "co-agent") return "co-agent"
    if (variant === "academy") return "academy"
    if (variant === "owner") return activeTab === "foreign" ? "owner-foreign" : "owner"
    return activeTab === "foreign" ? "buyer-foreign" : "buyer"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitForm(getFormTag(), form.data, form.setSubmitting, form.setSubmitted, form.setError)
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
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            form.setSubmitted(false)
            form.setError(null)
          }}
        >
          กรอกฟอร์มใหม่
        </Button>
      </motion.div>
    )
  }

  const submitButton = (
    <>
      {form.error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {form.error}
        </p>
      )}
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

  // Academy and Co-Agent don't need Thai/Foreign tabs
  if (variant === "academy") {
    return (
      <form
        onSubmit={handleSubmit}
        className={`mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-foreground/5 sm:p-8 ${className ?? ""}`}
      >
        <h3 className="mb-6 text-lg font-bold text-[#1B4D3E]">
          ลงทะเบียนสนใจคอร์สนายหน้าอสังหาฯ
        </h3>
        <AcademyForm form={form} />
        {submitButton}
      </form>
    )
  }

  if (variant === "co-agent") {
    return (
      <form
        onSubmit={handleSubmit}
        className={`mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-foreground/5 sm:p-8 ${className ?? ""}`}
      >
        <h3 className="mb-6 text-lg font-bold text-[#1B4D3E]">
          ส่งทรัพย์เข้าระบบ / เสนอ Co-Broker
        </h3>
        <CoAgentForm form={form} />
        {submitButton}
      </form>
    )
  }

  // Owner and Buyer forms have Thai/Foreign tabs
  const isOwner = variant === "owner"
  const title = isOwner ? "กรอกข้อมูลฝากขาย / ปล่อยเช่า" : "กรอกสเปกให้เราช่วยหาบ้าน"

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-foreground/5 sm:p-8 ${className ?? ""}`}
    >
      <h3 className="mb-6 text-lg font-bold text-[#1B4D3E]">{title}</h3>

      <Tabs defaultValue="thai" onValueChange={setActiveTab}>
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
          {isOwner ? <OwnerFormThai form={form} /> : <BuyerFormThai form={form} preselect={preselect} />}
        </TabsContent>
        <TabsContent value="foreign">
          {isOwner ? <OwnerFormForeign form={form} /> : <BuyerFormForeign form={form} preselect={preselect} />}
        </TabsContent>
      </Tabs>

      {submitButton}
    </form>
  )
}
