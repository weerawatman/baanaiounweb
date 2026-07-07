-- About page timeline images (mockup เกี่ยวกับเรา.html) — admin upload per milestone year

ALTER TABLE public.agent_profile
  ADD COLUMN IF NOT EXISTS about_timeline_2002_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS about_timeline_2016_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS about_timeline_2020_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS about_timeline_2026_image TEXT NOT NULL DEFAULT '';

COMMENT ON COLUMN public.agent_profile.about_timeline_2002_image IS 'รูป timeline 2002 หน้าเกี่ยวกับเรา (หอพัก/กุญแจบ้าน)';
COMMENT ON COLUMN public.agent_profile.about_timeline_2016_image IS 'รูป timeline 2016 หน้าเกี่ยวกับเรา (รีโนเวท/ศึกษาดูงาน)';
COMMENT ON COLUMN public.agent_profile.about_timeline_2020_image IS 'รูป timeline 2020 หน้าเกี่ยวกับเรา (ทีมงานพูดคุยลูกค้า)';
COMMENT ON COLUMN public.agent_profile.about_timeline_2026_image IS 'รูป timeline 2026 หน้าเกี่ยวกับเรา (เว็บไซต์/ปิดดีล)';
