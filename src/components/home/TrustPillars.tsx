import Image from "next/image"
import { Wrench, Handshake, Search, type LucideIcon } from "lucide-react"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"

export interface TrustPillarImages {
  renovation: string
  network: string
  shopper: string
}

interface Pillar {
  key: keyof TrustPillarImages
  icon: LucideIcon
  emoji: string
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
    emoji: "✨",
    titleTh: "ผลงานจัดหาและรีโนเวท",
    titleEn: "Sourcing & Renovation",
    descTh:
      "มากกว่าการขาย คือการสร้างความสุขผ่านงานคุณภาพ เราประเมินและช่วยปรับปรุงสภาพทรัพย์ให้พร้อมอยู่ที่สุดก่อนส่งมอบ",
    descEn:
      "More than selling, we create happiness. We assess and improve property conditions to ensure they are perfectly move-in ready.",
    alt: "ผลงานการจัดหาและรีโนเวทบ้านโดยบ้านไออุ่น",
  },
  {
    key: "network",
    icon: Handshake,
    emoji: "🤝",
    titleTh: "เสียงตอบรับจากพาร์ทเนอร์",
    titleEn: "Partner Testimonials",
    descTh:
      "เจ้าของทรัพย์และเครือข่ายนายหน้ายืนยันเป็นเสียงเดียวกันถึงความเป็นมืออาชีพ คุยง่าย โปร่งใส และปิดดีลได้รวดเร็วจริง",
    descEn:
      "Property owners and partner agents consistently praise our professionalism, transparency, and fast deal-closing capabilities.",
    alt: "รีวิวความประทับใจจากลูกค้าที่ฝากขายบ้าน",
  },
  {
    key: "shopper",
    icon: Search,
    emoji: "🏦",
    titleTh: "บริการจัดหาและดูแลสินเชื่อ",
    titleEn: "Loan Care & Property Shopper",
    descTh:
      "ลูกค้าไม่ต้องเหนื่อยหาเอง เราคัดสรรบ้านที่ใช่ พร้อมบริการดันเคสสินเชื่อและดูแลสัญญาให้ฟรีอย่างสุดความสามารถ",
    descEn:
      "Clients never have to search alone. We curate properties and provide full support with bank loans and contracts for free.",
    alt: "ภาพบรรยากาศการดูแลลูกค้าจบสัญญาที่กรมที่ดิน",
  },
]

interface TrustPillarsProps {
  images: TrustPillarImages
}

/**
 * "ความไว้วางใจจากลูกค้า" — 3 pillar cards ตาม mockup services.html
 * รูปแต่ละใบจัดการผ่าน Admin > โปรไฟล์ > รูปภาพประกอบหน้า Website
 */
export default function TrustPillars({ images }: TrustPillarsProps) {
  const { title, subtitle } = SERVICES_HUB_CONTENT.trust

  return (
    <PageSection variant="default">
      <SectionTitle title={title} subtitle={subtitle} />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon
          const imageUrl = images[pillar.key]
          return (
            <article
              key={pillar.key}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-[220px] border-b border-border bg-muted">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={pillar.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center text-sm text-muted-foreground">
                    <Icon className="size-8 opacity-40" aria-hidden />
                    <span>อัปโหลดรูปใน Admin &gt; โปรไฟล์</span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="text-base font-bold text-primary">
                  {pillar.emoji} {pillar.titleTh}
                  <span className="mt-1 block text-sm font-medium text-muted-foreground">
                    {pillar.emoji} {pillar.titleEn}
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
