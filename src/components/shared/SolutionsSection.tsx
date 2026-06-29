import { CheckCircle } from "lucide-react"

interface SolutionsSectionProps {
  headline: string
  headlineEn?: string
  subtitle?: string
  description: string
  descriptionEn?: string
  highlight?: string
  highlightEn?: string
  features: string[]
  featuresEn?: string[]
  className?: string
}

export default function SolutionsSection({
  headline,
  headlineEn,
  subtitle,
  description,
  descriptionEn,
  highlight,
  highlightEn,
  features,
  featuresEn,
  className,
}: SolutionsSectionProps) {
  return (
    <section className={`py-16 sm:py-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text content */}
          <div style={{ animation: "fade-up 0.5s ease both" }}>
            <h2 className="text-2xl font-bold tracking-tight text-[#1B4D3E] sm:text-3xl">
              {headline}
            </h2>
            {headlineEn && (
              <p className="mt-1 text-base font-medium text-[#D4A843]">{headlineEn}</p>
            )}
            {subtitle && <p className="mt-2 text-lg font-medium text-[#D4A843]">{subtitle}</p>}
            <p className="mt-4 text-base leading-relaxed text-gray-600">{description}</p>
            {descriptionEn && (
              <p className="mt-1 text-sm leading-relaxed text-gray-500">{descriptionEn}</p>
            )}
            {highlight && (
              <p className="mt-3 text-base font-semibold text-[#1B4D3E]">{highlight}</p>
            )}
            {highlightEn && (
              <p className="mt-0.5 text-sm font-medium text-[#D4A843]">{highlightEn}</p>
            )}
          </div>

          {/* Features checklist */}
          <ul className="flex flex-col gap-4">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg bg-[#1B4D3E]/5 px-5 py-4"
                style={{ animation: `fade-up 0.5s ease ${i * 0.1}s both` }}
              >
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-[#1B4D3E]" />
                <div>
                  <span className="text-sm leading-relaxed text-gray-700 sm:text-base">
                    {feature}
                  </span>
                  {featuresEn?.[i] && (
                    <span className="mt-0.5 block text-xs leading-relaxed text-[#D4A843]/75 sm:text-sm">
                      {featuresEn[i]}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
