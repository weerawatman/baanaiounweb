import Link from "next/link"
import { ArrowRight, GraduationCap, Users } from "lucide-react"
import { ECOSYSTEM_BAND } from "@/content/homepage"

export default function EcosystemBand() {
  return (
    <section className="bg-gradient-to-b from-[#F5F0E8] to-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#1B4D3E] sm:text-3xl">{ECOSYSTEM_BAND.title.th}</h2>
        <p className="mt-1 text-sm font-medium text-[#D4A843] sm:text-base">{ECOSYSTEM_BAND.title.en}</p>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-700">
          {ECOSYSTEM_BAND.body.th}
        </p>
        <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">
          {ECOSYSTEM_BAND.body.en}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={ECOSYSTEM_BAND.primary.href}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1B4D3E] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#163f33]"
          >
            <Users className="size-4" />
            {ECOSYSTEM_BAND.primary.label.th}
            <span className="text-white/80">| {ECOSYSTEM_BAND.primary.label.en}</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={ECOSYSTEM_BAND.secondary.href}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[#D4A843] px-8 py-3 text-sm font-semibold text-[#D4A843] transition-colors hover:bg-[#D4A843] hover:text-white"
          >
            <GraduationCap className="size-4" />
            {ECOSYSTEM_BAND.secondary.label.th}
            <span className="opacity-80">| {ECOSYSTEM_BAND.secondary.label.en}</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
