/**
 * @deprecated Import from specific modules instead:
 *   - Types:    import { type Property, ... } from "@/types"
 *   - Config:   import { SITE_CONFIG } from "@/config/site"
 *   - Config:   import { NAV_ITEMS } from "@/config/navigation"
 *   - Data:     import { MOCK_PROPERTIES } from "@/data/properties"
 *   - Data:     import { MOCK_BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog-posts"
 *   - Data:     import { MOCK_TESTIMONIALS } from "@/data/testimonials"
 *   - Data:     import { MOCK_FAQS } from "@/data/faqs"
 */

// Re-export everything for backward compatibility
export type { Property, BlogPost, Testimonial, FAQ } from "@/types"
export { MOCK_PROPERTIES } from "@/data/properties"
export { MOCK_BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog-posts"
export { MOCK_TESTIMONIALS } from "@/data/testimonials"
export { MOCK_FAQS } from "@/data/faqs"
export { SITE_CONFIG } from "@/config/site"
export { NAV_ITEMS } from "@/config/navigation"
