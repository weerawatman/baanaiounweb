"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Star } from "lucide-react"
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider"
import PageSection from "@/components/layout/PageSection"
import SectionTitle from "@/components/layout/SectionTitle"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getPropertyCategoryLabelTh } from "@/content/form-options"
import { filterDisplayableSuccessStoryViews } from "@/lib/success-stories-display"
import { type SuccessStory, type Testimonial } from "@/types"
import { cn } from "@/lib/utils"

interface SocialProofSectionProps {
  stories: SuccessStory[]
  testimonials: Testimonial[]
}

function CarouselDots({
  count,
  selectedIndex,
  onSelect,
}: {
  count: number
  selectedIndex: number
  onSelect: (index: number) => void
}) {
  if (count <= 1) return null
  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors",
            index === selectedIndex ? "bg-primary" : "bg-border hover:bg-muted-foreground/40",
          )}
        />
      ))}
    </div>
  )
}

export default function SocialProofSection({ stories, testimonials }: SocialProofSectionProps) {
  const displayableStories = filterDisplayableSuccessStoryViews(stories)
  const [storyIndex, setStoryIndex] = useState(0)
  const activeStory = displayableStories[storyIndex]

  const [testRef, testApi] = useEmblaCarousel({ loop: testimonials.length > 1 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ])
  const [testIndex, setTestIndex] = useState(0)
  const [testSnaps, setTestSnaps] = useState<number[]>([])

  const onTestSelect = useCallback(() => {
    if (!testApi) return
    setTestIndex(testApi.selectedScrollSnap())
  }, [testApi])

  useEffect(() => {
    if (!testApi) return
    setTestSnaps(testApi.scrollSnapList())
    testApi.on("select", onTestSelect)
    onTestSelect()
    return () => {
      testApi.off("select", onTestSelect)
    }
  }, [testApi, onTestSelect])

  useEffect(() => {
    if (storyIndex >= displayableStories.length) {
      setStoryIndex(0)
    }
  }, [displayableStories.length, storyIndex])

  const hasStories = displayableStories.length > 0
  const hasTestimonials = testimonials.length > 0
  if (!hasStories && !hasTestimonials) return null

  const sectionTitle = "ความไว้วางใจจากลูกค้า | Trusted by Our Clients"
  const sectionSubtitle = hasStories
    ? "ผลงานจริงและเสียงจากลูกค้าที่เราดูแลจนจบ"
    : "เสียงจากลูกค้าที่เราดูแลจนจบ"

  return (
    <PageSection variant="default" data-testid="social-proof-section">
      <SectionTitle title={sectionTitle} subtitle={sectionSubtitle} />

      {hasStories && activeStory && (
        <div className="mt-10" data-testid="success-stories-section">
          <p className="mb-4 text-center text-sm text-muted-foreground">
            ผลงานจริง ก่อน-หลังรีโนเวท · Real Results: Before &amp; After Renovations
          </p>

          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-4 shadow-[0_10px_30px_rgba(45,90,39,0.04)] md:p-6">
              <BeforeAfterSlider
                key={activeStory.id}
                beforeUrl={activeStory.beforeImageUrl}
                afterUrl={activeStory.afterImageUrl}
              />
              <div className="text-center md:text-left">
                <p className="text-lg font-bold text-foreground">{activeStory.title}</p>
                {activeStory.titleEn && (
                  <p className="text-sm text-muted-foreground">{activeStory.titleEn}</p>
                )}
                {activeStory.location && (
                  <p className="mt-1 text-xs font-medium text-secondary">{activeStory.location}</p>
                )}
              </div>
            </div>
          </div>

          <CarouselDots
            count={displayableStories.length}
            selectedIndex={storyIndex}
            onSelect={setStoryIndex}
          />
        </div>
      )}

      {hasTestimonials && (
        <div className={cn("mt-12", hasStories && "border-t border-border pt-12")}>
          <h3 className="mb-4 text-center text-lg font-semibold text-foreground">
            เสียงจากลูกค้าบ้านไออุ่น
            <span className="mt-0.5 block text-sm font-normal text-muted-foreground">
              What our clients say
            </span>
          </h3>

          <div className="overflow-hidden rounded-2xl" ref={testRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-0 flex-[0_0_100%] px-1">
                  <div className="flex flex-col items-center gap-5 rounded-2xl bg-muted p-8 text-center md:p-10">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={18} className="fill-secondary text-secondary" />
                      ))}
                    </div>
                    <blockquote className="max-w-2xl text-base leading-relaxed text-foreground/90 italic md:text-lg">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="lg" className="size-14">
                        <AvatarImage
                          src={testimonial.avatarUrl}
                          alt={testimonial.clientName}
                        />
                        <AvatarFallback>{testimonial.clientName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-primary">
                          {testimonial.clientName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getPropertyCategoryLabelTh(testimonial.propertyType)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CarouselDots
            count={testSnaps.length}
            selectedIndex={testIndex}
            onSelect={(i) => testApi?.scrollTo(i)}
          />
        </div>
      )}
    </PageSection>
  )
}
