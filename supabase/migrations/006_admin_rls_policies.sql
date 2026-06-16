-- ============================================================
--  Migration 006: RLS Policies สำหรับตารางใหม่ + admin access
-- ============================================================
--  anon          = เว็บสาธารณะ → SELECT เฉพาะที่เผยแพร่/ใช้งาน
--  authenticated = admin ที่ login แล้ว → ทำได้ทุกอย่าง
--  service_role  = server actions/API → ทำได้ทุกอย่าง
-- ============================================================

-- ─── properties ───────────────────────────────────────────
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active properties"
  ON properties FOR SELECT TO anon
  USING (status = 'ACTIVE' AND deleted_at IS NULL);

CREATE POLICY "Admin full access to properties"
  ON properties FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to properties"
  ON properties FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ─── blog_posts ───────────────────────────────────────────
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "Admin full access to blog_posts"
  ON blog_posts FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to blog_posts"
  ON blog_posts FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ─── testimonials ─────────────────────────────────────────
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published testimonials"
  ON testimonials FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "Admin full access to testimonials"
  ON testimonials FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to testimonials"
  ON testimonials FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ─── faqs ─────────────────────────────────────────────────
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read faqs"
  ON faqs FOR SELECT TO anon
  USING (true);

CREATE POLICY "Admin full access to faqs"
  ON faqs FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to faqs"
  ON faqs FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ─── form_submissions (leads) — เพิ่มสิทธิ์ admin ─────────
--  ของเดิม: anon INSERT, service_role ALL (migration 001/setup)
--  เพิ่ม: authenticated (admin) อ่าน + อัปเดต status/notes ได้
CREATE POLICY "Admin can read leads"
  ON form_submissions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admin can update leads"
  ON form_submissions FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);
