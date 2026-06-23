import { getProperties } from "@/lib/queries/properties"
import { getTestimonials } from "@/lib/queries/testimonials"
import { getFaqs } from "@/lib/queries/faqs"
import { mapProperty, mapTestimonial, mapFaq } from "@/lib/mappers"
import HomePage from "./HomePage"

export default async function HomeRoute() {
  const [propertyRows, testimonialRows, faqRows] = await Promise.all([
    getProperties(),
    getTestimonials(),
    getFaqs(),
  ])

  const properties = propertyRows
    .filter((p) => p.status === "ACTIVE")
    .map(mapProperty)
  const testimonials = testimonialRows
    .filter((t) => t.published)
    .map(mapTestimonial)
  const faqs = faqRows
    .filter((f) => f.page_slug === "home")
    .map(mapFaq)

  return (
    <HomePage
      properties={properties}
      testimonials={testimonials}
      faqs={faqs}
    />
  )
}
