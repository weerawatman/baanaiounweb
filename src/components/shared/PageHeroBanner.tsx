import Image from "next/image"
import { cn } from "@/lib/utils"

interface PageHeroBannerProps {
  image?: string
  titleTh: string
  titleThLine2?: string
  titleEn?: string
  subtitleTh?: string
  subtitleEn?: string
  children?: React.ReactNode
  className?: string
  "data-testid"?: string
}

export default function PageHeroBanner({
  image,
  titleTh,
  titleThLine2,
  titleEn,
  subtitleTh,
  subtitleEn,
  children,
  className,
  "data-testid": testId,
}: PageHeroBannerProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-primary py-10 text-primary-foreground sm:py-12",
        className,
      )}
      data-testid={testId}
    >
      {image && (
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover grayscale-[50%] brightness-[0.8]"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-primary/85" />
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="font-heading text-2xl font-bold drop-shadow sm:text-3xl lg:text-4xl">
          {titleTh}
          {titleThLine2 && <span className="mt-1 block">{titleThLine2}</span>}
        </h1>
        {titleEn && (
          <p className="mt-1.5 text-xl font-normal text-primary-foreground/95 drop-shadow sm:text-2xl">
            {titleEn}
          </p>
        )}
        {subtitleTh && (
          <p className="mx-auto mt-3 max-w-3xl text-base font-bold text-secondary sm:text-lg">
            {subtitleTh}
          </p>
        )}
        {subtitleEn && (
          <p className="mx-auto mt-1.5 max-w-3xl text-sm text-primary-foreground/80">
            {subtitleEn}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
