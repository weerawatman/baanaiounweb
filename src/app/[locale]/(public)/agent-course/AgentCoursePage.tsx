import type { Metadata } from "next"
import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { getLocale } from "next-intl/server"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import { CTAWithForm, FaqSection, PageHeroBanner, type FaqItem } from "@/components/shared"
import { AGENT_COURSE_CONTENT } from "@/content/agent-course"
import { NAV_ITEMS } from "@/config/navigation"
import { SITE_CONFIG } from "@/config/site"
import type { Locale, LocaleParams } from "@/i18n/routing"
import { homeCrumb } from "@/lib/i18n/breadcrumbs"
import { pickLocalized, pickPipeBilingual } from "@/lib/i18n/pick-localized"
import { createPageMetadata } from "@/lib/i18n/metadata"
import { navText } from "@/lib/i18n/locale-label"
const MID_BANNER_ALT = {
  th: "ภาพบรรยากาศการทำเวิร์กชอปกลุ่มอย่างสนุกสนาน",
  en: "Group workshop atmosphere",
} as const
const UPLOAD_HINT = {
  th: "อัปโหลดรูปแบนเนอร์กลางใน Admin > โปรไฟล์ > คอร์สนายหน้า",
  en: "Upload mid-banner image in Admin > Profile > Agent Course",
} as const

export async function generateMetadata({
  params,
}: {
  params: LocaleParams
}): Promise<Metadata> {
  const { locale } = await params
  const { seo } = AGENT_COURSE_CONTENT
  return createPageMetadata({
    locale,
    pathname: "/agent-course",
    title: seo.title,
    description: seo.description,
  })
}

interface CurriculumDay {
  badge: string
  titleTh: string
  titleEn: string
  items: readonly {
    number: number
    titleTh: string
    titleEn: string
    descTh: string
    descEn: string
  }[]
}

function CurriculumDaySection({ day, locale }: { day: CurriculumDay; locale: Locale }) {
  const leftItems = day.items.filter((_, i) => i % 2 === 0)
  const rightItems = day.items.filter((_, i) => i % 2 === 1)

  const renderList = (items: CurriculumDay["items"]) => (
    <ul className="flex flex-col gap-5">
      {items.map((item) => (
        <li
          key={item.number}
          className="flex gap-4 rounded-xl border border-border bg-muted p-5"
        >
          <div className="flex h-[38px] w-7 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            {item.number}
          </div>
          <div>
            <h4 className="text-base font-bold text-foreground">
              {pickLocalized(locale, { th: item.titleTh, en: item.titleEn })}
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {pickLocalized(locale, { th: item.descTh, en: item.descEn })}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="rounded-[20px] border border-border bg-card p-6 shadow-sm sm:p-10">
      <div className="mb-8 flex flex-wrap items-center gap-3 border-b-2 border-secondary pb-4">
        <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
          {day.badge}
        </span>
        <h3 className="text-lg font-bold text-primary sm:text-xl">
          {pickLocalized(locale, { th: day.titleTh, en: day.titleEn })}
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {renderList(leftItems)}
        {renderList(rightItems)}
      </div>
    </div>
  )
}

interface AgentCoursePageProps {
  heroImage?: string
  midBannerImage?: string
  lineUrl?: string
  faqs: FaqItem[]
}

export default async function AgentCoursePage({
  heroImage,
  midBannerImage,
  lineUrl,
  faqs,
}: AgentCoursePageProps) {
  const locale = (await getLocale()) as Locale
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const { hero, successCards, curriculum, resultQuote, faq, cta } = AGENT_COURSE_CONTENT
  const servicesNav = NAV_ITEMS.find((item) => item.href === "/services")!
  const courseNav = NAV_ITEMS.find((item) => item.href === "/agent-course")!

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[
            homeCrumb(locale),
            { label: navText(servicesNav, locale), href: "/services" },
            { label: navText(courseNav, locale) },
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
        <div className="relative z-10 -mt-6 mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:-mt-8 sm:grid-cols-2 xl:grid-cols-4">
          {successCards.map((card) => (
            <article
              key={card.titleTh}
              className="rounded-xl border border-border bg-card p-5 text-center shadow-md transition-all hover:-translate-y-1 hover:border-primary"
            >
              <span className="text-3xl" aria-hidden>
                {card.icon}
              </span>
              <h2 className="mt-3 text-sm font-bold leading-snug text-primary">
                {pickLocalized(locale, { th: card.titleTh, en: card.titleEn })}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {pickLocalized(locale, { th: card.descTh, en: card.descEn })}
              </p>
            </article>
          ))}
        </div>

        <header className="mb-10 mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {pickLocalized(locale, { th: curriculum.titleTh, en: curriculum.titleEn })}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/90">
            {pickLocalized(locale, { th: curriculum.subtitleTh, en: curriculum.subtitleEn })}
          </p>
        </header>

        <div className="space-y-10">
          <CurriculumDaySection day={curriculum.day1} locale={locale} />

          <div className="relative h-[180px] overflow-hidden rounded-2xl shadow-md sm:h-[250px]">
            {midBannerImage ? (
              <Image
                src={midBannerImage}
                alt={pickLocalized(locale, MID_BANNER_ALT)}
                fill
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
                <ImageIcon className="size-10 opacity-40" aria-hidden />
                <p className="text-sm">{pickLocalized(locale, UPLOAD_HINT)}</p>
              </div>
            )}
          </div>

          <CurriculumDaySection day={curriculum.day2} locale={locale} />
        </div>

        <section className="mt-20 rounded-[20px] bg-primary px-6 py-12 text-center text-primary-foreground shadow-lg sm:px-10 sm:py-16">
          <p className="text-3xl" aria-hidden>
            🚀
          </p>
          <h3 className="mt-3 text-xl font-bold text-secondary sm:text-2xl">
            {pickLocalized(locale, { th: resultQuote.titleTh, en: resultQuote.titleEn })}
          </h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            {pickLocalized(locale, { th: resultQuote.messageTh, en: resultQuote.messageEn })}
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
        formVariant="academy"
        className="bg-card"
      />
    </>
  )
}
