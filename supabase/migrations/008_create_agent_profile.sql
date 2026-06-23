-- ============================================================
--  Migration 008: สร้างตาราง agent_profile (singleton, row id=1)
-- ============================================================
--  เก็บข้อมูลพิม (persona) + ช่องทางติดต่อ + โซเชียล + site basics
--  แก้ไขได้จากหน้า admin → /admin/profile
--  มี row เดียว (id=1) เท่านั้น
-- ============================================================

CREATE TABLE IF NOT EXISTS agent_profile (
  id             INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),

  -- persona
  name           TEXT DEFAULT '',
  full_name      TEXT DEFAULT '',
  role           TEXT DEFAULT '',
  bio            TEXT DEFAULT '',
  vision         TEXT DEFAULT '',
  avatar_url     TEXT DEFAULT '',
  hero_image_url TEXT DEFAULT '',

  -- contact
  phone          TEXT DEFAULT '',
  line_id        TEXT DEFAULT '',
  line_url       TEXT DEFAULT '',
  email          TEXT DEFAULT '',

  -- social
  facebook       TEXT DEFAULT '',
  tiktok         TEXT DEFAULT '',
  youtube        TEXT DEFAULT '',

  -- site basics
  site_name      TEXT DEFAULT '',
  slogan         TEXT DEFAULT '',

  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── seed row id=1 ด้วยค่าปัจจุบันจาก SITE_CONFIG ──────────────────────
INSERT INTO agent_profile (id, name, full_name, role, bio, vision, avatar_url, hero_image_url,
                           phone, line_id, line_url, email,
                           facebook, tiktok, youtube, site_name, slogan)
VALUES (
  1,
  'พิม',
  'คุณพิม — นายหน้าอสังหาริมทรัพย์',
  'นายหน้าอสังหาริมทรัพย์ บ้านบึง ชลบุรี',
  'จากคนเช่าห้องแถวเล็ก ๆ ในนิคมอุตสาหกรรม สู่นายหน้าอสังหาริมทรัพย์ที่คัดสรรบ้านด้วยหัวใจ เพราะพิมเข้าใจว่า ''บ้าน'' สำคัญแค่ไหนสำหรับคนไกลบ้าน',
  'พิมมุ่งมั่นให้คนทำงานในชลบุรีมีบ้านที่เติมพลังใจได้จริง ไม่ใช่แค่ที่ซุกหัวนอน',
  '',
  '',
  '086-4149960',
  '@baan-ai-oun',
  'https://line.me/ti/p/@baan-ai-oun',
  'supansa.m@baanaioun.com',
  'https://www.facebook.com/share/18EEmsWiKy/',
  'https://www.tiktok.com/@baan_ai_oun',
  'https://youtube.com/@baanaioun',
  'บ้านไออุ่น พร็อพเพอร์ตี้',
  'บ้านไออุ่น: มากกว่าที่พัก คือพลังกายพลังใจให้คุณไปต่อ'
)
ON CONFLICT (id) DO NOTHING;

-- ─── updated_at trigger (ใช้ฟังก์ชัน set_updated_at จาก migration 007) ──
DROP TRIGGER IF EXISTS trg_agent_profile_updated_at ON agent_profile;
CREATE TRIGGER trg_agent_profile_updated_at
  BEFORE UPDATE ON agent_profile
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── RLS ───────────────────────────────────────────────────
ALTER TABLE agent_profile ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read agent_profile" ON agent_profile;
CREATE POLICY "Public can read agent_profile"
  ON agent_profile FOR SELECT TO anon
  USING (true);

DROP POLICY IF EXISTS "Admin full access to agent_profile" ON agent_profile;
CREATE POLICY "Admin full access to agent_profile"
  ON agent_profile FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access to agent_profile" ON agent_profile;
CREATE POLICY "Service role full access to agent_profile"
  ON agent_profile FOR ALL TO service_role
  USING (true) WITH CHECK (true);
