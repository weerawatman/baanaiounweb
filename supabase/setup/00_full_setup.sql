-- ============================================================
--  Baan Ai Oun Property — Supabase Full Database Setup
-- ============================================================
--  Master SQL สำหรับ setup ฐานข้อมูลใหม่ทั้งหมดในครั้งเดียว
--  รันผ่าน Supabase SQL Editor (Dashboard > SQL Editor > New query)
--
--  ⚠️  ไฟล์นี้รวมทุก migration เข้าด้วยกัน
--      ถ้าต้องการรันทีละขั้นตอน ดูไฟล์ใน supabase/setup/01_*.sql, 02_*.sql ...
--
--  สารบัญ:
--    1) Table: form_submissions
--    2) Indexes
--    3) Row Level Security (RLS)
--    4) Storage Bucket: property-images
--    5) Storage Policies
-- ============================================================


-- ─── 1) Table: form_submissions ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS form_submissions (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Auto-tag จากหน้าเว็บที่กรอก
  form_tag        TEXT NOT NULL CHECK (form_tag IN (
                    'owner', 'owner-foreign',
                    'buyer', 'buyer-foreign',
                    'co-agent', 'academy'
                  )),

  -- ข้อมูลติดต่อ (อย่างน้อย 1 ช่อง — enforce ที่ API level)
  name            TEXT NOT NULL,
  phone           TEXT,
  line_id         TEXT,
  email           TEXT,
  contact         TEXT,                -- WhatsApp, WeChat ฯลฯ (ชาวต่างชาติ)

  -- ข้อมูลทรัพย์ (ฟอร์ม owner & co-agent)
  property_type   TEXT,                -- house, townhome, condo, land, commercial, other
  property_size   TEXT,                -- เช่น "50 ตร.ว." หรือ "120 ตร.ม."
  location        TEXT,                -- อำเภอ / พื้นที่
  region          TEXT,                -- ภาค (สำหรับ co-agent)
  price           TEXT,                -- ราคาที่ต้องการ

  -- ข้อมูลผู้ซื้อ/เช่า (ฟอร์ม buyer)
  purpose         TEXT,                -- living, investment
  requirement     TEXT,                -- buy-house, rent-condo ฯลฯ
  preferred_size  TEXT,                -- เช่น "2 ห้องนอน"
  budget          TEXT,                -- งบประมาณ

  -- ข้อมูลร่วม
  details         TEXT,                -- รายละเอียดเพิ่มเติม
  preselect       TEXT,                -- SALE, RENT, LAND (มาจากหน้าไหน)
  image_urls      TEXT[] DEFAULT '{}', -- URL รูปทรัพย์ที่อัปโหลด

  -- ข้อมูลภายในทีม
  status          TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  notes           TEXT                 -- โน้ตของทีมงาน
);


-- ─── 2) Indexes ─────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_form_submissions_tag
  ON form_submissions(form_tag);

CREATE INDEX IF NOT EXISTS idx_form_submissions_status
  ON form_submissions(status);

CREATE INDEX IF NOT EXISTS idx_form_submissions_created
  ON form_submissions(created_at DESC);


-- ─── 3) Row Level Security (RLS) ────────────────────────────────────────

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- anon สามารถ INSERT ได้ (จากฟอร์มหน้าเว็บ)
CREATE POLICY "Allow anonymous inserts"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- service_role เข้าถึงได้ทุกอย่าง (API route ที่ใช้ service key)
CREATE POLICY "Service role full access"
  ON form_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- ─── 4) Storage Bucket: property-images ─────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;


-- ─── 5) Storage Policies ────────────────────────────────────────────────

-- ใครก็อ่านรูปได้ (public bucket)
CREATE POLICY "Public read property images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'property-images');

-- anon สามารถอัปโหลดรูปได้ (จากฟอร์ม)
CREATE POLICY "Allow anonymous upload property images"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'property-images');

-- service_role จัดการรูปได้ทุกอย่าง
CREATE POLICY "Service role manage property images"
  ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'property-images')
  WITH CHECK (bucket_id = 'property-images');


-- ============================================================
--  ✅  Setup เสร็จสมบูรณ์!
--
--  ขั้นตอนถัดไป:
--  1. ตั้ง Environment Variables ใน Vercel / .env.local:
--     NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
--     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
--     SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
--     LINE_NOTIFY_TOKEN=xxxxxxx
--
--  2. ทดสอบ: ส่งฟอร์มบนเว็บ → ตรวจ Table Editor ว่ามี row ใหม่
-- ============================================================
