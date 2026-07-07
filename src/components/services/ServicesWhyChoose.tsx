import { Heart, Shield, Star, type LucideIcon } from "lucide-react"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"

const ICON_MAP = { Heart, Shield, Star } as const

export default function ServicesWhyChoose() {
  const { title, subtitle, items } = SERVICES_HUB_CONTENT.whyChoose

  return (
    <PageSection variant="default">
      <SectionTitle title={title} subtitle={subtitle} />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] as LucideIcon
          return (
            <article
              key={item.title.th}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
            >
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
                <Icon className="size-7" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                {item.title.th}
                <span className="mt-1 block text-sm font-medium text-muted-foreground">
                  {item.title.en}
                </span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{item.description.th}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {item.description.en}
              </p>
            </article>
          )
        })}
      </div>
    </PageSection>
  )
}
