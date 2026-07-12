import Breadcrumb from "@/components/layout/Breadcrumb"
import PageHeroBanner from "@/components/shared/PageHeroBanner"
import {
  EFFECTIVE_DATE,
  INTRO,
  PRIVACY_POLICY_SECTIONS,
  type PolicyBlock,
} from "@/content/privacy-policy"

/** Renders `**bold**` segments within a plain-text string as <strong>. */
function withBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part ? <span key={i}>{part}</span> : null
  })
}

function Block({ block }: { block: PolicyBlock }) {
  if (block.type === "p") {
    return (
      <div className="mt-4">
        <p className="text-foreground leading-relaxed">{withBold(block.th)}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{withBold(block.en)}</p>
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
              <p className="text-foreground leading-relaxed">{withBold(item.th)}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{withBold(item.en)}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  // note
  return (
    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
      <p className="text-sm leading-relaxed text-amber-800 italic">{block.th}</p>
      <p className="mt-1 text-xs leading-relaxed text-amber-700/80 italic">{block.en}</p>
    </div>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: "หน้าแรก", href: "/" }, { label: "นโยบายความเป็นส่วนตัว" }]}
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
        <p className="text-foreground leading-relaxed">{INTRO.th}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{INTRO.en}</p>
      </div>

      <div className="mt-10 flex flex-col divide-y divide-border">
        {PRIVACY_POLICY_SECTIONS.map((section) => (
          <section key={section.number} className="py-8 first:pt-0">
            <h2 className="font-heading text-lg font-bold text-primary sm:text-xl">
              {section.number}. {section.titleTh}
              <span className="mt-0.5 block text-sm font-medium text-muted-foreground">
                {section.titleEn}
              </span>
            </h2>
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </section>
        ))}
      </div>
    </main>
    </>
  )
}
