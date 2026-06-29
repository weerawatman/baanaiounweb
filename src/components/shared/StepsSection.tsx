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
    <section className={`bg-[#1B4D3E]/5 py-16 sm:py-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2
          className="mb-12 text-center text-2xl font-bold tracking-tight text-[#1B4D3E] sm:text-3xl"
          style={{ animation: "fade-up 0.5s ease both" }}
        >
          {headline}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm"
              style={{ animation: `fade-up 0.5s ease ${i * 0.1}s both` }}
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#1B4D3E] text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="mb-2 text-base font-semibold text-[#1B4D3E] sm:text-lg">
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
