-- ============================================================
--  Step 3: Row Level Security (RLS) Policies
-- ============================================================
--  ควบคุมสิทธิ์การเข้าถึงข้อมูลในตาราง form_submissions
--
--  anon        = ฟอร์มหน้าเว็บ (ใช้ ANON_KEY) → INSERT ได้อย่างเดียว
--  service_role = API route ฝั่ง server (ใช้ SERVICE_ROLE_KEY) → ทำได้ทุกอย่าง
-- ============================================================

-- เปิด RLS
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
