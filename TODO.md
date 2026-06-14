# TODO — Baan Ai Oun Property: Production Playbook

> **วิธีใช้ไฟล์นี้:** เอกสารนี้คือ single source of truth สำหรับงานที่เหลือก่อน/หลัง Go-Live
> ทำทีละ Phase ตามลำดับ — **แต่ละ Phase มี Definition of Done (DoD) ต้องผ่านก่อนไป Phase ถัดไป**
> เมื่อทำเสร็จให้ติ๊ก `[x]` แล้ว commit ไฟล์นี้พร้อมงาน เพื่อให้ context ตรงกับความเป็นจริงเสมอ

อัปเดตล่าสุด: 2026-06-12

---

## สถานะปัจจุบัน (อ่านก่อนเริ่มงาน)

| ส่วน | สถานะ |
|------|-------|
| โครงสร้างโค้ด | ✅ จัดเป็น `types/` `config/` `content/` `data/` `lib/` แล้ว |
| Supabase project | ✅ สร้างแล้ว (`ubbuniyssfmtpiwlxnxz`) + keys ใน `.env.local` |
| Supabase schema | ✅ ตาราง `form_submissions` สร้างแล้ว (ตรวจ 2026-06-12 ผ่าน `check:supabase`) |
| ข้อมูลติดต่อจริง | ✅ เบอร์/LINE/email/ที่อยู่ ใส่แล้ว (ขาด YouTube, Maps embed) |
| รูปภาพ | ❌ ยังเป็น placehold.co ทั้งหมด |
| Deploy | ⏳ Vercel preview มีแล้ว (baanaiounweb.vercel.app) ยังไม่ตั้ง custom domain |
| CI | ✅ GitHub Actions: lint + typecheck + build ทุก push |

**คำสั่งตรวจสุขภาพโปรเจกต์:**

```bash
npm run validate          # typecheck + lint + build ต้องผ่านก่อน commit ใหญ่ทุกครั้ง
npm run check:supabase    # ทดสอบการเชื่อมต่อ Supabase + ตรวจว่าตารางถูกสร้างหรือยัง
```

---

## Phase 1 — Database Foundation 🔴 (Blocker — ทำก่อนทุกอย่าง)

> 🎯 **เป้าหมาย:** ฟอร์มทุกตัวบนเว็บบันทึกลง Supabase ได้จริง และแจ้งเตือนทีมงานผ่าน LINE

### งาน

- [x] รัน `supabase/setup/00_full_setup.sql` ใน Supabase Dashboard → SQL Editor
- [x] รัน `npm run check:supabase` → เห็น "✅ ตาราง form_submissions มีอยู่แล้ว" (ผ่าน 2026-06-12)
- [ ] ตรวจ storage bucket `property-images` ว่าถูกสร้าง: Dashboard → Storage (script ตรวจไม่ได้)
- [ ] สร้าง LINE Notify token ที่ [notify-bot.line.me/my](https://notify-bot.line.me/my/) → ใส่ `LINE_NOTIFY_TOKEN` ใน `.env.local`

### ✅ Definition of Done

- [ ] `npm run dev` → ส่งฟอร์มหน้า `/contact` → มี row ใหม่ใน Table Editor
- [ ] ส่งฟอร์มหน้า `/owners` (พร้อมแนบรูป) → row ใหม่ + รูปขึ้น storage bucket
- [ ] LINE Group ได้รับ notification ภายใน 5 วินาทีหลัง submit
- [ ] ทดสอบ error path: ปิด internet → submit → เห็น error message ภาษาไทย ไม่ crash

**ไฟล์เกี่ยวข้อง:** `src/app/api/submit-form/route.ts`, `src/app/api/upload-images/route.ts`, `src/lib/supabase.ts`, `src/lib/line-notify.ts`

---

## Phase 2 — Real Content & Assets 🔴 (Blocker)

> 🎯 **เป้าหมาย:** ไม่มี placeholder เหลือบนเว็บ — ทุกรูป ทุกลิงก์ เป็นของจริง

### 2.1 Config ที่ยังขาด (`src/config/site.ts`)

- [ ] `youtube` → URL YouTube จริง (รอจากเจ้าของ)
- [ ] `googleMapsEmbed` → Google Maps → Share → Embed a map → copy `src` URL
- [ ] `pim.avatar` → รูป avatar พิมจริง
- [ ] `pim.heroImage` → รูป hero พิมจริง

### 2.2 Brand Assets

- [ ] `src/app/favicon.ico` → favicon จริง (ปัจจุบัน: default Next.js)
- [ ] `public/og-image.jpg` → OG image 1200×630px สำหรับ share social
- [ ] เพิ่ม `openGraph.images` ใน `src/app/layout.tsx` หลังมีไฟล์ OG

### 2.3 ทรัพย์และบทความจริง

- [ ] รูปทรัพย์จริง 5–10 รูป/หลัง → อัปโหลด Supabase Storage
- [ ] อัปเดต `src/data/properties.ts` ด้วยข้อมูล + URL รูปจริง
- [ ] เขียนบทความจริงอย่างน้อย 3 เรื่องใน `src/data/blog-posts.ts`
- [ ] Testimonials จริงจากลูกค้า → `src/data/testimonials.ts`

### ✅ Definition of Done

- [ ] `grep -r "placehold.co" src/` → ผลลัพธ์ = 0 รายการ
- [ ] เปิดทุกหน้าใน browser → ไม่มีรูป placeholder เหลือ
- [ ] `npm run validate` ผ่าน

---

## Phase 3 — SEO Completion 🟡

> 🎯 **เป้าหมาย:** ทุกหน้ามี meta ครบ + structured data + พร้อมให้ Google index

### งาน

- [ ] `/contact` → เพิ่ม `<meta name="description">` ใน `src/app/contact/page.tsx`
- [ ] `/blog` → เพิ่ม meta description ใน `src/app/blog/page.tsx`
- [ ] `/property/[slug]` → dynamic meta description ต่อทรัพย์
- [ ] JSON-LD `RealEstateListing` schema ใน property detail page
- [ ] ตรวจ OG tags ทุกหน้าด้วย [opengraph.xyz](https://www.opengraph.xyz/)

### หลัง Deploy (Phase 5 เสร็จก่อน)

- [ ] Submit `sitemap.xml` ที่ Google Search Console
- [ ] ตั้งค่า Google Analytics 4
- [ ] ทดสอบ share preview จริงบน LINE + Facebook

### ✅ Definition of Done

- [ ] ทุก route ใน `src/app/sitemap.ts` มี `<title>` + description ไม่ซ้ำกัน
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) ผ่านสำหรับหน้า property
- [ ] `npm run validate` ผ่าน

---

## Phase 4 — Security Hardening 🟡

> 🎯 **เป้าหมาย:** API ทนต่อ spam/abuse — ข้อมูลลูกค้าปลอดภัย

### งาน

- [ ] Rate limiting ใน `src/app/api/submit-form/route.ts` (เช่น 5 req/นาที/IP — ใช้ `@upstash/ratelimit` หรือ in-memory LRU)
- [ ] Rate limiting ใน `src/app/api/upload-images/route.ts`
- [ ] พิจารณา Cloudflare Turnstile CAPTCHA ในฟอร์ม (ถ้า spam เริ่มเข้า)
- [ ] ตรวจ RLS policies: anon role ต้อง INSERT ได้อย่างเดียว ห้าม SELECT ข้อมูลลูกค้า
- [ ] ตรวจทุกฟอร์มมี disabled state ระหว่าง submit (กัน double-submit)

### ✅ Definition of Done

- [ ] ยิง API 20 ครั้งติดกัน → โดน 429 หลังครั้งที่กำหนด
- [ ] ใช้ anon key query `form_submissions` → ถูก RLS block
- [ ] กดปุ่ม submit รัว ๆ → เกิด 1 row เท่านั้น
- [ ] `SUPABASE_SERVICE_ROLE_KEY` ไม่ปรากฏใน client bundle (`grep -r "SERVICE_ROLE" .next/static/` = 0)

---

## Phase 5 — Production Deploy 🔴

> 🎯 **เป้าหมาย:** เว็บออนไลน์บน domain จริง พร้อม env ครบ

### งาน

- [ ] ตั้ง Environment Variables ทั้งหมดใน Vercel Project Settings:
  - `NEXT_PUBLIC_SITE_URL` (domain จริง)
  - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `LINE_NOTIFY_TOKEN`
- [ ] ซื้อ/ตั้ง custom domain → ชี้ DNS เข้า Vercel
- [ ] อัปเดต `NEXT_PUBLIC_SITE_URL` ให้ตรง domain จริง (กระทบ sitemap + OG)
- [ ] เปิด Vercel Analytics

### ✅ Definition of Done

- [ ] เปิด domain จริง → ทุกหน้าโหลดได้ ไม่มี console error
- [ ] ส่งฟอร์มจาก production → เข้า Supabase + LINE แจ้งเตือน
- [ ] `https://domain/sitemap.xml` และ `/robots.txt` ตอบ 200
- [ ] SSL ทำงาน (https ไม่มี warning)

---

## Phase 6 — QA & Performance 🟢 (หลัง Deploy)

> 🎯 **เป้าหมาย:** ใช้งานได้ดีบนทุก device ที่ลูกค้าจริงใช้

### Cross-browser / Device

- [ ] Chrome desktop + Android
- [ ] Safari (iPhone)
- [ ] Samsung Internet
- [ ] **LINE in-app browser** (สำคัญสุด — ลูกค้าส่วนใหญ่มาจาก LINE)
- [ ] Facebook in-app browser
- [ ] iPhone SE (จอเล็กสุด) — ทุกหน้า
- [ ] ฟอร์มบน mobile: keyboard ไม่บังปุ่ม submit

### Performance

- [ ] Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90
- [ ] ตรวจ bundle size (`npx @next/bundle-analyzer`)

### End-to-End Flows

- [ ] หน้าแรก → ดูทรัพย์ → กรอกฟอร์ม → สำเร็จ → ข้อมูลเข้า Supabase → LINE แจ้ง
- [ ] `/contact` → ส่งข้อความ → สำเร็จ
- [ ] `/blog` → อ่านบทความ → ทรัพย์ที่เกี่ยวข้อง → หน้า property

### ✅ Definition of Done

- [ ] ทุก checklist ข้างบนผ่าน + บันทึก Lighthouse score ลงไฟล์นี้

---

## Phase 7 — Data Layer Evolution 🔵 (Post-launch)

> 🎯 **เป้าหมาย:** เลิกใช้ mock data — เจ้าของแก้ข้อมูลเองได้โดยไม่ต้อง deploy ใหม่

### 7.1 ย้าย Mock → Supabase

- [ ] สร้างตาราง `properties`, `blog_posts`, `testimonials`, `faqs` (โครงสร้างตาม `src/types/index.ts`)
- [ ] เขียน data-access layer ใน `src/lib/queries/` (server components ดึงจาก Supabase)
- [ ] เพิ่ม migration ไฟล์ใหม่ใน `supabase/migrations/` (เลขรันต่อ: `004_...`)
- [ ] ลบ `src/data/` เมื่อย้ายครบ + ตรวจไม่มี import ค้าง

### 7.2 Admin Dashboard

- [ ] Supabase Auth (email login สำหรับทีมงานเท่านั้น)
- [ ] หน้า admin: CRUD ทรัพย์ + อัปโหลดรูป
- [ ] หน้า admin: ดู leads (form submissions) + เปลี่ยน status (new/contacted/closed)

### 7.3 Marketing

- [ ] Facebook Pixel (retargeting)
- [ ] LINE Official Account widget

---

## Conventions (สำหรับทุกคน/ทุก AI ที่มาทำต่อ)

- **ก่อน commit ใหญ่:** `npm run validate` ต้องผ่าน
- **Commit message:** Conventional Commits (`feat:` / `fix:` / `chore:` / `docs:` / `refactor:`)
- **DB changes:** เพิ่มไฟล์ใหม่ใน `supabase/migrations/` เสมอ (ห้ามแก้ไฟล์เก่า) — เลขรันต่อเนื่อง
- **ห้าม commit:** `.env.local`, secrets, `tsconfig.tsbuildinfo`
- **Branch:** งานใหญ่แตก branch → PR → merge เข้า `master` (CI ต้องเขียว)

## Key Files Reference

| ต้องการแก้ | ไฟล์ |
|-----------|------|
| ข้อมูลติดต่อ, social links, ข้อมูลพิม | `src/config/site.ts` |
| เมนู navigation (desktop dropdown + mobile) | `src/config/navigation.ts` |
| ข้อมูลทรัพย์ (mock) | `src/data/properties.ts` |
| เนื้อหาแต่ละหน้า (pain points, solutions, CTA) | `src/content/{page}.ts` |
| TypeScript interfaces | `src/types/index.ts` |
| Supabase client (anon + service role) | `src/lib/supabase.ts` |
| Form validation rules | `src/lib/form-validation.ts` |
| LINE Notify | `src/lib/line-notify.ts` |
| API: form submit | `src/app/api/submit-form/route.ts` |
| API: image upload | `src/app/api/upload-images/route.ts` |
| SQL setup ครั้งแรก | `supabase/setup/00_full_setup.sql` |
| ทดสอบ Supabase connection | `scripts/test-supabase.mjs` (`npm run check:supabase`) |

---

## ✅ Log งานที่เสร็จแล้ว

- [x] Restructure: `types/` `config/` `content/` `data/` แยกจาก lib เดิม
- [x] Header redesign: dropdown groups, ตัด CTA/เบอร์โทรออก
- [x] Hero redesign: bilingual TH/EN + 3 tabs
- [x] `next.config.ts` — remotePatterns (placehold.co, Supabase, Cloudinary)
- [x] `not-found.tsx` / `error.tsx` / `loading.tsx` ภาษาไทย
- [x] JSON-LD `RealEstateAgent` ใน layout
- [x] `<img>` → `next/image` ครบ (10 จุด, 7 ไฟล์)
- [x] Production tooling: Prettier, EditorConfig, nvmrc, GitHub Actions CI
- [x] Supabase project + keys ใน `.env.local` (ทดสอบ connection แล้ว)
- [x] ข้อมูลติดต่อจริง: เบอร์ 086-4149960, LINE @baan-ai-oun, email, ที่อยู่บางพลี
- [x] ย้าย `test-supabase.mjs` → `scripts/` + npm script `check:supabase`
