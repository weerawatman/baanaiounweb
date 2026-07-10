-- Admin profile tabs (2026-07-10): dedicated hero images for Services,
-- Agent Course, Co-Agent, and Blog pages. Empty = placeholder/fallback shown.

ALTER TABLE public.agent_profile
  ADD COLUMN IF NOT EXISTS services_hero_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS agent_course_hero_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS co_agent_hero_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS blog_hero_image TEXT NOT NULL DEFAULT '';
