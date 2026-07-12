import { getLocale } from "next-intl/server"
import Breadcrumb from "@/components/layout/Breadcrumb"
import PageHeroBanner from "@/components/shared/PageHeroBanner"
import {
  EFFECTIVE_DATE,
  INTRO,
  PRIVACY_POLICY_SECTIONS,
  type PolicyBlock,
} from "@/content/privacy-policy"
import type { Locale } from "@/i18n/routing"
import { pickLocalized } from "@/lib/i18n/pick-localized"

const HOME_CRUMB = { th: "หน้าแรก", en: "Home" } as const
const PRIVACY_CRUMB = { th: "นโยบายความเป็นส่วนตัว", en: "Privacy Policy" } as const

/** Renders `**bold**` segments within a plain-text string as <strong>. */
function withBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part ? <span key={i}>{part}</span> : null
  })
}

function Block({ block, locale }: { block: PolicyBlock; locale: Locale }) {
  if (block.type === "p") {
    return (
      <div className="mt-4">
        <p className="text-foreground leading-relaxed">
          {withBold(pickLocalized(locale, { th: block.th, en: block.en }))}
        </p>
      </div>
    )
  }

  if (block.type === "list") {
    return (
      <ul className="mt-4 flex flex-col gap-4">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/40" />
            <div>
              <p className="text-foreground leading-relaxed">
                {withBold(pickLocalized(locale, { th: item.th, en: item.en }))}
              </p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
      <p className="text-sm leading-relaxed text-amber-800 italic">
        {withBold(pickLocalized(locale, { th: block.th, en: block.en }))}
      </p>
    </div>
  )
}

export default async function PrivacyPolicyPage() {
  const locale = (await getLocale()) as Locale

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: pickLocalized(locale, HOME_CRUMB), href: "/" },
            { label: pickLocalized(locale, PRIVACY_CRUMB) },
          ]}
        />
      </div>

      <PageHeroBanner
        titleTh="นโยบายความเป็นส่วนตัว"
        titleEn="Privacy Policy"
        subtitleTh={`บังคับใช้ตั้งแต่ ${EFFECTIVE_DATE.th}`}
        subtitleEn={`Effective from ${EFFECTIVE_DATE.en}`}
      />

      <main className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mt-6">
          <p className="text-foreground leading-relaxed">
            {pickLocalized(locale, INTRO)}
          </p>
        </div>

        <div className="mt-10 flex flex-col divide-y divide-border">
          {PRIVACY_POLICY_SECTIONS.map((section) => (
            <section key={section.number} className="py-8 first:pt-0">
              <h2 className="font-heading text-lg font-bold text-primary sm:text-xl">
                {section.number}.{" "}
                {pickLocalized(locale, { th: section.titleTh, en: section.titleEn })}
              </h2>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} locale={locale} />
              ))}
            </section>
          ))}
        </div>
      </main>
    </>
  )
}
