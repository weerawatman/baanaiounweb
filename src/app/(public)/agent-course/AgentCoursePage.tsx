import type { Metadata } from "next"
import Image from "next/image"
import { ImageIcon } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import { CTAWithForm, FaqSection, type FaqItem } from "@/components/shared"
import { AGENT_COURSE_CONTENT } from "@/content/agent-course"
import { SITE_CONFIG } from "@/config/site"

export function generateMetadata(): Metadata {
  return {
    title: AGENT_COURSE_CONTENT.seo.title,
    description: AGENT_COURSE_CONTENT.seo.description.th,
    openGraph: {
      title: AGENT_COURSE_CONTENT.seo.title,
      description: AGENT_COURSE_CONTENT.seo.description.en,
    },
  }
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

function CurriculumDaySection({ day }: { day: CurriculumDay }) {
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
            <h4 className="text-base font-bold text-foreground">{item.titleTh}</h4>
            <p className="text-xs font-medium text-muted-foreground">{item.titleEn}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.descTh}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground/80">
              {item.descEn}
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
          {day.titleTh}
          <span className="mt-0.5 block text-sm font-medium text-muted-foreground">
            {day.titleEn}
          </span>
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

export default function AgentCoursePage({
  heroImage,
  midBannerImage,
  lineUrl,
  faqs,
}: AgentCoursePageProps) {
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const { hero, successCards, curriculum, resultQuote, faq, cta } = AGENT_COURSE_CONTENT

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "คอร์สนายหน้า | Agent Course" },
          ]}
        />
      </div>

      <section className="relative isolate overflow-hidden bg-[#1a3816] pb-24 pt-20 text-white sm:pb-28 sm:pt-24">
        {heroImage && (
          <Image
            src={heroImage}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1a3816]/70 to-primary/90" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-pretty text-3xl font-bold leading-snug drop-shadow sm:text-4xl lg:text-[2.8rem]">
            {hero.titleTh}
            <span className="mt-2 block">{hero.titleThLine2}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-bold text-secondary drop-shadow sm:text-lg">
            {hero.titleEn}
          </p>
        </div>
      </section>

      <PageSection variant="default" className="pt-0">
        <div className="relative z-10 -mt-10 mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:-mt-12 sm:grid-cols-2 xl:grid-cols-4">
          {successCards.map((card) => (
            <article
              key={card.titleTh}
              className="rounded-xl border border-border bg-card p-5 text-center shadow-md transition-all hover:-translate-y-1 hover:border-primary"
            >
              <span className="text-3xl" aria-hidden>
                {card.icon}
              </span>
              <h2 className="mt-3 text-sm font-bold leading-snug text-primary">{card.titleTh}</h2>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">{card.titleEn}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{card.descTh}</p>
              <p className="mt-0.5 text-[0.7rem] leading-relaxed text-muted-foreground/80">
                {card.descEn}
              </p>
            </article>
          ))}
        </div>

        <header className="mb-10 mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {curriculum.titleTh}
          </h2>
          <p className="mt-1 text-lg font-medium text-muted-foreground">{curriculum.titleEn}</p>
          <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/90">
            {curriculum.subtitleTh}
          </p>
          <p className="mx-auto mt-1 max-w-2xl text-sm text-muted-foreground">
            {curriculum.subtitleEn}
          </p>
        </header>

        <div className="space-y-10">
          <CurriculumDaySection day={curriculum.day1} />

          <div className="relative h-[180px] overflow-hidden rounded-2xl shadow-md sm:h-[250px]">
            {midBannerImage ? (
              <Image
                src={midBannerImage}
                alt="ภาพบรรยากาศการทำเวิร์กชอปกลุ่มอย่างสนุกสนาน"
                fill
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
                <ImageIcon className="size-10 opacity-40" aria-hidden />
                <p className="text-sm">อัปโหลดรูปแบนเนอร์กลางใน Admin &gt; โปรไฟล์ &gt; คอร์สนายหน้า</p>
              </div>
            )}
          </div>

          <CurriculumDaySection day={curriculum.day2} />
        </div>

        <section className="mt-20 rounded-[20px] bg-primary px-6 py-12 text-center text-primary-foreground shadow-lg sm:px-10 sm:py-16">
          <p className="text-3xl" aria-hidden>
            🚀
          </p>
          <h3 className="mt-3 text-xl font-bold text-secondary sm:text-2xl">
            {resultQuote.titleTh}
          </h3>
          <p className="text-base font-medium text-secondary/90">{resultQuote.titleEn}</p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            {resultQuote.messageTh}
          </p>
          <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-primary-foreground/70">
            {resultQuote.messageEn}
          </p>
        </section>
      </PageSection>

      <FaqSection
        title={faq.title}
        subtitle={faq.subtitle}
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
