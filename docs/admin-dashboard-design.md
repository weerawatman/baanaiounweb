# Admin Dashboard — Architecture Design

> ระบบหลังบ้านสำหรับทีมงานบ้านไออุ่น จัดการ **ทรัพย์, Leads, บทความ, รีวิว, FAQ** แบบ CRUD + อัปโหลดรูป
> เอกสารนี้เป็น **design spec** — ใช้รีวิวก่อนลงมือ implement (ดู Build Phases ท้ายเอกสาร)

สถานะ: 📐 Design — รออนุมัติ
อัปเดต: 2026-06-14

---

## 1. เป้าหมายและขอบเขต

| ด้าน | รายละเอียด |
|------|-----------|
| **ผู้ใช้** | ทีมงานบ้านไออุ่น (2–5 คน) — ไม่เปิด public signup |
| **จัดการ** | Properties · Leads · Blog · Testimonials · FAQ (ครบทุกข้อมูลบนเว็บ) |
| **Auth** | Supabase Auth (email + password) |
| **หลักการ** | เจ้าของแก้ข้อมูลเองได้ → เว็บอัปเดตทันทีโดยไม่ต้อง deploy ใหม่ |

**ผลลัพธ์ที่ได้:** เลิกใช้ mock data ใน `src/data/` → ทุกข้อมูลมาจาก Supabase

---

## 2. สถาปัตยกรรมภาพรวม

```
┌──────────────────────────────────────────────────────────────┐
│                     Next.js 16 App (1 เดียว)                  │
│                                                              │
│   เว็บสาธารณะ /              ระบบหลังบ้าน /admin              │
│   ─────────────              ──────────────────              │
│   • อ่านอย่างเดียว           • ต้อง login (Supabase Auth)      │
│   • SELECT published rows    • CRUD ทุก entity                │
│   • anon key                 • server actions + service role  │
│        │                            │                         │
│        └──────────┬─────────────────┘                         │
│                   ▼                                           │
│        src/lib/queries/* (data-access layer ใช้ร่วมกัน)       │
└───────────────────┬──────────────────────────────────────────┘
                    ▼
        ┌────────────────────────┐
        │   Supabase (Postgres)  │
        │  • Auth (auth.users)   │
        │  • Tables + RLS        │
        │  • Storage (รูปภาพ)    │
        └────────────────────────┘
```

**หลักการสำคัญ:**
- Admin อยู่ใน app เดียวกัน ที่ route group `(admin)` → แยก layout/middleware แต่ deploy ก้อนเดียว
- **Mutation ใช้ Next.js Server Actions** (ไม่ต้องสร้าง REST API แยกทุกตัว) — โค้ดน้อย type-safe
- **Data-access layer** (`src/lib/queries/`) เขียนครั้งเดียว ใช้ทั้งฝั่ง public และ admin

---

## 3. Authentication & Authorization

### กลไก

- ใช้ **`@supabase/ssr`** (มาตรฐานปัจจุบันสำหรับ Next.js App Router — cookie-based session)
- **ปิด public signup** ใน Supabase → สร้าง account ทีมงานเองผ่าน Dashboard
- **`src/middleware.ts`** ป้องกันทุก path `/admin/*` (ยกเว้น `/admin/login`):
  - ไม่มี session → redirect ไป `/admin/login`
  - มี session → refresh token แล้วผ่าน
- Helper `requireAdmin()` ใน server actions/pages → กันชั้นที่สอง (defense in depth)

### Authorization (RLS) — สรุปนโยบายต่อตาราง

| ตาราง | `anon` (เว็บสาธารณะ) | `authenticated` (admin) |
|-------|---------------------|------------------------|
| `properties` | SELECT เฉพาะ `status='ACTIVE'` | ALL |
| `blog_posts` | SELECT เฉพาะ `published=true` | ALL |
| `testimonials` | SELECT เฉพาะ `published=true` | ALL |
| `faqs` | SELECT ทั้งหมด | ALL |
| `form_submissions` (leads) | **INSERT เท่านั้น** | SELECT + UPDATE |
| Storage `property-images` | SELECT (อ่านรูป) | INSERT/UPDATE/DELETE |

> RLS เป็น last line of defense — แม้ middleware พลาด ฐานข้อมูลก็ยังกัน anon ไม่ให้เห็น leads/draft

---

## 4. Data Model

### 4.1 ตารางใหม่ที่ต้องสร้าง

**`properties`** — flatten จาก `Property` type (location แตกเป็นคอลัมน์ เพื่อให้ filter/ค้นหาได้)

```sql
properties
  id              UUID PK
  slug            TEXT UNIQUE NOT NULL
  title           TEXT NOT NULL
  type            TEXT CHECK (type IN ('SALE','RENT','LAND'))
  sub_type        TEXT CHECK (sub_type IN ('new','renovated','townhome','residential','investment'))
  price           NUMERIC NOT NULL
  price_label     TEXT NOT NULL              -- ข้อความแสดงผล เช่น "4,500 บาท/เดือน"
  area_sqm        NUMERIC
  bedrooms        INT DEFAULT 0
  bathrooms       INT DEFAULT 0
  description     TEXT
  emotional_desc  TEXT                       -- คำบรรยายอารมณ์
  pim_insight     TEXT                       -- มุมมองพิม
  status          TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','SOLD','RENTED'))
  featured        BOOLEAN DEFAULT false
  images          TEXT[] DEFAULT '{}'
  image_primary   TEXT
  -- location (flatten)
  district        TEXT
  subdistrict     TEXT
  lat             NUMERIC
  lng             NUMERIC
  distance_amata     TEXT
  distance_hospital  TEXT
  distance_market    TEXT
  nearest_estate     TEXT
  amenities       TEXT[] DEFAULT '{}'
  video_url       TEXT
  tags            TEXT[] DEFAULT '{}'
  created_at      TIMESTAMPTZ DEFAULT now()
  updated_at      TIMESTAMPTZ DEFAULT now()  -- trigger auto-update
```

**`blog_posts`**

```sql
blog_posts
  id, slug UNIQUE, title, category, category_slug, excerpt,
  content TEXT,                 -- markdown/rich text
  reading_time TEXT, featured_image TEXT,
  related_property_ids UUID[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ, created_at, updated_at
```

**`testimonials`**

```sql
testimonials
  id, client_name, quote, property_type,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  avatar_url, published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0, created_at
```

**`faqs`**

```sql
faqs
  id, question, answer, page_slug,
  sort_order INT DEFAULT 0, created_at
```

**`form_submissions`** — มีอยู่แล้ว ไม่ต้องสร้างใหม่ (ใช้เป็นตาราง Leads)

### 4.2 Migrations ที่จะเพิ่ม (เลขรันต่อจาก 003)

```
supabase/migrations/
  004_create_properties.sql
  005_create_content_tables.sql      # blog_posts, testimonials, faqs
  006_admin_rls_policies.sql         # RLS ตามตารางข้อ 3
  007_updated_at_triggers.sql        # auto-update updated_at
```

> กฎเดิม: ห้ามแก้ migration เก่า — เพิ่มไฟล์ใหม่เสมอ

### 4.3 Seed: ย้าย mock → DB

สคริปต์ `scripts/seed-from-mock.mjs` อ่าน `src/data/*.ts` → insert เข้าตาราง (รันครั้งเดียวตอนเริ่ม) เพื่อไม่ต้องกรอกข้อมูลเดิมใหม่

---

## 5. โครงสร้างโฟลเดอร์ (ส่วนที่เพิ่ม)

```
src/
  middleware.ts                      # 🆕 ป้องกัน /admin/*
  app/
    (admin)/                         # 🆕 route group — แยก layout จากเว็บสาธารณะ
      admin/
        layout.tsx                   # shell: sidebar + topbar + auth guard
        page.tsx                     # Dashboard: สถิติรวม (จำนวนทรัพย์, leads ใหม่)
        login/page.tsx               # หน้า login
        properties/
          page.tsx                   # ตารางรายการ + ค้นหา/filter
          new/page.tsx               # ฟอร์มเพิ่ม
          [id]/edit/page.tsx         # ฟอร์มแก้ไข
        leads/
          page.tsx                   # ตาราง leads + filter ตาม status
          [id]/page.tsx              # รายละเอียด + เปลี่ยน status + โน้ต
        blog/        { page, new, [id]/edit }
        testimonials/{ page, new, [id]/edit }
        faqs/        { page }        # inline edit (ตารางเดียวจบ)
    actions/                         # 🆕 Server Actions (mutations)
      properties.ts                  # create/update/delete + revalidate
      leads.ts                       # updateStatus, addNote
      blog.ts · testimonials.ts · faqs.ts
  lib/
    supabase/
      client.ts                      # 🆕 browser client (@supabase/ssr)
      server.ts                      # 🆕 server client (อ่าน cookies)
      middleware.ts                  # 🆕 session refresh helper
    queries/                         # 🆕 data-access layer (public + admin ใช้ร่วม)
      properties.ts · blog.ts · testimonials.ts · faqs.ts · leads.ts
    auth/
      guard.ts                       # 🆕 requireAdmin()
    validations/                     # 🆕 Zod schemas (ใช้ทั้ง client + server)
      property.ts · blog.ts · ...
  components/
    admin/                           # 🆕 UI เฉพาะหลังบ้าน
      AdminSidebar.tsx · AdminTopbar.tsx
      DataTable.tsx                  # ตาราง generic (เรียง/ค้นหา/หน้า)
      PropertyForm.tsx               # ฟอร์มใหญ่สุด (reuse ImageUploader เดิม)
      ImageUploader.tsx              # ห่อ logic /api/upload-images ที่มีอยู่
      StatusBadge.tsx · ConfirmDialog.tsx
```

**หลักการ:** `src/lib/supabase.ts` เดิม (anon + service role) ยังอยู่สำหรับ API routes เดิม — ของใหม่แยกเป็น `lib/supabase/{client,server}.ts` สำหรับ auth-aware SSR

---

## 6. Tech Stack ที่ต้องเพิ่ม

| Package | ใช้ทำอะไร | เหตุผล |
|---------|-----------|--------|
| `@supabase/ssr` | Cookie-based auth ใน App Router | มาตรฐาน Supabase ปัจจุบัน |
| `react-hook-form` | จัดการ state ฟอร์ม | ฟอร์มทรัพย์ field เยอะ — performant |
| `zod` | Validation schema | ใช้ schema เดียว client + server |
| `@hookform/resolvers` | เชื่อม RHF + Zod | — |
| `sonner` | Toast notification | feedback หลัง save/delete |
| shadcn: `table`, `form`, `select`, `dropdown-menu`, `sonner`, `alert-dialog` | UI primitives | ส่วนใหญ่มีในโปรเจกต์แล้ว เพิ่มที่ขาด |

> reuse ของเดิม: storage bucket `property-images`, route `/api/upload-images`, shadcn ที่มีอยู่ (button, card, input, dialog, tabs, badge)

---

## 7. UX Flow (สรุป)

1. **Login** → `/admin/login` → กรอก email+password → Supabase Auth → redirect `/admin`
2. **Dashboard** → การ์ดสถิติ (ทรัพย์ ACTIVE, leads ใหม่สัปดาห์นี้, บทความ) + leads ล่าสุด
3. **Properties** → ตาราง (รูป, ชื่อ, ประเภท, ราคา, status) → ปุ่ม เพิ่ม/แก้/ลบ
   - ฟอร์ม: ข้อมูลพื้นฐาน → ทำเล → รูป (drag upload) → คำบรรยาย/insight → tags/amenities
   - กด save → server action → validate (Zod) → upsert → `revalidatePath('/')` → toast
4. **Leads** → ตารางกรองตาม status → คลิกดูรายละเอียด → เปลี่ยน new→contacted→closed + เพิ่มโน้ต
5. **Blog / Testimonials / FAQ** → ตาราง + ฟอร์ม pattern เดียวกับ properties

---

## 8. Build Phases (เมื่ออนุมัติ design แล้ว)

| Phase | งาน | Definition of Done |
|-------|-----|--------------------|
| **A. Foundation** | migrations 004–007, RLS, `@supabase/ssr` clients, middleware, หน้า login, admin shell | login ได้ · เข้า `/admin` โดยไม่ login ถูก redirect · RLS ทดสอบผ่าน |
| **B. Properties CRUD** | queries + actions + ตาราง + ฟอร์ม + ImageUploader | เพิ่ม/แก้/ลบทรัพย์ได้ · รูปอัปโหลดเข้า storage · เว็บสาธารณะเห็นทรัพย์ใหม่ |
| **C. Leads** | ตาราง leads + รายละเอียด + เปลี่ยน status + โน้ต | ดู/อัปเดต lead จาก `form_submissions` ได้ |
| **D. Content** | Blog + Testimonials + FAQ CRUD | จัดการครบ 3 entity · toggle published ได้ |
| **E. Cutover** | seed mock→DB · เปลี่ยน public site อ่านจาก queries · ลบ `src/data/` | `grep "@/data"` = 0 · เว็บอ่านจาก DB ล้วน |

แต่ละ Phase = 1 PR, CI เขียว, `npm run validate` ผ่าน

---

## 9. การตัดสินใจ (สรุปแล้ว — 2026-06-14)

1. **เส้นทางเข้า Admin** → ✅ `/admin` ตามมาตรฐาน (auth 3 ชั้นกัน ไม่ใช้ subdomain)
2. **Rich text บทความ** → ✅ **Rich text editor เต็ม** (Tiptap) — เก็บเป็น HTML ในคอลัมน์ `content`
3. **ลบทรัพย์** → ✅ **Soft delete** — เพิ่มคอลัมน์ `deleted_at TIMESTAMPTZ` (NULL = ใช้งาน), query ปกติกรอง `deleted_at IS NULL`
4. **รูปภาพตอนลบทรัพย์** → เก็บไฟล์ใน storage ไว้ก่อน (กัน orphan ทีหลังด้วย cron)

---

## 10. ความปลอดภัย (เช็คลิสต์ตอน build)

- [ ] `SUPABASE_SERVICE_ROLE_KEY` ใช้เฉพาะ server (action/route) — ห้ามหลุด client bundle
- [ ] ปิด public signup ใน Supabase Auth settings
- [ ] RLS เปิดทุกตาราง — ทดสอบด้วย anon key ว่าเห็นเฉพาะที่ควรเห็น
- [ ] Server action ทุกตัวเรียก `requireAdmin()` ก่อน mutate
- [ ] Validate input ด้วย Zod ทั้ง client และ server (อย่าเชื่อ client)
- [ ] Rate limit หน้า login (กัน brute force)
```
