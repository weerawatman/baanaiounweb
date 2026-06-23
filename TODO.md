# TODO — Baan Ai Oun Property: Production Playbook

> **วิธีใช้ไฟล์นี้:** Single source of truth สำหรับงานที่เหลือก่อน/หลัง Go-Live
> ทำทีละ Phase ตามลำดับ — **แต่ละ Phase มี Definition of Done (DoD) ต้องผ่านก่อนไป Phase ถัดไป**
> เมื่อทำเสร็จให้ติ๊ก `[x]` แล้ว commit พร้อมกัน

อัปเดตล่าสุด: 2026-06-23

---

## สถานะปัจจุบัน (อ่านก่อนเริ่มงาน)

| ส่วน                   | สถานะ                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| โครงสร้างโค้ด          | ✅ `types/` `config/` `content/` `data/` `lib/` จัดแล้ว                                          |
| Supabase project       | ✅ `ubbuniyssfmtpiwlxnxz` + keys ใน `.env.local`                                                 |
| Supabase schema        | ✅ ตาราง `form_submissions`, `properties`, `blog_posts`, `testimonials`, `faqs` + RLS + triggers |
| Supabase Auth          | ✅ Users: kanokpat/napat/supansa/weerawat @baanaioun.com (password: 1234 ชั่วคราว)               |
| Admin Dashboard        | ✅ `/admin` — Properties CRUD, Leads, Blog (Tiptap), Testimonials, FAQs                          |
| Public site ↔ Supabase | ❌ **ยังอ่านจาก `src/data/` (static)** — ยังไม่ wired ถึง DB                                     |
| รูปภาพ                 | ❌ ยังเป็น placeholder                                                                           |
| Deploy                 | ⏳ Vercel preview: baanaiounweb.vercel.app (ยังไม่ custom domain)                                |
| CI                     | ✅ GitHub Actions: lint + typecheck + build ทุก push                                             |

**คำสั่งตรวจสุขภาพ:**

```bash
npm run validate        # typecheck + lint + build
npm run check:supabase  # ทดสอบ Supabase connection
npm run dev             # http://localhost:3000
```

---

## Phase A — Admin Foundation Testing 🔴 (ทำก่อนทุกอย่าง)

> 🎯 **เป้าหมาย:** ทดสอบ Admin Dashboard ที่สร้างไปให้ทำงานได้ end-to-end จริง

### งาน

- [ ] เปิด `http://localhost:3000/admin/login` → login ด้วย `weerawat.m@baanaioun.com` / `1234` → ผ่าน
- [ ] เปลี่ยน password ทุกคนจาก `1234` เป็นรหัสจริง (Supabase → Authentication → Users → Send password recovery)
- [ ] Admin → Properties → กดปุ่ม "เพิ่มทรัพย์" → กรอกข้อมูล → Save → เห็น row ใน Supabase Table Editor
- [ ] Admin → Properties → Archive ทรัพย์ → ย้ายไปแท็บ "เก็บถาวร" → Restore กลับได้
- [ ] Admin → Leads → ดูรายการ leads จาก form_submissions → เปลี่ยน status ได้
- [ ] Admin → Blog → เพิ่มบทความด้วย Tiptap editor → Publish → ข้อมูลเข้า DB
- [ ] Admin → Testimonials → เพิ่มรีวิว → ปรากฏใน list
- [ ] Admin → FAQs → เพิ่ม/แก้ไข/ลบ FAQ inline → บันทึกได้
- [ ] สร้าง Supabase Storage bucket `property-images` (Dashboard → Storage → New bucket → Public)
- [ ] ทดสอบ image upload ในฟอร์ม properties → รูปขึ้น storage

### ✅ Definition of Done

- [ ] Login/logout ทำงานได้ปกติ ไม่มี infinite redirect
- [ ] CRUD ทุก entity ทำงานได้ ข้อมูลขึ้นใน Supabase จริง
- [ ] `npm run validate` ผ่าน

---

## Phase B — Data Cutover (Public Site → Supabase) 🔴

> 🎯 **เป้าหมาย:** Public site อ่านข้อมูลจาก DB แทน `src/data/` static files — เจ้าของแก้ข้อมูลผ่าน Admin ได้เลย

### งาน

- [ ] Seed ข้อมูลจาก `src/data/` เข้า Supabase ผ่าน Admin Dashboard (properties, testimonials, faqs, blog)
- [ ] แก้ `src/app/(public)/page.tsx` ให้ดึง properties จาก `src/lib/queries/properties.ts` แทน `src/data/`
- [ ] แก้ `src/app/(public)/property/[slug]/page.tsx` ให้ดึงจาก DB
- [ ] แก้ `src/app/(public)/buy/page.tsx`, `rent/page.tsx`, `land/page.tsx` ให้ดึงจาก DB
- [ ] แก้ `src/app/(public)/blog/page.tsx` + `blog/[slug]/page.tsx` ให้ดึงจาก DB
- [ ] แก้ testimonials และ FAQs ในหน้าต่างๆ ให้ดึงจาก DB
- [ ] ลบ `src/data/` เมื่อไม่มี import เหลือแล้ว
- [ ] อัปเดต `src/app/sitemap.ts` ให้ดึง slug จาก DB

### ✅ Definition of Done

- [ ] `grep -r "src/data/" src/app/` → 0 รายการ
- [ ] หน้าแรก, /buy, /rent, /land, /property/[slug], /blog, /blog/[slug] โหลดข้อมูลจาก DB
- [ ] แก้ข้อมูลใน Admin → refresh หน้า public → เห็นผลทันที (ไม่ต้อง redeploy)
- [ ] `npm run validate` ผ่าน

---

## Phase C — Real Content & Assets 🔴 (Blocker ก่อน Go-Live)

> 🎯 **เป้าหมาย:** ไม่มี placeholder เหลือบนเว็บ — ทุกรูป ทุกลิงก์ เป็นของจริง

### 3.1 Config ที่ยังขาด (`src/config/site.ts`)

- [ ] `youtube` → URL YouTube Channel จริง
- [ ] `googleMapsEmbed` → Google Maps → Share → Embed a map → copy `src` URL
- [ ] `pim.avatar` → รูป avatar พิมจริง (แนะนำ: 400×400px)
- [ ] `pim.heroImage` → รูป hero พิมจริง (แนะนำ: 1200×800px)

### 3.2 Brand Assets

- [ ] `src/app/favicon.ico` → favicon จริงของแบรนด์
- [ ] `public/og-image.jpg` → OG image 1200×630px สำหรับ share บน social
- [ ] เพิ่ม `openGraph.images` ใน `src/app/layout.tsx` หลังมีไฟล์ OG

### 3.3 Content จริง

- [ ] รูปทรัพย์จริง ≥ 5 รูป/หลัง → อัปโหลดผ่าน Admin → กรอกข้อมูลให้ครบ
- [ ] บทความจริง ≥ 3 เรื่อง → เขียนผ่าน Admin Blog editor
- [ ] Testimonials จากลูกค้าจริง → เพิ่มผ่าน Admin

### 3.4 LINE Notify

- [ ] ขอ token ที่ [notify-bot.line.me/my](https://notify-bot.line.me/my/) → ใส่ `LINE_NOTIFY_TOKEN` ใน `.env.local`
- [ ] ทดสอบ: ส่งฟอร์มหน้า `/contact` → LINE Group ได้รับแจ้งเตือน

### ✅ Definition of Done

- [ ] `grep -r "placehold.co" src/` → 0 รายการ
- [ ] เปิดทุกหน้า → ไม่มีรูปแตก ไม่มี placeholder
- [ ] LINE แจ้งเตือนเมื่อมี lead ส่งเข้ามา

---

## Phase D — SEO Completion 🟡

> 🎯 **เป้าหมาย:** ทุกหน้ามี meta ครบ + structured data + พร้อมให้ Google index

### งาน

- [ ] `/contact` → เพิ่ม `<meta name="description">`
- [ ] `/blog` → เพิ่ม meta description
- [ ] `/property/[slug]` → dynamic meta description ต่อทรัพย์ (title, price, location)
- [ ] JSON-LD `RealEstateListing` schema ใน property detail page
- [ ] ตรวจ OG tags ทุกหน้า ด้วย [opengraph.xyz](https://www.opengraph.xyz/)

### หลัง Deploy

- [ ] Submit `sitemap.xml` ที่ Google Search Console
- [ ] ตั้ง Google Analytics 4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- [ ] ทดสอบ share preview บน LINE + Facebook

### ✅ Definition of Done

- [ ] ทุก route มี `<title>` + description ไม่ซ้ำกัน
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) ผ่าน property page
- [ ] `npm run validate` ผ่าน

---

## Phase E — Security Hardening 🟡

> 🎯 **เป้าหมาย:** API ทนต่อ spam/abuse

### งาน

- [ ] Rate limiting ใน `src/app/api/submit-form/route.ts` (≤ 5 req/นาที/IP)
- [x] Rate limiting ใน `src/app/api/upload-images/route.ts` (origin check + 20 req/นาที/IP + sanitize นามสกุลจาก MIME)
- [ ] ตรวจ RLS: anon INSERT ได้, SELECT ข้อมูลลูกค้าไม่ได้
- [ ] ตรวจ double-submit: ทุกฟอร์มมี disabled state ระหว่าง submit

### ✅ Definition of Done

- [ ] ยิง API 20 ครั้งติดกัน → โดน 429 หลังครั้งที่กำหนด
- [ ] `SUPABASE_SERVICE_ROLE_KEY` ไม่ปรากฏใน client bundle
- [ ] `npm run validate` ผ่าน

---

## Phase F — Production Deploy 🔴

> 🎯 **เป้าหมาย:** เว็บออนไลน์บน domain จริง

### งาน

- [ ] ตั้ง Environment Variables ใน Vercel Project Settings:
  - `NEXT_PUBLIC_SITE_URL` (domain จริง)
  - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `LINE_NOTIFY_TOKEN`
- [ ] ซื้อ/ตั้ง custom domain → ชี้ DNS เข้า Vercel
- [ ] อัปเดต `NEXT_PUBLIC_SITE_URL` ให้ตรง domain จริง

### ✅ Definition of Done

- [ ] เปิด domain จริง → ทุกหน้าโหลดได้ ไม่มี console error
- [ ] ส่งฟอร์มจาก production → ข้อมูลเข้า Supabase + LINE แจ้งเตือน
- [ ] `https://domain/sitemap.xml` และ `/robots.txt` ตอบ 200
- [ ] SSL ทำงาน (https ไม่มี warning)

---

## Phase G — QA & Performance 🟢 (หลัง Deploy)

> 🎯 **เป้าหมาย:** ใช้งานได้ดีบนทุก device ที่ลูกค้าจริงใช้

### Cross-browser / Device

- [ ] Chrome desktop + Android
- [ ] Safari (iPhone)
- [ ] **LINE in-app browser** (สำคัญสุด — ลูกค้าส่วนใหญ่มาจาก LINE)
- [ ] Facebook in-app browser
- [ ] iPhone SE (จอเล็ก) — ทุกหน้า

### Performance

- [ ] Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90
- [ ] ตรวจ bundle size (`npx @next/bundle-analyzer`)

### End-to-End

- [ ] หน้าแรก → ดูทรัพย์ → กรอกฟอร์ม → ข้อมูลเข้า Supabase → LINE แจ้ง
- [ ] `/contact` → ส่งข้อความ → สำเร็จ
- [ ] Admin login → เพิ่มทรัพย์ → ปรากฏบน public site

---

## Conventions

- **ก่อน commit ใหญ่:** `npm run validate` ต้องผ่าน
- **Commit message:** Conventional Commits (`feat:` / `fix:` / `chore:` / `docs:`)
- **DB changes:** เพิ่มไฟล์ใหม่ใน `supabase/migrations/` (ห้ามแก้ไฟล์เก่า) เลขรันต่อเนื่อง
- **ห้าม commit:** `.env.local`, secrets
- **Branch:** งานใหญ่แตก branch → PR → merge เข้า `master`

---

## Key Files Reference

| ต้องการแก้                            | ไฟล์                                 |
| ------------------------------------- | ------------------------------------ |
| ข้อมูลติดต่อ, social links, ข้อมูลพิม | `src/config/site.ts`                 |
| Admin navigation                      | `src/config/admin-nav.ts`            |
| Public data (mock — ชั่วคราว)         | `src/data/`                          |
| Supabase queries (server)             | `src/lib/queries/`                   |
| Server Actions (admin)                | `src/actions/`                       |
| Zod validation schemas                | `src/lib/validations/`               |
| TypeScript interfaces                 | `src/lib/types/property.ts`          |
| Supabase client                       | `src/lib/supabase/`                  |
| Admin auth guard                      | `src/lib/auth/require-admin.ts`      |
| Admin layout + sidebar                | `src/app/(admin)/admin/layout.tsx`   |
| Public layout                         | `src/app/(public)/layout.tsx`        |
| API: form submit                      | `src/app/api/submit-form/route.ts`   |
| API: image upload                     | `src/app/api/upload-images/route.ts` |
| SQL migrations                        | `supabase/migrations/`               |

---

## ✅ สิ่งที่เสร็จแล้ว

- [x] โครงสร้างโค้ด: `types/` `config/` `content/` `data/` แยกจาก `lib/`
- [x] Header redesign, Hero redesign bilingual TH/EN
- [x] `not-found.tsx` / `error.tsx` / `loading.tsx` ภาษาไทย
- [x] JSON-LD `RealEstateAgent` ใน layout
- [x] `<img>` → `next/image` ครบทุกจุด
- [x] Production tooling: Prettier, EditorConfig, GitHub Actions CI
- [x] Supabase project (`ubbuniyssfmtpiwlxnxz`) + `.env.local` + connection test
- [x] ข้อมูลติดต่อจริง: เบอร์ 086-4149960, LINE @baan-ai-oun, ที่อยู่บางพลี
- [x] ตาราง `form_submissions` + `properties` + `blog_posts` + `testimonials` + `faqs`
- [x] RLS policies ทุกตาราง (anon/authenticated/service_role)
- [x] `updated_at` triggers ทุกตาราง
- [x] Soft delete (`deleted_at`) บน `properties`
- [x] Admin layout + sidebar + responsive
- [x] Admin: Properties CRUD (list/new/edit/archive/restore) + image uploader
- [x] Admin: Leads (list + detail + status update + notes)
- [x] Admin: Blog (list/new/edit พร้อม Tiptap rich-text editor)
- [x] Admin: Testimonials (list/new/edit พร้อม star rating)
- [x] Admin: FAQs (inline edit จัดกลุ่มตาม page)
- [x] Supabase Auth users สร้างแล้ว (kanokpat/napat/supansa/weerawat @baanaioun.com)

### งาน session 2026-06-23 (Phase 1–4 hardening/polish)

- [x] **Security:** `/api/upload-images` เพิ่ม origin check + rate limit (20/นาที/IP) + sanitize นามสกุลไฟล์จาก MIME
- [x] **Fix:** owner image upload contract (`PropertyForm` ส่ง field `files` + อ่าน `urls`) — เดิมอัปโหลดฝั่ง owner ไม่ทำงาน
- [x] **Fix:** ปรับ `MAX_FILES` upload เป็น 10 ให้ตรงกับ admin uploader
- [x] **Profile DB-driven:** เบอร์โทร/LINE บนหน้า Home, Hero, Property detail ดึงจาก profile (แก้ใน `/admin/profile` แล้วสะท้อนทุกหน้า)
- [x] **migration 009:** เพิ่มคอลัมน์ `agent_profile.address` → ที่อยู่ + Google Map หน้าติดต่อ แก้ได้จากแอดมิน (แผนที่ derive จากที่อยู่)
- [x] **Quality gate:** ลบ import ที่ไม่ใช้ → `npm run validate` เขียวสะอาด (0 error / 0 warning)
- [x] **Housekeeping:** เพิ่ม `.venv/` ใน `.gitignore`, format ทั้ง repo ด้วย Prettier
