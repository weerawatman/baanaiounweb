-- ============================================================
--  Baan Ai Oun Property — Baseline Schema Migration
--  Version : 20260630000000
--  Purpose : IaC baseline capturing full DB state as of 2026-06-30
--
--  ⚠️  DO NOT run this on the existing database.
--      The schema already exists. Mark as applied instead:
--        npx supabase migration repair --status applied 20260630000000
--
--  This file exists so future `supabase db push` migrations have
--  a proper history baseline to build on.
-- ============================================================


-- ─── 1. Enum Types ───────────────────────────────────────────

CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'closed');


-- ─── 2. Tables (dependency order) ────────────────────────────

-- user_profiles
-- Created automatically via handle_new_user trigger on auth.users
CREATE TABLE public.user_profiles (
  id         UUID        NOT NULL,
  email      TEXT        NOT NULL,
  full_name  TEXT,
  role       TEXT        NOT NULL DEFAULT 'user'::text,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id)
);

-- agent_profile (singleton table — always id = 1)
CREATE TABLE public.agent_profile (
  id             INTEGER     NOT NULL DEFAULT 1,
  name           TEXT        DEFAULT ''::text,
  full_name      TEXT        DEFAULT ''::text,
  role           TEXT        DEFAULT ''::text,
  bio            TEXT        DEFAULT ''::text,
  vision         TEXT        DEFAULT ''::text,
  avatar_url     TEXT        DEFAULT ''::text,
  hero_image_url TEXT        DEFAULT ''::text,
  phone          TEXT        DEFAULT ''::text,
  line_id        TEXT        DEFAULT ''::text,
  line_url       TEXT        DEFAULT ''::text,
  email          TEXT        DEFAULT ''::text,
  facebook       TEXT        DEFAULT ''::text,
  tiktok         TEXT        DEFAULT ''::text,
  youtube        TEXT        DEFAULT ''::text,
  site_name      TEXT        DEFAULT ''::text,
  slogan         TEXT        DEFAULT ''::text,
  address        TEXT        DEFAULT ''::text,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT agent_profile_pkey PRIMARY KEY (id)
);

-- assets (physical property assets — internal tracking)
CREATE TABLE public.assets (
  id                    UUID        NOT NULL DEFAULT gen_random_uuid(),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  asset_code            TEXT,
  title_deed_number     TEXT        NOT NULL,
  name                  TEXT        DEFAULT 'ทรัพย์สินไม่มีชื่อ'::text,
  address               TEXT,
  property_type         TEXT        NOT NULL,
  purchase_price        NUMERIC     NOT NULL DEFAULT 0,
  purchase_date         DATE,
  appraised_value       NUMERIC,
  mortgage_bank         TEXT,
  mortgage_amount       NUMERIC,
  loan_term_years       INTEGER,
  loan_start_date       DATE,
  fire_insurance_expiry DATE,
  land_tax_due_date     DATE,
  status                TEXT        NOT NULL DEFAULT 'developing'::text,
  notes                 TEXT,
  selling_price         NUMERIC,
  rental_price          NUMERIC,
  description           TEXT,
  location_lat_long     TEXT,
  tenant_name           TEXT,
  tenant_contact        TEXT,
  updated_at            TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT assets_pkey PRIMARY KEY (id)
);

-- renovation_projects (FK → assets)
CREATE TABLE public.renovation_projects (
  id                   UUID        NOT NULL DEFAULT gen_random_uuid(),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  asset_id             UUID        NOT NULL,
  name                 TEXT        NOT NULL,
  description          TEXT,
  project_type         TEXT        NOT NULL DEFAULT 'renovation'::text,
  target_property_type TEXT,
  start_date           DATE        NOT NULL,
  end_date             DATE,
  budget               NUMERIC     NOT NULL DEFAULT 0,
  actual_cost          NUMERIC,
  status               TEXT        NOT NULL DEFAULT 'planned'::text,
  CONSTRAINT renovation_projects_pkey PRIMARY KEY (id),
  CONSTRAINT renovation_projects_asset_id_fkey
    FOREIGN KEY (asset_id) REFERENCES public.assets (id) ON DELETE CASCADE
);

-- asset_images (FK → assets CASCADE, → renovation_projects SET NULL)
CREATE TABLE public.asset_images (
  id                    UUID        NOT NULL DEFAULT gen_random_uuid(),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  asset_id              UUID        NOT NULL,
  renovation_project_id UUID,
  url                   TEXT        NOT NULL,
  caption               TEXT,
  is_primary            BOOLEAN     NOT NULL DEFAULT false,
  category              TEXT        NOT NULL DEFAULT 'purchase'::text,
  CONSTRAINT asset_images_pkey PRIMARY KEY (id),
  CONSTRAINT asset_images_asset_id_fkey
    FOREIGN KEY (asset_id) REFERENCES public.assets (id) ON DELETE CASCADE,
  CONSTRAINT asset_images_renovation_project_id_fkey
    FOREIGN KEY (renovation_project_id) REFERENCES public.renovation_projects (id) ON DELETE SET NULL
);

-- expenses (FK → assets CASCADE, → renovation_projects CASCADE)
CREATE TABLE public.expenses (
  id                    UUID        NOT NULL DEFAULT gen_random_uuid(),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  asset_id              UUID,
  renovation_project_id UUID,
  category              TEXT        NOT NULL,
  amount                NUMERIC     NOT NULL DEFAULT 0,
  date                  DATE        NOT NULL,
  description           TEXT,
  vendor                TEXT,
  CONSTRAINT expenses_pkey PRIMARY KEY (id),
  CONSTRAINT expenses_asset_id_fkey
    FOREIGN KEY (asset_id) REFERENCES public.assets (id) ON DELETE CASCADE,
  CONSTRAINT expenses_renovation_project_id_fkey
    FOREIGN KEY (renovation_project_id) REFERENCES public.renovation_projects (id) ON DELETE CASCADE
);

-- incomes (FK → assets CASCADE)
CREATE TABLE public.incomes (
  id          UUID        NOT NULL DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  asset_id    UUID        NOT NULL,
  source      TEXT        NOT NULL,
  amount      NUMERIC     NOT NULL DEFAULT 0,
  date        DATE        NOT NULL,
  description TEXT,
  CONSTRAINT incomes_pkey PRIMARY KEY (id),
  CONSTRAINT incomes_asset_id_fkey
    FOREIGN KEY (asset_id) REFERENCES public.assets (id) ON DELETE CASCADE
);

-- leads (asset-linked leads — internal, FK → assets CASCADE)
CREATE TABLE public.leads (
  id               UUID              NOT NULL DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ       NOT NULL DEFAULT now(),
  asset_id         UUID              NOT NULL,
  customer_name    TEXT              NOT NULL,
  customer_phone   TEXT,
  customer_line_id TEXT,
  message          TEXT,
  status           public.lead_status NOT NULL DEFAULT 'new'::public.lead_status,
  admin_notes      TEXT,
  CONSTRAINT leads_pkey PRIMARY KEY (id),
  CONSTRAINT leads_asset_id_fkey
    FOREIGN KEY (asset_id) REFERENCES public.assets (id) ON DELETE CASCADE
);

-- activity_logs (audit trail written by log_asset_changes trigger)
CREATE TABLE public.activity_logs (
  id         UUID        NOT NULL DEFAULT gen_random_uuid(),
  user_id    UUID,
  action     TEXT        NOT NULL,
  table_name TEXT        NOT NULL,
  record_id  UUID        NOT NULL,
  old_data   JSONB,
  new_data   JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT activity_logs_pkey PRIMARY KEY (id)
);

-- properties (public-facing property listings)
CREATE TABLE public.properties (
  id                UUID        NOT NULL DEFAULT gen_random_uuid(),
  slug              TEXT        NOT NULL,
  title             TEXT        NOT NULL,
  type              TEXT        NOT NULL,
  sub_type          TEXT,
  price             NUMERIC     NOT NULL DEFAULT 0,
  price_label       TEXT        NOT NULL,
  area_sqm          NUMERIC     DEFAULT 0,
  bedrooms          INTEGER     DEFAULT 0,
  bathrooms         INTEGER     DEFAULT 0,
  description       TEXT        DEFAULT ''::text,
  emotional_desc    TEXT        DEFAULT ''::text,
  pim_insight       TEXT        DEFAULT ''::text,
  status            TEXT        NOT NULL DEFAULT 'ACTIVE'::text,
  featured          BOOLEAN     NOT NULL DEFAULT false,
  images            TEXT[]      NOT NULL DEFAULT '{}'::text[],
  image_primary     TEXT        DEFAULT ''::text,
  district          TEXT        DEFAULT ''::text,
  subdistrict       TEXT        DEFAULT ''::text,
  lat               NUMERIC,
  lng               NUMERIC,
  distance_amata    TEXT        DEFAULT ''::text,
  distance_hospital TEXT        DEFAULT ''::text,
  distance_market   TEXT        DEFAULT ''::text,
  nearest_estate    TEXT        DEFAULT ''::text,
  amenities         TEXT[]      NOT NULL DEFAULT '{}'::text[],
  video_url         TEXT,
  tags              TEXT[]      NOT NULL DEFAULT '{}'::text[],
  deleted_at        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT properties_pkey    PRIMARY KEY (id),
  CONSTRAINT properties_slug_key UNIQUE (slug)
);

-- blog_posts
CREATE TABLE public.blog_posts (
  id                   UUID        NOT NULL DEFAULT gen_random_uuid(),
  slug                 TEXT        NOT NULL,
  title                TEXT        NOT NULL,
  category             TEXT        DEFAULT ''::text,
  category_slug        TEXT        DEFAULT ''::text,
  excerpt              TEXT        DEFAULT ''::text,
  content              TEXT        DEFAULT ''::text,
  reading_time         TEXT        DEFAULT ''::text,
  featured_image       TEXT        DEFAULT ''::text,
  related_property_ids UUID[]      NOT NULL DEFAULT '{}'::uuid[],
  published            BOOLEAN     NOT NULL DEFAULT false,
  published_at         TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT blog_posts_pkey     PRIMARY KEY (id),
  CONSTRAINT blog_posts_slug_key UNIQUE (slug)
);

-- testimonials
CREATE TABLE public.testimonials (
  id            UUID        NOT NULL DEFAULT gen_random_uuid(),
  client_name   TEXT        NOT NULL,
  quote         TEXT        NOT NULL,
  property_type TEXT        DEFAULT ''::text,
  rating        INTEGER     NOT NULL DEFAULT 5,
  avatar_url    TEXT        DEFAULT ''::text,
  published     BOOLEAN     NOT NULL DEFAULT true,
  sort_order    INTEGER     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);

-- faqs
CREATE TABLE public.faqs (
  id         UUID        NOT NULL DEFAULT gen_random_uuid(),
  question   TEXT        NOT NULL,
  answer     TEXT        NOT NULL,
  page_slug  TEXT        DEFAULT 'home'::text,
  sort_order INTEGER     NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT faqs_pkey PRIMARY KEY (id)
);

-- form_submissions (public contact/lead forms from website)
CREATE TABLE public.form_submissions (
  id             UUID        NOT NULL DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  form_tag       TEXT        NOT NULL
                   CHECK (form_tag IN (
                     'owner', 'owner-foreign',
                     'buyer', 'buyer-foreign',
                     'co-agent', 'academy', 'contact'
                   )),
  name           TEXT        NOT NULL,
  phone          TEXT,
  line_id        TEXT,
  email          TEXT,
  contact        TEXT,
  property_type  TEXT,
  property_size  TEXT,
  location       TEXT,
  region         TEXT,
  price          TEXT,
  purpose        TEXT,
  requirement    TEXT,
  preferred_size TEXT,
  budget         TEXT,
  details        TEXT,
  preselect      TEXT,
  image_urls     TEXT[]      DEFAULT '{}'::text[],
  status         TEXT        DEFAULT 'new'::text
                   CHECK (status IN ('new', 'contacted', 'closed')),
  notes          TEXT,
  CONSTRAINT form_submissions_pkey PRIMARY KEY (id)
);


-- ─── 3. Indexes ───────────────────────────────────────────────

-- asset_images
CREATE INDEX idx_asset_images_asset_id
  ON public.asset_images USING btree (asset_id);
CREATE INDEX idx_asset_images_project_id
  ON public.asset_images USING btree (renovation_project_id);

-- assets
CREATE INDEX idx_assets_property_type
  ON public.assets USING btree (property_type);
CREATE INDEX idx_assets_status
  ON public.assets USING btree (status);

-- blog_posts
CREATE INDEX idx_blog_posts_published_only
  ON public.blog_posts USING btree (published_at DESC)
  WHERE (published = true);

-- expenses
CREATE INDEX idx_expenses_asset_id
  ON public.expenses USING btree (asset_id);
CREATE INDEX idx_expenses_date
  ON public.expenses USING btree (date);
CREATE INDEX idx_expenses_renovation_project_id
  ON public.expenses USING btree (renovation_project_id);

-- form_submissions
CREATE INDEX idx_form_submissions_tag
  ON public.form_submissions USING btree (form_tag);
CREATE INDEX idx_form_submissions_status
  ON public.form_submissions USING btree (status);
CREATE INDEX idx_form_submissions_created
  ON public.form_submissions USING btree (created_at DESC);

-- incomes
CREATE INDEX idx_incomes_asset_id
  ON public.incomes USING btree (asset_id);
CREATE INDEX idx_incomes_date
  ON public.incomes USING btree (date);

-- leads
CREATE INDEX idx_leads_asset_id
  ON public.leads USING btree (asset_id);

-- properties
CREATE INDEX idx_properties_slug
  ON public.properties USING btree (slug);
CREATE INDEX idx_properties_created
  ON public.properties USING btree (created_at DESC);
CREATE INDEX idx_properties_status
  ON public.properties USING btree (status)
  WHERE (deleted_at IS NULL);
CREATE INDEX idx_properties_type
  ON public.properties USING btree (type)
  WHERE (deleted_at IS NULL);
CREATE INDEX idx_properties_type_status
  ON public.properties USING btree (type, status)
  WHERE (deleted_at IS NULL);
CREATE INDEX idx_properties_district
  ON public.properties USING btree (district)
  WHERE (deleted_at IS NULL);
CREATE INDEX idx_properties_featured
  ON public.properties USING btree (featured)
  WHERE (deleted_at IS NULL);

-- renovation_projects
CREATE INDEX idx_renovation_projects_asset_id
  ON public.renovation_projects USING btree (asset_id);
CREATE INDEX idx_renovation_projects_project_type
  ON public.renovation_projects USING btree (project_type);
CREATE INDEX idx_renovation_projects_status
  ON public.renovation_projects USING btree (status);

-- testimonials
CREATE INDEX idx_testimonials_published_only
  ON public.testimonials USING btree (sort_order)
  WHERE (published = true);


-- ─── 4. Functions ─────────────────────────────────────────────

-- Returns the role of the currently authenticated user
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT role FROM user_profiles WHERE id = auth.uid();
$$;

-- Trigger: auto-insert into user_profiles when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    'user'
  );
  RETURN new;
END;
$$;

-- Trigger: set updated_at to now() on UPDATE
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Alias used on some tables (functionally identical to set_updated_at)
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger: write audit row to activity_logs on asset INSERT/UPDATE/DELETE
CREATE OR REPLACE FUNCTION public.log_asset_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_id UUID := auth.uid();
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.activity_logs (user_id, action, table_name, record_id, old_data, new_data)
    VALUES (current_user_id, TG_OP, TG_TABLE_NAME, OLD.id, to_jsonb(OLD), to_jsonb(NEW));
  ELSIF (TG_OP = 'DELETE') THEN
    INSERT INTO public.activity_logs (user_id, action, table_name, record_id, old_data)
    VALUES (current_user_id, TG_OP, TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.activity_logs (user_id, action, table_name, record_id, new_data)
    VALUES (current_user_id, TG_OP, TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
  END IF;
  RETURN NULL;
END;
$$;

-- Business logic: mark renovation project as completed,
-- optionally update parent asset's property_type
CREATE OR REPLACE FUNCTION public.complete_project(
  p_project_id     UUID,
  p_update_asset   BOOLEAN DEFAULT false,
  p_new_asset_name TEXT    DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_project RECORD;
  v_asset   RECORD;
BEGIN
  SELECT * INTO v_project FROM renovation_projects WHERE id = p_project_id;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Project not found');
  END IF;

  IF v_project.status = 'completed' THEN
    RETURN json_build_object('success', false, 'error', 'Project already completed');
  END IF;

  UPDATE renovation_projects
  SET status = 'completed', end_date = CURRENT_DATE
  WHERE id = p_project_id;

  IF p_update_asset
     AND v_project.project_type = 'new_construction'
     AND v_project.target_property_type IS NOT NULL
  THEN
    SELECT * INTO v_asset FROM assets WHERE id = v_project.asset_id;
    IF FOUND THEN
      UPDATE assets
      SET property_type = v_project.target_property_type,
          name = COALESCE(NULLIF(TRIM(p_new_asset_name), ''), name)
      WHERE id = v_project.asset_id;

      RETURN json_build_object(
        'success',           true,
        'asset_updated',     true,
        'old_property_type', v_asset.property_type,
        'new_property_type', v_project.target_property_type
      );
    END IF;
  END IF;

  RETURN json_build_object('success', true, 'asset_updated', false);
END;
$$;


-- ─── 5. Triggers ──────────────────────────────────────────────

-- Auth: create user_profiles row when a new Supabase user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto updated_at on tables that track modification time
CREATE TRIGGER set_updated_at_assets
  BEFORE UPDATE ON public.assets
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_agent_profile
  BEFORE UPDATE ON public.agent_profile
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_properties
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_blog_posts
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Audit log trigger on assets table
CREATE TRIGGER log_assets_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.assets
  FOR EACH ROW EXECUTE FUNCTION public.log_asset_changes();


-- ─── 6. Row Level Security ────────────────────────────────────

ALTER TABLE public.user_profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_profile    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.renovation_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_images     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incomes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- activity_logs
CREATE POLICY "Admins can view all logs" ON public.activity_logs
  FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
  ));

-- agent_profile
CREATE POLICY "Public can read agent_profile" ON public.agent_profile
  FOR SELECT TO anon USING (true);
CREATE POLICY "Admin full access to agent_profile" ON public.agent_profile
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to agent_profile" ON public.agent_profile
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- asset_images
CREATE POLICY "Authenticated select asset_images" ON public.asset_images
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert asset_images" ON public.asset_images
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update asset_images" ON public.asset_images
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete asset_images" ON public.asset_images
  FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- assets
CREATE POLICY "Authenticated select assets" ON public.assets
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert assets" ON public.assets
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update assets" ON public.assets
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete assets" ON public.assets
  FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- blog_posts
CREATE POLICY "Public can read published posts" ON public.blog_posts
  FOR SELECT TO anon USING (published = true);
CREATE POLICY "Admin full access to blog_posts" ON public.blog_posts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to blog_posts" ON public.blog_posts
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- expenses
CREATE POLICY "Authenticated select expenses" ON public.expenses
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert expenses" ON public.expenses
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update expenses" ON public.expenses
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete expenses" ON public.expenses
  FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- faqs
CREATE POLICY "Public can read faqs" ON public.faqs
  FOR SELECT TO anon USING (true);
CREATE POLICY "Admin full access to faqs" ON public.faqs
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to faqs" ON public.faqs
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- form_submissions
CREATE POLICY "Allow anonymous inserts" ON public.form_submissions
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin can read leads" ON public.form_submissions
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can update leads" ON public.form_submissions
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.form_submissions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- incomes
CREATE POLICY "Authenticated select incomes" ON public.incomes
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert incomes" ON public.incomes
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update incomes" ON public.incomes
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete incomes" ON public.incomes
  FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- leads
CREATE POLICY "Anon select leads public view" ON public.leads
  FOR SELECT TO anon USING (true);
CREATE POLICY "Anon insert leads" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Authenticated select leads" ON public.leads
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert leads" ON public.leads
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update leads" ON public.leads
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin can update lead status and notes" ON public.leads
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete leads" ON public.leads
  FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- properties
CREATE POLICY "Public can read active properties" ON public.properties
  FOR SELECT TO anon
  USING ((status = 'ACTIVE'::text) AND (deleted_at IS NULL));
CREATE POLICY "Admin full access to properties" ON public.properties
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to properties" ON public.properties
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- testimonials
CREATE POLICY "Public can read published testimonials" ON public.testimonials
  FOR SELECT TO anon USING (published = true);
CREATE POLICY "Admin full access to testimonials" ON public.testimonials
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access to testimonials" ON public.testimonials
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- user_profiles
CREATE POLICY "Users can read own profile" ON public.user_profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Admin full access to user_profiles" ON public.user_profiles
  FOR ALL TO authenticated
  USING (get_user_role() = 'admin') WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "Service role full access to user_profiles" ON public.user_profiles
  FOR ALL TO service_role USING (true) WITH CHECK (true);


-- ─── 7. Storage ───────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read property images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'property-images');

CREATE POLICY "Allow anonymous upload property images"
  ON storage.objects FOR INSERT TO anon
  WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Service role manage property images"
  ON storage.objects FOR ALL TO service_role
  USING (bucket_id = 'property-images')
  WITH CHECK (bucket_id = 'property-images');
