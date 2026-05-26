-- ============================================================
--  Step 5: Storage Policies สำหรับ bucket property-images
-- ============================================================
--  กำหนดสิทธิ์:
--  - public (ใครก็ได้)    → อ่านรูปได้ (SELECT)
--  - anon (ฟอร์มเว็บ)    → อัปโหลดรูปได้ (INSERT)
--  - service_role (API)   → จัดการได้ทุกอย่าง (ALL)
-- ============================================================

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

-- service_role จัดการรูปได้ทุกอย่าง (ลบ, แก้ไข ฯลฯ)
CREATE POLICY "Service role manage property images"
  ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'property-images')
  WITH CHECK (bucket_id = 'property-images');
