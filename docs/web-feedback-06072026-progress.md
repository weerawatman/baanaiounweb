# Web Feedback Progress — 06 Jul 2026

> **Session memory file** — เมื่อกลับมาเซสชันหน้า สั่ง **"ทำต่อ"** แล้วอ่านไฟล์นี้ก่อน
>
> แผนเต็มอ้างอิง: `docs/archive/07-Requirement-01072026.md` (requirements ต้นฉบับ)

---

## Supabase Migrations (มีอยู่แล้วใน repo)

โปรเจกต์มี **Supabase IaC migrations** ครบที่ `supabase/migrations/`:

| ไฟล์ | เนื้อหา |
|------|---------|
| `20260630000000_init_schema.sql` | Baseline — 14 tables, enums, triggers, RLS, storage bucket |
| `20260630100000_update_property_titles_bilingual.sql` | ปรับ title ทรัพย์แบบ bilingual |
| `20260630110000_fix_rls_performance_and_security.sql` | RLS performance (`auth.uid()` initplan), `search_path`, revoke anon EXECUTE |
| `20260705144610_service_request_tables.sql` | ตาราง `/request` tabbed form: `list_property_requests`, `matchmaking_requests`, `coagent_requests` |

Archive SQL เดิม: `docs/archive/supabase-setup/`

> หมายเหตุ: การประเมินความเสี่ยงก่อนหน้านี้ **ไม่ได้หมายความว่าไม่มี migration** — ชี้ว่า RLS policy บางตัวใน migration ยังใช้ `authenticated USING (true)` แทน `get_user_role() = 'admin'` (งาน hardening แยกจากการมี migration)

---

## แผนที่อนุมัติแล้ว (ลำดับทำงาน)

### Phase 1 — `/find-property` → "งานหาทรัพย์ | Property Match"

- [x] เปลี่ยนหน้า `/find-property` ให้ใช้ฟอร์ม `matchmaking` โดยตรงผ่าน `RequestForm`
- [x] ฟอร์ม above-fold (ไม่ต้องกด CTA ก่อน)
- [x] Rename เมนู navigation เป็น "งานหาทรัพย์ | Property Match"
- [x] แก้ `e2e/smoke.spec.ts` บรรทัด ~8 (ชื่อเมนูใหม่)
- [x] ปรับ copy / metadata ของหน้าให้สอดคล้องกับ Property Match

**อัปเดตล่าสุดใน Phase 1**

- `/find-property` ไม่ใช้ฟอร์ม legacy `buyer` แล้ว แต่ผูกกับ flow ใหม่ `request-matchmaking`
- ฟอร์มด้านบนของหน้าเขียนลง `matchmaking_requests` ผ่าน `/api/service-request`
- ตรวจแล้ว `typecheck` และ `lint` ผ่าน

**ไฟล์ที่เกี่ยวข้อง:** `src/app/(public)/find-property/`, `src/content/find-property.ts`, `src/config/navigation.ts`, `e2e/smoke.spec.ts`

---

### Phase 2 — Home

- [x] Hero search bar → `/properties?query`
- [x] เปลี่ยน CTA (investor hero copy + Find Your Perfect Match)
- [x] Service cards ใหม่ (trust signals + buyer CTA → `/find-property`)
- [x] Ecosystem band

**TestSprite:** `testsprite_tests/TC020_TestSprite_homepage_phase2.py`

**ไฟล์ที่เกี่ยวข้อง:** `src/content/homepage.ts`, `src/components/home/`, `src/app/(public)/HomePage.tsx`

---

### Phase 3 — Social proof

- [x] Migration: ตาราง `success_stories` (+ seed 1 รายการ)
- [x] Admin CRUD (`/admin/success-stories`)
- [x] Slider ก่อน/หลัง (before/after) บนหน้าแรก

**TestSprite:** `testsprite_tests/TC021_TestSprite_success_stories_phase3.py`

**ไฟล์ที่เกี่ยวข้อง:** `supabase/migrations/20260706220000_success_stories.sql`, `src/components/shared/BeforeAfterSlider.tsx`, `src/components/home/SuccessStoriesSection.tsx`, `src/app/(admin)/admin/(dashboard)/success-stories/`

---

### Phase 4 — `/services`

- [ ] Copy + stats
- [ ] 4 คอลัมน์ layout
- [ ] ปุ่ม "ปรึกษาฟรี" → LINE

**ไฟล์ที่เกี่ยวข้อง:** `src/content/services-hub.ts`, `src/app/(public)/services/`

---

### Phase 5 — `/blog`

- [ ] 5 หมวดใหม่
- [ ] `ArticleCTA` component
- [ ] `BlogPosting` schema (JSON-LD)
- [ ] **เช็ค `blog_posts` schema อีกรอบก่อนเริ่ม**

**ไฟล์ที่เกี่ยวข้อง:** `src/app/(public)/blog/`, `src/data/blog-posts.ts`, `src/lib/queries/blog.ts`

---

### Phase 6 — `/about` + Course JSON-LD

- [ ] ปรับหน้า about ตาม brief
- [ ] Course structured data (JSON-LD)

**ไฟล์ที่เกี่ยวข้อง:** `src/app/(public)/about/`, `src/app/(public)/agent-course/`

---

## Workflow ต่อเฟส (อนุมัติแล้ว)

ทุกเฟสต้องทำตามลำดับนี้ก่อนขึ้นเฟสถัดไป:

1. Implement phase
2. `git commit` + `git push` → Vercel deploy
3. รอ deploy ขึ้น https://baanaiounweb.vercel.app/
4. รัน TestSprite verification บน Vercel (ไม่ใช่ localhost)
5. บันทึกผลในไฟล์นี้ → ค่อยเริ่มเฟสถัดไป

**TestSprite target:** `TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app`

**Phase 1 script:** `testsprite_tests/TC004_TestSprite_submits_property_match_from_find_property.py`

```powershell
$env:TESTSPRITE_BASE_URL="https://baanaiounweb.vercel.app"
python testsprite_tests/TC004_TestSprite_submits_property_match_from_find_property.py
```

---

## สถานะปัจจุบัน

| Phase | สถานะ |
|-------|--------|
| Phase 1 | ✅ pushed + TestSprite PASS on Vercel (2026-07-06) |
| Phase 2 | ✅ pushed + TestSprite PASS on Vercel (2026-07-06) |
| Phase 3 | ✅ pushed + TestSprite PASS on Vercel (2026-07-06) |
| Phase 4 | ⏳ ถัดไป |
| Phase 5–6 | 📋 รอคิว |

### Phase 3 — TestSprite (Vercel)

| รายการ | สถานะ |
|--------|--------|
| Push to GitHub (`bb112ab`) | ✅ |
| Supabase migration applied | ✅ |
| Vercel deploy reflects changes | ✅ |
| TC021 success stories before/after | ✅ PASS |

```
TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app
python testsprite_tests/TC021_TestSprite_success_stories_phase3.py
→ PASS (2026-07-06)
```

### Phase 2 — TestSprite (Vercel)

| รายการ | สถานะ |
|--------|--------|
| Push to GitHub (`689fb5a`) | ✅ |
| Vercel deploy reflects changes | ✅ |
| TC020 homepage Phase 2 | ✅ PASS |

```
TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app
python testsprite_tests/TC020_TestSprite_homepage_phase2.py
→ PASS (2026-07-06)
```

### Phase 1 — TestSprite (Vercel)

| รายการ | สถานะ |
|--------|--------|
| Push to GitHub (`6385fe1`) | ✅ |
| Vercel deploy reflects changes | ✅ |
| TC004 Property Match on `/find-property` | ✅ PASS |

```
TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app
python testsprite_tests/TC004_TestSprite_submits_property_match_from_find_property.py
→ PASS (2026-07-06)
```

---

## คำสั่งเริ่มเซสชันหน้า

```
ทำต่อ — อ่าน docs/web-feedback-06072026-progress.md แล้วดำเนินการตาม workflow (push → TestSprite Vercel → phase ถัดไป)
```
