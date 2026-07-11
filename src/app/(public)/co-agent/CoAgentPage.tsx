import Image from "next/image"
import { ImageIcon } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import { CTAWithForm, FaqSection, type FaqItem } from "@/components/shared"
import { COAGENT_CONTENT } from "@/content/co-agent"
import { SITE_CONFIG } from "@/config/site"

interface CoAgentPageProps {
  heroImage?: string
  splitImage?: string
  lineUrl?: string
  faqs: FaqItem[]
}

export default function CoAgentPage({
  heroImage,
  splitImage,
  lineUrl,
  faqs,
}: CoAgentPageProps) {
  const lineHref = lineUrl || SITE_CONFIG.lineUrl
  const { hero, valueCards, whyCoBroke, hook, faq, cta } = COAGENT_CONTENT

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "Co-Agent | Partner with Us" },
          ]}
        />
      </div>

      <section className="relative isolate overflow-hidden bg-[#111827] pb-24 pt-20 text-white sm:pb-28 sm:pt-24">
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#111827]/60 to-primary/85" />
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
        <div className="relative z-10 -mt-12 mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:-mt-14 sm:grid-cols-2">
          {valueCards.map((card) => (
            <article
              key={card.titleTh}
              className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:border-primary"
            >
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4] text-2xl"
                aria-hidden
              >
                {card.icon}
              </div>
              <div>
                <h2 className="text-base font-bold text-primary">{card.titleTh}</h2>
                <p className="text-xs font-medium text-muted-foreground">{card.titleEn}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.descTh}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground/80">
                  {card.descEn}
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
                alt="ทีมงานนายหน้าบ้านไออุ่นร่วมมือกับพาร์ทเนอร์"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-2 bg-muted p-6 text-center text-muted-foreground lg:min-h-[450px]">
                <ImageIcon className="size-10 opacity-40" aria-hidden />
                <p className="text-sm">อัปโหลดรูปใน Admin &gt; โปรไฟล์ &gt; Co-Agent</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
              {whyCoBroke.headlineTh}
            </h2>
            <p className="mt-1 text-lg font-medium text-muted-foreground">
              {whyCoBroke.headlineEn}
            </p>
            <p className="mt-4 inline-block border-b-2 border-secondary pb-3 text-sm font-bold text-primary sm:text-base">
              {whyCoBroke.seoTh}
            </p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{whyCoBroke.seoEn}</p>

            <div className="mt-6 flex flex-col gap-5">
              {whyCoBroke.reasons.map((reason) => (
                <article
                  key={reason.titleTh}
                  className="rounded-lg border border-border border-l-4 border-l-primary bg-card p-5 shadow-sm"
                >
                  <h3 className="text-base font-bold text-foreground">
                    <span className="flex items-center gap-2">
                      <span aria-hidden>{reason.emoji}</span>
                      {reason.titleTh}
                    </span>
                    <span className="mt-0.5 block text-sm font-medium text-muted-foreground">
                      {reason.titleEn}
                    </span>
                  </h3>
                  <p className="mt-2 pl-8 text-sm leading-relaxed text-foreground/90">
                    {reason.descTh}
                  </p>
                  <p className="mt-1 pl-8 text-xs leading-relaxed text-muted-foreground">
                    {reason.descEn}
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
            {hook.quoteTh}
          </h3>
          <p className="mt-1 text-base italic text-secondary/85">{hook.quoteEn}</p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            {hook.messageTh}
          </p>
          <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-primary-foreground/70">
            {hook.messageEn}
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
        formVariant="co-agent"
        className="bg-card"
      />
    </>
  )
}
