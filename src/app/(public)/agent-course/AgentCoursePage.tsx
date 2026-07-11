import type { Metadata } from "next"
import Image from "next/image"
import { ImageIcon } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import {
  PainPointsHero,
  SolutionsSection,
  EmotionalHook,
  CTAWithForm,
  FaqSection,
  type FaqItem,
} from "@/components/shared"
import { AGENT_COURSE_CONTENT } from "@/content/agent-course"

export function generateMetadata(): Metadata {
  return {
    title: AGENT_COURSE_CONTENT.seo.title,
    description: AGENT_COURSE_CONTENT.seo.description.th,
    openGraph: {
      title: AGENT_COURSE_CONTENT.seo.title,
      description: AGENT_COURSE_CONTENT.seo.description.th,
    },
  }
}

interface AgentCoursePageProps {
  heroImage?: string
  midBannerImage?: string
  faqs: FaqItem[]
}

export default function AgentCoursePage({
  heroImage,
  midBannerImage,
  faqs,
}: AgentCoursePageProps) {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "คอร์สนายหน้า | Agent Course" },
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
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {AGENT_COURSE_CONTENT.hero.h1.th}
          </h1>
          <p className="mt-2 text-base font-medium text-[#D4A843]">
            {AGENT_COURSE_CONTENT.hero.h1.en}
          </p>
          <p className="mt-4 text-lg text-gray-200">{AGENT_COURSE_CONTENT.hero.sub.th}</p>
          <p className="mt-1 text-sm text-gray-400">{AGENT_COURSE_CONTENT.hero.sub.en}</p>
        </div>
      </section>

      <PainPointsHero
        headingLevel="h2"
        headline={AGENT_COURSE_CONTENT.painPoints.headline.th}
        headlineEn={AGENT_COURSE_CONTENT.painPoints.headline.en}
        points={AGENT_COURSE_CONTENT.painPoints.points.map((p) => p.th)}
        pointsEn={AGENT_COURSE_CONTENT.painPoints.points.map((p) => p.en)}
      />

      <SolutionsSection
        headline={AGENT_COURSE_CONTENT.solutions.headline.th}
        headlineEn={AGENT_COURSE_CONTENT.solutions.headline.en}
        subtitle={AGENT_COURSE_CONTENT.solutions.subtitle.th}
        description={AGENT_COURSE_CONTENT.solutions.description.th}
        descriptionEn={AGENT_COURSE_CONTENT.solutions.description.en}
        highlight={AGENT_COURSE_CONTENT.solutions.highlight.th}
        highlightEn={AGENT_COURSE_CONTENT.solutions.highlight.en}
        features={AGENT_COURSE_CONTENT.solutions.features.map((f) => f.th)}
        featuresEn={AGENT_COURSE_CONTENT.solutions.features.map((f) => f.en)}
      />

      {/* Mid-course banner */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative my-10 h-[180px] overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] sm:my-16 sm:h-[250px]">
          {midBannerImage ? (
            <Image
              src={midBannerImage}
              alt="ภาพบรรยากาศการทำเวิร์กชอปกลุ่ม"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
              <ImageIcon className="size-10 opacity-40" aria-hidden />
              <p className="text-sm">อัปโหลดรูปแบนเนอร์กลางใน Admin &gt; โปรไฟล์ &gt; คอร์สนายหน้า</p>
            </div>
          )}
        </div>
      </div>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">
              {AGENT_COURSE_CONTENT.dayTwo.headline.th}
            </h2>
            <p className="mt-1 text-base font-medium text-[#D4A843]">
              {AGENT_COURSE_CONTENT.dayTwo.headline.en}
            </p>
            <p className="mt-3 text-gray-600">{AGENT_COURSE_CONTENT.dayTwo.description.th}</p>
            <p className="mt-1 text-sm text-gray-400">{AGENT_COURSE_CONTENT.dayTwo.description.en}</p>
          </div>
          <div className="space-y-4">
            {AGENT_COURSE_CONTENT.dayTwo.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm"
              >
                <div className="shrink-0 text-2xl">{feature.th.split(" ")[0]}</div>
                <div>
                  <p className="text-gray-700">
                    {feature.th.substring(feature.th.indexOf(" ") + 1)}
                  </p>
                  <p className="mt-0.5 text-sm text-[#D4A843]/80">
                    {feature.en.substring(feature.en.indexOf(" ") + 1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">
            {AGENT_COURSE_CONTENT.results.headline.th}
          </h2>
          <p className="mt-1 text-base font-medium text-[#D4A843]">
            {AGENT_COURSE_CONTENT.results.headline.en}
          </p>
          <p className="mt-4 text-gray-600">{AGENT_COURSE_CONTENT.results.description.th}</p>
          <p className="mt-1 text-sm text-gray-400">{AGENT_COURSE_CONTENT.results.description.en}</p>
        </div>
      </section>

      <EmotionalHook
        quote={AGENT_COURSE_CONTENT.hook.quote.th}
        quoteEn={AGENT_COURSE_CONTENT.hook.quote.en}
        message={AGENT_COURSE_CONTENT.hook.message.th}
        messageEn={AGENT_COURSE_CONTENT.hook.message.en}
      />

      <FaqSection
        title="คำถามที่พบบ่อย | Frequently Asked Questions"
        subtitle="เคลียร์ทุกข้อสงสัย เพื่อให้คุณตัดสินใจก้าวสู่ความสำเร็จได้อย่างมั่นใจ"
        items={faqs}
        variant="boxed"
      />

      <CTAWithForm
        primary={AGENT_COURSE_CONTENT.cta.primary}
        secondary={AGENT_COURSE_CONTENT.cta.secondary}
        formVariant="academy"
      />
    </>
  )
}
