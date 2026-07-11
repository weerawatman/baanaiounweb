-- Success stories with before/after renovation images (Phase 3 social proof).

CREATE TABLE public.success_stories (
  id               UUID        NOT NULL DEFAULT gen_random_uuid(),
  title            TEXT        NOT NULL,
  title_en         TEXT        NOT NULL DEFAULT ''::text,
  description      TEXT        NOT NULL DEFAULT ''::text,
  description_en   TEXT        NOT NULL DEFAULT ''::text,
  location         TEXT        NOT NULL DEFAULT ''::text,
  before_image_url TEXT        NOT NULL,
  after_image_url  TEXT        NOT NULL,
  published        BOOLEAN     NOT NULL DEFAULT true,
  sort_order       INTEGER     NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT success_stories_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_success_stories_published_only
  ON public.success_stories USING btree (sort_order)
  WHERE (published = true);

ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published success_stories" ON public.success_stories
  FOR SELECT TO anon USING (published = true);
CREATE POLICY "Admin full access to success_stories" ON public.success_stories
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to success_stories" ON public.success_stories
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Seed removed: add real before/after images via /admin/success-stories (upload to Storage).
