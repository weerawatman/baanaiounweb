# Production Roadmap — Baan Ai Oun Property

แผนงานขั้นตอนสำหรับนำเว็บไซต์ขึ้น Production จริง

---

## Phase 1: Infrastructure & Database (สัปดาห์ที่ 1)

### 1.1 Supabase Setup

- [ ] สร้าง Supabase Project ที่ [supabase.com](https://supabase.com)
- [ ] รัน `supabase/setup/00_full_setup.sql` ใน SQL Editor
- [ ] คัดลอก API keys จาก Settings > API
- [ ] สร้างไฟล์ `.env.local` จาก `.env.example` แล้วใส่ค่าจริง
- [ ] ทดสอบส่งฟอร์มจากเว็บ → ตรวจสอบข้อมูลเข้า Supabase Table Editor

### 1.2 LINE Notify

- [ ] สร้าง LINE Notify Token ที่ [notify-bot.line.me/my](https://notify-bot.line.me/my/)
- [ ] เพิ่ม Token ใน `.env.local` → `LINE_NOTIFY_TOKEN=xxx`
- [ ] ทดสอบส่งฟอร์ม → ตรวจสอบว่าได้รับ notification ใน LINE Group

### 1.3 Vercel Deployment

- [ ] เชื่อมต่อ GitHub repo กับ [Vercel](https://vercel.com)
- [ ] เพิ่ม Environment Variables ทุกตัวใน Vercel Project Settings
- [ ] Deploy ครั้งแรก → ตรวจสอบว่าทุกหน้าทำงานปกติ
- [ ] ตั้ง Custom Domain (ถ้ามี)

---

## Phase 2: Content & Assets (สัปดาห์ที่ 1-2)

### 2.1 เปลี่ยน Placeholder เป็นรูปจริง

- [ ] ถ่ายรูปทรัพย์จริง (แต่ละหลัง 5-10 รูป)
- [ ] ถ่ายรูปพิม (hero, avatar)
- [ ] อัปโหลดรูปไปที่ Supabase Storage หรือ Cloudinary
- [ ] อัปเดต URL ใน `src/data/properties.ts` (หรือย้ายไปเป็น Supabase query)
- [ ] อัปเดตรูปพิมใน `src/config/site.ts`

### 2.2 เปลี่ยน Mock Data เป็น Supabase

- [ ] สร้างตาราง `properties` ใน Supabase (โครงสร้างตาม `src/types/index.ts` → `Property`)
- [ ] สร้างตาราง `blog_posts` (โครงสร้างตาม `BlogPost`)
- [ ] สร้างตาราง `testimonials` (โครงสร้างตาม `Testimonial`)
- [ ] สร้างตาราง `faqs` (โครงสร้างตาม `FAQ`)
- [ ] เขียน API route หรือ server component ดึงข้อมูลจาก Supabase แทน mock
- [ ] ลบโฟลเดอร์ `src/data/` ออกเมื่อย้ายครบ

### 2.3 อัปเดตข้อมูลติดต่อจริง

- [ ] `src/config/site.ts` → เบอร์โทร, LINE ID, อีเมล, ที่อยู่
- [ ] `src/config/site.ts` → ลิงก์ Facebook, TikTok, YouTube
- [ ] `src/config/site.ts` → Google Maps Embed URL จริง
- [ ] Favicon & OG Image จริง (แทน default Next.js)

---

## Phase 3: SEO & Performance (สัปดาห์ที่ 2)

### 3.1 SEO

- [ ] ตรวจสอบ `<title>` และ `<meta description>` ทุกหน้า
- [ ] เพิ่ม JSON-LD Structured Data (LocalBusiness, RealEstateListing)
- [ ] อัปเดต `src/app/robots.ts` → ใส่ domain จริง
- [ ] อัปเดต `src/app/sitemap.ts` → ใส่ domain จริง
- [ ] Submit sitemap ไปที่ Google Search Console
- [ ] ตั้งค่า Google Analytics / Google Tag Manager

### 3.2 Performance

- [ ] เปลี่ยน `<img>` เป็น `next/image` ทุกจุด (รองรับ lazy load + WebP auto)
- [ ] ตรวจสอบ Lighthouse score (เป้าหมาย: Performance > 90)
- [ ] เพิ่ม `loading="lazy"` สำหรับ component ที่อยู่ below the fold
- [ ] ตรวจสอบ bundle size ด้วย `@next/bundle-analyzer`

### 3.3 Accessibility

- [ ] ตรวจสอบ color contrast (เฉพาะภาษาไทย font อ่านง่าย)
- [ ] ตรวจสอบ keyboard navigation ทุกฟอร์ม
- [ ] เพิ่ม `aria-label` สำหรับ icon-only buttons
- [ ] ทดสอบด้วย screen reader เบื้องต้น

---

## Phase 4: Security & Reliability (สัปดาห์ที่ 2-3)

### 4.1 Security

- [ ] ตรวจสอบ Supabase RLS policies ว่าปิดกั้นการอ่านข้อมูลลูกค้า
- [ ] เพิ่ม rate limiting สำหรับ API routes (ป้องกัน spam)
- [ ] เพิ่ม CAPTCHA (เช่น Cloudflare Turnstile) ในฟอร์ม
- [ ] ตรวจสอบ CORS headers
- [ ] ตรวจสอบว่า `SUPABASE_SERVICE_ROLE_KEY` ไม่ expose ฝั่ง client

### 4.2 Error Handling

- [ ] เพิ่ม `src/app/not-found.tsx` (404 page ภาษาไทย)
- [ ] เพิ่ม `src/app/error.tsx` (error boundary ภาษาไทย)
- [ ] เพิ่ม `src/app/loading.tsx` (loading state)
- [ ] ตั้งค่า error monitoring (Sentry หรือ Vercel Analytics)

### 4.3 Form Validation

- [ ] ทดสอบ form validation ทุกฟอร์ม ทุก tab (Thai/Foreign)
- [ ] ทดสอบ edge cases: เบอร์โทรผิดรูปแบบ, ชื่อสั้นเกินไป, ไฟล์ใหญ่เกินไป
- [ ] ทดสอบ submit ซ้ำ (double submit protection)

---

## Phase 5: Content Management (สัปดาห์ที่ 3-4)

### 5.1 Admin Dashboard (Optional)

- [ ] สร้างหน้า Admin สำหรับจัดการทรัพย์ (CRUD)
- [ ] สร้างหน้า Admin สำหรับดู leads/form submissions
- [ ] เพิ่ม Authentication (Supabase Auth)
- [ ] เพิ่มระบบอัปโหลดรูปทรัพย์ผ่าน Admin

### 5.2 Blog CMS

- [ ] เชื่อมต่อ blog content กับ Supabase หรือ CMS (เช่น Notion, Sanity)
- [ ] เพิ่มหน้า blog detail ที่ render markdown/rich text จริง
- [ ] เพิ่มระบบ related posts

---

## Phase 6: Analytics & Marketing (สัปดาห์ที่ 4+)

### 6.1 Tracking

- [ ] ติดตั้ง Google Analytics 4
- [ ] ติดตั้ง Facebook Pixel (สำหรับ retargeting)
- [ ] ตั้ง Conversion Events: form submit, LINE click, phone call click
- [ ] ตั้ง UTM tracking สำหรับ campaigns

### 6.2 Marketing Integration

- [ ] เพิ่ม LINE Official Account widget (floating button)
- [ ] ตั้ง Open Graph images สำหรับ share บน social media
- [ ] ทดสอบ share preview บน LINE, Facebook, Twitter

---

## Phase 7: Testing & QA (ก่อน Go-Live)

### 7.1 Cross-browser Testing

- [ ] Chrome (desktop + mobile)
- [ ] Safari (iPhone)
- [ ] Samsung Internet (Android)
- [ ] LINE in-app browser
- [ ] Facebook in-app browser

### 7.2 Mobile Responsiveness

- [ ] ทดสอบทุกหน้าบน iPhone SE (จอเล็กสุด)
- [ ] ทดสอบทุกหน้าบน iPad
- [ ] ทดสอบ mobile menu / hamburger
- [ ] ทดสอบฟอร์มบน mobile (keyboard ไม่บังปุ่ม submit)

### 7.3 End-to-End Flow

- [ ] ทดสอบ: เข้าหน้าแรก → คลิกดูทรัพย์ → กรอกฟอร์ม → ส่งสำเร็จ → ข้อมูลเข้า Supabase → แจ้งเตือน LINE
- [ ] ทดสอบ: เข้าหน้า contact → กรอกข้อความ → ส่งสำเร็จ
- [ ] ทดสอบ: เข้าหน้า blog → คลิกอ่านบทความ → กลับมาหน้า blog

---

## Quick Reference: Environment Variables

```env
# Required
NEXT_PUBLIC_SITE_URL=https://www.baanaioun.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Optional
LINE_NOTIFY_TOKEN=your-line-notify-token
```

## Quick Reference: Key Files

| ต้องการแก้ | ไฟล์ |
|-----------|------|
| ข้อมูลติดต่อ, โลโก้, ชื่อเว็บ | `src/config/site.ts` |
| เมนู navigation | `src/config/navigation.ts` |
| ข้อมูลทรัพย์ (mock) | `src/data/properties.ts` |
| เนื้อหาแต่ละหน้า | `src/content/{page}.ts` |
| TypeScript interfaces | `src/types/index.ts` |
| Supabase connection | `src/lib/supabase.ts` |
| Form validation rules | `src/lib/form-validation.ts` |
| API: form submit | `src/app/api/submit-form/route.ts` |
| API: image upload | `src/app/api/upload-images/route.ts` |
| SQL setup | `supabase/setup/00_full_setup.sql` |
