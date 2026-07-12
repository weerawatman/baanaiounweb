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
      // py-8/py-10 so two adjacent sections total ~80px — the site-wide
      // section rhythm (matches the About page's mt-20 reference gap).
      className={cn("py-8 lg:py-10", variantClasses[variant], className)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  )
}
