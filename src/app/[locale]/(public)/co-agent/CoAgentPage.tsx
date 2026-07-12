import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { getLocale } from "next-intl/server"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import { CTAWithForm, FaqSection, PageHeroBanner, type FaqItem } from "@/components/shared"
import { COAGENT_CONTENT } from "@/content/co-agent"
import { NAV_ITEMS } from "@/config/navigation"
import { SITE_CONFIG } from "@/config/site"
import type { Locale } from "@/i18n/routing"
import { pickLocalized, pickPipeBilingual } from "@/lib/i18n/pick-localized"
import { navText } from "@/lib/i18n/locale-label"

const HOME_CRUMB = { th: "หน้าแรก", en: "Home" } as const
const UPLOAD_HINT = {
  th: "อัปโหลดรูปใน Admin > โปรไฟล์ > Co-Agent",
  en: "Upload an image in Admin > Profile > Co-Agent",
} as const
const SPLIT_ALT = {
  th: "ทีมงานนายหน้าบ้านไออุ่นร่วมมือกับพาร์ทเนอร์",
  en: "Baan Ai Oun agents partnering with co-agents",
} as const

interface CoAgentPageProps {
  heroImage?: string
  splitImage?: string
  lineUrl?: string
  faqs: FaqItem[]
}

export default async function CoAgentPage({
  heroImage,
  splitImage,
  lineUrl,
  faqs,
}: CoAgentPageProps) {
  const locale = (await getLocale()) as Locale
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const { hero, valueCards, whyCoAgent, hook, faq, cta } = COAGENT_CONTENT
  const servicesNav = NAV_ITEMS.find((item) => item.href === "/services")!
  const coAgentNav = NAV_ITEMS.find((item) => item.href === "/co-agent")!

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: pickLocalized(locale, HOME_CRUMB), href: "/" },
            { label: navText(servicesNav, locale), href: "/services" },
            { label: navText(coAgentNav, locale) },
          ]}
        />
      </div>

      <PageHeroBanner
        image={heroImage}
        titleTh={hero.titleTh}
        titleThLine2={hero.titleThLine2}
        subtitleTh={hero.titleEn}
      />

      <PageSection variant="default" className="pt-0">
        <div className="relative z-10 -mt-6 mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:-mt-8 sm:grid-cols-2">
          {valueCards.map((card) => (
            <article
              key={card.titleTh}
              className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:border-primary"
            >
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-2xl"
                aria-hidden
              >
                {card.icon}
              </div>
              <div>
                <h2 className="text-base font-bold text-primary">
                  {pickLocalized(locale, { th: card.titleTh, en: card.titleEn })}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {pickLocalized(locale, { th: card.descTh, en: card.descEn })}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="relative min-h-[300px] overflow-hidden rounded-[20px] shadow-lg lg:min-h-[450px]">
            {splitImage ? (
              <Image
                src={splitImage}
                alt={pickLocalized(locale, SPLIT_ALT)}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-2 bg-muted p-6 text-center text-muted-foreground lg:min-h-[450px]">
                <ImageIcon className="size-10 opacity-40" aria-hidden />
                <p className="text-sm">{pickLocalized(locale, UPLOAD_HINT)}</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
              {pickLocalized(locale, { th: whyCoAgent.headlineTh, en: whyCoAgent.headlineEn })}
            </h2>
            <p className="mt-4 inline-block border-b-2 border-secondary pb-3 text-sm font-bold text-primary sm:text-base">
              {pickLocalized(locale, { th: whyCoAgent.seoTh, en: whyCoAgent.seoEn })}
            </p>

            <div className="mt-6 flex flex-col gap-5">
              {whyCoAgent.reasons.map((reason) => (
                <article
                  key={reason.titleTh}
                  className="rounded-lg border border-border border-l-4 border-l-primary bg-card p-5 shadow-sm"
                >
                  <h3 className="text-base font-bold text-foreground">
                    <span className="flex items-center gap-2">
                      <span aria-hidden>{reason.emoji}</span>
                      {pickLocalized(locale, { th: reason.titleTh, en: reason.titleEn })}
                    </span>
                  </h3>
                  <p className="mt-2 pl-8 text-sm leading-relaxed text-foreground/90">
                    {pickLocalized(locale, { th: reason.descTh, en: reason.descEn })}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-20 rounded-[20px] bg-primary px-6 py-12 text-center text-primary-foreground shadow-lg sm:px-10 sm:py-16">
          <p className="text-3xl" aria-hidden>
            💛
          </p>
          <h3 className="mt-3 text-xl font-semibold italic text-secondary sm:text-2xl">
            {pickLocalized(locale, { th: hook.quoteTh, en: hook.quoteEn })}
          </h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            {pickLocalized(locale, { th: hook.messageTh, en: hook.messageEn })}
          </p>
        </section>
      </PageSection>

      <FaqSection
        title={pickPipeBilingual(locale, faq.title)}
        subtitle={pickPipeBilingual(locale, faq.subtitle)}
        items={faqs}
        variant="boxed"
        layout="cards"
      />

      <CTAWithForm
        primary={cta.primary}
        secondary={{ ...cta.secondary, href: lineHref }}
        formVariant="co-agent"
        className="bg-card"
      />
    </>
  )
}
