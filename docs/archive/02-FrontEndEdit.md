# FrontEndEdit — แผนปรับหน้าแรกตาม Rev.04 + Mockup

> แผนการแก้ไข frontend หน้าแรก (อนุมัติแล้ว) — อ้างอิงสเปก "แผนผังหน้าเว็บหน้าแรก Rev.04" + mockup
> อัปเดต: 2026-06-27

## Context

เจ้าของเว็บส่ง mockup ใหม่ + สเปก Rev.04 ขอปรับ **หน้าแรก** 3 ส่วน (Hero, Services, Footer) เป็นดีไซน์ใหม่แบบ **2 ภาษา (ไทย+อังกฤษพร้อมกัน)** เพื่อรองรับลูกค้าคนไทยและต่างชาติ
เป้าหมาย: ตรง mockup, โครงสร้าง SEO H1/H2/H3 ถูกต้อง, responsive (4 การ์ดแนวนอนบน desktop / เรียงตั้งบนมือถือ) โดยไม่กระทบส่วนอื่นและไม่มี error

## ข้อสรุป Requirement (ยืนยันกับเจ้าของแล้ว)

1. **แสดง 2 ภาษาพร้อมกัน** (ไทย+อังกฤษซ้อนกัน) — ไม่ทำปุ่มสลับ/i18n
2. **คงส่วนเสริมเดิม** (ทรัพย์แนะนำ, จุดเด่น, รีวิว, FAQ, CTA ล่าง) — ปรับเฉพาะ Hero + Services + Footer
3. ปุ่ม Hero ทั้งสอง (คนไทย/ต่างชาติ) → **ฟอร์ม `/contact` เดียวกัน**; ฟอร์มทำ **ป้ายกำกับ 2 ภาษา**; **ไม่เชื่อม** WhatsApp/LINE → ไม่มี field/migration ใหม่
4. **ไม่แตะเมนูบน (Nav)**; ลิงก์ Privacy Policy = **placeholder** (`#`) ยังไม่สร้างหน้าจริง

**Scope:** Frontend + content เท่านั้น — ไม่มี DB/migration/server action change

## ไฟล์ที่ต้องแก้

1. **`src/content/homepage.ts`** — เพิ่ม `HERO` (h1/sub 2 ภาษา + 2 ปุ่ม → `/contact`) และ `SERVICE_CARDS` 4 ใบ (icon, สี, title/pain/solution/cta 2 ภาษา, href: owners/buy/co-agent/academy) ตามข้อความสเปก Rev.04
2. **`src/components/home/HeroSection.tsx`** — เขียนใหม่: พื้นหลังเต็มกว้าง (heroImage + overlay), H1 ไทย+อังกฤษ, ย่อหน้า 2 ภาษา, 2 ปุ่ม (เขียว "สำหรับคนไทย คลิกที่นี่ / Thai Users" + ส้ม "For International Clients Click Here") → `/contact`; เอา toggle/tabs/รูปพิมขวาออก
3. **`src/components/home/ServiceShortcuts.tsx`** — เขียนใหม่: H2 "บริการของเรา | Our Services & Solutions", 4 การ์ด icon บนสุด + H3 2 ภาษา + pain/solution 2 ภาษา + ปุ่ม CTA แยกสีต่อใบ
4. **`src/components/layout/Footer.tsx`** — เพิ่มข้อความปิดท้าย + ลิงก์ Privacy(placeholder)/Blog; คงช่องทางเดิม ไม่เพิ่ม WhatsApp
5. **`src/app/(public)/contact/ContactPage.tsx`** — label/placeholder/ปุ่ม/ข้อความสำเร็จ เป็นไทย+อังกฤษ (logic ส่งฟอร์มคงเดิม)
6. **`src/app/(public)/HomePage.tsx` + `page.tsx`** — wiring props Hero ใหม่ + คงทุก section เสริม

## SEO / Responsive / Assets

- H1 = Hero (ตัวเดียว), H2 = Services, H3 = แต่ละการ์ด
- รูปผ่าน `next/image` (WebP อัตโนมัติ)
- รูปพื้นหลัง Hero: เจ้าของอัป (WebP) ที่ `/admin/profile` ช่อง "รูป Hero" — ระหว่างนี้ใช้ placeholder

## Verification

- `npm run validate` เขียว 0 error/0 warning
- `npm run dev` ตรวจด้วยตา (desktop + mobile) เทียบ mockup: Hero 2 ภาษา + 2 ปุ่ม→/contact, การ์ด 4 ใบ icon บน + ปุ่มแยกสี, Footer ข้อความปิดท้าย + ลิงก์, ฟอร์ม 2 ภาษา, H1 ตัวเดียว
