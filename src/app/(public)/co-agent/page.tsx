import type { Metadata } from "next"
import Image from "next/image"
import { ImageIcon } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import {
  PainPointsHero,
  SolutionsSection,
  StepsSection,
  EmotionalHook,
  CTAWithForm,
  FaqSection,
} from "@/components/shared"
import { COAGENT_CONTENT } from "@/content/co-agent"
import { getProfile } from "@/lib/queries/profile"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { mapFaq } from "@/lib/mappers"
import { mapFaqsToItems } from "@/lib/faq-items"

export const revalidate = 1800

export function generateMetadata(): Metadata {
  return {
    title: COAGENT_CONTENT.seo.title,
    description: COAGENT_CONTENT.seo.description.th,
    openGraph: {
      title: COAGENT_CONTENT.seo.title,
      description: COAGENT_CONTENT.seo.description.en,
    },
  }
}

export default async function CoAgentPage() {
  const [profile, faqRows] = await Promise.all([getProfile(), getFaqsByPage("co-agent")])
  const faqs = mapFaqsToItems(faqRows.map(mapFaq))
  const heroImage = profile.coAgentHeroImage
  const splitImage = profile.coAgentSplitImage
  const { solutions } = COAGENT_CONTENT

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "Co-Agent | Partner with Us" },
          ]}
        />
      </div>

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#1B4D3E] to-[#0d2820] py-16 text-white">
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt=""
              aria-hidden
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1B4D3E]/85 to-[#0d2820]/90" />
          </>
        )}
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{COAGENT_CONTENT.seo.title}</h1>
        </div>
      </section>

      <PainPointsHero
        headingLevel="h2"
        headline={COAGENT_CONTENT.painPoints.headline.th}
        headlineEn={COAGENT_CONTENT.painPoints.headline.en}
        points={COAGENT_CONTENT.painPoints.points.map((p) => p.th)}
        pointsEn={COAGENT_CONTENT.painPoints.points.map((p) => p.en)}
      />

      <SolutionsSection
        headline={solutions.headline.th}
        headlineEn={solutions.headline.en}
        subtitle={solutions.subtitle.th}
        description={solutions.description.th}
        descriptionEn={solutions.description.en}
        highlight={solutions.highlight.th}
        highlightEn={solutions.highlight.en}
        features={solutions.features.map((f) => f.th)}
        featuresEn={solutions.features.map((f) => f.en)}
      />

      {/* Split image + reasons (mockup co-agent.html) */}
      <section className="py-16">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] lg:min-h-[400px]">
            {splitImage ? (
              <Image
                src={splitImage}
                alt="ทีมงานนายหน้าบ้านไออุ่นร่วมมือกับพาร์ทเนอร์"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 bg-muted p-6 text-center text-muted-foreground">
                <ImageIcon className="size-10 opacity-40" aria-hidden />
                <p className="text-sm">อัปโหลดรูปใน Admin &gt; โปรไฟล์ &gt; Co-Agent</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {solutions.headline.th}
              <span className="mt-1 block text-base font-medium text-muted-foreground">
                {solutions.headline.en}
              </span>
            </h2>
            <p className="mt-3 text-sm font-medium text-primary">
              รับ Co-Broke อสังหาฯ โซนกรุงเทพฯ สมุทรปราการ ชลบุรี ฉะเชิงเทรา ระยอง และ EEC แบบแบ่งคอมมิชชันโปร่งใส
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Transparent Co-Broke network in Bangkok, Samut Prakan, Chonburi, Rayong &amp; EEC.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {solutions.features.map((feature) => (
                <article
                  key={feature.th}
                  className="rounded-xl border border-border bg-card p-4 shadow-sm"
                >
                  <h3 className="text-sm font-bold text-foreground">{feature.th}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{feature.en}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StepsSection headline={COAGENT_CONTENT.steps.headline} steps={COAGENT_CONTENT.steps.items} />

      <EmotionalHook
        quote={COAGENT_CONTENT.hook.quote.th}
        quoteEn={COAGENT_CONTENT.hook.quote.en}
        message={COAGENT_CONTENT.hook.message.th}
        messageEn={COAGENT_CONTENT.hook.message.en}
      />

      <FaqSection
        title="คำถามที่พบบ่อย | Frequently Asked Questions"
        subtitle="เรื่องที่เพื่อนร่วมอาชีพมักสอบถามเกี่ยวกับการทำงานร่วมกับเรา"
        items={faqs}
        variant="boxed"
      />

      <CTAWithForm
        primary={COAGENT_CONTENT.cta.primary}
        secondary={COAGENT_CONTENT.cta.secondary}
        formVariant="co-agent"
      />
    </>
  )
}
