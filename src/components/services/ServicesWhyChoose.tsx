import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { Heart, Shield, Star, type LucideIcon } from "lucide-react"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"

const ICON_MAP = { Heart, Shield, Star } as const

interface ServicesWhyChooseProps {
  imageUrl?: string
}

export default function ServicesWhyChoose({ imageUrl }: ServicesWhyChooseProps) {
  const { title, subtitle, items } = SERVICES_HUB_CONTENT.whyChoose

  return (
    <PageSection variant="default">
      <SectionTitle title={title} subtitle={subtitle} />

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="ทีมงานบ้านไออุ่นให้คำปรึกษาลูกค้า"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground">
              <ImageIcon className="size-10 opacity-40" aria-hidden />
              <p className="text-sm">อัปโหลดรูปใน Admin &gt; โปรไฟล์ &gt; บริการของเรา</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] as LucideIcon
            return (
              <article
                key={item.title.th}
                className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    {item.title.th}
                    <span className="mt-0.5 block text-sm font-medium text-muted-foreground">
                      {item.title.en}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {item.description.th}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.description.en}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </PageSection>
  )
}
