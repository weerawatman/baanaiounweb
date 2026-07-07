import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Users } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageSection from "@/components/layout/PageSection"
import { StepsSection } from "@/components/shared"
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

interface FindPropertyPageProps {
  /** รูปทีมงานให้คำปรึกษา — จัดการผ่าน Admin > โปรไฟล์ (ว่าง = แสดงกล่องสำรอง) */
  teamImage?: string
}

/**
 * โครงหน้าตาม mockup (docs/mockups/งานหาทรัพย์.html):
 * Hero 2 คอลัมน์ (เนื้อหา+รูปทีมงาน / ฟอร์ม) → Why-Us การ์ด 4 ใบ →
 * 3 ขั้นตอน → Quote section เขียวเข้ม
 */
export default function FindPropertyPage({ teamImage }: FindPropertyPageProps) {
  const { hero, solutions, steps, hook } = FIND_PROPERTY_CONTENT

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "บริการของเรา | Our Services", href: "/services" },
            { label: "งานหาทรัพย์ | Property Match" },
          ]}
        />
      </div>

      {/* ─── Hero + Form (above the fold) ─────────────────────────────── */}
      <PageSection variant="warm" className="pt-4 lg:pt-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="py-4 lg:py-8">
            <span className="text-sm font-bold text-muted-foreground">
              {hero.eyebrow.th} | {hero.eyebrow.en}
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              <span className="block text-primary">{hero.pageName}</span>
              <span className="mt-1 block text-foreground">{hero.headline.th}</span>
            </h1>
            <p className="mt-2 text-lg font-medium text-secondary sm:text-xl">
              {hero.headline.en}
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90">
              {hero.description.th}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {hero.description.en}
            </p>

            <ul className="mt-6 flex max-w-2xl flex-col gap-4">
              {hero.benefits.map((item) => (
                <li key={item.th} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
                      {item.th}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {item.en}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-foreground/90">
              {hero.closing.th}
              <span className="mt-0.5 block text-xs text-muted-foreground">{hero.closing.en}</span>
            </p>

            <Link
              href="/properties"
              className="mt-5 inline-block border-b-2 border-[#E8833A] pb-0.5 text-sm font-bold text-[#E8833A] transition-opacity hover:opacity-80"
            >
              อยากดูทรัพย์ที่มีอยู่แล้ว? ดูทรัพย์ทั้งหมด → | Browse all properties →
            </Link>

            {/* รูปทีมงาน — จัดการผ่าน Admin > โปรไฟล์ > รูปภาพหน้างานหาทรัพย์ */}
            <div className="relative mt-8 h-52 overflow-hidden rounded-2xl bg-muted sm:h-60">
              {teamImage ? (
                <Image
                  src={teamImage}
                  alt={hero.teamImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Users className="size-10 text-muted-foreground/40" />
                </div>
              )}
            </div>
          </div>

          <div className="lg:pb-4">
            <div
              className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8"
              data-testid="property-match-form"
            >
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  {FIND_PROPERTY_CONTENT.formCard.title.th}
                </h2>
                <p className="mt-1 text-sm font-medium text-secondary">
                  {FIND_PROPERTY_CONTENT.formCard.title.en}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {FIND_PROPERTY_CONTENT.formCard.description.th}
                </p>
              </div>

              <RequestForm requestType="matchmaking" />
            </div>
          </div>
        </div>
      </PageSection>

      {/* ─── Why Us (4 feature cards) ──────────────────────────────────── */}
      <PageSection variant="default">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {solutions.headline.th}
          </h2>
          <p className="mt-1 text-base font-medium text-secondary">{solutions.headline.en}</p>
          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            {solutions.description.th}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {solutions.description.en}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.features.map((feature) => (
            <div
              key={feature.th}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span aria-hidden className="text-3xl">
                {feature.icon}
              </span>
              <p className="mt-4 text-sm font-medium leading-relaxed text-foreground">
                {feature.th}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{feature.en}</p>
            </div>
          ))}
        </div>
      </PageSection>

      {/* ─── 3 Steps ───────────────────────────────────────────────────── */}
      <StepsSection headline={steps.headline} steps={steps.items} />

      {/* ─── Quote (dark green band per mockup) ────────────────────────── */}
      <PageSection variant="default">
        <div className="rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 sm:py-16">
          <blockquote className="mx-auto max-w-3xl text-2xl font-bold italic leading-relaxed text-[#D4A843] sm:text-3xl">
            {hook.quote.th}
          </blockquote>
          <blockquote className="mx-auto mt-3 max-w-3xl text-base font-medium italic leading-relaxed text-[#D4A843]/75">
            {hook.quote.en}
          </blockquote>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            {hook.message.th}
          </p>
          <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-white/60">
            {hook.message.en}
          </p>
        </div>
      </PageSection>
    </>
  )
}
