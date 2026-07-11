import Image from "next/image"
import { SITE_CONFIG } from "@/config/site"
import { HERO } from "@/content/homepage"
import HeroSearchBar from "./HeroSearchBar"

interface HeroSectionProps {
  heroImage?: string
  districts: string[]
}

export default function HeroSection({ heroImage, districts }: HeroSectionProps) {
  const background = heroImage || SITE_CONFIG.pim.heroImage

  return (
    <section className="relative isolate overflow-hidden py-14 text-center text-white sm:py-16 lg:py-20">
      <Image
        src={background}
        alt="ทีมงานบ้านไออุ่นส่งมอบความสุขให้ลูกค้า"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(45,90,39,0.5)] to-[rgba(26,56,22,0.95)]" />

      <div className="mx-auto max-w-4xl px-4">
        <h1 className="font-heading text-3xl font-semibold leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.3)] sm:text-[2.625rem]">
          {HERO.h1Th}
          <span className="mt-1 block">{HERO.h1Th2}</span>
          <span className="mt-2 block text-2xl font-bold text-white/95 sm:text-3xl">
            {HERO.h1En}
          </span>
        </h1>

        <p className="mt-3 text-lg font-medium text-secondary [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] sm:text-xl">
          {HERO.subTh}
        </p>
        <p className="mt-1 text-base text-primary-subtle">{HERO.subEn}</p>

        <HeroSearchBar
          districts={districts}
          listHref={HERO.ctaList.href}
          listLabelTh={HERO.ctaList.th}
          listLabelEn={HERO.ctaList.en}
          searchLabelTh={HERO.ctaSearch.th}
          searchLabelEn={HERO.ctaSearch.en}
        />
      </div>
    </section>
  )
}
