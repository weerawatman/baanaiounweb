# TODO — Baan Ai Oun Property
รายการที่ยังเหลือก่อนขึ้น Production (ข้าม Supabase & External Integrations ไปก่อน)

อัปเดตล่าสุด: 2026-06-12

---

## 🔴 ต้องทำก่อน Deploy (Blockers)

### ข้อมูลจริงใน `src/config/site.ts`

- [x] `phone` → 086-4149960
- [x] `lineId` / `lineUrl` → @baan-ai-oun
- [x] `email` → supansa.m@baanaioun.com
- [x] `facebook` → https://www.facebook.com/share/18EEmsWiKy/ (มีหน้าที่ 2 ด้วย: /share/1GgLj8c2AX/)
- [x] `tiktok` → tiktok.com/@baan_ai_oun
- [x] `address` → 107/57 เดอะคัลเลอร์เลคเชอร์ ซ.มหาชัย ม.13 ต.บางพลีใหญ่ อ.บางพลี จ.สมุทรปราการ 10540
- [ ] `youtube` → URL YouTube จริง (ยังไม่ได้รับ)
- [ ] `googleMapsEmbed` → ต้องไปที่ Google Maps → Share → Embed a map → copy src URL
- [ ] `pim.avatar` → รูป avatar พิมจริง (ปัจจุบัน: placehold.co)
- [ ] `pim.heroImage` → รูป hero พิมจริง (ปัจจุบัน: placehold.co)

### Assets
- [ ] `src/app/favicon.ico` → Favicon จริง (ปัจจุบัน: default Next.js)
- [ ] `/public/og-image.jpg` → OG Image (1200×630px) สำหรับ share บน social

---

## 🟡 SEO — ทำได้เลย

### Meta description ที่ยังขาด
- [ ] `/contact` → เพิ่ม `<meta name="description">` ใน `src/app/contact/page.tsx`
- [ ] `/blog` → เพิ่ม `<meta name="description">` ใน `src/app/blog/page.tsx`
- [ ] `/property/[slug]` → เพิ่ม dynamic meta description ใน `src/app/property/[slug]/PropertyDetailClient.tsx`

### Structured Data เพิ่มเติม
- [ ] JSON-LD `RealEstateListing` schema ใน property detail page (แต่ละทรัพย์)

### OG Image
- [ ] เพิ่ม `openGraph.images` ใน `src/app/layout.tsx` เมื่อมีไฟล์ `/public/og-image.jpg` แล้ว

### หลัง Deploy
- [ ] Submit `sitemap.xml` ไปที่ Google Search Console
- [ ] ตั้งค่า Google Analytics 4

---

## 🟡 Security — ทำได้เลย

### Rate Limiting ใน API Routes
- [ ] เพิ่ม rate limiting ใน `src/app/api/submit-form/route.ts` (ป้องกัน spam)
- [ ] เพิ่ม rate limiting ใน `src/app/api/upload-images/route.ts`
- [ ] พิจารณาเพิ่ม Cloudflare Turnstile CAPTCHA ในฟอร์ม

### Double-Submit Protection
- [ ] ตรวจสอบว่าทุกฟอร์มมี disabled state ระหว่าง submit อยู่แล้วหรือไม่

---

## 🟡 Content — รอข้อมูลจากเจ้าของ

### ทรัพย์จริง
- [ ] ถ่ายรูปทรัพย์จริง (แต่ละหลัง 5–10 รูป)
- [ ] อัปเดต `src/data/properties.ts` ด้วยข้อมูลและรูปจริง

### บล็อก
- [ ] เพิ่มบทความจริงใน `src/data/blog-posts.ts`

---

## 🟢 ทำหลัง Deploy เท่านั้น

- [ ] Lighthouse score ≥ 90 (Performance, SEO, Accessibility)
- [ ] ทดสอบ Chrome / Safari (iPhone) / Samsung Internet / LINE in-app browser
- [ ] ทดสอบทุกหน้าบน iPhone SE (จอเล็กสุด)
- [ ] ทดสอบฟอร์มบน mobile (keyboard ไม่บัง submit button)
- [ ] ตั้งค่า Facebook Pixel (สำหรับ retargeting)
- [ ] ทดสอบ share preview บน LINE, Facebook

---

## 🟡 Supabase — เชื่อมต่อแล้ว รอ SQL Setup

- [x] สร้าง Supabase project (`ubbuniyssfmtpiwlxnxz`)
- [x] ใส่ API keys ใน `.env.local` ครบ (URL, anon key, service role key)
- [ ] **รัน `supabase/setup/00_full_setup.sql`** ใน Supabase SQL Editor (ยังไม่ได้ทำ)
  - สร้างตาราง `form_submissions` + indexes + RLS policies
  - สร้าง storage bucket `property-images` + policies
- [ ] ทดสอบ: ส่งฟอร์มบนเว็บ → ตรวจ Table Editor ว่ามี row ใหม่
- [ ] LINE Notify: สร้าง token ที่ notify-bot.line.me → ใส่ใน `.env.local`
- [ ] ทดสอบ: ส่งฟอร์ม → ได้รับ notification ใน LINE Group

---

## ⏭ Skip ไว้ก่อน (ทำหลัง Supabase พร้อม)

- Vercel: เชื่อม repo, ตั้ง env vars, deploy + custom domain
- Admin Dashboard (CRUD ทรัพย์, ดู leads, Supabase Auth)
- Blog CMS (Supabase / Notion / Sanity)
- ย้าย mock data → Supabase tables (`properties`, `blog_posts`, `testimonials`, `faqs`)

---

## ✅ เสร็จแล้ว

- [x] `next.config.ts` — remotePatterns สำหรับ placehold.co, Supabase, Cloudinary
- [x] `src/app/not-found.tsx` — หน้า 404 ภาษาไทย
- [x] `src/app/error.tsx` — Error boundary ภาษาไทย
- [x] `src/app/loading.tsx` — Loading spinner
- [x] JSON-LD `RealEstateAgent` schema ใน `layout.tsx`
- [x] แทนที่ `<img>` → `next/image` ครบทุกจุด (10 spots, 7 files)
- [x] Redesign `HeroSection` — bilingual (TH/EN) + language toggle + 3 tabs (pain→solution→CTA)
- [x] ตัด redundant pain points section ออกจาก homepage
- [x] สร้าง `.env.local` พร้อม env vars ทั้งปัจจุบันและอนาคต
- [x] เชื่อม Supabase project (`ubbuniyssfmtpiwlxnxz`) — URL + keys ถูกต้อง ทดสอบแล้ว
