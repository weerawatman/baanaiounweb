-- Form submissions table for Baan Ai Oun Property
-- Auto-tags: owner, owner-foreign, buyer, buyer-foreign, co-agent, academy

CREATE TABLE IF NOT EXISTS form_submissions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Auto-tag from frontend form variant
  form_tag      TEXT NOT NULL CHECK (form_tag IN (
    'owner', 'owner-foreign',
    'buyer', 'buyer-foreign',
    'co-agent', 'academy'
  )),

  -- Contact info (at least one required, enforced at API level)
  name          TEXT NOT NULL,
  phone         TEXT,
  line_id       TEXT,
  email         TEXT,
  contact       TEXT,               -- WhatsApp, WeChat, etc. (foreign users)

  -- Property details (owner & co-agent forms)
  property_type TEXT,               -- house, townhome, condo, land, commercial, other
  property_size TEXT,               -- e.g. "50 ตร.ว." or "120 ตร.ม."
  location      TEXT,               -- district/area
  region        TEXT,               -- for co-agent (east, central, etc.)
  price         TEXT,               -- asking price

  -- Buyer/renter fields
  purpose       TEXT,               -- living, investment
  requirement   TEXT,               -- buy-house, rent-condo, etc.
  preferred_size TEXT,              -- e.g. "2 ห้องนอน"
  budget        TEXT,               -- target budget

  -- Shared
  details       TEXT,               -- free-text additional info
  preselect     TEXT,               -- SALE, RENT, LAND (from which page)

  -- Internal
  status        TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  notes         TEXT                -- internal notes by team
);

-- Index for quick filtering by team
CREATE INDEX idx_form_submissions_tag ON form_submissions(form_tag);
CREATE INDEX idx_form_submissions_status ON form_submissions(status);
CREATE INDEX idx_form_submissions_created ON form_submissions(created_at DESC);

-- Row Level Security (enable but allow service role full access)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: allow insert from anon (frontend forms)
CREATE POLICY "Allow anonymous inserts"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: service role can do everything (API route with service key)
CREATE POLICY "Service role full access"
  ON form_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
