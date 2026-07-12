import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { getLocale } from "next-intl/server"
import PageSection from "@/components/layout/PageSection"
import { SERVICES_HUB_CONTENT } from "@/content/services-hub"
import type { Locale } from "@/i18n/routing"
import { pickLocalized, pickPipeBilingual } from "@/lib/i18n/pick-localized"
import { ThaiText } from "@/lib/thai-wrap"

interface ServicesWhyChooseProps {
  imageUrl?: string
}

export default async function ServicesWhyChoose({ imageUrl }: ServicesWhyChooseProps) {
  const locale = (await getLocale()) as Locale
  const { title, subtitle, items } = SERVICES_HUB_CONTENT.whyChoose

  return (
    <PageSection variant="default">
      <div className="rounded-3xl border border-border bg-card px-6 py-10 shadow-sm sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {pickPipeBilingual(locale, title)}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            <ThaiText text={pickPipeBilingual(locale, subtitle)} />
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-muted shadow-md sm:min-h-[360px] lg:min-h-[500px]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={
                  locale === "en"
                    ? "Baan Ai Oun team consulting with a client"
                    : "ทีมงานบ้านไออุ่นกำลังให้คำปรึกษาลูกค้าอย่างเป็นกันเอง"
                }
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground sm:min-h-[360px] lg:min-h-[500px]">
                <ImageIcon className="size-10 opacity-40" aria-hidden />
                <p className="text-sm">
                  {locale === "en"
                    ? "Upload image in Admin > Profile > Our Services"
                    : "อัปโหลดรูปใน Admin > โปรไฟล์ > บริการของเรา"}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <article key={item.title.th} className="flex gap-5">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl text-secondary sm:size-[50px] sm:text-2xl"
                  aria-hidden
                >
                  {item.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {pickLocalized(locale, item.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    <ThaiText text={pickLocalized(locale, item.description)} />
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  )
}
