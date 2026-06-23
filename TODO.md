# TODO — Baan Ai Oun Property: Production Playbook

> **วิธีใช้ไฟล์นี้:** Single source of truth สำหรับงานที่เหลือก่อน/หลัง Go-Live
> ทำทีละ Phase ตามลำดับ — **แต่ละ Phase มี Definition of Done (DoD) ต้องผ่านก่อนไป Phase ถัดไป**
> เมื่อทำเสร็จให้ติ๊ก `[x]` แล้ว commit พร้อมกัน

อัปเดตล่าสุด: 2026-06-23

---

## 👉 เริ่มงานครั้งถัดไปที่นี่

โค้ดฝั่ง dev เสร็จเป็นส่วนใหญ่แล้ว (public wired ถึง DB, admin CRUD ครบ, security upload, profile แก้ได้ครบ).
งานที่เหลือเรียงตามความคุ้มค่า:

1. **Phase D — SEO** (งานโค้ดล้วน ทำได้เลย ไม่ต้องรอ asset) → dynamic meta หน้า property + `RealEstateListing` JSON-LD + meta description หน้า contact/blog
2. **Phase C — Content จริง** (คุณทำผ่าน `/admin/profile` + admin เอง) → รูป avatar/hero, YouTube, favicon, OG image, LINE token
3. **Phase E — Security ที่เหลือ** → rate limit `submit-form`, ตรวจ RLS, double-submit
4. **Phase F — Deploy** → Vercel env + custom domain

---

## สถานะปัจจุบัน (อ่านก่อนเริ่มงาน)

| ส่วน                   | สถานะ                                                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| โครงสร้างโค้ด          | ✅ `types/` `config/` `content/` `lib/` จัดแล้ว                                                                                               |
| Supabase project       | ✅ ตั้งบน account **weerawat.m@baanaioun.com** (ref ดู `.env.local`)                                                                          |
| Supabase schema        | ✅ migrations 001–009: `form_submissions`, `properties`, `blog_posts`, `testimonials`, `faqs`, `agent_profile` (+ `address`) + RLS + triggers |
| Supabase Auth          | ⏳ Users สร้างแล้ว (kanokpat/napat/supansa/weerawat) — **password ยัง `1234` ชั่วคราว**                                                       |
| Admin Dashboard        | ✅ `/admin` — Properties CRUD, Leads, Blog (Tiptap), Testimonials, FAQs, **Profile**                                                          |
| Public site ↔ Supabase | ✅ **wired ครบทุกหน้า** ผ่าน `src/lib/queries/` (`src/data/` เหลือแค่ `BLOG_CATEGORIES` config)                                               |
| Profile/ติดต่อ         | ✅ เบอร์/LINE/social/hero/avatar/ที่อยู่+แผนที่ ดึงจาก DB แก้ได้ที่ `/admin/profile`                                                          |
| Security (upload)      | ✅ `/api/upload-images` origin check + rate limit + sanitize ext                                                                              |
| รูปภาพ                 | ⏳ ทรัพย์อัปผ่าน admin ได้แล้ว — แต่ avatar/hero ยัง fallback `placehold.co` จนกว่าจะอัปจริง                                                  |
| SEO/meta               | ❌ ยังไม่มี dynamic meta + `RealEstateListing` JSON-LD (Phase D)                                                                              |
| Deploy                 | ⏳ Vercel preview: baanaiounweb.vercel.app (ยังไม่ custom domain)                                                                             |
| CI / Quality gate      | ✅ GitHub Actions + `npm run validate` เขียว (0 error / 0 warning) + Prettier formatted                                                       |

> ⚠️ **หมายเหตุ Supabase MCP:** MCP บน Claude ผูกกับ account อื่น (weerawatman@gmail.com) ไม่ใช่ DB จริง — **อย่าใช้ MCP ตรวจสถานะ DB ของโปรเจกต์นี้** ให้ดูจาก dashboard จริงหรือไฟล์ migration แทน

**คำสั่งตรวจสุขภาพ:**

```bash
npm run validate        # typecheck + lint + build  (ต้องผ่านก่อน commit ใหญ่)
npm run check:supabase  # ทดสอบ Supabase connection
npm run dev             # http://localhost:3000
```

---

## Phase A — Admin Foundation Testing 🔴 (ทดสอบ manual)

> 🎯 **เป้าหมาย:** ยืนยัน Admin Dashboard ทำงาน end-to-end จริงบน DB

### งาน

- [ ] Login `http://localhost:3000/admin/login` ด้วย `weerawat.m@baanaioun.com` / `1234` → ผ่าน
- [ ] เปลี่ยน password ทุกคนจาก `1234` เป็นรหัสจริง (Supabase → Authentication → Users)
- [ ] Properties → เพิ่ม/แก้/Archive/Restore → เห็นผลใน Supabase Table Editor
- [ ] Leads → ดูจาก `form_submissions` → เปลี่ยน status + เพิ่ม notes ได้
- [ ] Blog (Tiptap) → เพิ่ม/Publish → ข้อมูลเข้า DB
- [ ] Testimonials → เพิ่ม/แก้ → ปรากฏใน list
- [ ] FAQs → เพิ่ม/แก้/ลบ inline → บันทึกได้
- [ ] Profile → แก้ข้อมูลพิม/ติดต่อ/ที่อยู่ → กดบันทึก → public อัปเดต
- [ ] สร้าง Storage bucket `property-images` (Public) แล้วทดสอบอัปโหลดรูปในฟอร์ม

### ✅ Definition of Done

- [ ] Login/logout ปกติ ไม่มี infinite redirect
- [ ] CRUD ทุก entity เข้า DB จริง
- [ ] `npm run validate` ผ่าน

---

## Phase B — Data Cutover (Public Site → Supabase) ✅ เสร็จแล้ว

> 🎯 Public site อ่านจาก DB แทน static files — **ยืนยันแล้วว่าเสร็จ**

- [x] หน้าแรก, /buy, /rent, /land, /property/[slug], /blog, /blog/[slug], /about, /contact, /owners ดึงจาก `src/lib/queries/`
- [x] `src/app/sitemap.ts` ดึง slug ทรัพย์ + บทความจาก DB
- [x] แก้ข้อมูลใน Admin → refresh หน้า public → เห็นผลทันที (ไม่ต้อง redeploy)
- [x] `src/data/` เหลือเฉพาะ `blog-posts.ts` → `BLOG_CATEGORIES` (config คงที่ ไม่ใช่ mock data, เก็บไว้ตั้งใจ)
- [x] `npm run validate` ผ่าน

---

## Phase C — Real Content & Assets 🔴 (Blocker ก่อน Go-Live)

> 🎯 ไม่มี placeholder เหลือบนเว็บ — ทุกรูป ทุกลิงก์ เป็นของจริง
> 📌 ข้อ 3.1 ตอนนี้แก้ได้จาก `/admin/profile` แล้ว (DB override `site.ts`) — ไม่ต้องแก้โค้ด

### 3.1 ข้อมูล Profile (แก้ที่ `/admin/profile`)

- [ ] อัปโหลดรูป avatar พิมจริง (แทน `placehold.co`)
- [ ] อัปโหลดรูป hero พิมจริง (แทน `placehold.co`)
- [ ] ใส่ YouTube URL จริง
- [ ] ตรวจที่อยู่ + แผนที่ (map derive จากที่อยู่อัตโนมัติ)

### 3.2 Brand Assets (งานไฟล์ + โค้ดเล็กน้อย)

- [ ] `src/app/favicon.ico` → favicon จริง
- [ ] `public/og-image.jpg` → OG image 1200×630px
- [ ] เพิ่ม `openGraph.images` ใน `src/app/layout.tsx` หลังมีไฟล์ OG

### 3.3 Content จริง (ผ่าน Admin)

- [ ] รูปทรัพย์จริง ≥ 5 รูป/หลัง + ข้อมูลครบ
- [ ] บทความจริง ≥ 3 เรื่อง
- [ ] Testimonials จากลูกค้าจริง

### 3.4 LINE Notify

- [ ] ขอ token → ใส่ `LINE_NOTIFY_TOKEN` (.env.local + Vercel)
- [ ] ทดสอบ: ส่งฟอร์ม `/contact` → LINE ได้รับแจ้งเตือน

### ✅ Definition of Done

- [ ] เปิดทุกหน้า → ไม่มีรูปแตก/placeholder (avatar+hero เป็นรูปจริง)
- [ ] LINE แจ้งเตือนเมื่อมี lead เข้ามา

---

## Phase D — SEO Completion 🟡 (งานโค้ด — แนะนำทำก่อน)

> 🎯 ทุกหน้ามี meta ครบ + structured data
> 📌 ปัจจุบันยังไม่มี `generateMetadata` เลย; หน้าแรกมี `<title>/<meta>` แบบ inline ใน JSX เท่านั้น

### งาน

- [ ] `/property/[slug]` → `generateMetadata` dynamic (title, price, location, รูปแรกเป็น OG image)
- [ ] `/property/[slug]` → JSON-LD `RealEstateListing` schema
- [ ] `/blog/[slug]` → `generateMetadata` จากบทความ (title, excerpt, featured image)
- [ ] `/contact`, `/blog`, `/buy`, `/rent`, `/land` → เพิ่ม metadata (title + description)
- [ ] ย้าย `<title>/<meta>` inline ในหน้าแรกไปเป็น `metadata`/`generateMetadata` ให้สม่ำเสมอ

### หลัง Deploy

- [ ] Submit `sitemap.xml` ที่ Google Search Console
- [ ] ตั้ง Google Analytics 4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- [ ] ทดสอบ share preview บน LINE + Facebook (opengraph.xyz)

### ✅ Definition of Done

- [ ] ทุก route มี `<title>` + description ไม่ซ้ำกัน
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) ผ่าน property page
- [ ] `npm run validate` ผ่าน

---

## Phase E — Security Hardening 🟡

> 🎯 API ทนต่อ spam/abuse

### งาน

- [x] Rate limit `/api/upload-images` (origin check + 20 req/นาที/IP + sanitize นามสกุลจาก MIME)
- [ ] Rate limit `/api/submit-form` (≤ 5 req/นาที/IP) — ใช้แพทเทิร์นเดียวกับ upload-images
- [ ] ตรวจ RLS: anon INSERT ได้, SELECT ข้อมูลลูกค้า (leads) ไม่ได้
- [ ] ตรวจ double-submit: ทุกฟอร์มมี disabled state ระหว่าง submit (profile/contact/property มีแล้ว — ตรวจที่เหลือ)

### ✅ Definition of Done

- [ ] ยิง API ติดกัน → โดน 429 หลังครั้งที่กำหนด
- [ ] `SUPABASE_SERVICE_ROLE_KEY` ไม่ปรากฏใน client bundle
- [ ] `npm run validate` ผ่าน

---

## Phase F — Production Deploy 🔴

> 🎯 เว็บออนไลน์บน domain จริง

### งาน

- [ ] ตั้ง Environment Variables ใน Vercel:
  - `NEXT_PUBLIC_SITE_URL` (domain จริง)
  - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `LINE_NOTIFY_TOKEN`
- [ ] **Apply migrations 001–009 บน Supabase production** (ถ้ายังไม่ครบ)
- [ ] ซื้อ/ตั้ง custom domain → ชี้ DNS เข้า Vercel
- [ ] อัปเดต `NEXT_PUBLIC_SITE_URL` ให้ตรง domain จริง

### ✅ Definition of Done

- [ ] เปิด domain จริง → ทุกหน้าโหลดได้ ไม่มี console error
- [ ] ส่งฟอร์มจาก production → ข้อมูลเข้า Supabase + LINE แจ้งเตือน
- [ ] `/sitemap.xml` และ `/robots.txt` ตอบ 200, SSL ใช้งานได้

---

## Phase G — QA & Performance 🟢 (หลัง Deploy)

### Cross-browser / Device

- [ ] Chrome desktop + Android
- [ ] Safari (iPhone) + iPhone SE (จอเล็ก)
- [ ] **LINE in-app browser** (สำคัญสุด — ลูกค้าส่วนใหญ่มาจาก LINE)
- [ ] Facebook in-app browser

### Performance

- [ ] Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90
- [ ] ตรวจ bundle size (`npx @next/bundle-analyzer`)

### End-to-End

- [ ] หน้าแรก → ดูทรัพย์ → กรอกฟอร์ม → ข้อมูลเข้า Supabase → LINE แจ้ง
- [ ] Admin login → เพิ่มทรัพย์ → ปรากฏบน public site

---

## Conventions

- **ก่อน commit ใหญ่:** `npm run validate` ต้องผ่าน
- **Commit message:** Conventional Commits (`feat:` / `fix:` / `chore:` / `docs:`)
- **DB changes:** เพิ่มไฟล์ใหม่ใน `supabase/migrations/` (ห้ามแก้ไฟล์เก่า) เลขรันต่อเนื่อง — ปัจจุบันถึง `009`
- **ห้าม commit:** `.env.local`, secrets, `.venv/`
- **Supabase:** ใช้ dashboard จริง (account baanaioun) — ไม่ใช่ MCP บน Claude

---

## Key Files Reference

| ต้องการแก้                            | ไฟล์                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------ |
| ข้อมูลติดต่อ/social/พิม (ค่า default) | `src/config/site.ts` (DB override ทับได้)                                            |
| Profile editor (admin)                | `src/app/(admin)/admin/(dashboard)/profile/`, `src/components/admin/ProfileForm.tsx` |
| Admin navigation                      | `src/config/admin-nav.ts`                                                            |
| หมวดหมู่บทความ (config)               | `src/data/blog-posts.ts`                                                             |
| Supabase queries (server, public)     | `src/lib/queries/`                                                                   |
| Server Actions (admin)                | `src/actions/`                                                                       |
| Zod validation schemas                | `src/lib/validations/`                                                               |
| snake_case ↔ camelCase mappers        | `src/lib/mappers.ts`                                                                 |
| TypeScript interfaces                 | `src/types/index.ts`, `src/lib/types/property.ts`                                    |
| Supabase client (ssr)                 | `src/lib/supabase/`                                                                  |
| Admin auth guard                      | `src/lib/auth/guard.ts`                                                              |
| Public layout + JSON-LD               | `src/app/(public)/layout.tsx`                                                        |
| API: form submit                      | `src/app/api/submit-form/route.ts`                                                   |
| API: image upload                     | `src/app/api/upload-images/route.ts`                                                 |
| SQL migrations                        | `supabase/migrations/` (001–009)                                                     |

---

## ✅ สิ่งที่เสร็จแล้ว

- [x] โครงสร้างโค้ด: `types/` `config/` `content/` `data/` แยกจาก `lib/`
- [x] Header redesign, Hero redesign bilingual TH/EN
- [x] `not-found.tsx` / `error.tsx` / `loading.tsx` ภาษาไทย
- [x] JSON-LD `RealEstateAgent` ใน layout
- [x] `<img>` → `next/image` ครบทุกจุด
- [x] Production tooling: Prettier, EditorConfig, GitHub Actions CI
- [x] Supabase project + `.env.local` + connection test
- [x] ข้อมูลติดต่อจริง: เบอร์ 086-4149960, LINE @baan-ai-oun
- [x] ตาราง `form_submissions` + `properties` + `blog_posts` + `testimonials` + `faqs` + `agent_profile`
- [x] RLS policies ทุกตาราง (anon/authenticated/service_role)
- [x] `updated_at` triggers ทุกตาราง + soft delete (`deleted_at`) บน `properties`
- [x] Admin: layout + sidebar responsive, Properties CRUD + image uploader
- [x] Admin: Leads (list/detail/status/notes), Blog (Tiptap), Testimonials (star), FAQs (inline)
- [x] Supabase Auth users สร้างแล้ว
- [x] **Phase B — Public site wired ถึง DB ครบทุกหน้า + sitemap dynamic**

### งาน session 2026-06-23 (Phase 1–4 hardening/polish)

- [x] **Security:** `/api/upload-images` เพิ่ม origin check + rate limit (20/นาที/IP) + sanitize นามสกุลไฟล์จาก MIME
- [x] **Fix:** owner image upload contract (`PropertyForm` ส่ง field `files` + อ่าน `urls`) — เดิมอัปโหลดฝั่ง owner ไม่ทำงาน
- [x] **Fix:** ปรับ `MAX_FILES` upload เป็น 10 ให้ตรงกับ admin uploader
- [x] **Profile DB-driven:** เบอร์โทร/LINE บนหน้า Home, Hero, Property detail ดึงจาก profile (แก้ใน `/admin/profile` แล้วสะท้อนทุกหน้า)
- [x] **migration 009:** เพิ่มคอลัมน์ `agent_profile.address` → ที่อยู่ + Google Map หน้าติดต่อ แก้ได้จากแอดมิน (แผนที่ derive จากที่อยู่)
- [x] **Quality gate:** ลบ import ที่ไม่ใช้ → `npm run validate` เขียวสะอาด (0 error / 0 warning)
- [x] **Housekeeping:** เพิ่ม `.venv/` ใน `.gitignore`, format ทั้ง repo ด้วย Prettier
