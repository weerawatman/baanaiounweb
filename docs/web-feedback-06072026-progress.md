# Web Feedback Progress — 06 Jul 2026

> **Session memory file** — เมื่อกลับมาเซสชันหน้า สั่ง **"ทำต่อ"** แล้วอ่านไฟล์นี้ก่อน
>
> แผนเต็มอ้างอิง: `docs/archive/07-Requirement-01072026.md` (requirements ต้นฉบับ)

---

## Supabase Migrations (มีอยู่แล้วใน repo)

| ไฟล์ | เนื้อหา |
|------|---------|
| `20260630000000_init_schema.sql` | Baseline — 14 tables, enums, triggers, RLS, storage bucket |
| `20260630100000_update_property_titles_bilingual.sql` | ปรับ title ทรัพย์แบบ bilingual |
| `20260630110000_fix_rls_performance_and_security.sql` | RLS performance + security fixes |
| `20260705144610_service_request_tables.sql` | ตาราง `/request` tabbed form |
| `20260706220000_success_stories.sql` | ตาราง `success_stories` + seed (Phase 3) |

---

## แผนที่อนุมัติแล้ว — สถานะ

| Phase | รายละเอียด | สถานะ |
|-------|-----------|--------|
| **1** | `/find-property` → Property Match | ✅ |
| **2** | Home — hero search, CTA, ecosystem | ✅ |
| **3** | `success_stories` + admin + before/after slider | ✅ |
| **4** | `/services` — copy, stats, 4-col, LINE CTA | ✅ |
| **5** | `/blog` — 5 หมวด, ArticleCTA, BlogPosting schema | ✅ |
| **6** | `/about` + Course JSON-LD | ✅ |

**ทุกเฟสผ่าน TestSprite บน Vercel แล้ว (2026-07-06)**

---

## Workflow ต่อเฟส (อนุมัติแล้ว)

1. Implement → 2. commit + push → 3. รอ Vercel → 4. TestSprite → 5. บันทึกผล

**Target:** `TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app`

---

## TestSprite Results (Vercel)

| Phase | Script | Commit | ผล |
|-------|--------|--------|-----|
| 1 | `TC004_TestSprite_submits_property_match_from_find_property.py` | `6385fe1` | ✅ PASS |
| 2 | `TC020_TestSprite_homepage_phase2.py` | `689fb5a` | ✅ PASS |
| 3 | `TC021_TestSprite_success_stories_phase3.py` | `bb112ab` | ✅ PASS |
| 4 | `TC022_TestSprite_services_phase4.py` | `188bd60` | ✅ PASS |
| 5 | `TC023_TestSprite_blog_phase5.py` | `188bd60` | ✅ PASS |
| 6 | `TC024_TestSprite_about_course_phase6.py` | `188bd60` | ✅ PASS |

```powershell
$env:TESTSPRITE_BASE_URL="https://baanaiounweb.vercel.app"
python testsprite_tests/TC004_TestSprite_submits_property_match_from_find_property.py
python testsprite_tests/TC020_TestSprite_homepage_phase2.py
python testsprite_tests/TC021_TestSprite_success_stories_phase3.py
python testsprite_tests/TC022_TestSprite_services_phase4.py
python testsprite_tests/TC023_TestSprite_blog_phase5.py
python testsprite_tests/TC024_TestSprite_about_course_phase6.py
```

---

## สรุปสิ่งที่เปลี่ยน (Final)

### Phase 4 — `/services`
- Hero copy ตาม requirement (Success Hub positioning)
- Stats bar 4 ตัวเลข (เคสสำเร็จ / เครือข่าย / ทรัพย์ / ประสบการณ์)
- Service cards **4 คอลัมน์** พร้อม trust highlights + ArrowRight
- โซน before/after จาก `success_stories`
- ปุ่ม **ปรึกษาฟรี → LINE** + โทรด่วน

### Phase 5 — `/blog`
- หมวดบทความ 5 หมวดใหม่ (ซื้อ-ขาย, สินเชื่อ, ทำเล, รีโนเวท, นายหน้า)
- `ArticleCTA` component (LINE bilingual)
- `BlogPosting` JSON-LD ทุกหน้าบทความ

### Phase 6 — `/about` + `/agent-course`
- Mission copy ตาม brief (investor-led expertise)
- `LocalBusiness` + founder markup บน `/about`
- `Course` JSON-LD บน `/agent-course`

---

## คำสั่งเริ่มเซสชันหน้า

```
ทำต่อ — อ่าน docs/web-feedback-06072026-progress.md
```

> **แผน 6 เฟสเสร็จครบแล้ว** — งานถัดไปเป็น polish/QA เพิ่มเติมหรือ content จริงใน admin ตามต้องการ
