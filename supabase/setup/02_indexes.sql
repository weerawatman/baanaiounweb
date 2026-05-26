-- ============================================================
--  Step 2: สร้าง Indexes
-- ============================================================
--  ช่วยให้ query เร็วขึ้นเวลาทีมงานกรองข้อมูล
-- ============================================================

-- กรองตาม form_tag (ดู lead แยกตามประเภท)
CREATE INDEX IF NOT EXISTS idx_form_submissions_tag
  ON form_submissions(form_tag);

-- กรองตาม status (new / contacted / closed)
CREATE INDEX IF NOT EXISTS idx_form_submissions_status
  ON form_submissions(status);

-- เรียงตามวันที่ล่าสุด
CREATE INDEX IF NOT EXISTS idx_form_submissions_created
  ON form_submissions(created_at DESC);
