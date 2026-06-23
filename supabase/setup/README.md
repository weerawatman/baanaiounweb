# Supabase Setup — Baan Ai Oun Property

SQL Master สำหรับสร้างฐานข้อมูล Supabase ตั้งแต่ต้น

## วิธีใช้

### ตัวเลือก A: รันทั้งหมดในครั้งเดียว

1. เปิด Supabase Dashboard → **SQL Editor** → **New query**
2. Copy เนื้อหาจาก `00_full_setup.sql` ทั้งหมด
3. กด **Run**
4. เสร็จ!

### ตัวเลือก B: รันทีละขั้นตอน

รันตามลำดับ:

| ไฟล์                      | รายละเอียด                             |
| ------------------------- | -------------------------------------- |
| `01_create_table.sql`     | สร้างตาราง `form_submissions`          |
| `02_indexes.sql`          | สร้าง indexes สำหรับ query             |
| `03_rls_policies.sql`     | ตั้ง Row Level Security                |
| `04_storage_bucket.sql`   | สร้าง Storage bucket `property-images` |
| `05_storage_policies.sql` | ตั้งสิทธิ์อ่าน/อัปโหลดรูปภาพ           |

## Environment Variables

หลัง setup เสร็จ ตั้งค่าใน `.env.local` หรือ Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
LINE_NOTIFY_TOKEN=xxxxxxx
```

ดูค่าได้ที่: Supabase Dashboard → **Settings** → **API**

## โครงสร้างตาราง

```
form_submissions
├── id              UUID (PK, auto)
├── created_at      TIMESTAMPTZ (auto)
├── form_tag        TEXT (owner/buyer/co-agent/academy/...)
├── name            TEXT (required)
├── phone           TEXT
├── line_id         TEXT
├── email           TEXT
├── contact         TEXT (WhatsApp/WeChat)
├── property_type   TEXT
├── property_size   TEXT
├── location        TEXT
├── region          TEXT
├── price           TEXT
├── purpose         TEXT
├── requirement     TEXT
├── preferred_size  TEXT
├── budget          TEXT
├── details         TEXT
├── preselect       TEXT (SALE/RENT/LAND)
├── image_urls      TEXT[] (URLs รูปทรัพย์)
├── status          TEXT (new/contacted/closed)
└── notes           TEXT (โน้ตทีมงาน)
```

## Storage Bucket

- **Bucket**: `property-images`
- **Public**: ใช่ (อ่านรูปได้ผ่าน URL โดยตรง)
- **Upload**: anon + service_role
- **Path format**: `uploads/{timestamp}-{index}.{ext}`
