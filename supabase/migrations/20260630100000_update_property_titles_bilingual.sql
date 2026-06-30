-- ============================================================
--  Data Migration: Add English keywords to property titles
--  For SEO/AI Search — Local & International buyers
--  Format: "Thai title | Property Type, Location, Province"
-- ============================================================

UPDATE public.properties
SET title = 'ขายด่วน บ้านแฝด 34 ตรว. หมู่บ้านปภาดา บ้านบึง ชลบุรี | Semi-detached House for Sale, Ban Bueng, Chonburi'
WHERE id = '8edf935a-b604-4e02-bc81-f4ee6c532d19';
