-- Service-request tables for the /request tabbed form (3 tabs → 3 tables).
-- Template follows form_submissions: TEXT lead fields, status TEXT+CHECK,
-- RLS = anon INSERT-only / authenticated SELECT+UPDATE / service_role ALL.

-- ─── ฝากขาย/ปล่อยเช่า | List Your Property ────────────────────────────────

CREATE TABLE public.list_property_requests (
  id            UUID        NOT NULL DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  name          TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  property_type TEXT        NOT NULL,
  location      TEXT        NOT NULL,
  budget        TEXT,
  image_urls    TEXT[]      DEFAULT '{}'::text[],
  status        TEXT        DEFAULT 'new'::text CHECK (status IN ('new', 'contacted', 'closed')),
  notes         TEXT,
  CONSTRAINT list_property_requests_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_list_property_requests_status ON public.list_property_requests (status);
CREATE INDEX idx_list_property_requests_created ON public.list_property_requests (created_at DESC);

ALTER TABLE public.list_property_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.list_property_requests
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin can read requests" ON public.list_property_requests
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can update requests" ON public.list_property_requests
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.list_property_requests
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ─── จัดหาทรัพย์ตามต้องการ | Property Matchmaking ─────────────────────────

CREATE TABLE public.matchmaking_requests (
  id            UUID        NOT NULL DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  name          TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  property_type TEXT        NOT NULL,
  location      TEXT        NOT NULL,
  budget        TEXT,
  image_urls    TEXT[]      DEFAULT '{}'::text[],
  status        TEXT        DEFAULT 'new'::text CHECK (status IN ('new', 'contacted', 'closed')),
  notes         TEXT,
  CONSTRAINT matchmaking_requests_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_matchmaking_requests_status ON public.matchmaking_requests (status);
CREATE INDEX idx_matchmaking_requests_created ON public.matchmaking_requests (created_at DESC);

ALTER TABLE public.matchmaking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.matchmaking_requests
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin can read requests" ON public.matchmaking_requests
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can update requests" ON public.matchmaking_requests
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.matchmaking_requests
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ─── ร่วมเป็น Co-Agent | Join as a Co-Agent ───────────────────────────────

CREATE TABLE public.coagent_requests (
  id            UUID        NOT NULL DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  name          TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  property_type TEXT        NOT NULL,
  location      TEXT        NOT NULL,
  budget        TEXT,
  image_urls    TEXT[]      DEFAULT '{}'::text[],
  status        TEXT        DEFAULT 'new'::text CHECK (status IN ('new', 'contacted', 'closed')),
  notes         TEXT,
  CONSTRAINT coagent_requests_pkey PRIMARY KEY (id)
);

CREATE INDEX idx_coagent_requests_status ON public.coagent_requests (status);
CREATE INDEX idx_coagent_requests_created ON public.coagent_requests (created_at DESC);

ALTER TABLE public.coagent_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.coagent_requests
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin can read requests" ON public.coagent_requests
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can update requests" ON public.coagent_requests
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.coagent_requests
  FOR ALL TO service_role USING (true) WITH CHECK (true);
