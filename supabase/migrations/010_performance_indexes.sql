-- ============================================================
--  Migration 010: Performance Indexes (Nano compute optimization)
-- ============================================================
--  Added to resolve connection pool exhaustion on Supabase Nano.
--  These indexes reduce full table scans triggered by common
--  public-page query patterns.
-- ============================================================

-- Composite partial index: accelerates getActiveProperties(), getSaleProperties()
-- and any query filtering on (type, status) with deleted_at IS NULL
CREATE INDEX IF NOT EXISTS idx_properties_type_status
  ON properties (type, status)
  WHERE deleted_at IS NULL;

-- Partial index for district-based location filtering (future search feature)
CREATE INDEX IF NOT EXISTS idx_properties_district
  ON properties (district)
  WHERE deleted_at IS NULL;

-- Partial index for published blog posts ordered by date
-- Accelerates getPublishedBlogPosts() which filters published=true
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_only
  ON blog_posts (published_at DESC)
  WHERE published = true;

-- Partial index for published testimonials ordered by sort_order
-- Accelerates getTestimonials() after adding .eq("published", true)
CREATE INDEX IF NOT EXISTS idx_testimonials_published_only
  ON testimonials (sort_order)
  WHERE published = true;
