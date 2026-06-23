interface SectionTitleProps {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {/* Decorative underline */}
      <div className="flex items-center gap-2">
        <div className="bg-primary/30 h-0.5 w-8 rounded-full" />
        <div className="bg-primary h-1 w-12 rounded-full" />
        <div className="bg-primary/30 h-0.5 w-8 rounded-full" />
      </div>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
