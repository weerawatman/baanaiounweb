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

-- Seed one published story so the public slider renders before admin adds content.
INSERT INTO public.success_stories (
  title,
  title_en,
  description,
  description_en,
  location,
  before_image_url,
  after_image_url,
  published,
  sort_order
) VALUES (
  'รีโนเวทบ้านเดี่ยว บ้านบึง',
  'Renovated single house, Ban Bueng',
  'เปลี่ยนบ้านเก่าให้พร้อมอยู่ภายใน 90 วัน โดยทีมนักลงทุนและช่างที่ไว้ใจได้',
  'Transformed an outdated home into move-in ready within 90 days with our trusted investor-led team.',
  'บ้านบึง ชลบุรี | Ban Bueng, Chonburi',
  'https://placehold.co/1200x800/CCCCCC/666666?text=Before',
  'https://placehold.co/1200x800/1B4D3E/FFFFFF?text=After',
  true,
  0
);
