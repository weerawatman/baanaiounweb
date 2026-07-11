import Image from "next/image"

interface PageHeroBannerProps {
  image?: string
  titleTh: string
  titleEn: string
  subtitleTh?: string
  subtitleEn?: string
}

export default function PageHeroBanner({
  image,
  titleTh,
  titleEn,
  subtitleTh,
  subtitleEn,
}: PageHeroBannerProps) {
  return (
    <section className="relative isolate min-h-[240px] overflow-hidden bg-primary sm:min-h-[280px]">
      {image && (
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
      )}
      <div className={`absolute inset-0 -z-10 ${image ? "bg-primary/75" : "bg-primary"}`} />
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-16 text-center text-primary-foreground sm:py-20">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">{titleTh}</h1>
        <p className="mt-2 text-lg font-medium text-primary-foreground/85 sm:text-xl">{titleEn}</p>
        {subtitleTh && (
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/90">{subtitleTh}</p>
        )}
        {subtitleEn && (
          <p className="mt-1 max-w-2xl text-sm text-primary-foreground/70">{subtitleEn}</p>
        )}
      </div>
    </section>
  )
}
