interface SectionTitleProps {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {/* Decorative underline */}
      <div className="flex items-center gap-2">
        <div className="h-0.5 w-8 rounded-full bg-primary/30" />
        <div className="h-1 w-12 rounded-full bg-primary" />
        <div className="h-0.5 w-8 rounded-full bg-primary/30" />
      </div>
      {subtitle && (
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
