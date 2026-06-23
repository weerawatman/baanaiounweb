# การเชื่อมต่อ Supabase — สรุปสถาปัตยกรรมและวิธีดูแล

วันที่เขียน: 2026-06-23

## สถานะปัจจุบัน

เว็บไซต์ดึงข้อมูลจริงจาก Supabase ทั้งหมดแล้ว (ไม่มีข้อมูลตัวอย่างค้างอยู่)
- หน้า public ทุกหน้าอ่านจาก Supabaseผ่าน server component
- admin อ่าน/เขียนผ่าน `@/lib/queries` + `@/actions` (snake_case ตรงกับ DB)
- ฟอร์มส่งเข้า `form_submissions` ผ่าน `app/api/submit-form`
- การล็อกอิน admin ใช้ Supabase Auth (proxy.ts ใน `src/lib/supabase/proxy.ts`)

## ตัวแปรสภาพแวดล้อม (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL        # https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY   # ฝั่ง client + server (RLS)
SUPABASE_SERVICE_ROLE_KEY       # ฝั่ง server เท่านั้น (ข้าม RLS) — ห้าม expose
```

> บน Vercel ใส่ค่าเดียวกันใน Project Settings → Environment Variables

ตรวจสอบการเชื่อมต่อ: `npm run check:supabase`

## สถาปัตยกรรมสองระบบ type (สำคัญ)

มี type คู่กันโดยเจตนา — **อย่ารวมเป็นชุดเดียวโดยไม่คิดก่อน**:

| | `@/lib/types/property` | `@/types` |
|---|---|---|
| รูปแบบ | snake_case (`image_primary`, `price_label`) | camelCase (`imagePrimary`, `priceLabel`) |
| ใช้ที่ไหน | DB / migrations / `@/lib/queries` / admin | client components ฝั่ง public |
| ทำไม | ตรงชื่อคอลัมน์ DB | สะดวกตอนเขียน UI |

**สะพานเชื่อ = `src/lib/mappers.ts`** — แปลง row (snake_case) → รูปแบบ camelCase
ที่ client components ใช้ ก่อนส่งเข้า UI ฝั่ง public เท่านั้น

```
Supabase (snake_case)
  └─ @/lib/queries/*        ← คืน snake_case (admin ใช้ตรงนี้)
       └─ src/lib/mappers   ← แปลง
            └─ *Page.tsx (client, @/types camelCase)
```

admin ใช้ queries ตรงๆ (ต้องการ snake_case เช่น `row.price_label`, `row.deleted_at`)
→ **ห้ามเปลี่ยน return type ของ queries** มิฉะนั้น admin พัง

## โครงสร้าง route ฝั่ง public

ทุกหน้าเป็น "server component ดึงข้อมูล + client component แสดงผล":

| Route | Server (fetch) | Client (UI) |
|---|---|---|
| `/` | `page.tsx` | `HomePage.tsx` |
| `/buy` `/rent` `/land` | `page.tsx` | `BuyPage.tsx` / `RentPage.tsx` / `LandPage.tsx` |
| `/property/[slug]` | `page.tsx` | `PropertyDetailClient.tsx` |
| `/blog` | `page.tsx` | `BlogPage.tsx` |
| `/blog/[slug]` | `page.tsx` | `BlogPostClient.tsx` |
| `/owners` | `page.tsx` | `OwnersPage.tsx` |
| `/sitemap.xml` | `sitemap.ts` (async) | — |

ไฟล์ server component ทำ 3 อย่าง: เรียก query → `.filter()` + `.map(mapper)` →
ส่งเข้า client component เป็น prop

## การแสดงผลทรัพย์ (price / slug / แผนที่ / รูป)

**ราคา** — แสดงคั่นหลักพันอัตโนมัติผ่าน `formatPrice()` ใน `src/lib/format.ts`
- ใช้ใน `PropertyCard` และ `PropertyDetailClient`
- ถ้า `price_label` ว่าง หรือเป็นตัวเลขล้วน → ระบบจัดรูปแบบจาก `price` (เช่น 1990000 → "1,990,000 บาท" หรือ "8,000 บาท/เดือน" กรณีเช่า)
- ถ้า `price_label` เป็นข้อความกำหนดเอง (เช่น "ตกลงกันได้") → ใช้ตามที่กรอก
- ฟิลด์ `price_label` ใน admin ปรับเป็น "ไม่บังคับ" แล้ว

**Slug (URL)** — สร้างอัตโนมัติจากชื่อทรัพย์ (`slugify()` ใน `src/lib/format.ts`)
- พิมพ์ชื่อทรัพย์แล้ว slug เติมเอง (รองรับภาษาไทย) — แก้เองได้ แล้วระบบจะหยุดสร้างอัตโนมัติ
- regex อนุญาตตัวอักษร ตัวเลข ขีด (-) ทั้งละตินและไทย

**แผนที่** — `LocationIntelligence` ใช้พิกัด `lat/lng` ของทรัพย์จริง
- embed: `https://maps.google.com/maps?q=LAT,LNG&z=15&output=embed&hl=th`
- ถ้าไม่มีพิกัด จะใช้ชื่อตำบล/อำเภอแทน; ถ้าไม่มีเลยจะซ่อนแผนที่
- แก้พิกัดผิดได้ที่ฟิลด์ Latitude/Longitude ใน admin

**รูปภาพ** — เก็บใน Supabase Storage bucket `property-images` (public)
- URL รูปอยู่ใน `image_primary` และ `images[]` แสดงผ่าน `next/image`
- โดเมน `*.supabase.co` อนุญาตแล้วใน `next.config.ts` (`remotePatterns`)
- อัปโหลดผ่าน `/api/upload-images`

## เนื้อหาบทความ (blog)

- admin เขียนเนื้อหาผ่าน TipTap (`src/components/admin/BlogEditor.tsx`)
  ซึ่งเก็บเป็น **HTML** (`editor.getHTML()`)
- ฝั่งอ่าน (`BlogPostClient.tsx`) เรนเดอร์ด้วย
  `<div dangerouslySetInnerHTML={{ __html: post.content }} />` ในคลาส `.prose`
- ถ้าเปลี่ยน editor ให้เก็บเป็น JSON ต้องเปลี่ยนฝั่งอ่านด้วย

## ตารางใน DB

`properties`, `blog_posts`, `faqs`, `testimonials`, `form_submissions`,
`admin_users` — สคีมาอยู่ใน `supabase/migrations/` (001–007)
และรวมใน `supabase/setup/00_full_setup.sql`

- ลบทรัพย์ = soft delete (`deleted_at`) ทุก query กรอง `.is("deleted_at", null)`
- บทความ/รีวิว มี flag `published` ฝั่ง public กรองเฉพาะที่ publish แล้ว
- RLS + admin policies อยู่ใน migration 006

## เพิ่มข้อมูลใหม่

1. เข้า `/admin` → ล็อกอิน → หน้าจัดการ properties / blog / faqs / testimonials
2. ข้อมูลเข้า Supabase ทันที หน้า public จะแสดงอัตโนมัติ (server-rendered ต่อ request)
3. หน้าที่ยังไม่มีข้อมูลจะแสดง empty state ที่เตรียมไว้แล้ว

## ทดสอบ

```bash
npm run check:supabase   # การเชื่อมต่อ + ตาราง
npm run typecheck        # ชนิดข้อมูล
npm run lint             # lint
npm run build            # build production
npm run dev              # รันแล้วเปิด / /buy /property/<slug> /blog
```
