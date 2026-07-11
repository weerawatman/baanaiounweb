import type {
  Property as PropertyRow,
  BlogPost as BlogPostRow,
  Testimonial as TestimonialRow,
  SuccessStory as SuccessStoryRow,
  Faq as FaqRow,
  AgentProfile as AgentProfileRow,
} from "@/lib/types/property"
import type { Property, BlogPost, Testimonial, SuccessStory, FAQ, Profile } from "@/types"

// ──────────────────────────────────────────────────────────────────────────
//  Mappers: snake_case Supabase rows → camelCase shapes that the public
//  client components (typed via @/types) consume. Admin keeps using the
//  snake_case rows directly, so the conversion happens only on the public
//  read path (server components) before handing data to the UI.
// ──────────────────────────────────────────────────────────────────────────

export function mapProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    type: row.type,
    subType: (row.sub_type as Property["subType"] | null) ?? "house",
    price: Number(row.price ?? 0),
    priceLabel: row.price_label,
    areaSqm: Number(row.area_sqm ?? 0),
    bedrooms: row.bedrooms ?? 0,
    bathrooms: row.bathrooms ?? 0,
    description: row.description ?? "",
    emotionalDesc: row.emotional_desc ?? "",
    pimInsight: row.pim_insight ?? "",
    status: row.status,
    featured: row.featured ?? false,
    images: row.images ?? [],
    imagePrimary: row.image_primary ?? "",
    location: {
      district: row.district ?? "",
      subdistrict: row.subdistrict ?? "",
      lat: row.lat ?? 0,
      lng: row.lng ?? 0,
      distanceToAmata: row.distance_amata ?? "",
      distanceToHospital: row.distance_hospital ?? "",
      distanceToMarket: row.distance_market ?? "",
      nearestIndustrialEstate: row.nearest_estate ?? "",
    },
    amenities: row.amenities ?? [],
    videoUrl: row.video_url ?? undefined,
    tags: row.tags ?? [],
    createdAt: row.created_at,
  }
}

export function mapBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    categorySlug: row.category_slug,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    readingTime: row.reading_time ?? "",
    publishedAt: row.published_at ?? row.created_at,
    featuredImage: row.featured_image ?? "",
    relatedPropertyIds: row.related_property_ids ?? [],
  }
}

export function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    clientName: row.client_name,
    quote: row.quote,
    propertyType: row.property_type ?? "",
    rating: row.rating ?? 5,
    avatarUrl: row.avatar_url ?? "",
  }
}

export function mapSuccessStory(row: SuccessStoryRow): SuccessStory {
  return {
    id: row.id,
    title: row.title,
    titleEn: row.title_en ?? "",
    description: row.description ?? "",
    descriptionEn: row.description_en ?? "",
    location: row.location ?? "",
    beforeImageUrl: row.before_image_url,
    afterImageUrl: row.after_image_url,
  }
}

export function mapFaq(row: FaqRow): FAQ {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer ?? "",
    pageSlug: row.page_slug,
  }
}

export function mapProfile(row: AgentProfileRow): Profile {
  return {
    name: row.name ?? "",
    fullName: row.full_name ?? "",
    role: row.role ?? "",
    bio: row.bio ?? "",
    vision: row.vision ?? "",
    avatarUrl: row.avatar_url ?? "",
    heroImageUrl: row.hero_image_url ?? "",
    homeHeroImage: row.home_hero_image ?? "",
    trustRenovationImage: row.trust_renovation_image ?? "",
    trustNetworkImage: row.trust_network_image ?? "",
    trustShopperImage: row.trust_shopper_image ?? "",
    matchTeamImage: row.match_team_image ?? "",
    aboutTimeline2002Image: row.about_timeline_2002_image ?? "",
    aboutTimeline2016Image: row.about_timeline_2016_image ?? "",
    aboutTimeline2020Image: row.about_timeline_2020_image ?? "",
    aboutTimeline2026Image: row.about_timeline_2026_image ?? "",
    servicesHeroImage: row.services_hero_image ?? "",
    agentCourseHeroImage: row.agent_course_hero_image ?? "",
    coAgentHeroImage: row.co_agent_hero_image ?? "",
    blogHeroImage: row.blog_hero_image ?? "",
    findPropertyHeroImage: row.find_property_hero_image ?? "",
    findPropertyBento1Image: row.find_property_bento_1_image ?? "",
    findPropertyBento2Image: row.find_property_bento_2_image ?? "",
    findPropertyBento3Image: row.find_property_bento_3_image ?? "",
    listPropertyHeroImage: row.list_property_hero_image ?? "",
    listPropertyBento1Image: row.list_property_bento_1_image ?? "",
    listPropertyBento2Image: row.list_property_bento_2_image ?? "",
    listPropertyBento3Image: row.list_property_bento_3_image ?? "",
    aboutMidBannerImage: row.about_mid_banner_image ?? "",
    servicesWhyChooseImage: row.services_why_choose_image ?? "",
    coAgentSplitImage: row.co_agent_split_image ?? "",
    agentCourseBannerImage: row.agent_course_banner_image ?? "",
    phone: row.phone ?? "",
    lineId: row.line_id ?? "",
    lineUrl: row.line_url ?? "",
    email: row.email ?? "",
    facebook: row.facebook ?? "",
    tiktok: row.tiktok ?? "",
    youtube: row.youtube ?? "",
    siteName: row.site_name ?? "",
    slogan: row.slogan ?? "",
    address: row.address ?? "",
    mapLat: row.map_lat ?? null,
    mapLng: row.map_lng ?? null,
  }
}
