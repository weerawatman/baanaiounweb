"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, User, Globe } from "lucide-react"
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
  /** Pre-select property type in dropdown (for /buy, /rent, /land) */
  preselect?: "SALE" | "RENT" | "LAND"
  className?: string
}

// ─── Reusable form elements ──────────────────────────────────────────────

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )
}

function SelectField({
  label,
  options,
  value,
  onChange,
  placeholder,
}: {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <FormField label={label}>
      <select
        className="h-9 w-full rounded-lg border border-input bg-white px-3 text-sm text-gray-700 outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <FormField label={label}>
      <textarea
        className="min-h-[80px] w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 resize-y"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormField>
  )
}

// ─── Owner Form (Thai) ───────────────────────────────────────────────────

function OwnerFormThai() {
  const [propertyType, setPropertyType] = useState("")
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล">
        <Input placeholder="ชื่อ-นามสกุลของคุณ" />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์">
          <Input type="tel" placeholder="08x-xxx-xxxx" />
        </FormField>
        <FormField label="ไอดีไลน์">
          <Input placeholder="LINE ID" />
        </FormField>
      </div>
      <SelectField
        label="ประเภททรัพย์"
        options={PROPERTY_TYPE_OPTIONS}
        value={propertyType}
        onChange={setPropertyType}
      />
      <FormField label="ขนาดพื้นที่ (ตร.ว. / ตร.ม.)">
        <Input placeholder="เช่น 50 ตร.ว. หรือ 120 ตร.ม." />
      </FormField>
      <SelectField
        label="ที่ตั้งทรัพย์"
        options={LOCATION_OPTIONS}
        value=""
        onChange={() => {}}
        placeholder="เลือกพื้นที่"
      />
      <TextAreaField
        label="รายละเอียดทรัพย์เพิ่มเติม"
        placeholder="จุดเด่น, สภาพบ้าน, สิ่งอำนวยความสะดวก..."
        value=""
        onChange={() => {}}
      />
      <FormField label="ราคาที่คิดว่าจะขาย / ปล่อยเช่า (บาท)">
        <Input type="number" placeholder="เช่น 2500000" />
      </FormField>
    </div>
  )
}

// ─── Owner Form (Foreign) ────────────────────────────────────────────────

function OwnerFormForeign() {
  return (
    <div className="flex flex-col gap-4">
      <FormField label="Full Name / ชื่อ-นามสกุล">
        <Input placeholder="Your full name" />
      </FormField>
      <FormField label="Nationality / สัญชาติ">
        <Input placeholder="e.g. Japanese, Chinese, American" />
      </FormField>
      <FormField label="Contact Information / ช่องทางติดต่อ">
        <Input placeholder="WhatsApp, WeChat, Email, or Phone" />
      </FormField>
      <SelectField
        label="Objective / วัตถุประสงค์การซื้อทรัพย์นี้ในอดีต"
        options={BUYER_PURPOSE_OPTIONS.map(o => ({ value: o.value, label: `${o.label} / ${o.value === "living" ? "For Living" : "For Investment"}` }))}
        value=""
        onChange={() => {}}
      />
      <SelectField
        label="Property Type / ประเภททรัพย์"
        options={PROPERTY_TYPE_OPTIONS}
        value=""
        onChange={() => {}}
      />
      <FormField label="Property Size / ขนาดพื้นที่ (Sq.m. / Sq.w.)">
        <Input placeholder="e.g. 50 Sq.w. or 120 Sq.m." />
      </FormField>
      <TextAreaField
        label="Property Location / ที่ตั้งทรัพย์"
        placeholder="Address or area description"
        value=""
        onChange={() => {}}
      />
      <FormField label="Asking Price / ราคาที่ต้องการขายหรือปล่อยเช่า (THB)">
        <Input type="number" placeholder="e.g. 2500000" />
      </FormField>
    </div>
  )
}

// ─── Buyer Form (Thai) ───────────────────────────────────────────────────

function BuyerFormThai({ preselect }: { preselect?: string }) {
  const requirementOptions = [
    { value: "buy-house", label: "ซื้อบ้าน" },
    { value: "rent-condo", label: "เช่าคอนโด" },
    { value: "rent-house", label: "เช่าบ้าน" },
    { value: "buy-land", label: "หาที่ดิน" },
    { value: "other", label: "อื่นๆ" },
  ]

  const defaultReq = preselect === "SALE" ? "buy-house" : preselect === "RENT" ? "rent-house" : preselect === "LAND" ? "buy-land" : ""

  const [requirement, setRequirement] = useState(defaultReq)

  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล">
        <Input placeholder="ชื่อ-นามสกุลของคุณ" />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์">
          <Input type="tel" placeholder="08x-xxx-xxxx" />
        </FormField>
        <FormField label="ไอดีไลน์">
          <Input placeholder="LINE ID" />
        </FormField>
      </div>
      <SelectField
        label="ประเภททรัพย์ที่ต้องการ"
        options={requirementOptions}
        value={requirement}
        onChange={setRequirement}
      />
      <FormField label="ขนาดที่ต้องการเบื้องต้น">
        <Input placeholder="เช่น 2 ห้องนอน หรือ 50 ตร.ว." />
      </FormField>
      <SelectField
        label="ทำเล / ที่ตั้งที่สนใจ"
        options={LOCATION_OPTIONS}
        value=""
        onChange={() => {}}
        placeholder="เลือกพื้นที่"
      />
      <FormField label="งบประมาณที่ตั้งไว้ (บาท)">
        <Input type="number" placeholder="เช่น 2000000" />
      </FormField>
      <TextAreaField
        label="รายละเอียดเพิ่มเติมที่ต้องการ"
        placeholder="สเปกเบื้องต้น เช่น อยากได้บ้านมุม, เลี้ยงสัตว์ได้, ใกล้นิคมฯ..."
        value=""
        onChange={() => {}}
      />
    </div>
  )
}

// ─── Buyer Form (Foreign) ────────────────────────────────────────────────

function BuyerFormForeign({ preselect }: { preselect?: string }) {
  const requirementOptions = [
    { value: "buy-house", label: "Buy House / ซื้อบ้าน" },
    { value: "rent-condo", label: "Rent Condo / เช่าคอนโด" },
    { value: "rent-house", label: "Rent House / เช่าบ้าน" },
    { value: "buy-land", label: "Buy Land / ซื้อที่ดิน" },
    { value: "other", label: "Other / อื่นๆ" },
  ]

  const defaultReq = preselect === "SALE" ? "buy-house" : preselect === "RENT" ? "rent-house" : preselect === "LAND" ? "buy-land" : ""

  const [requirement, setRequirement] = useState(defaultReq)

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Full Name / ชื่อ-นามสกุล">
        <Input placeholder="Your full name" />
      </FormField>
      <FormField label="Nationality / สัญชาติ">
        <Input placeholder="e.g. Japanese, Chinese, American" />
      </FormField>
      <FormField label="Contact Information / ช่องทางติดต่อ">
        <Input placeholder="WhatsApp, Email, WeChat, or Phone" />
      </FormField>
      <SelectField
        label="Purpose / วัตถุประสงค์การซื้อ-เช่า"
        options={BUYER_PURPOSE_OPTIONS.map(o => ({ value: o.value, label: `${o.value === "living" ? "For Living" : "For Investment"} / ${o.label}` }))}
        value=""
        onChange={() => {}}
      />
      <SelectField
        label="Requirement / ประเภททรัพย์ที่กำลังมองหา"
        options={requirementOptions}
        value={requirement}
        onChange={setRequirement}
      />
      <FormField label="Preferred Size & Functions / ขนาดและฟังก์ชันที่ต้องการ">
        <Input placeholder="e.g. 2 Bedrooms, Pet-friendly" />
      </FormField>
      <SelectField
        label="Preferred Location / ทำเลที่สนใจ"
        options={LOCATION_OPTIONS}
        value=""
        onChange={() => {}}
        placeholder="Select area"
      />
      <FormField label="Target Budget / งบประมาณ (THB)">
        <Input type="number" placeholder="e.g. 2000000" />
      </FormField>
      <TextAreaField
        label="Additional Details / รายละเอียดเพิ่มเติม"
        placeholder="Any specific requirements..."
        value=""
        onChange={() => {}}
      />
    </div>
  )
}

// ─── Co-Agent Form ───────────────────────────────────────────────────────

function CoAgentForm() {
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล">
        <Input placeholder="ชื่อ-นามสกุลของคุณ" />
      </FormField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="เบอร์โทรศัพท์">
          <Input type="tel" placeholder="08x-xxx-xxxx" />
        </FormField>
        <FormField label="ไอดีไลน์">
          <Input placeholder="LINE ID" />
        </FormField>
      </div>
      <TextAreaField
        label="รายละเอียดทรัพย์"
        placeholder="อธิบายจุดเด่นทรัพย์ที่ต้องการให้ช่วยขาย..."
        value=""
        onChange={() => {}}
      />
      <SelectField
        label="ประเภททรัพย์"
        options={PROPERTY_TYPE_OPTIONS}
        value=""
        onChange={() => {}}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField
          label="ภาค"
          options={REGION_OPTIONS}
          value=""
          onChange={() => {}}
          placeholder="เลือกภาค"
        />
        <SelectField
          label="จังหวัด / ทำเลที่ตั้ง"
          options={LOCATION_OPTIONS}
          value=""
          onChange={() => {}}
          placeholder="เลือกจังหวัด"
        />
      </div>
      <FormField label="ขนาดพื้นที่ (ตร.ว. / ตร.ม.)">
        <Input placeholder="เช่น 50 ตร.ว. หรือ 120 ตร.ม." />
      </FormField>
      <FormField label="ราคาขาย / ราคาเช่า (บาท)">
        <Input type="number" placeholder="เช่น 2500000" />
      </FormField>
    </div>
  )
}

// ─── Academy Form ────────────────────────────────────────────────────────

function AcademyForm() {
  return (
    <div className="flex flex-col gap-4">
      <FormField label="ชื่อ-นามสกุล">
        <Input placeholder="ชื่อ-นามสกุลของคุณ" />
      </FormField>
      <FormField label="เบอร์โทรศัพท์">
        <Input type="tel" placeholder="08x-xxx-xxxx" />
      </FormField>
      <FormField label="ไอดีไลน์">
        <Input placeholder="LINE ID" />
      </FormField>
      <TextAreaField
        label="สิ่งที่สนใจ / คำถามเพิ่มเติม"
        placeholder="เช่น อยากรู้รายละเอียดคอร์ส, ค่าใช้จ่าย, ระยะเวลาเรียน..."
        value=""
        onChange={() => {}}
      />
    </div>
  )
}

// ─── Main PropertyForm ───────────────────────────────────────────────────

export default function PropertyForm({ variant, preselect, className }: PropertyFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Phase 2 — connect to Supabase + LINE Notify
    setSubmitted(true)
  }

  if (submitted) {
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
          onClick={() => setSubmitted(false)}
        >
          กรอกฟอร์มใหม่
        </Button>
      </motion.div>
    )
  }

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
        <AcademyForm />
        <Button type="submit" className="mt-6 w-full gap-2 bg-[#1B4D3E] py-2.5 text-white hover:bg-[#2A6B56]" size="lg">
          <Send className="size-4" />
          ส่งข้อมูล
        </Button>
        <PrivacyNotice />
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
        <CoAgentForm />
        <Button type="submit" className="mt-6 w-full gap-2 bg-[#1B4D3E] py-2.5 text-white hover:bg-[#2A6B56]" size="lg">
          <Send className="size-4" />
          ส่งข้อมูล
        </Button>
        <PrivacyNotice />
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

      <Tabs defaultValue="thai">
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
          {isOwner ? <OwnerFormThai /> : <BuyerFormThai preselect={preselect} />}
        </TabsContent>
        <TabsContent value="foreign">
          {isOwner ? <OwnerFormForeign /> : <BuyerFormForeign preselect={preselect} />}
        </TabsContent>
      </Tabs>

      <Button type="submit" className="mt-6 w-full gap-2 bg-[#1B4D3E] py-2.5 text-white hover:bg-[#2A6B56]" size="lg">
        <Send className="size-4" />
        ส่งข้อมูล
      </Button>
      <PrivacyNotice />
    </form>
  )
}
