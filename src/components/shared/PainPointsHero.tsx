import { AlertCircle } from "lucide-react"

interface PainPointsHeroProps {
  headline: string
  headlineEn?: string
  points: string[]
  pointsEn?: string[]
  className?: string
  /** ใช้ "h2" เมื่อหน้านั้นมี h1 ของตัวเองอยู่แล้ว (SEO: หนึ่ง h1 ต่อหน้า) */
  headingLevel?: "h1" | "h2"
}

export default function PainPointsHero({
  headline,
  headlineEn,
  points,
  pointsEn,
  className,
  headingLevel: Heading = "h1",
}: PainPointsHeroProps) {
  return (
    <section
      className={`bg-gradient-to-b from-muted to-background py-8 lg:py-10 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center" style={{ animation: "fade-up 0.5s ease both" }}>
          <Heading className="font-heading text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl whitespace-pre-line">
            {headline}
          </Heading>
          {headlineEn && (
            <p className="mt-2 text-base font-medium text-secondary sm:text-lg">{headlineEn}</p>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {points.map((point, i) => (
            <div
              key={i}
              className="ring-foreground/5 flex items-start gap-3 rounded-xl bg-card p-5 shadow-[0_10px_30px_rgba(45,90,39,0.04)] ring-1"
              style={{ animation: `fade-up 0.5s ease ${(i + 1) * 0.1}s both` }}
            >
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-500" />
              <div>
                <p className="text-sm leading-relaxed text-foreground sm:text-base">{point}</p>
                {pointsEn?.[i] && (
                  <p className="mt-0.5 text-xs leading-relaxed text-secondary/75 sm:text-sm">
                    {pointsEn[i]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
