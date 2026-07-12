import { SITE_CONFIG } from "@/config/site"
import { AGENT_COURSE_CONTENT } from "@/content/agent-course"
import { getProfile } from "@/lib/queries/profile"
import { getFaqsByPage } from "@/lib/queries/faqs"
import { mapFaq } from "@/lib/mappers"
import { mapFaqsToItems } from "@/lib/faq-items"

export { generateMetadata } from "./AgentCoursePage"
import AgentCoursePage from "./AgentCoursePage"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.baanaioun.com"

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "คอร์สนายหน้า Workshop พลิกชีวิต | Baan Ai Oun Agent Course",
  description: AGENT_COURSE_CONTENT.seo.description.th,
  provider: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.nameEn,
    url: BASE_URL,
  },
  instructor: {
    "@type": "Person",
    name: SITE_CONFIG.pim.name,
    jobTitle: "Real Estate Investment & Renovation Expert",
    description: SITE_CONFIG.pim.bio,
  },
  educationalLevel: "Beginner",
  inLanguage: ["th", "en"],
  courseMode: "onsite",
  teaches: [
    "Real estate sales fundamentals",
    "Investor mindset for agents",
    "Practical listing and closing skills",
  ],
  offers: {
    "@type": "Offer",
    category: "Real Estate Training",
    url: `${BASE_URL}/agent-course`,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    duration: "P2D",
    name: "2-Day Life-Changing Agent Workshop",
  },
}

export default async function AgentCourseRoute() {
  const [profile, faqRows] = await Promise.all([getProfile(), getFaqsByPage("agent-course")])
  const faqs = mapFaqsToItems(faqRows.map(mapFaq))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <AgentCoursePage
        heroImage={profile.agentCourseHeroImage || undefined}
        midBannerImage={profile.agentCourseBannerImage || undefined}
        lineUrl={profile.lineUrl || SITE_CONFIG.lineUrl}
        faqs={faqs}
      />
    </>
  )
}
