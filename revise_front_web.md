# Revise Front Web — บ้านไออุ่น (Services Hub + Landing Pages Rev.00)

> **สำหรับ Claude Code:** เอกสารนี้คือ brief งานปรับหน้าเว็บส่วนสาธารณะ (front-end) ตามที่เจ้าของธุรกิจส่งมา (Rev.00 — 29/6/2026)
> อ่าน **ส่วน "การตัดสินใจที่ต้องเคลียร์ก่อน" ให้จบก่อนเริ่ม** — มี 4 จุดที่ขัดกับโค้ดเดิม ต้องยืนยันกับผู้ใช้ก่อนลงมือ
> ทำเป็น Phase ตามท้ายเอกสาร แต่ละ Phase จบแล้วรัน `npm run validate` ให้ผ่านก่อนไปต่อ

---

## 0. การตัดสินใจที่ต้องเคลียร์ก่อนเริ่ม (ถาม user ก่อน)

| # | ประเด็น | brief สั่ง | โค้ดเดิม | คำแนะนำ |
|---|---------|-----------|----------|---------|
| 1 | **URL slug** | `/list-property`, `/find-property`, `/agent-course` (อังกฤษ เพื่อ SEO) | `/owners`, `/buy`, `/academy` | เปลี่ยนตาม brief + ทำ **301 redirect** จาก slug เดิม กันลิงก์เก่า/SEO พัง |
| 2 | **ยุบ `/rent`** | brief รวม ซื้อ-เช่า-สินเชื่อ เป็นหน้าเดียว `/find-property` | มี `/buy`, `/rent`, `/land` แยกกัน | รวมเป็น `/find-property` หน้าเดียว + redirect `/rent`, `/buy`, `/land` → `/find-property` (รอ user ยืนยันว่าจะตัด `/land` ด้วยไหม) |
| 3 | **สองภาษา TH/EN** | ทุก section มี EN กำกับ | ไทยล้วน | ทำ bilingual แบบ **แสดงคู่ TH/EN ในหน้าเดียว** (ตาม brief) — ไม่ใช่ระบบสลับภาษา i18n เต็มรูปแบบ เว้นแต่ user ต้องการ |
| 4 | **ระบบแจ้งเตือน** | Email → `supansa.m@baanaioun.com` + LINE OA `@baan-ai-oun` ผ่าน **Messaging API (Webhook)** | โค้ดใช้ `src/lib/line-notify.ts` (LINE Notify — **ปิดบริการแล้ว มี.ค. 2025**) ยังไม่มี Email | เปลี่ยนเป็น **LINE Messaging API push** + เพิ่ม **Email** (เช่น Resend/SMTP) |

> ⚠️ **อย่าเพิ่งเริ่ม Phase 1 จนกว่า user จะตอบ 4 ข้อนี้** — โดยเฉพาะข้อ 1–2 เพราะกระทบ routing ทั้งระบบ

---

## 1. โครงสร้างเมนู "บริการของเรา" (Services Hub) — จากไฟล์ 2

**เป้าหมาย:** เพิ่มเมนูหลัก **`บริการของเรา | Our Services`** บน Header → ชี้ไปหน้า **Hub `/services`**
หน้า Hub แสดง **4 การ์ด** (รูปประกอบ + ชื่อบริการ TH/EN + คำโปรยสั้น) แต่ละการ์ดลิงก์ไปหน้าย่อย

### ผัง (Site Mapping)

| การ์ด (Service Name) | URL Slug | ปุ่ม CTA บนหน้าแรก | หน้าปลายทาง |
|----------------------|----------|---------------------|--------------|
| ฝากขาย/ปล่อยเช่า · List Your Property | `/list-property` | `ฝากขาย/ปล่อยเช่า \| List Your Property` | Landing (ไฟล์ 1) |
| ค้นหาบ้าน/ปรึกษาสินเชื่อ · Find Your Home | `/find-property` | `ค้นหาบ้าน/ปรึกษาสินเชื่อ \| Find Your Home` | Landing (ไฟล์ 3) |
| คอร์สนายหน้า · Agent Course | `/agent-course` | `สมัครคอร์สนายหน้า \| Enroll in Agent Course` | Landing (ไฟล์ 5) |
| ร่วมเป็น Co-Agent · Partner | `/co-agent` | `ร่วมเป็น Co-Agent` | Landing (ไฟล์ 4) |

### ข้อกำหนด SEO/Technical (จากไฟล์ 2)
- **Hub page** `/services`: การ์ด 4 กล่องสวยงาม (รูป + ชื่อ TH/EN + คำโปรย) ให้ user คลิกเลือก
- **URL = อังกฤษ** ตาม slug ด้านบน (ดีต่อ Google + AI Search)
- **Header label**: `บริการของเรา | Our Services` → กดแล้ววิ่งไปหน้า Hub `/services` (กระจาย traffic)
- **Breadcrumb**: ทุกหน้าย่อยมี breadcrumb `หน้าแรก > บริการของเรา > [ชื่อบริการ]`
- **เหตุผล (tip):** Hub = "สารบัญ" ให้ Google เข้าใจ + อนาคตเพิ่มบริการแค่เพิ่มการ์ด ไม่ต้องแก้ Header

### ไฟล์โค้ดที่เกี่ยวข้อง
- เมนู: `src/config/navigation.ts` (`NAV_ENTRIES` มี dropdown อยู่แล้ว — ปรับเป็นลิงก์ Hub)
- Header: `src/components/layout/Header.tsx`
- หน้า Hub ใหม่: สร้าง `src/app/(public)/services/page.tsx`
- การ์ดบริการ: อาจ reuse pattern จาก `src/content/homepage.ts` (`HOMEPAGE_SERVICES`)

---

## 2. เนื้อหารายหน้า (คัดลอกจาก brief ต้นฉบับ — ใช้ได้เลย)

> ทุกหน้าโครงเหมือนกัน: **Hero (headline + sub) → "ทำไมต้องเลือกเรา" 3 ข้อ → "3 ขั้นตอน" → ฟอร์ม → หมายเหตุความลับ**
> แสดง **TH/EN คู่กัน** ตาม brief
> โค้ดเนื้อหาเดิมอยู่ที่ `src/content/*.ts` — ปรับ/แทนที่ตามด้านล่าง

### 2.1 `/list-property` — ฝากขาย/ปล่อยเช่า (ไฟล์ 1, เดิม `/owners`)

**Hero**
- H1: `ฝากขาย-ปล่อยเช่าอสังหาฯ กับ บ้านไออุ่น | List Your Property with Baan Ai Oun`
- Sub TH: จบทุกปัญหาขายยาก ปวดหัวเอกสาร และการฉ้อโกง — บริการครบวงจร ปิดดีลไว ไว้ใจได้ 100%
- Sub EN: Stop worrying about unsold properties, complex paperwork, or scams. We handle everything from start to finish.

**ทำไมเจ้าของทรัพย์ถึงเลือก บ้านไออุ่น? | Why Choose Us?**
1. **ทำการตลาดเชิงรุก ครบทุกช่องทาง (Omnichannel Marketing)** — โปรโมตทั้งออนไลน์/ออฟไลน์ เจาะลูกค้าตัวจริง รับทุกประเภททรัพย์ทั่วไทย ฐานแข็งแกร่งใน กทม. ปริมณฑล และ EEC (ชลบุรี ฉะเชิงเทรา)
2. **คัดกรองผู้ซื้อและผู้เช่า (Verified Clients Only)** — หมดห่วงผู้เช่าค้างชำระ/ทรัพย์เสียหาย/กู้ไม่ผ่าน คัดประวัติ อาชีพ ความพร้อมการเงินก่อนพาชมเสมอ
3. **จัดการเอกสารและสัญญาเบ็ดเสร็จ (Hassle-Free Paperwork)** — ดูแลตั้งแต่สัญญาเช่า/จะซื้อจะขาย ยื่นสินเชื่อ ถึงวันโอน ณ กรมที่ดิน

**ฝากทรัพย์ง่ายๆ ใน 3 ขั้นตอน | 3 Simple Steps to List**
1. ส่งข้อมูลเบื้องต้น (Submit Your Info) — กรอกฟอร์ม 1 นาที
2. ประเมินราคาและถ่ายทำ (Valuation & Media) — ทีมลงพื้นที่ประเมินตลาด + ถ่ายภาพ
3. ทำการตลาดและปิดดีล (Market & Close) — หาลูกค้า เจรจา จัดการเอกสารจนจบ

**ฟอร์มฝากทรัพย์ | Property Listing Form**
- ชื่อ-นามสกุล / Full Name — text
- เบอร์โทรศัพท์ / Phone — text
- จุดประสงค์ / Purpose — checkbox: ฝากขาย (For Sale) / ฝากปล่อยเช่า (For Rent)
- ประเภททรัพย์ / Property Type — dropdown: บ้านเดี่ยว, ทาวน์โฮม, คอนโด, ที่ดิน, อื่นๆ
- ทำเลที่ตั้ง (จังหวัด/อำเภอ) / Location — text
- ราคาที่คาดหวัง / Expected Price — text
- รายละเอียดเพิ่มเติม หรือแนบลิงก์รูปภาพ / Additional Details or Photo Links — textarea
- ปุ่ม: `ส่งข้อมูลให้ทีมงาน | Submit Information`
- หมายเหตุ: ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุด / Your information is kept strictly confidential

### 2.2 `/find-property` — ผู้ซื้อ-เช่า (ไฟล์ 3, เดิม `/buy` + อาจรวม `/rent`)

**Hero**
- H1: `ค้นหาบ้านที่ใช่ และบริการสินเชื่อครบวงจร | Find Your Dream Home & Loan Solutions`
- Sub TH: คัดทรัพย์ตรงโจทย์ ดูแลสินเชื่อและสัญญา จบที่เดียว ไม่มีค่าใช้จ่ายสำหรับผู้ซื้อและผู้เช่า
- Sub EN: Curated property matching, expert loan assistance, and seamless contract handling. 100% Free for buyers and renters.

**ทำไมต้องหาบ้านกับ บ้านไออุ่น? | Why Buy or Rent with Us?**
1. **คัดทรัพย์คุณภาพ ตรงตามงบประมาณ (Curated Properties)** — ฐานทรัพย์หลากหลาย ช่วยกรองทำเล/ราคาที่ตรงใจ ประหยัดเวลา
2. **บริการที่ปรึกษาสินเชื่อฟรี ดันทุกเคส (Free Loan Consultation)** — ประเมินวงเงินล่วงหน้า วางแผนเครดิต ประสานธนาคารชั้นนำ ไม่มีค่าใช้จ่ายแอบแฝง
3. **ดูแลสัญญาและกฎหมาย ปลอดภัย 100% (Secure & Legal Contracts)** — ดูแลสัญญาจะซื้อจะขาย/เช่า + พาจบขั้นตอนโอนที่กรมที่ดิน

**เป็นเจ้าของบ้านง่ายๆ ใน 3 ขั้นตอน | 3 Simple Steps to Your New Home**
1. แจ้งความต้องการ (Tell Us What You Need) — ระบุทำเล สเปก งบ
2. ชมทรัพย์และประเมินสินเชื่อ (Viewings & Loan Pre-check)
3. ทำสัญญาและย้ายเข้าอยู่ (Close & Move In)

**แบบฟอร์ม | Buyer/Renter Inquiry Form**
- ชื่อ-นามสกุล / Full Name — text
- เบอร์โทรศัพท์ / Phone — text
- ความต้องการ / I am looking to — checkbox: ซื้อ (Buy) / เช่า (Rent) / ปรึกษาสินเชื่อ (Loan Consultation)
- ประเภททรัพย์ที่สนใจ / Property Type — dropdown (เหมือนข้างบน)
- ทำเลที่สนใจ / Preferred Location — text
- งบประมาณ (ราคาซื้อหรือค่าเช่า/เดือน) / Budget — text
- รายละเอียดเพิ่มเติม (เช่น จำนวนห้องนอน, เลี้ยงสัตว์ได้) — textarea
- ปุ่ม: `ส่งข้อมูลให้ทีมงาน | Submit Inquiry`
- หมายเหตุ: เก็บเป็นความลับสูงสุด / strictly confidential

### 2.3 `/co-agent` — Co-Agent (ไฟล์ 4, slug เดิม)

**Hero**
- H1: `ร่วมเป็น Co-Agent กับ บ้านไออุ่น | Partner with Baan Ai Oun`
- Sub TH: มีทรัพย์แต่หาลูกค้าไม่ได้? กังวลค่าการตลาด? — ฝากทรัพย์ฟรี! เราช่วยทำการตลาดจนกว่าจะปิดดีลได้
- Sub EN: Have listings but no clients? Worried about marketing costs? We market your listings for free until closed!

**ทำไมถึงควร Co-Broke กับ บ้านไออุ่น? | Why Co-Broke with Us?**
1. **เรามีฐานลูกค้าพร้อมซื้อ-เช่า (Access to Ready Clients)** — ลูกค้าผ่านการคัดกรองการเงิน/สินเชื่อ พร้อมแมตช์ทันที
2. **ทำการตลาดเชิงรุกให้ฟรี (Zero Marketing Costs)** — ช่วยดันโพสต์ ยิงแอด ลงประกาศในเครือข่าย ไม่มีค่าใช้จ่ายล่วงหน้า
3. **โปร่งใส แบ่งคอมมิชชันชัดเจน (Transparent & Fair Commission Split)** — มีสัญญา Co-Broke รับรองชัดเจน ปลอดภัยสองฝ่าย

**ขั้นตอนการทำงานร่วมกัน | 3 Steps to Close Deals Together**
1. ส่งข้อมูลทรัพย์ (Submit Your Listing)
2. จับคู่ลูกค้า & พาชมทรัพย์ (Match & View)
3. ปิดดีล & รับส่วนแบ่ง (Close & Split)

**แบบฟอร์ม | Co-Agent Listing Form**
- ชื่อ-นามสกุล (นายหน้า) / Agent Name — text
- เบอร์โทรศัพท์ / Phone — text
- LINE ID — text (เพื่อความรวดเร็วในการประสานงานระหว่างนายหน้า)
- ประเภททรัพย์ / Property Type — dropdown
- ทำเลที่ตั้ง / Location — text
- ราคาขาย-เช่า / Listing Price — text
- เงื่อนไขคอมมิชชัน / Commission Offer — text (เช่น แบ่ง 50/50 หรือตามตกลง)
- ลิงก์ข้อมูลทรัพย์หรือรูปภาพ / Property Link or Photos — textarea
- ปุ่ม: `ส่งข้อมูลทรัพย์ Co-Agent | Submit Co-Agent Listing`
- หมายเหตุ: เราเคารพสิทธิ์การดูแลทรัพย์ของคุณ ข้อมูลใช้เพื่อ Co-Broke เท่านั้น / We respect your listing rights.

### 2.4 `/agent-course` — คอร์สนายหน้า (ไฟล์ 5, เดิม `/academy`)

**Hero**
- H1: `2 วันนี้...คุณจะได้อะไรกลับไปบ้าง?`
- Sub: "นี่ไม่ใช่แค่คอร์ส...แต่คือ 'Workshop พลิกชีวิต' ที่จะมอบทั้ง 'แผนที่' และ 'พลังใจ' ให้คุณ!"

**✨ วันแรก: "รากฐานความคิด" ที่ถูกต้อง (THE FOUNDATION & THE MINDSET)**
> คุณจะกลับบ้านไปพร้อม "เข็มทิศในใจ" ที่ชัดเจน และ "พลังใจ" ที่พร้อมจะลงมือทำ!
- ✅ ค้นพบ "WHY" ที่ทรงพลังของคุณ (ค่าเทอมลูก? ทริปเที่ยว? ปลดหนี้?)
- 🗺️ เห็น "แผนที่" สร้างเงินจากอสังหาฯ — 7+ วิธีทำเงิน + ค้นพบสไตล์ที่เหมาะกับคุณ
- 🧠 ติดตั้ง "MINDSET เศรษฐี" ฉบับคนเคยล้ม — เปลี่ยน "ความกลัว" เป็น "เชื้อเพลิง"
- 🛠️ ได้ "คลังอาวุธ" นายหน้ามือใหม่ — ทักษะหัวใจ (ฟัง, เจรจา, สร้างความไว้วางใจ)

**🏃 วันที่สอง: "ลงมือทำ" จริง! (The Agent's Game & Action)**
> วันแห่งการเปลี่ยน "ทฤษฎี" เป็น "ความจริง" เหมือนมีพี่เลี้ยงส่วนตัว
- 🏡 เป็น "นักประเมินทรัพย์" ได้ในครึ่งวัน — ลงพื้นที่ดูทรัพย์จริง + Checklist
- 📈 สร้าง "การตลาดที่โดนใจ" — Workshop สร้างโพสต์ + ฝึกใช้ AI เขียนคำโฆษณา
- 🤝 "ปิดการขาย" อย่างมั่นใจ — Role Play ทุกสถานการณ์จริง
- 🎉 เห็นภาพ "อิสรภาพที่เป็นจริง" — Workshop วางแผนการเงินหลังกำไรก้อนแรก

**🚀 ผลลัพธ์ที่คุณจะได้รับ**
เดินออกจากคอร์สในฐานะ "นายหน้ามือใหม่" ที่มีความรู้ ความมั่นใจ และ "แผนลงมือทำ" พร้อมสร้าง "ค่าคอมฯ ก้อนแรก"

**แบบฟอร์มลงทะเบียน | Agent Course Registration Form**
- ชื่อ-นามสกุล / Full Name — text
- เบอร์โทรศัพท์ / Phone — text
- LINE ID — text
- อาชีพปัจจุบัน / Current Occupation — text
- เป้าหมายที่อยากได้จากคอร์ส (WHY ของคุณ) / Your Goal — textarea
- ปุ่ม: `สมัครคอร์สพลิกชีวิต | Register Now`
- หมายเหตุ: ทีมงานจะติดต่อกลับเพื่อแจ้งรอบเรียนและสถานที่ / Our team will contact you with schedule and location.

---

## 3. Requirement การแจ้งเตือนเมื่อ Submit Form (ทุกฟอร์ม)

ทุกฟอร์มเมื่อกดส่ง ต้องทำ 2 อย่าง:

### 3.1 Email Notification
- ส่งรายละเอียด **ทั้งหมด** ไปที่ `supansa.m@baanaioun.com`
- Subject เฉพาะแต่ละฟอร์ม:
  - ฝากทรัพย์: `[Lead ใหม่] แจ้งฝากทรัพย์จากหน้าเว็บไซต์บ้านไออุ่น`
  - ค้นหาบ้าน/สินเชื่อ: `[Lead ใหม่] ลูกค้าตามหาบ้าน/ปรึกษาสินเชื่อ จากเว็บไซต์บ้านไออุ่น`
  - Co-Agent: `[Co-Agent ใหม่] มีนายหน้าส่งทรัพย์มาเสนอ Co-Broke`
  - คอร์ส: `[นักเรียนใหม่] สมัครคอร์สนายหน้า Workshop พลิกชีวิต`

### 3.2 LINE Notification (LINE OA Messaging API — **ไม่ใช่ LINE Notify**)
- ยิงข้อความสรุป (เฉพาะฟิลด์สำคัญ) ไป LINE OA `@baan-ai-oun` ผ่าน **Messaging API (Webhook/Push)** แบบ realtime
- ฟิลด์สรุปต่อฟอร์ม:
  - ฝากทรัพย์: ชื่อ, เบอร์, จุดประสงค์, ประเภททรัพย์, ทำเล, ราคา
  - ค้นหาบ้าน: ชื่อ, เบอร์, ความต้องการ, ประเภททรัพย์, ทำเล, งบประมาณ
  - Co-Agent: ชื่อเอเจนต์, เบอร์, LINE ID, ประเภททรัพย์, ทำเล, ราคา
  - คอร์ส: ชื่อ, เบอร์, LINE ID, อาชีพ, เป้าหมาย

### ไฟล์โค้ดที่เกี่ยวข้อง
- API รับฟอร์ม: `src/app/api/submit-form/route.ts` (มี Supabase insert อยู่แล้ว)
- LINE เดิม (ต้องเปลี่ยน): `src/lib/line-notify.ts` → สร้างใหม่ `src/lib/line-messaging.ts` (ใช้ Channel Access Token + push message)
- Email ใหม่: สร้าง `src/lib/email.ts` (แนะนำ Resend หรือ nodemailer/SMTP)
- env ที่ต้องเพิ่ม: `LINE_CHANNEL_ACCESS_TOKEN`, `LINE_TARGET_ID` (กลุ่ม/ผู้รับ), `RESEND_API_KEY` หรือ SMTP creds, `NOTIFY_EMAIL_TO=supansa.m@baanaioun.com`

---

## 4. แผนการลงมือ (Phases)

> เริ่มได้หลัง user ตอบ "การตัดสินใจ" ข้อ 0 แล้วเท่านั้น

| Phase | งาน | Definition of Done |
|-------|-----|--------------------|
| **0. Confirm** | ยืนยัน 4 ข้อในส่วนที่ 0 กับ user | ได้คำตอบครบ — slug / ยุบ rent / bilingual / ช่องทางแจ้งเตือน |
| **1. Routing & Hub** | สร้าง `/services` hub (4 การ์ด) · เปลี่ยน slug + redirect เดิม · อัปเดต `navigation.ts` + Header | เมนู "บริการของเรา" → `/services` · ทุก slug ใหม่ 200 · slug เดิม 301 → ใหม่ · `npm run validate` ผ่าน |
| **2. Content TH/EN** | ปรับ `src/content/*.ts` ทั้ง 4 หน้าตามส่วนที่ 2 (Hero/3เหตุผล/3ขั้นตอน/หมายเหตุ คู่ TH/EN) | ทุกหน้าแสดงเนื้อหาใหม่ครบ TH/EN · ตรงกับ brief |
| **3. Forms** | ปรับฟิลด์ฟอร์มแต่ละหน้าตามส่วนที่ 2 · อัปเดต `PropertyForm.tsx`, `form-options.ts`, `form-validation.ts` | ทุกฟอร์มมีฟิลด์ตรง brief · validation ผ่าน · submit เข้า Supabase ได้ |
| **4. Notifications** | LINE Messaging API (`line-messaging.ts`) + Email (`email.ts`) · เสียบใน `submit-form/route.ts` | submit แล้วได้ทั้ง Email + LINE OA · ทดสอบครบทุกฟอร์ม |
| **5. QA** | ทดสอบทุกหน้า + mobile + LINE in-app browser · Lighthouse | ทุก flow ผ่าน · redirect ถูกต้อง · ไม่มี console error |

---

## 5. ไฟล์อ้างอิงในโปรเจกต์ (Quick Map)

| ต้องแก้ | ไฟล์ |
|---------|------|
| เมนู Header / dropdown | `src/config/navigation.ts`, `src/components/layout/Header.tsx` |
| เนื้อหารายหน้า | `src/content/{owners,buy,rent,land,co-agent,academy}.ts` |
| ตัวเลือกฟอร์ม (dropdown) | `src/content/form-options.ts` |
| Component ฟอร์ม | `src/components/shared/PropertyForm.tsx` |
| Validation ฟอร์ม | `src/lib/form-validation.ts` |
| API รับฟอร์ม | `src/app/api/submit-form/route.ts` |
| แจ้งเตือน LINE (เปลี่ยนใหม่) | `src/lib/line-notify.ts` → `src/lib/line-messaging.ts` |
| หน้าเพจสาธารณะ | `src/app/(public)/{owners,buy,rent,land,co-agent,academy}/page.tsx` |
| หน้า Hub (สร้างใหม่) | `src/app/(public)/services/page.tsx` |
| redirect slug เดิม | `next.config.ts` (`redirects()`) |

---

## 6. หมายเหตุบริบทโปรเจกต์

- Next.js 16 (App Router) — middleware เปลี่ยนชื่อเป็น `proxy.ts` แล้ว, `cookies()` เป็น async
- หน้าสาธารณะอยู่ใน route group `src/app/(public)/` (มี Header/Footer); admin อยู่แยก
- โครงสร้างข้อมูล/เนื้อหาแยกเป็น `types/ config/ content/ data/` แล้ว
- ดูบริบทเพิ่มเติม: `TODO.md` (production playbook), `docs/admin-dashboard-design.md`
- ก่อน commit ใหญ่: `npm run validate` (typecheck + lint + build)
