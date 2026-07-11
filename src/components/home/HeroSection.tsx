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
    <section className="relative isolate overflow-hidden py-20 text-center text-white sm:py-24 lg:py-28">
      <Image
        src={background}
        alt="ทีมงานบ้านไออุ่นส่งมอบความสุขให้ลูกค้า"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900/40 to-gray-900/85" />

      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] sm:text-[2.8rem]">
          {HERO.h1Th}
          <span className="mt-1 block">{HERO.h1Th2}</span>
          <span className="mt-2 block text-2xl font-bold text-white/95 sm:text-3xl">
            {HERO.h1En}
          </span>
        </h1>

        <p className="mt-4 text-lg font-bold text-[#eab308] [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] sm:text-xl">
          {HERO.subTh}
        </p>
        <p className="mt-1 text-base text-gray-200">{HERO.subEn}</p>

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
