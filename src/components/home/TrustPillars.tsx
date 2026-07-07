import Image from "next/image"
import { Wrench, Handshake, Search, type LucideIcon } from "lucide-react"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"

export interface TrustPillarImages {
  renovation: string
  network: string
  shopper: string
}

interface Pillar {
  key: keyof TrustPillarImages
  icon: LucideIcon
  titleTh: string
  titleEn: string
  descTh: string
  descEn: string
  alt: string
}

const PILLARS: Pillar[] = [
  {
    key: "renovation",
    icon: Wrench,
    titleTh: "ผลงานรีโนเวท",
    titleEn: "Renovation Expert",
    descTh:
      "มากกว่าการขาย คือการสร้างความสุขผ่านงานรีโนเวทคุณภาพ พิสูจน์ด้วยตาคุณเองผ่านภาพเปรียบเทียบ Before & After",
    descEn: "We create happiness through quality renovations. See our Before & After results.",
    alt: "ผลงานรีโนเวทบ้านโดยบ้านไออุ่น — ภาพเปรียบเทียบก่อนและหลัง",
  },
  {
    key: "network",
    icon: Handshake,
    titleTh: "นายหน้ามืออาชีพ",
    titleEn: "Professional Network",
    descTh:
      "เหนือกว่าด้วยเครือข่ายนายหน้าคุณภาพ ที่ผ่านการปั้นจากคอร์สเฉพาะทางและเชี่ยวชาญในทุกทำเลทั่วไทย",
    descEn: "Superior service backed by a network of quality agents, experts in local areas.",
    alt: "ทีมนายหน้ามืออาชีพเครือข่ายบ้านไออุ่น",
  },
  {
    key: "shopper",
    icon: Search,
    titleTh: "บริการจัดหาบ้านฟรี",
    titleEn: "Property Shopper",
    descTh:
      "ไม่ต้องเหนื่อยหาเอง! บอกงบและทำเลที่คุณต้องการ เราคัดสรรและจัดหาทรัพย์ที่ใช่ที่สุดมาให้คุณฟรี",
    descEn:
      "Don't waste time! Tell us your budget and location, and we will find the best property for you for free.",
    alt: "บริการจัดหาบ้านฟรีโดยบ้านไออุ่น — ให้คำปรึกษาลูกค้า",
  },
]

interface TrustPillarsProps {
  images: TrustPillarImages
}

/**
 * "ความไว้วางใจจากลูกค้า" — 3 pillar cards ตาม mockup หน้าแรก
 * รูปแต่ละใบจัดการผ่าน Admin > โปรไฟล์ > รูปภาพหน้าแรก
 * ยังไม่อัปโหลด = แสดงกล่องสีพื้น + ไอคอนแทน (ไม่ใช้รูปตัวอย่างปลอม)
 */
export default function TrustPillars({ images }: TrustPillarsProps) {
  return (
    <PageSection variant="default">
      <SectionTitle title="ความไว้วางใจจากลูกค้า | Trusted by Our Clients" />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon
          const imageUrl = images[pillar.key]
          return (
            <article
              key={pillar.key}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 bg-muted">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={pillar.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Icon className="size-10 text-muted-foreground/40" />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="flex items-center gap-2 text-base font-bold text-primary">
                  <Icon className="size-5 shrink-0" />
                  <span>
                    {pillar.titleTh}
                    <span className="ml-1.5 text-sm font-medium text-muted-foreground">
                      | {pillar.titleEn}
                    </span>
                  </span>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                  {pillar.descTh}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {pillar.descEn}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </PageSection>
  )
}
