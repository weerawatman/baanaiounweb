interface Step {
  number: number
  title: string
  description: string
}

interface StepsSectionProps {
  headline: string
  steps: Step[]
  className?: string
}

export default function StepsSection({ headline, steps, className }: StepsSectionProps) {
  return (
    <section className={`bg-primary/5 py-16 sm:py-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          className="mb-12 text-center text-2xl font-bold tracking-tight text-primary sm:text-3xl"
          style={{ animation: "fade-up 0.5s ease both" }}
        >
          {headline}
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex h-full min-w-0 flex-col items-center rounded-2xl border border-border bg-white p-8 text-center shadow-sm"
              style={{ animation: `fade-up 0.5s ease ${i * 0.1}s both` }}
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="mb-2 text-base font-semibold text-primary sm:text-lg">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
