-- Home page appearance (mockup 2026-07-07): admin-managed images
-- 1 hero background used ONLY on the homepage (existing hero_image_url stays
-- for about/services) + 3 trust-pillar images (renovation / agent network /
-- property shopper). Empty string = not uploaded yet (UI shows placeholder).

ALTER TABLE public.agent_profile
  ADD COLUMN IF NOT EXISTS home_hero_image        TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS trust_renovation_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS trust_network_image    TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS trust_shopper_image    TEXT NOT NULL DEFAULT '';
