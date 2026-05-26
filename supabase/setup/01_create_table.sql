-- ============================================================
--  Step 1: สร้างตาราง form_submissions
-- ============================================================
--  ตารางหลักสำหรับเก็บข้อมูลจากทุกฟอร์มบนเว็บไซต์
--  form_tag จะบอกว่ามาจากฟอร์มไหน:
--    owner / owner-foreign / buyer / buyer-foreign / co-agent / academy
-- ============================================================

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
