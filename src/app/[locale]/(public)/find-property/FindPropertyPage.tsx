import Image from "next/image"
import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import {
  StepsSection,
  PageHeroBanner,
  ServiceLeadTabs,
  PortfolioBento,
  FaqSection,
  type FaqItem,
  type BentoItem,
} from "@/components/shared"
import { FIND_PROPERTY_CONTENT } from "@/content/find-property"
import { NAV_ITEMS } from "@/config/navigation"
import type { Locale } from "@/i18n/routing"
import { pickLocalized, pickPipeBilingual } from "@/lib/i18n/pick-localized"
import { navText } from "@/lib/i18n/locale-label"
import RequestForm from "../request/RequestForm"

const HOME_CRUMB = { th: "หน้าแรก", en: "Home" } as const
const FAQ_TITLE = { th: "คำถามที่พบบ่อย (FAQ)", en: "Frequently Asked Questions" } as const
const FAQ_SUBTITLE = {
  th: "ทุกข้อสงสัยเกี่ยวกับบริการจัดหาบ้าน เรามีคำตอบที่ชัดเจนให้ค่ะ",
  en: "Clear answers about our property match service.",
} as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  const { seo } = FIND_PROPERTY_CONTENT
  const { buildPageMetadata } = await import("@/lib/i18n/metadata")

  return buildPageMetadata({
    locale,
    pathname: "/find-property",
    title: pickPipeBilingual(locale, seo.title),
    description: pickLocalized(locale, seo.description),
  })
}

interface FindPropertyPageProps {
  heroImage?: string
  teamImage?: string
  bentoItems: BentoItem[]
  faqs: FaqItem[]
}

export default async function FindPropertyPage({
  heroImage,
  teamImage,
  bentoItems,
  faqs,
}: FindPropertyPageProps) {
  const locale = (await getLocale()) as Locale
  const { banner, split, steps, hook, formCard } = FIND_PROPERTY_CONTENT
  const servicesNav = NAV_ITEMS.find((item) => item.href === "/services")!
  const matchNav = NAV_ITEMS.find((item) => item.href === "/find-property")!

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: pickLocalized(locale, HOME_CRUMB), href: "/" },
            { label: navText(servicesNav, locale), href: "/services" },
            { label: navText(matchNav, locale) },
          ]}
        />
      </div>

      <PageHeroBanner
        image={heroImage}
        titleTh={banner.titleTh}
        titleEn={banner.titleEn}
        subtitleTh={banner.subtitleTh}
        subtitleEn={banner.subtitleEn}
      />

      <PageSection variant="warm" className="pt-0">
        <div className="relative z-10 -mt-8 mb-10">
          <ServiceLeadTabs active="matchmaking" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="flex h-full min-h-0 flex-col">
            <div className="shrink-0">
              <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                {locale === "en" ? (
                  split.headline.en
                ) : (
                  <>
                    {split.headline.th}
                    <br />
                    {split.headline.thLine2}
                  </>
                )}
              </h2>

              <p className="mt-5 inline-block border-b-2 border-secondary pb-3 text-sm font-bold text-primary">
                {pickLocalized(locale, split.seo)}
              </p>

              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                {pickLocalized(locale, split.lead)}
              </p>
            </div>

            <ul className="mt-6 flex min-h-0 flex-1 flex-col gap-4 lg:justify-between">
              {split.benefits.map((item) => (
                <li
                  key={item.titleTh}
                  className="flex flex-1 items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-xl"
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {pickLocalized(locale, { th: item.titleTh, en: item.titleEn })}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                      {pickLocalized(locale, { th: item.descTh, en: item.descEn })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="h-full rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8"
              data-testid="property-match-form"
            >
              <div className="mb-6 border-b border-border pb-5 text-center">
                <h2 className="text-xl font-bold text-primary sm:text-2xl">
                  {pickLocalized(locale, formCard.title)}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {pickLocalized(locale, formCard.description)}
                </p>
              </div>
              <RequestForm requestType="matchmaking" />
            </div>
          </div>
        </div>

        <PortfolioBento items={bentoItems} />

        <div className="relative isolate mt-8 overflow-hidden rounded-2xl px-6 py-12 text-center shadow-lg sm:px-10">
          {teamImage ? (
            <>
              <Image
                src={teamImage}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="-z-20 object-cover grayscale-[30%] brightness-[0.7]"
              />
              <div className="absolute inset-0 -z-10 bg-primary/85" />
            </>
          ) : (
            <div className="absolute inset-0 -z-10 bg-primary" />
          )}
          <div className="relative z-10 text-primary-foreground">
            <p className="text-3xl" aria-hidden>
              💛
            </p>
            <blockquote className="mt-2 text-lg font-bold italic text-secondary sm:text-xl">
              &ldquo;{pickLocalized(locale, hook.quote)}&rdquo;
            </blockquote>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
              {pickLocalized(locale, hook.message)}
            </p>
          </div>
        </div>
      </PageSection>

      <StepsSection
        headline={pickPipeBilingual(locale, steps.headline)}
        steps={steps.items.map((step) => ({
          number: step.number,
          title: pickPipeBilingual(locale, step.title),
          description: pickPipeBilingual(locale, step.description),
        }))}
      />

      <FaqSection
        title={pickLocalized(locale, FAQ_TITLE)}
        subtitle={pickLocalized(locale, FAQ_SUBTITLE)}
        items={faqs}
        variant="boxed"
        layout="cards"
      />
    </>
  )
}
