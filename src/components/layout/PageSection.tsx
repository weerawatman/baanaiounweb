import { cn } from "@/lib/utils"

type PageSectionVariant = "default" | "warm" | "primary"

interface PageSectionProps {
  variant?: PageSectionVariant
  className?: string
  children: React.ReactNode
  id?: string
  "data-testid"?: string
}

const variantClasses: Record<PageSectionVariant, string> = {
  default: "bg-card",
  warm: "bg-muted",
  primary: "bg-primary text-primary-foreground",
}

export default function PageSection({
  variant = "default",
  className,
  children,
  id,
  "data-testid": testId,
}: PageSectionProps) {
  return (
    <section
      id={id}
      data-testid={testId}
      className={cn("py-16 lg:py-20", variantClasses[variant], className)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  )
}
