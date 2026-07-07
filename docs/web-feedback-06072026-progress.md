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
| 2 | `TC020_TestSprite_homepage_phase2.py` | `11ca84a` | ✅ PASS (cohesion) |
| 3 | `TC021_TestSprite_success_stories_phase3.py` | `11ca84a` | ✅ PASS (social proof) |
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

> **แผน 6 เฟสเสร็จครบแล้ว** — Homepage mockup ✅ | Services mockup ✅ | Slider Fix ✅

---

## Services Page Mockup — ✅ 2026-07-07

**อ้างอิง:** `example_page/บริการของเรา.html`

### โครงสร้างใหม่ `/services`
1. Hero เขียว + stats 4 ตัวในบล็อกเดียว (พื้นหลัง `hero_image_url`)
2. Choose Your Path — 4 `AudienceCard`
3. Why Choose Baan Ai Oun — `ServicesWhyChoose` (3 การ์ด)
4. Trusted by Clients — `TrustPillars` รูปจาก Admin (`trust_*_image` เดียวกับหน้าแรก)
5. ทำเลเชี่ยวชาญ + CTA LINE/โทร — `LineClosingCta` รวม `localAuthority`

### Admin
- Section **รูปภาพประกอบหน้า Website** (ชื่อเดิมอัปเดตแล้ว)
- รูป 3 pillar ใช้ร่วมหน้าแรก + หน้าบริการ

### ถอดออก
- `SocialProofSection` / success-stories slider บน `/services`

### Verify
- `npm run typecheck` + `lint` PASS
- TC022: รันบน Vercel หลัง push (`services-stats-bar`, `services-four-column-grid`, `services-line-cta`)

---

## Before/After Slider Fix (Option A) — ✅ 2026-07-06

**Commit:** `44259e9` | **TestSprite (local):** TC021 PASS

### ปัญหาที่แก้
- กรอบหดเมื่อลาก — ลบ `10000/position%` hack ใช้ `clip-path: inset()` แทน (กรอบคงที่)
- ข้อความ alt ซ้อนทับ — รูปเป็น decorative (`alt=""`, `aria-hidden`)
- กรอบ+ข้อความเลื่อนตามการลาก — **ถอด Embla ออกจาก success stories** ใช้ state + dots แทน (ไม่มี carousel swipe ชน slider)

### ไฟล์ที่แก้
- `src/components/shared/BeforeAfterSlider.tsx` — clip-path, touch-action, design tokens
- `src/components/home/SocialProofSection.tsx` — Embla isolation, caption ไม่ซ้ำ SectionTitle

### ถัดไป (content)
- อัปรูป before/after จริงที่ `/admin/success-stories` (ตอนนี้ยังเป็น `placehold.co`)

---

## Site Cohesion Pass (Option B) — ✅ 2026-07-06

**Commit:** `f5a3911` | **TestSprite (local):** TC004 + TC022 + TC024 PASS

### หน้าที่ปรับ
- **`/services`** — `PageSection` + `SectionTitle`, `AudienceCard` (คลิกทั้งใบ), `SocialProofSection`, `LineClosingCta` (LINE + โทร)
- **`/find-property`** — `PageSection`, design tokens, ลบ CTA ซ้ำใน hero (เหลือลิงก์ดูทรัพย์), form above-fold คงเดิม
- **`/about`** — `PageSection` + `SectionTitle`, token colors แทน hex, timeline/value cards unified
- **Homepage** — ใช้ `LineClosingCta` ร่วมกับ services

### ไฟล์ใหม่/แก้
- `src/components/shared/LineClosingCta.tsx` (shared closing CTA)
- `AudienceCard` — เพิ่ม optional `highlightTh`/`highlightEn` สำหรับ services hub

### testid ที่คงไว้ (TC022)
- `services-stats-bar`, `services-four-column-grid`, `services-line-cta`

### ขั้นตอนถัดไป
```powershell
git push origin master   # รอ Vercel deploy
$env:TESTSPRITE_BASE_URL="https://baanaiounweb.vercel.app"
python testsprite_tests/TC004_TestSprite_submits_property_match_from_find_property.py
python testsprite_tests/TC022_TestSprite_services_phase4.py
python testsprite_tests/TC024_TestSprite_about_course_phase6.py
```

---

## Homepage Cohesion Pass (Option A) — ✅ 2026-07-06

**Commit:** `11ca84a` | **TestSprite:** TC020 + TC021 PASS บน Vercel

### ปัญหาที่แก้
- Search bar ซ้ำ 2 จุด (hero + SmartSearchWrapper) → เหลือ **hero เท่านั้น**
- CTA ซ้ำหลายชั้น (hero + 4 การ์ด + ecosystem + footer) → **การ์ดคลิกทั้งใบ** + footer LINE เดียว
- Section ไม่เป็น rhythm → `PageSection` + `SectionTitle` + token colors

### โครงสร้างหน้าแรกใหม่
1. Hero (compact CTA + search)
2. ServiceShortcuts (AudienceCard × 4 + ลิงก์ `/about`)
3. FeaturedProperties (grid only)
4. CoreValues
5. SocialProofSection (before/after + testimonials)
6. FAQ
7. Closing CTA (LINE + text links)

### ไฟล์ใหม่
- `src/components/layout/PageSection.tsx`
- `src/components/shared/AudienceCard.tsx`
- `src/components/home/FeaturedProperties.tsx`
- `src/components/home/SocialProofSection.tsx`

### ถอดจากหน้าแรก
- `EcosystemBand` (เนื้อหาอยู่ที่ `/about`)
- `SmartSearchWrapper` (แทนด้วย FeaturedProperties — ไฟล์เดิมยังอยู่ใน repo แต่ไม่ถูก mount)
