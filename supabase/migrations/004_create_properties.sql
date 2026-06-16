-- ============================================================
--  Migration 004: สร้างตาราง properties
-- ============================================================
--  ตารางทรัพย์ (บ้าน/คอนโด/ที่ดิน) — flatten จาก Property type
--  location แตกเป็นคอลัมน์เพื่อให้ filter/ค้นหาได้
--  ลบทรัพย์ใช้ soft delete: deleted_at IS NULL = ใช้งานอยู่
-- ============================================================

CREATE TABLE IF NOT EXISTS properties (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,

  type            TEXT NOT NULL CHECK (type IN ('SALE', 'RENT', 'LAND')),
  sub_type        TEXT CHECK (sub_type IN ('new', 'renovated', 'townhome', 'residential', 'investment')),

  price           NUMERIC NOT NULL DEFAULT 0,
  price_label     TEXT NOT NULL,
  area_sqm        NUMERIC DEFAULT 0,
  bedrooms        INT DEFAULT 0,
  bathrooms       INT DEFAULT 0,

  description     TEXT DEFAULT '',
  emotional_desc  TEXT DEFAULT '',
  pim_insight     TEXT DEFAULT '',

  status          TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SOLD', 'RENTED')),
  featured        BOOLEAN NOT NULL DEFAULT false,

  images          TEXT[] NOT NULL DEFAULT '{}',
  image_primary   TEXT DEFAULT '',

  -- location (flatten)
  district           TEXT DEFAULT '',
  subdistrict        TEXT DEFAULT '',
  lat                NUMERIC,
  lng                NUMERIC,
  distance_amata     TEXT DEFAULT '',
  distance_hospital  TEXT DEFAULT '',
  distance_market    TEXT DEFAULT '',
  nearest_estate     TEXT DEFAULT '',

  amenities       TEXT[] NOT NULL DEFAULT '{}',
  video_url       TEXT,
  tags            TEXT[] NOT NULL DEFAULT '{}',

  -- soft delete
  deleted_at      TIMESTAMPTZ,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes สำหรับ query ที่ใช้บ่อย
CREATE INDEX IF NOT EXISTS idx_properties_status   ON properties (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_type     ON properties (type)   WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties (featured) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_slug     ON properties (slug);
CREATE INDEX IF NOT EXISTS idx_properties_created  ON properties (created_at DESC);
