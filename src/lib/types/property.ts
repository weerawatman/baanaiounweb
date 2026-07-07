export type PropertyStatus = "ACTIVE" | "SOLD" | "RENTED"
export type PropertyType = "SALE" | "RENT" | "LAND"
export type PropertySubType = "new" | "renovated" | "townhome" | "residential" | "investment"

export interface Property {
  id: string
  slug: string
  title: string
  type: PropertyType
  sub_type: PropertySubType | null
  price: number
  price_label: string
  area_sqm: number
  bedrooms: number
  bathrooms: number
  description: string
  emotional_desc: string
  pim_insight: string
  status: PropertyStatus
  featured: boolean
  images: string[]
  image_primary: string
  district: string
  subdistrict: string
  lat: number | null
  lng: number | null
  distance_amata: string
  distance_hospital: string
  distance_market: string
  nearest_estate: string
  amenities: string[]
  video_url: string | null
  tags: string[]
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export type LeadStatus = "new" | "contacted" | "closed"

export interface Lead {
  id: string
  created_at: string
  form_tag: string
  name: string
  phone: string | null
  line_id: string | null
  email: string | null
  contact: string | null
  property_type: string | null
  property_size: string | null
  location: string | null
  price: string | null
  purpose: string | null
  requirement: string | null
  preferred_size: string | null
  budget: string | null
  details: string | null
  preselect: string | null
  image_urls: string[]
  status: LeadStatus
  notes: string | null
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  category: string
  category_slug: string
  excerpt: string
  content: string
  reading_time: string
  featured_image: string
  related_property_ids: string[]
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  quote: string
  property_type: string
  rating: number
  avatar_url: string
  published: boolean
  sort_order: number
  created_at: string
}

export interface SuccessStory {
  id: string
  title: string
  title_en: string
  description: string
  description_en: string
  location: string
  before_image_url: string
  after_image_url: string
  published: boolean
  sort_order: number
  created_at: string
}

export interface Faq {
  id: string
  question: string
  answer: string
  page_slug: string
  sort_order: number
  created_at: string
}

export interface AgentProfile {
  id: number
  name: string
  full_name: string
  role: string
  bio: string
  vision: string
  avatar_url: string
  hero_image_url: string
  home_hero_image: string
  trust_renovation_image: string
  trust_network_image: string
  trust_shopper_image: string
  match_team_image: string
  phone: string
  line_id: string
  line_url: string
  email: string
  facebook: string
  tiktok: string
  youtube: string
  site_name: string
  slogan: string
  address: string
  updated_at: string
}
