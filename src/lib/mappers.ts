import type {
  Property as PropertyRow,
  BlogPost as BlogPostRow,
  Testimonial as TestimonialRow,
  Faq as FaqRow,
} from "@/lib/types/property"
import type {
  Property,
  BlogPost,
  Testimonial,
  FAQ,
} from "@/types"

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
    subType: row.sub_type ?? "residential",
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

export function mapFaq(row: FaqRow): FAQ {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer ?? "",
    pageSlug: row.page_slug,
  }
}
