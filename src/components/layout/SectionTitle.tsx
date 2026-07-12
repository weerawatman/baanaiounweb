import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  subtitleClassName?: string
  /** ใช้ "h1" เมื่อเป็นหัวข้อหลักของหน้า (SEO: หนึ่ง h1 ต่อหน้า) */
  as?: "h1" | "h2"
  /** plain = หัวข้อแบบ mockup ไม่มีเส้นตกแต่ง */
  variant?: "default" | "plain"
}

export default function SectionTitle({
  title,
  subtitle,
  subtitleClassName,
  as: Heading = "h2",
  variant = "default",
}: SectionTitleProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Heading
        className={
          variant === "plain"
            ? "font-heading text-2xl font-semibold text-primary sm:text-[2.125rem]"
            : "text-foreground font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl"
        }
      >
        {title}
      </Heading>
      {variant === "default" && (
        <div className="flex items-center gap-2">
          <div className="bg-primary/30 h-0.5 w-8 rounded-full" />
          <div className="bg-primary h-1 w-12 rounded-full" />
          <div className="bg-primary/30 h-0.5 w-8 rounded-full" />
        </div>
      )}
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
