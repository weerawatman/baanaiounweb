import type { Metadata } from "next"
import Link from "next/link"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { Button } from "@/components/ui/button"
import { SolutionsSection, StepsSection, EmotionalHook } from "@/components/shared"
import { FIND_PROPERTY_CONTENT } from "@/content/find-property"
import RequestForm from "../request/RequestForm"

export function generateMetadata(): Metadata {
  return {
    title: FIND_PROPERTY_CONTENT.seo.title,
    description: FIND_PROPERTY_CONTENT.seo.description.th,
    openGraph: {
      title: FIND_PROPERTY_CONTENT.seo.title,
      description: FIND_PROPERTY_CONTENT.seo.description.th,
    },
  }
}

export default function FindPropertyPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "งานหาทรัพย์ | Property Match" },
          ]}
        />
      </div>

      {/* Above-the-fold hero + form */}
      <section className="bg-gradient-to-b from-[#F5F0E8] to-white pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-8">
          <div className="py-6 lg:py-10">
            <div className="inline-flex rounded-full bg-[#1B4D3E]/8 px-4 py-1.5 text-sm font-medium text-[#1B4D3E]">
              งานหาทรัพย์ | Property Match
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#1B4D3E] sm:text-4xl lg:text-5xl">
              {FIND_PROPERTY_CONTENT.hero.headline.th}
            </h1>
            <p className="mt-3 text-lg font-medium text-[#D4A843] sm:text-xl">
              {FIND_PROPERTY_CONTENT.hero.headline.en}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-700">
              {FIND_PROPERTY_CONTENT.hero.description.th}
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-500">
              {FIND_PROPERTY_CONTENT.hero.description.en}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {FIND_PROPERTY_CONTENT.hero.highlights.map((item) => (
                <div key={item.th} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                  <p className="text-sm font-semibold text-[#1B4D3E]">{item.th}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{item.en}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/properties">
                <Button
                  className="bg-[#1B4D3E] text-white hover:bg-[#163f33]"
                  size="lg"
                >
                  ดูทรัพย์ที่มี | Browse Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-[#D4A843] text-[#D4A843] hover:bg-[#D4A843] hover:text-white"
                  size="lg"
                >
                  คุยกับทีมงาน | Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:pb-6">
            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-[#1B4D3E] sm:text-2xl">
                  {FIND_PROPERTY_CONTENT.formCard.title.th}
                </h2>
                <p className="mt-1 text-sm font-medium text-[#D4A843]">
                  {FIND_PROPERTY_CONTENT.formCard.title.en}
                </p>
                <p className="mt-3 text-sm text-gray-600">
                  {FIND_PROPERTY_CONTENT.formCard.description.th}
                </p>
                <p className="text-xs text-gray-400">
                  {FIND_PROPERTY_CONTENT.formCard.description.en}
                </p>
              </div>

              <RequestForm requestType="matchmaking" />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <SolutionsSection
        headline={FIND_PROPERTY_CONTENT.solutions.headline.th}
        headlineEn={FIND_PROPERTY_CONTENT.solutions.headline.en}
        subtitle={FIND_PROPERTY_CONTENT.solutions.subtitle}
        description={FIND_PROPERTY_CONTENT.solutions.description.th}
        descriptionEn={FIND_PROPERTY_CONTENT.solutions.description.en}
        highlight={FIND_PROPERTY_CONTENT.solutions.highlight.th}
        highlightEn={FIND_PROPERTY_CONTENT.solutions.highlight.en}
        features={FIND_PROPERTY_CONTENT.solutions.features.map((f) => f.th)}
        featuresEn={FIND_PROPERTY_CONTENT.solutions.features.map((f) => f.en)}
      />

      {/* 3 Steps */}
      <StepsSection
        headline={FIND_PROPERTY_CONTENT.steps.headline}
        steps={FIND_PROPERTY_CONTENT.steps.items}
      />

      {/* Emotional Hook */}
      <EmotionalHook
        quote={FIND_PROPERTY_CONTENT.hook.quote.th}
        quoteEn={FIND_PROPERTY_CONTENT.hook.quote.en}
        message={FIND_PROPERTY_CONTENT.hook.message.th}
        messageEn={FIND_PROPERTY_CONTENT.hook.message.en}
      />
    </>
  )
}
