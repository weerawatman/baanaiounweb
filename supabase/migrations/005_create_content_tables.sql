-- ============================================================
--  Migration 005: สร้างตารางเนื้อหา blog_posts, testimonials, faqs
-- ============================================================

-- ─── Blog posts ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug                 TEXT UNIQUE NOT NULL,
  title                TEXT NOT NULL,
  category             TEXT DEFAULT '',
  category_slug        TEXT DEFAULT '',
  excerpt              TEXT DEFAULT '',
  content              TEXT DEFAULT '',            -- HTML จาก rich text editor (Tiptap)
  reading_time         TEXT DEFAULT '',
  featured_image       TEXT DEFAULT '',
  related_property_ids UUID[] NOT NULL DEFAULT '{}',
  published            BOOLEAN NOT NULL DEFAULT false,
  published_at         TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts (published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_category  ON blog_posts (category_slug);

-- ─── Testimonials ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name   TEXT NOT NULL,
  quote         TEXT NOT NULL,
  property_type TEXT DEFAULT '',
  rating        INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar_url    TEXT DEFAULT '',
  published     BOOLEAN NOT NULL DEFAULT true,
  sort_order    INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials (published, sort_order);

-- ─── FAQs ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  page_slug   TEXT DEFAULT 'home',
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_faqs_page ON faqs (page_slug, sort_order);
