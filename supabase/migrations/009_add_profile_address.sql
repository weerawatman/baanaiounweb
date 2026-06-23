-- ============================================================
--  Migration 009: เพิ่มคอลัมน์ address ใน agent_profile
-- ============================================================
--  ให้แอดมินแก้ที่อยู่ (ที่ใช้แสดง + ใช้สร้าง Google Map embed) ได้จาก
--  หน้า /admin/profile โดยแผนที่หน้า "ติดต่อ" จะ derive จาก address นี้
-- ============================================================

ALTER TABLE agent_profile
  ADD COLUMN IF NOT EXISTS address TEXT DEFAULT '';

-- seed ค่าปัจจุบันจาก SITE_CONFIG ให้ row id=1 (เฉพาะกรณียังว่าง) เพื่อไม่ให้
-- แผนที่/ที่อยู่เปลี่ยนไปจากเดิมหลัง migrate
UPDATE agent_profile
SET address = '107/57 เดอะคัลเลอร์เลคเชอร์ ซ.มหาชัย ม.13 ต.บางพลีใหญ่ อ.บางพลี จ.สมุทรปราการ 10540'
WHERE id = 1
  AND (address IS NULL OR address = '');
