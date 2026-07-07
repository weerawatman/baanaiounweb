# TODO — Baan Ai Oun Property

> Single source of truth สำหรับงานที่เหลือ — อัปเดตล่าสุด: 2026-07-08
> ข้อเท็จจริงของโปรเจกต์ (stack, conventions, commands) ดู `AGENTS.md`
> ประวัติงานที่จบแล้ว ดู `docs/archive/`

## สถานะปัจจุบัน

เว็บ deploy อยู่ที่ **baanaiounweb.vercel.app** (ยังไม่ custom domain)
ตรวจ production-readiness รอบเต็มแล้ว (2026-07-07): โค้ด/build/SEO/redirect/ฟอร์ม/security ผ่าน —
รายละเอียดรันซ้ำได้ด้วย `python testsprite_tests/production_audit.py`

## ก่อน Go-Live (เรียงตามความสำคัญ)

### Content จริง (ทำผ่าน /admin — blocker หลัก)

- [ ] ทรัพย์จริง ≥ 3 รายการ (ตอนนี้มี 1) พร้อมรูปจริง ≥ 5 รูป/หลัง
- [ ] บทความจริง ≥ 3 เรื่อง (ตอนนี้ 0 — หน้า /blog แสดง "coming soon")
- [ ] รูป timeline หน้า /about 4 รูป (อัปโหลดที่ /admin/profile)
- [ ] พิกัดแผนที่หน้า /contact (ตั้งที่ /admin/profile)
- [ ] รูป success story จริง (ตอนนี้เป็น placehold.co) — จะแสดงผลใน phase หน้า

### Security hardening (จาก Supabase advisors 2026-07-07)

- [ ] Revoke EXECUTE จาก `anon` บน SECURITY DEFINER functions:
      `complete_project`, `get_user_role`, `handle_new_user`, `log_asset_changes`
- [ ] เปิด Leaked password protection (Supabase Auth settings)
- [ ] ถอด broad SELECT policy บน storage buckets (`asset-files`, `property-images`) กัน list ไฟล์ทั้ง bucket

### Ops

- [ ] เปิดใช้ Sentry: ตั้ง `NEXT_PUBLIC_SENTRY_DSN` + org/project/authToken (โค้ด wired แล้ว — ดู AGENTS.md)
- [ ] Custom domain + อัปเดต `NEXT_PUBLIC_SITE_URL`
- [ ] Submit sitemap ที่ Google Search Console + ตั้ง GA4
- [ ] ทดสอบ LINE in-app browser (ลูกค้าส่วนใหญ่มาจาก LINE)

## Phase ถัดไป (ตกลงแล้ว 2026-07-08)

- [ ] **แสดง Success Stories + Testimonials บนหน้าบ้าน** — เมนู admin มีครบแล้ว
      คอมโพเนนต์เดิมเก็บไว้รอใช้: `src/components/home/SocialProofSection.tsx`,
      `SuccessStoriesSection.tsx`, `TestimonialSlider.tsx`, `src/components/shared/BeforeAfterSlider.tsx`
- [ ] ปรับปรุงความเร็ว admin ต่อ (ลด `getUser()` ซ้ำ 2 รอบต่อ navigation) — loading skeleton ทำแล้ว

## Conventions (ย่อ)

- ก่อน commit ใหญ่: `npm run validate` ต้องผ่าน
- Commit message: Conventional Commits (`feat:` / `fix:` / `chore:` / `docs:`)
- DB changes: เพิ่มไฟล์ใหม่ใน `supabase/migrations/` เท่านั้น (ห้ามแก้ไฟล์เก่า) — apply ผ่าน Supabase MCP
- ห้าม commit: `.env.local`, secrets
