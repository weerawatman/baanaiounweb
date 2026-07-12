"use client"

import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { motion, type Transition } from "framer-motion"
import { Phone, MessageCircle, Tag, MapPin } from "lucide-react"
import { type Property } from "@/types"
import { formatPrice } from "@/lib/format"
import { SITE_CONFIG } from "@/config/site"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PropertyGallery from "@/components/property/PropertyGallery"
import PropertyFactSheet from "@/components/property/PropertyFactSheet"
import LocationIntelligence from "@/components/property/LocationIntelligence"
import PimInsight from "@/components/property/PimInsight"
import FinancialCalculator from "@/components/property/FinancialCalculator"
import { Badge } from "@/components/ui/badge"
import type { Locale } from "@/i18n/routing"
import { homeCrumb, localizedCrumb } from "@/lib/i18n/breadcrumbs"
import { localizedOrFallback, pickLocalized } from "@/lib/i18n/pick-localized"

interface PropertyDetailClientProps {
  property: Property | null
  pimAvatarUrl?: string
  pimName?: string
  lineUrl?: string
  phone?: string
}

const TYPE_LABEL: Record<Property["type"], { th: string; en: string }> = {
  SALE: { th: "ขาย", en: "Sale" },
  RENT: { th: "เช่า", en: "Rent" },
  LAND: { th: "ที่ดิน", en: "Land" },
}

const TYPE_BREADCRUMB: Record<Property["type"], { label: { th: string; en: string }; href: string }> = {
  SALE: { label: { th: "ซื้อบ้าน", en: "Buy Property" }, href: "/find-property" },
  RENT: { label: { th: "เช่าบ้าน", en: "Rent Property" }, href: "/find-property" },
  LAND: { label: { th: "ที่ดิน", en: "Land" }, href: "/find-property" },
}

const NOT_FOUND_TITLE = { th: "ไม่พบทรัพย์นี้", en: "Property not found" } as const
const NOT_FOUND_BODY = {
  th: "ทรัพย์ที่คุณค้นหาอาจถูกขายไปแล้ว หรือลิงก์ไม่ถูกต้องค่ะ",
  en: "The property you're looking for may have been sold or the link is incorrect.",
} as const
const BACK_HOME = { th: "กลับหน้าแรก", en: "Back to Home" } as const

const SECTION_DETAILS = { th: "รายละเอียดทรัพย์", en: "Property Details" } as const
const SECTION_LOCATION = { th: "ทำเลและระยะทาง", en: "Location & Distances" } as const
const SECTION_CALCULATOR = { th: "คำนวณยอดผ่อน", en: "Mortgage Calculator" } as const

const CTA_HEADING = { th: "สนใจหลังนี้? ปรึกษาพิมเลย", en: "Interested? Talk to Pim" } as const
const CTA_BODY = {
  th: "พิมพร้อมตอบทุกคำถาม นัดดูบ้านได้ทุกวัน ไม่มีค่าใช้จ่ายในการปรึกษาค่ะ",
  en: "Pim answers every question — schedule a viewing any day, free consultation.",
} as const
const LINE_CTA = { th: "ทักหาพิมทาง LINE", en: "Message Pim on LINE" } as const
const CALL_CTA = { th: "โทร", en: "Call" } as const

const typeBadgeClass: Record<Property["type"], string> = {
  SALE: "bg-primary text-white",
  RENT: "bg-blue-600 text-white",
  LAND: "bg-amber-500 text-white",
}

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const sectionTransition: Transition = { duration: 0.5, ease: "easeOut" }

export default function PropertyDetailClient({
  property,
  pimAvatarUrl,
  pimName,
  lineUrl,
  phone,
}: PropertyDetailClientProps) {
  const locale = useLocale() as Locale
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const phoneNumber = phone || SITE_CONFIG.phone

  if (!property) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-foreground text-2xl font-bold">
          {pickLocalized(locale, NOT_FOUND_TITLE)}
        </h1>
        <p className="text-muted-foreground">
          {pickLocalized(locale, NOT_FOUND_BODY)}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          {pickLocalized(locale, BACK_HOME)}
        </Link>
      </main>
    )
  }

  const breadcrumbParent = TYPE_BREADCRUMB[property.type]
  const title = localizedOrFallback(locale, property.title, property.titleEn)
  const emotionalDesc = localizedOrFallback(
    locale,
    property.emotionalDesc,
    property.emotionalDescEn,
  )
  const pimInsight = localizedOrFallback(locale, property.pimInsight, property.pimInsightEn)

  return (
    <>
      <title>{title} — บ้านไออุ่น</title>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          className="mb-6"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ ...sectionTransition, delay: 0 }}
        >
          <Breadcrumb
            items={[
              homeCrumb(locale),
              localizedCrumb(locale, breadcrumbParent.label, breadcrumbParent.href),
              { label: title },
            ]}
          />
        </motion.div>

        <div className="flex flex-col gap-10">
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.05 }}
          >
            <PropertyGallery images={property.images} title={title} />
          </motion.section>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${typeBadgeClass[property.type]}`}
              >
                {pickLocalized(locale, TYPE_LABEL[property.type])}
              </span>
              {property.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-foreground text-2xl leading-snug font-bold sm:text-3xl">
              {title}
            </h1>

            <p className="text-2xl font-bold text-primary">{formatPrice(property)}</p>

            <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span>
                {property.location.subdistrict}, {property.location.district}
              </span>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.15 }}
            className="border-border bg-muted/30 rounded-2xl border px-6 py-5"
          >
            <p className="text-foreground text-base leading-relaxed italic">
              &ldquo;{emotionalDesc}&rdquo;
            </p>
          </motion.section>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.2 }}
          >
            <h2 className="text-foreground mb-4 text-lg font-semibold">
              {pickLocalized(locale, SECTION_DETAILS)}
            </h2>
            <PropertyFactSheet property={property} />
          </motion.section>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.25 }}
          >
            <h2 className="text-foreground mb-4 text-lg font-semibold">
              {pickLocalized(locale, SECTION_LOCATION)}
            </h2>
            <LocationIntelligence property={property} />
          </motion.section>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.3 }}
          >
            <PimInsight insight={pimInsight} avatarUrl={pimAvatarUrl} name={pimName} />
          </motion.section>

          {property.type === "SALE" && (
            <motion.section
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              transition={{ ...sectionTransition, delay: 0.35 }}
            >
              <h2 className="text-foreground mb-4 text-lg font-semibold">
                {pickLocalized(locale, SECTION_CALCULATOR)}
              </h2>
              <FinancialCalculator property={property} />
            </motion.section>
          )}

          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.4 }}
            className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center text-white"
          >
            <h2 className="mb-2 text-xl font-bold">
              {pickLocalized(locale, CTA_HEADING)}
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-primary-foreground/80">
              {pickLocalized(locale, CTA_BODY)}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={lineHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                <MessageCircle className="h-4 w-4" />
                {pickLocalized(locale, LINE_CTA)}
              </a>
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {pickLocalized(locale, CALL_CTA)} {phoneNumber}
              </a>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  )
}
