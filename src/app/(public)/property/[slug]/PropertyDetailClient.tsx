"use client"

import Link from "next/link"
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

interface PropertyDetailClientProps {
  property: Property | null
  pimAvatarUrl?: string
  pimName?: string
  lineUrl?: string
  phone?: string
}

const typeLabel: Record<Property["type"], string> = {
  SALE: "ขาย",
  RENT: "เช่า",
  LAND: "ที่ดิน",
}

const typeBreadcrumb: Record<Property["type"], { label: string; href: string }> = {
  SALE: { label: "ซื้อบ้าน", href: "/find-property" },
  RENT: { label: "เช่าบ้าน", href: "/find-property" },
  LAND: { label: "ที่ดิน", href: "/find-property" },
}

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
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const phoneNumber = phone || SITE_CONFIG.phone
  if (!property) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-foreground text-2xl font-bold">ไม่พบทรัพย์นี้</h1>
        <p className="text-muted-foreground">
          ทรัพย์ที่คุณค้นหาอาจถูกขายไปแล้ว หรือลิงก์ไม่ถูกต้องค่ะ
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          กลับหน้าแรก
        </Link>
      </main>
    )
  }

  const breadcrumbParent = typeBreadcrumb[property.type]

  return (
    <>
      <title>{property.title} — บ้านไออุ่น</title>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          className="mb-6"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ ...sectionTransition, delay: 0 }}
        >
          <Breadcrumb
            items={[
              { label: "หน้าแรก", href: "/" },
              { label: breadcrumbParent.label, href: breadcrumbParent.href },
              { label: property.title },
            ]}
          />
        </motion.div>

        <div className="flex flex-col gap-10">
          {/* Gallery */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.05 }}
          >
            <PropertyGallery images={property.images} title={property.title} />
          </motion.section>

          {/* Title + price + badges */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {/* Type + tags row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${typeBadgeClass[property.type]}`}
              >
                {typeLabel[property.type]}
              </span>
              {property.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-foreground text-2xl leading-snug font-bold sm:text-3xl">
              {property.title}
            </h1>

            {/* Price */}
            <p className="text-2xl font-bold text-primary">{formatPrice(property)}</p>

            {/* Location line */}
            <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span>
                {property.location.subdistrict}, {property.location.district}
              </span>
            </div>
          </motion.section>

          {/* Emotional description */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.15 }}
            className="border-border bg-muted/30 rounded-2xl border px-6 py-5"
          >
            <p className="text-foreground text-base leading-relaxed italic">
              &ldquo;{property.emotionalDesc}&rdquo;
            </p>
          </motion.section>

          {/* Fact sheet */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.2 }}
          >
            <h2 className="text-foreground mb-4 text-lg font-semibold">รายละเอียดทรัพย์</h2>
            <PropertyFactSheet property={property} />
          </motion.section>

          {/* Location intelligence */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.25 }}
          >
            <h2 className="text-foreground mb-4 text-lg font-semibold">ทำเลและระยะทาง</h2>
            <LocationIntelligence property={property} />
          </motion.section>

          {/* Pim insight */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.3 }}
          >
            <PimInsight insight={property.pimInsight} avatarUrl={pimAvatarUrl} name={pimName} />
          </motion.section>

          {/* Financial calculator — SALE only */}
          {property.type === "SALE" && (
            <motion.section
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              transition={{ ...sectionTransition, delay: 0.35 }}
            >
              <h2 className="text-foreground mb-4 text-lg font-semibold">คำนวณยอดผ่อน</h2>
              <FinancialCalculator property={property} />
            </motion.section>
          )}

          {/* CTA */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ ...sectionTransition, delay: 0.4 }}
            className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center text-white"
          >
            <h2 className="mb-2 text-xl font-bold">สนใจหลังนี้? ปรึกษาพิมเลย</h2>
            <p className="mb-6 text-sm leading-relaxed text-primary-foreground/80">
              พิมพร้อมตอบทุกคำถาม นัดดูบ้านได้ทุกวัน ไม่มีค่าใช้จ่ายในการปรึกษาค่ะ
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={lineHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                <MessageCircle className="h-4 w-4" />
                ทักหาพิมทาง LINE
              </Link>
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                โทร {phoneNumber}
              </a>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  )
}
