-- Bilingual CMS content columns for public i18n (Phase 3).

ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS title_en TEXT NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS description_en TEXT NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS emotional_desc_en TEXT NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS pim_insight_en TEXT NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS price_label_en TEXT NOT NULL DEFAULT ''::text;

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS title_en TEXT NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS excerpt_en TEXT NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS content_en TEXT NOT NULL DEFAULT ''::text;

ALTER TABLE public.faqs
  ADD COLUMN IF NOT EXISTS question_en TEXT NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS answer_en TEXT NOT NULL DEFAULT ''::text;

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS quote_en TEXT NOT NULL DEFAULT ''::text;

ALTER TABLE public.agent_profile
  ADD COLUMN IF NOT EXISTS bio_en TEXT NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS vision_en TEXT NOT NULL DEFAULT ''::text,
  ADD COLUMN IF NOT EXISTS role_en TEXT NOT NULL DEFAULT ''::text;
