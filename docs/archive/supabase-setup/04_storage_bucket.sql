-- ============================================================
--  Step 4: Storage Bucket สำหรับรูปภาพทรัพย์
-- ============================================================
--  สร้าง bucket "property-images" แบบ public
--  ใช้เก็บรูปที่เจ้าของทรัพย์อัปโหลดผ่านฟอร์ม
-- ============================================================

-- สร้าง bucket (public = ใครก็ดูรูปได้ผ่าน URL)
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;
