-- พิกัดแผนที่สำนักงาน (หน้าติดต่อเรา) — ตั้งค่าจาก /admin/profile
ALTER TABLE public.agent_profile
  ADD COLUMN IF NOT EXISTS map_lat DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS map_lng DOUBLE PRECISION;

COMMENT ON COLUMN public.agent_profile.map_lat IS 'ละติจูดสำหรับแผนที่ Google Maps หน้าติดต่อเรา';
COMMENT ON COLUMN public.agent_profile.map_lng IS 'ลองจิจูดสำหรับแผนที่ Google Maps หน้าติดต่อเรา';
