# PROMPT-MOCKUP.md — คำสั่งสร้าง Interactive Prototype พร้อม Mock Data

> ใช้ไฟล์นี้เป็นคำสั่งสำหรับ Claude Code หรือ Gemini CLI
> เพื่อสร้าง Clickable Prototype ที่มี Mock Data ให้ลูกค้า Review ก่อนพัฒนาจริง

---

## 🎯 เป้าหมาย

สร้าง **Interactive Mockup Prototype** ของเว็บไซต์ Baan Ai Oun Property ที่:
1. **กดเชื่อมระหว่างหน้าได้ทุกหน้า** — Navigation, ปุ่ม, Card, Link ทุกตัวต้องกดไปหน้าที่ถูกต้องได้
2. **มี Mock Data สมจริง** — ข้อมูลทรัพย์, บทความ, รีวิว, FAQ เป็นภาษาไทย สมจริงเหมือนเว็บจริง
3. **ไม่ต้องต่อ Database** — ใช้ JSON/TypeScript Mock Data ฝังในโค้ดตรง ๆ (ไม่ต้อง Prisma, ไม่ต้อง Docker)
4. **ดูสวยใกล้เคียงของจริง** — ใช้ Design System จริง (สี, ฟอนต์, Layout) แต่ใช้ Placeholder Image แทนรูปจริง
5. **Deploy ได้ทันที** — `npm run dev` แล้วส่ง URL ให้ลูกค้ากดดูได้เลย

> **สำคัญ:** นี่คือ Prototype สำหรับ Review UX/Flow เท่านั้น — ไม่ต้อง Backend, ไม่ต้อง Auth, ไม่ต้อง API จริง

---

## 📋 ขั้นตอนที่ต้องทำ (ทำตามลำดับ)

### Step 1: Init Project

```bash
npx create-next-app@latest baan-ai-oun-prototype \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint

cd baan-ai-oun-prototype
npm install framer-motion lucide-react recharts embla-carousel-react embla-carousel-autoplay
npx shadcn@latest init -d
npx shadcn@latest add button card badge input accordion dialog separator sheet tabs avatar
```

### Step 2: สร้าง Mock Data

สร้างไฟล์ `src/lib/mock-data.ts` ที่มีข้อมูล Mock ทั้งหมดเป็นภาษาไทย ดังนี้:

#### 2.1 Mock Properties (8 รายการ)

```typescript
// src/lib/mock-data.ts

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: "SALE" | "RENT" | "LAND";
  subType: "new" | "renovated" | "townhome" | "residential" | "investment";
  price: number;
  priceLabel: string;
  areaSqm: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  emotionalDesc: string;
  pimInsight: string;
  status: "ACTIVE" | "SOLD" | "RENTED";
  featured: boolean;
  images: string[];          // Placeholder URLs
  imagePrimary: string;
  location: {
    district: string;
    subdistrict: string;
    lat: number;
    lng: number;
    distanceToAmata: string;
    distanceToHospital: string;
    distanceToMarket: string;
    nearestIndustrialEstate: string;
  };
  amenities: string[];
  videoUrl?: string;
  tags: string[];
  createdAt: string;
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-001",
    slug: "baan-paphada-renovate-banbung",
    title: "บ้านปภาดา รีโนเวทใหม่ยกหลัง บ้านบึง",
    type: "SALE",
    subType: "renovated",
    price: 1890000,
    priceLabel: "1,890,000 บาท",
    areaSqm: 120,
    bedrooms: 3,
    bathrooms: 2,
    description: "บ้านเดี่ยวชั้นเดียว หมู่บ้านปภาดา บ้านบึง รีโนเวทใหม่ทั้งหลัง ครัวไทยกว้างขวาง ที่จอดรถ 2 คัน ใกล้ตลาดบ้านบึง 5 นาที",
    emotionalDesc: "ตื่นเช้ามาจิบกาแฟที่ระเบียงหน้าบ้าน ลมเย็น ๆ พัดเข้ามา ไม่ต้องเปิดแอร์ก็สบาย ครัวกว้างพอให้แม่มาทำอาหารตอนปีใหม่ได้สบาย ๆ หลังนี้พิมรีโนเวทเองตั้งแต่หลังคาจนถึงพื้น เลือกกระเบื้องทุกแผ่น เพราะอยากให้คนที่ได้บ้านหลังนี้ไป รู้สึกเหมือนได้บ้านใหม่ในราคาบ้านมือสอง",
    pimInsight: "หลังนี้พิมชอบตรงครัวกว้างมากค่ะ เหมาะกับคนชอบทำอาหาร แล้วก็ลมพัดดีมาก ตอนบ่าย ๆ นั่งระเบียงสบายเลย ราคานี้ผ่อนเดือนละประมาณ 7,000-8,000 บาท สบายมากค่ะ",
    status: "ACTIVE",
    featured: true,
    images: [
      "https://placehold.co/800x600/1B4D3E/FFFFFF?text=บ้านปภาดา+ภาพ+1",
      "https://placehold.co/800x600/2A6B56/FFFFFF?text=ครัวกว้าง",
      "https://placehold.co/800x600/D4A843/FFFFFF?text=ห้องนอนใหญ่",
      "https://placehold.co/800x600/2E75B6/FFFFFF?text=ห้องน้ำใหม่",
      "https://placehold.co/800x600/F5F0E8/1A1A2E?text=ระเบียงหน้าบ้าน",
    ],
    imagePrimary: "https://placehold.co/800x600/1B4D3E/FFFFFF?text=บ้านปภาดา+รีโนเวท",
    location: {
      district: "บ้านบึง",
      subdistrict: "บ้านบึง",
      lat: 13.3167,
      lng: 101.1167,
      distanceToAmata: "12 กม. (15 นาที)",
      distanceToHospital: "3 กม. (5 นาที)",
      distanceToMarket: "1.5 กม. (3 นาที)",
      nearestIndustrialEstate: "นิคมอมตะนคร",
    },
    amenities: ["ที่จอดรถ 2 คัน", "ครัวไทย", "สวนหน้าบ้าน", "รั้วรอบขอบชิด", "กล้องวงจรปิด"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["รีโนเวท", "บ้านบึง", "บ้านเดี่ยว", "แนะนำ"],
    createdAt: "2026-02-15",
  },
  {
    id: "prop-002",
    slug: "townhome-near-amata-rent",
    title: "ทาวน์โฮม 2 ชั้น ใกล้นิคมอมตะ ให้เช่า",
    type: "RENT",
    subType: "townhome",
    price: 4500,
    priceLabel: "4,500 บาท/เดือน",
    areaSqm: 80,
    bedrooms: 2,
    bathrooms: 1,
    description: "ทาวน์โฮม 2 ชั้น เฟอร์นิเจอร์ครบ แอร์ 2 ตัว เครื่องทำน้ำอุ่น พร้อมอยู่ ใกล้นิคมอมตะนคร 10 นาที เลี้ยงสัตว์ได้",
    emotionalDesc: "กลับจากงานมาเปิดประตูเข้าบ้าน แอร์เย็นฉ่ำรออยู่แล้ว โซฟานุ่ม ๆ ให้นั่งพัก ครัวเล็ก ๆ ทำมาม่าหรือข้าวผัดได้สบาย ที่นี่ไม่ใช่แค่ห้องเช่า แต่เป็น 'รัง' ที่อบอุ่นของคุณ",
    pimInsight: "หลังนี้เหมาะกับคนทำงานนิคมอมตะมากค่ะ ขับรถ 10 นาทีถึง เฟอร์ครบไม่ต้องซื้อเพิ่ม แล้วก็เลี้ยงหมาได้ด้วยนะคะ เจ้าของใจดี",
    status: "ACTIVE",
    featured: true,
    images: [
      "https://placehold.co/800x600/2E75B6/FFFFFF?text=ทาวน์โฮม+ด้านหน้า",
      "https://placehold.co/800x600/1B4D3E/FFFFFF?text=ห้องนั่งเล่น",
      "https://placehold.co/800x600/D4A843/FFFFFF?text=ห้องนอน",
    ],
    imagePrimary: "https://placehold.co/800x600/2E75B6/FFFFFF?text=ทาวน์โฮม+ใกล้อมตะ",
    location: {
      district: "บ้านบึง",
      subdistrict: "หนองบอนแดง",
      lat: 13.3210,
      lng: 101.1350,
      distanceToAmata: "8 กม. (10 นาที)",
      distanceToHospital: "5 กม. (8 นาที)",
      distanceToMarket: "2 กม. (4 นาที)",
      nearestIndustrialEstate: "นิคมอมตะนคร",
    },
    amenities: ["เฟอร์นิเจอร์ครบ", "แอร์ 2 ตัว", "เครื่องทำน้ำอุ่น", "เลี้ยงสัตว์ได้", "ที่จอดรถ"],
    tags: ["ให้เช่า", "ใกล้นิคม", "ทาวน์โฮม", "เลี้ยงสัตว์ได้"],
    createdAt: "2026-03-01",
  },
  {
    id: "prop-003",
    slug: "ban-diao-chon-buri-new",
    title: "บ้านเดี่ยว โครงการใหม่ ชลบุรี",
    type: "SALE",
    subType: "new",
    price: 2450000,
    priceLabel: "2,450,000 บาท",
    areaSqm: 150,
    bedrooms: 3,
    bathrooms: 2,
    description: "บ้านเดี่ยว 2 ชั้น โครงการใหม่ ใกล้ถนนสาย 344 สไตล์โมเดิร์น ครัวแยก โรงรถ 2 คัน สระว่ายน้ำส่วนกลาง",
    emotionalDesc: "บ้านใหม่กลิ่นปูนหอม ๆ ห้องนอนใหญ่พอวางเตียง King Size ได้สบาย ๆ เปิดม่านตอนเช้ามีแดดส่องเข้ามาอุ่น ๆ ลูก ๆ วิ่งเล่นหน้าบ้านได้ปลอดภัย",
    pimInsight: "โครงการนี้ทำเลดีมากค่ะ ออกถนนใหญ่สะดวก แต่เข้าไปในโครงการเงียบสงบ มีสระว่ายน้ำส่วนกลางให้ลูก ๆ ว่ายน้ำวันหยุดด้วย",
    status: "ACTIVE",
    featured: false,
    images: [
      "https://placehold.co/800x600/1B4D3E/FFFFFF?text=โครงการใหม่+ชลบุรี",
      "https://placehold.co/800x600/D4A843/FFFFFF?text=ห้องนั่งเล่น+โมเดิร์น",
    ],
    imagePrimary: "https://placehold.co/800x600/1B4D3E/FFFFFF?text=บ้านเดี่ยว+โครงการใหม่",
    location: {
      district: "บ้านบึง",
      subdistrict: "คลองกิ่ว",
      lat: 13.2989,
      lng: 101.1456,
      distanceToAmata: "15 กม. (20 นาที)",
      distanceToHospital: "6 กม. (10 นาที)",
      distanceToMarket: "3 กม. (5 นาที)",
      nearestIndustrialEstate: "นิคมอมตะซิตี้",
    },
    amenities: ["สระว่ายน้ำส่วนกลาง", "รปภ. 24 ชม.", "ครัวแยก", "โรงรถ 2 คัน"],
    tags: ["โครงการใหม่", "ชลบุรี", "บ้านเดี่ยว"],
    createdAt: "2026-03-10",
  },
  {
    id: "prop-004",
    slug: "baan-chao-banbung-pet-friendly",
    title: "บ้านเช่าบ้านบึง เลี้ยงหมาได้ พร้อมเฟอร์",
    type: "RENT",
    subType: "townhome",
    price: 5000,
    priceLabel: "5,000 บาท/เดือน",
    areaSqm: 90,
    bedrooms: 2,
    bathrooms: 1,
    description: "บ้านเช่าชั้นเดียว เฟอร์ครบ สนามหญ้าให้น้องหมาวิ่งเล่น ใกล้ตลาดบ้านบึง ร้านสะดวกซื้อเดินถึง เจ้าของใจดีซ่อมให้ตลอด",
    emotionalDesc: "น้องหมาวิ่งเล่นในสนามหญ้าหน้าบ้าน คุณนั่งดื่มน้ำชาบนระเบียง นี่คือบ้านที่ทั้งคนและสัตว์เลี้ยงมีความสุข",
    pimInsight: "บ้านเช่าที่เลี้ยงหมาได้หายากมากในบ้านบึง หลังนี้สนามหญ้ากว้างพอให้น้องหมาตัวกลาง-ใหญ่วิ่งเล่นได้สบาย แถมเจ้าของอยู่ใกล้ ๆ ซ่อมให้ไวค่ะ",
    status: "ACTIVE",
    featured: true,
    images: [
      "https://placehold.co/800x600/22C55E/FFFFFF?text=บ้านเช่า+เลี้ยงหมาได้",
    ],
    imagePrimary: "https://placehold.co/800x600/22C55E/FFFFFF?text=Pet+Friendly+บ้านบึง",
    location: {
      district: "บ้านบึง",
      subdistrict: "บ้านบึง",
      lat: 13.3145,
      lng: 101.1120,
      distanceToAmata: "14 กม. (18 นาที)",
      distanceToHospital: "2 กม. (4 นาที)",
      distanceToMarket: "0.5 กม. (1 นาที)",
      nearestIndustrialEstate: "นิคมอมตะนคร",
    },
    amenities: ["เลี้ยงสัตว์ได้", "สนามหญ้า", "เฟอร์นิเจอร์ครบ", "แอร์"],
    tags: ["ให้เช่า", "เลี้ยงสัตว์ได้", "บ้านบึง"],
    createdAt: "2026-03-05",
  },
  {
    id: "prop-005",
    slug: "land-investment-eec-chonburi",
    title: "ที่ดินเปล่า 100 ตร.วา ทำเลทอง EEC ชลบุรี",
    type: "LAND",
    subType: "investment",
    price: 3500000,
    priceLabel: "3,500,000 บาท",
    areaSqm: 400,
    bedrooms: 0,
    bathrooms: 0,
    description: "ที่ดินเปล่า 100 ตร.วา ใกล้ถนน 331 ทำเลเขต EEC ราคาขึ้นแน่นอน เหมาะลงทุนหรือสร้างบ้าน ไฟฟ้า-ประปาถึง",
    emotionalDesc: "ผืนดินที่รอวันเติบโต ทำเลที่คนมีวิสัยทัศน์เห็นแล้วต้องรีบคว้า เพราะ EEC มาแน่ ราคาวันนี้คือราคาที่ถูกที่สุดที่จะเป็นไปได้แล้ว",
    pimInsight: "ที่ดินแปลงนี้ทำเลดีมากค่ะ อยู่ในเขต EEC ราคาจะขึ้นอีกแน่นอนใน 3-5 ปี ซื้อเก็บไว้ได้เลย หรือจะสร้างบ้านก็ได้ ไฟฟ้า-ประปาพร้อม",
    status: "ACTIVE",
    featured: false,
    images: [
      "https://placehold.co/800x600/D4A843/FFFFFF?text=ที่ดิน+EEC+ชลบุรี",
    ],
    imagePrimary: "https://placehold.co/800x600/D4A843/FFFFFF?text=ที่ดินลงทุน+EEC",
    location: {
      district: "บ้านบึง",
      subdistrict: "หนองอิรุณ",
      lat: 13.2850,
      lng: 101.1600,
      distanceToAmata: "10 กม.",
      distanceToHospital: "8 กม.",
      distanceToMarket: "5 กม.",
      nearestIndustrialEstate: "นิคมเหมราชอีสเทิร์นซีบอร์ด",
    },
    amenities: ["ไฟฟ้าถึง", "ประปาถึง", "ถนนคอนกรีต", "ใกล้ถนนใหญ่"],
    tags: ["ที่ดิน", "ลงทุน", "EEC"],
    createdAt: "2026-01-20",
  },
  {
    id: "prop-006",
    slug: "renovate-2story-banbung-sale",
    title: "บ้าน 2 ชั้น รีโนเวทสวย หมู่บ้านเมืองทอง บ้านบึง",
    type: "SALE",
    subType: "renovated",
    price: 2290000,
    priceLabel: "2,290,000 บาท",
    areaSqm: 140,
    bedrooms: 4,
    bathrooms: 2,
    description: "บ้าน 2 ชั้น 4 ห้องนอน 2 ห้องน้ำ รีโนเวทใหม่ ทาสีใหม่ เปลี่ยนสุขภัณฑ์ใหม่ พื้นกระเบื้องใหม่ทั้งหลัง ครอบครัวใหญ่อยู่ได้สบาย",
    emotionalDesc: "บ้านที่พร้อมรับทุกคนในครอบครัว 4 ห้องนอน พ่อแม่มาอยู่ด้วยได้ ลูก ๆ มีห้องของตัวเอง วันอาทิตย์ทำอาหารกินกันทั้งบ้าน",
    pimInsight: "บ้านหลังนี้ห้องเยอะดีค่ะ 4 ห้องนอน เหมาะกับครอบครัวใหญ่ หรือจะเก็บห้องหนึ่งเป็นห้องทำงาน Work From Home ก็ได้ รีโนเวทใหม่หมดเลยค่ะ",
    status: "ACTIVE",
    featured: true,
    images: [
      "https://placehold.co/800x600/1B4D3E/FFFFFF?text=บ้าน+2+ชั้น+รีโนเวท",
      "https://placehold.co/800x600/2E75B6/FFFFFF?text=ห้องนอนชั้นบน",
    ],
    imagePrimary: "https://placehold.co/800x600/1B4D3E/FFFFFF?text=รีโนเวท+เมืองทอง",
    location: {
      district: "บ้านบึง",
      subdistrict: "บ้านบึง",
      lat: 13.3120,
      lng: 101.1080,
      distanceToAmata: "13 กม. (17 นาที)",
      distanceToHospital: "4 กม. (7 นาที)",
      distanceToMarket: "1 กม. (2 นาที)",
      nearestIndustrialEstate: "นิคมอมตะนคร",
    },
    amenities: ["4 ห้องนอน", "ที่จอดรถ", "ครัวไทย", "รีโนเวทใหม่"],
    tags: ["รีโนเวท", "ครอบครัวใหญ่", "บ้านบึง", "4 ห้องนอน"],
    createdAt: "2026-02-28",
  },
  {
    id: "prop-007",
    slug: "rent-studio-near-hemaraj",
    title: "ห้องเช่ารายเดือน ใกล้นิคมเหมราช ราคาถูก",
    type: "RENT",
    subType: "townhome",
    price: 3000,
    priceLabel: "3,000 บาท/เดือน",
    areaSqm: 35,
    bedrooms: 1,
    bathrooms: 1,
    description: "ห้องเช่ารายเดือน ห้องสะอาด แอร์ เครื่องทำน้ำอุ่น WiFi ฟรี ใกล้นิคมเหมราช 5 นาที ร้านอาหารเดินถึง",
    emotionalDesc: "ห้องเล็ก ๆ แต่ครบทุกอย่าง กลับมาจากงานอาบน้ำอุ่น ๆ เปิดแอร์นอนดูหนัง WiFi แรง ไม่ต้องกังวลเรื่องค่าใช้จ่ายเพราะราคาสบายกระเป๋า",
    pimInsight: "สำหรับน้อง ๆ ที่เพิ่งเริ่มทำงาน ห้องนี้คุ้มมากค่ะ 3,000 บาทได้แอร์ น้ำอุ่น WiFi ครบ ใกล้โรงงานแค่ 5 นาที ประหยัดค่าน้ำมันด้วย",
    status: "ACTIVE",
    featured: false,
    images: [
      "https://placehold.co/800x600/2E75B6/FFFFFF?text=ห้องเช่า+ราคาถูก",
    ],
    imagePrimary: "https://placehold.co/800x600/2E75B6/FFFFFF?text=ห้องเช่า+ใกล้เหมราช",
    location: {
      district: "บ้านบึง",
      subdistrict: "หนองซ้ำซาก",
      lat: 13.3300,
      lng: 101.1500,
      distanceToAmata: "20 กม.",
      distanceToHospital: "7 กม.",
      distanceToMarket: "1 กม.",
      nearestIndustrialEstate: "นิคมเหมราชชลบุรี",
    },
    amenities: ["แอร์", "เครื่องทำน้ำอุ่น", "WiFi ฟรี", "เฟอร์นิเจอร์ครบ"],
    tags: ["ให้เช่า", "ราคาถูก", "ใกล้นิคม"],
    createdAt: "2026-03-12",
  },
  {
    id: "prop-008",
    slug: "land-build-house-banbung",
    title: "ที่ดินสร้างบ้าน 60 ตร.วา บ้านบึง ราคาดี",
    type: "LAND",
    subType: "residential",
    price: 900000,
    priceLabel: "900,000 บาท",
    areaSqm: 240,
    bedrooms: 0,
    bathrooms: 0,
    description: "ที่ดินเปล่า 60 ตร.วา ในหมู่บ้าน บ้านบึง ถมแล้ว พร้อมสร้าง ไฟฟ้า-ประปาหน้าที่ดิน ถนนคอนกรีต",
    emotionalDesc: "ที่ดินผืนนี้รอคนมาสร้างบ้านในฝัน ออกแบบได้ตามใจ ไม่ต้องเสียเงินเยอะ สร้างบ้านชั้นเดียวหลังเล็ก ๆ อยู่กันสองคนก็น่ารัก",
    pimInsight: "ที่ดินแปลงนี้ราคาดีมากค่ะ ถมแล้วพร้อมสร้าง ถ้าสนใจพิมแนะนำช่างรับเหมาดี ๆ ให้ได้ด้วยค่ะ สร้างบ้านชั้นเดียว 2 ห้องนอน งบประมาณรวมที่ดินไม่เกิน 2 ล้าน",
    status: "ACTIVE",
    featured: false,
    images: [
      "https://placehold.co/800x600/22C55E/FFFFFF?text=ที่ดินสร้างบ้าน+บ้านบึง",
    ],
    imagePrimary: "https://placehold.co/800x600/22C55E/FFFFFF?text=ที่ดิน+60+ตร.วา",
    location: {
      district: "บ้านบึง",
      subdistrict: "บ้านบึง",
      lat: 13.3100,
      lng: 101.1050,
      distanceToAmata: "15 กม.",
      distanceToHospital: "3 กม.",
      distanceToMarket: "2 กม.",
      nearestIndustrialEstate: "นิคมอมตะนคร",
    },
    amenities: ["ถมแล้ว", "ไฟฟ้าถึง", "ประปาถึง", "ถนนคอนกรีต"],
    tags: ["ที่ดิน", "สร้างบ้าน", "ราคาดี"],
    createdAt: "2026-02-10",
  },
];
```

#### 2.2 Mock Blog Posts (5 รายการ)

```typescript
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  content: string;  // สั้น ๆ สำหรับ mockup
  readingTime: string;
  publishedAt: string;
  featuredImage: string;
  relatedPropertyIds: string[];
}

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-001",
    slug: "3-checklist-gu-baan-jai-fu",
    title: "3 เช็กลิสต์กู้บ้านแบบใจฟู ไม่ต้องสู้ชีวิตตอนผ่อน",
    category: "วางแผนการเงิน",
    categorySlug: "finance",
    excerpt: "เตรียมตัวให้พร้อมก่อนยื่นกู้ ไม่ใช่แค่ผ่านง่าย แต่ผ่อนแล้วยังมีเงินเหลือใช้ มาดูกันว่าต้องเตรียมอะไรบ้าง",
    content: "Lorem ipsum...",
    readingTime: "5 นาที",
    publishedAt: "2026-03-10",
    featuredImage: "https://placehold.co/800x450/1B4D3E/FFFFFF?text=กู้บ้านแบบใจฟู",
    relatedPropertyIds: ["prop-001", "prop-006"],
  },
  {
    id: "blog-002",
    slug: "technic-jud-baan-chao-hai-un",
    title: "เทคนิคจัดบ้านเช่าให้เป็นรังที่อบอุ่น เผื่อลูก ๆ และพ่อแม่มาเยี่ยม",
    category: "ชีวิตคนไกลบ้าน",
    categorySlug: "lifestyle",
    excerpt: "บ้านเช่าก็อบอุ่นได้ แค่จัดให้ถูกวิธี มีเทคนิคง่าย ๆ ให้บ้านเช่ากลายเป็นบ้านจริง ๆ ที่ทุกคนอยากมาเยี่ยม",
    content: "Lorem ipsum...",
    readingTime: "7 นาที",
    publishedAt: "2026-03-05",
    featuredImage: "https://placehold.co/800x450/D4A843/FFFFFF?text=จัดบ้านเช่าให้อบอุ่น",
    relatedPropertyIds: ["prop-002", "prop-004"],
  },
  {
    id: "blog-003",
    slug: "banbung-na-yu-kae-nai",
    title: "บ้านบึงน่าอยู่แค่ไหน? เจาะลึกแหล่งงาน ที่เที่ยว และคุณภาพชีวิต",
    category: "เจาะลึกทำเล",
    categorySlug: "location",
    excerpt: "ทำไมคนทำงานโรงงานถึงเลือกอยู่บ้านบึง? มาดูข้อดี-ข้อเสีย แหล่งงาน ที่เที่ยว และทำไมทำเลนี้ถึงมีแต่คนอยากมาอยู่",
    content: "Lorem ipsum...",
    readingTime: "8 นาที",
    publishedAt: "2026-02-28",
    featuredImage: "https://placehold.co/800x450/2E75B6/FFFFFF?text=บ้านบึงน่าอยู่ไหม",
    relatedPropertyIds: ["prop-001", "prop-003"],
  },
  {
    id: "blog-004",
    slug: "tid-buro-yak-mee-baan-tum-yang-rai",
    title: "ติดบูโร/รายได้น้อย แต่อยากมีบ้าน เริ่มต้นเตรียมตัวอย่างไร?",
    category: "แก้ปัญหาคนอยากมีบ้าน",
    categorySlug: "solutions",
    excerpt: "ติดบูโรไม่ใช่จุดจบ แต่คือจุดเริ่มต้นของการวางแผน มาดูขั้นตอนแก้บูโร เตรียมตัวกู้บ้านให้ผ่านกันค่ะ",
    content: "Lorem ipsum...",
    readingTime: "6 นาที",
    publishedAt: "2026-02-20",
    featuredImage: "https://placehold.co/800x450/EF4444/FFFFFF?text=ติดบูโร+อยากมีบ้าน",
    relatedPropertyIds: ["prop-001"],
  },
  {
    id: "blog-005",
    slug: "trend-baan-2026-khon-yuk-mai",
    title: "เทรนด์บ้านปี 2026 บ้านแบบไหนที่คนทำงานยุคใหม่ต้องการ",
    category: "MarTech Update",
    categorySlug: "martech",
    excerpt: "AI เปลี่ยนวิธีหาบ้าน Renovate บ้านเก่าเป็นเทรนด์ใหม่ บ้านเล็กแต่ฟังก์ชันครบกำลังมา มาดูว่าปี 2026 คนอยากได้บ้านแบบไหน",
    content: "Lorem ipsum...",
    readingTime: "5 นาที",
    publishedAt: "2026-03-15",
    featuredImage: "https://placehold.co/800x450/1B4D3E/FFFFFF?text=เทรนด์บ้าน+2026",
    relatedPropertyIds: [],
  },
];
```

#### 2.3 Mock Testimonials (4 รายการ)

```typescript
export interface Testimonial {
  id: string;
  clientName: string;
  quote: string;
  propertyType: string;
  rating: number;
  avatarUrl: string;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-001",
    clientName: "คุณบี",
    quote: "กู้ผ่านยากพิมก็ช่วยจนได้บ้านไออุ่นหลังนี้มา ขอบคุณมากค่ะ ตอนแรกคิดว่าจะไม่ผ่าน พิมช่วยเตรียมเอกสารให้ทุกขั้นตอน",
    propertyType: "ซื้อบ้านรีโนเวท",
    rating: 5,
    avatarUrl: "https://placehold.co/100x100/1B4D3E/FFFFFF?text=บี",
  },
  {
    id: "test-002",
    clientName: "คุณต้น",
    quote: "เช่าบ้านกับพิม 2 ปีแล้วค่ะ ปัญหาอะไรแจ้งปุ๊บซ่อมปั๊บ เจ้าของบ้านใจดีมาก พิมคัดมาให้ดีจริง ๆ",
    propertyType: "เช่าบ้าน",
    rating: 5,
    avatarUrl: "https://placehold.co/100x100/2E75B6/FFFFFF?text=ต้น",
  },
  {
    id: "test-003",
    clientName: "คุณแอม",
    quote: "ฝากขายบ้านกับพิม 3 เดือนขายได้เลย ถ่ายรูปสวยมาก คนดูเยอะ พิมคัดคนซื้อให้ด้วย ไม่ต้องเสียเวลาเจอคนไม่จริงจัง",
    propertyType: "ฝากขายบ้าน",
    rating: 5,
    avatarUrl: "https://placehold.co/100x100/D4A843/FFFFFF?text=แอม",
  },
  {
    id: "test-004",
    clientName: "คุณเบียร์",
    quote: "ย้ายมาทำงานที่อมตะ ไม่รู้จักใคร พิมช่วยหาบ้านเช่าใกล้โรงงาน ราคาดี เลี้ยงหมาได้ด้วย ตอนนี้อยู่สบายมากครับ",
    propertyType: "เช่าบ้าน",
    rating: 5,
    avatarUrl: "https://placehold.co/100x100/22C55E/FFFFFF?text=เบียร์",
  },
];
```

#### 2.4 Mock FAQs (6 รายการ)

```typescript
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  pageSlug: string;
}

export const MOCK_FAQS: FAQ[] = [
  { id: "faq-001", question: "ค่าบริการนายหน้าเท่าไร?", answer: "สำหรับผู้ซื้อ/ผู้เช่า ไม่มีค่าใช้จ่ายค่ะ พิมรับค่าคอมมิชชั่นจากเจ้าของทรัพย์เท่านั้น ปรึกษาฟรีได้ตลอดค่ะ", pageSlug: "home" },
  { id: "faq-002", question: "กู้บ้านต้องเตรียมอะไรบ้าง?", answer: "เตรียมสลิปเงินเดือน 6 เดือน, Statement ย้อนหลัง 6 เดือน, สำเนาบัตรประชาชน, สำเนาทะเบียนบ้าน พิมช่วยเตรียมเอกสารและพาไปยื่นกู้ให้ฟรีค่ะ", pageSlug: "home" },
  { id: "faq-003", question: "บ้านรีโนเวทของพิมต่างจากมือสองทั่วไปอย่างไร?", answer: "บ้านรีโนเวทของพิมทำใหม่ตั้งแต่หลังคาจนถึงพื้น เปลี่ยนท่อน้ำ สายไฟ สุขภัณฑ์ทั้งหมด ไม่ใช่แค่ทาสีใหม่ รับประกันโครงสร้าง 1 ปีค่ะ", pageSlug: "buy" },
  { id: "faq-004", question: "เช่าบ้านกับพิม มีสัญญาเช่ากี่ปี?", answer: "สัญญาเช่าขั้นต่ำ 1 ปี ต่อสัญญาได้ ค่ามัดจำ 2 เดือน ค่าเช่าล่วงหน้า 1 เดือน ทุกหลังมีสัญญาเช่าที่ชัดเจนคุ้มครองทั้งผู้เช่าและเจ้าของค่ะ", pageSlug: "rent" },
  { id: "faq-005", question: "ฝากขาย/ฝากเช่ากับพิมทำอย่างไร?", answer: "แอดไลน์หรือโทรมาได้เลยค่ะ พิมจะไปดูทรัพย์ ถ่ายรูปสวย ๆ วิเคราะห์ราคาตลาด แล้วลงประกาศให้ทุกช่องทาง มี MarTech Strategy ช่วยให้ขาย/ปล่อยเช่าได้เร็วค่ะ", pageSlug: "owners" },
  { id: "faq-006", question: "พิมดูแลทรัพย์ในพื้นที่ไหนบ้าง?", answer: "พิมดูแลทรัพย์ในเขตบ้านบึง, ชลบุรี, พนัสนิคม และพื้นที่ใกล้นิคมอุตสาหกรรมอมตะนคร, อมตะซิตี้, เหมราชค่ะ", pageSlug: "home" },
];
```

#### 2.5 Site Config

```typescript
export const SITE_CONFIG = {
  name: "บ้านไออุ่น พร็อพเพอร์ตี้",
  nameEn: "Baan Ai Oun Property",
  slogan: "บ้านไออุ่น: มากกว่าที่พัก คือพลังกายพลังใจให้คุณไปต่อ",
  headline: "เพราะ 'บ้าน' ไม่ใช่แค่ที่นอนหลังเลิกงาน... แต่คือรางวัลของก้าวที่เหนื่อยล้า",
  subHeadline: "พิมเข้าใจดีค่ะว่าก้าวเดินของคนไกลบ้านมันไม่ง่าย... จาก 'คนเช่า' สู่ 'คนสร้าง' พิมจึงตั้งใจคัดสรรทุกหลังให้เป็น #บ้านไออุ่น ที่พร้อมโอบกอดและเติมพลังกายพลังใจ ให้คุณกลับไปสู้ต่อเพื่อคนที่คุณรักได้ในทุก ๆ วัน",
  phone: "098-765-4321",
  lineId: "@baanaioun",
  lineUrl: "https://line.me/ti/p/@baanaioun",
  facebook: "https://facebook.com/baanaioun",
  tiktok: "https://tiktok.com/@baanaioun",
  youtube: "https://youtube.com/@baanaioun",
  address: "อ.บ้านบึง จ.ชลบุรี",
  email: "pim@baanaioun.com",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5!2d101.11!3d13.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDE4JzM2LjAiTiAxMDHCsDA2JzM2LjAiRQ!5e0!3m2!1sth!2sth!4v1",
  pim: {
    name: "พิม",
    fullName: "คุณพิม — นายหน้าอสังหาริมทรัพย์",
    bio: "จากคนเช่าห้องแถวเล็ก ๆ ในนิคมอุตสาหกรรม สู่นายหน้าอสังหาริมทรัพย์ที่คัดสรรบ้านด้วยหัวใจ เพราะพิมเข้าใจว่า 'บ้าน' สำคัญแค่ไหนสำหรับคนไกลบ้าน",
    vision: "พิมมุ่งมั่นให้คนทำงานในชลบุรีมีบ้านที่เติมพลังใจได้จริง ไม่ใช่แค่ที่ซุกหัวนอน",
    avatar: "https://placehold.co/200x200/1B4D3E/FFFFFF?text=พิม",
    heroImage: "https://placehold.co/800x600/F5F0E8/1B4D3E?text=คุณพิม+ยิ้มแย้ม+ในบ้านรีโนเวท",
  },
};

export const NAV_ITEMS = [
  { label: "หน้าแรก", href: "/" },
  { label: "ซื้อบ้าน", href: "/buy" },
  { label: "เช่าบ้าน", href: "/rent" },
  { label: "ที่ดิน", href: "/land" },
  { label: "ฝากขาย/เช่า", href: "/owners" },
  { label: "บทความ", href: "/blog" },
  { label: "เกี่ยวกับพิม", href: "/about" },
  { label: "ติดต่อเรา", href: "/contact" },
];

export const BLOG_CATEGORIES = [
  { name: "วางแผนการเงิน", slug: "finance" },
  { name: "ชีวิตคนไกลบ้าน", slug: "lifestyle" },
  { name: "เจาะลึกทำเล", slug: "location" },
  { name: "แก้ปัญหาคนอยากมีบ้าน", slug: "solutions" },
  { name: "MarTech Update", slug: "martech" },
];
```

### Step 3: สร้างทุกหน้า

ให้สร้างหน้าเหล่านี้ทั้งหมด โดย **ทุกหน้าต้องกดเชื่อมกันได้:**

| Route | หน้า | ดึงข้อมูลจาก |
|-------|------|-------------|
| `/` | Home Page — Hero + Search + Shortcuts + Values + Testimonials + FAQ | SITE_CONFIG, MOCK_PROPERTIES (featured), MOCK_TESTIMONIALS, MOCK_FAQS |
| `/buy` | Buy Listing — แสดง properties type=SALE + Filter + Sort | MOCK_PROPERTIES.filter(type=SALE) |
| `/rent` | Rent Listing — แสดง properties type=RENT + Filter + Sort | MOCK_PROPERTIES.filter(type=RENT) |
| `/land` | Land Listing — แสดง properties type=LAND | MOCK_PROPERTIES.filter(type=LAND) |
| `/property/[slug]` | Property Detail — ทุก section ครบ | MOCK_PROPERTIES.find(slug) |
| `/owners` | Owner Section — ฝากขาย/เช่า + Process + Renovate to Sell | SITE_CONFIG, MOCK_FAQS |
| `/blog` | Blog Index — แสดง blog posts + Category filter | MOCK_BLOG_POSTS, BLOG_CATEGORIES |
| `/blog/[slug]` | Blog Post — เนื้อหาบทความ + Related Properties | MOCK_BLOG_POSTS.find(slug), MOCK_PROPERTIES |
| `/about` | About Pim — Journey + Gallery + Vision + Social | SITE_CONFIG.pim |
| `/contact` | Contact — ข้อมูลติดต่อ + Form + Map | SITE_CONFIG |

### Step 4: Components ที่ต้องสร้าง

สร้าง Components เหล่านี้ให้ครบ ใช้ Mock Data ตรง ๆ:

**Layout Components:**
- `Header` — Logo + Navigation + Mobile Menu (Sheet) + ปุ่ม "ปรึกษาพิมฟรี"
- `Footer` — Logo + Nav Links + Social Icons + Contact Info + Copyright
- `MobileMenu` — Sheet component สำหรับ mobile nav
- `Breadcrumb` — แสดง path ทุกหน้า (ยกเว้น Home)

**Home Page Components:**
- `HeroSection` — Split layout (รูปพิม + ข้อความ) + Headline + Slogan + 2 CTA buttons
- `SearchBar` — Input + placeholder + Quick filter chips (บ้านเช่า, บ้านซื้อ, ที่ดิน, รีโนเวท, ใกล้นิคม) — กดแล้วลิงก์ไปหน้า listing
- `ServiceShortcuts` — 3 ปุ่มใหญ่ ลิงก์ไป /buy, /rent, /owners
- `CoreValues` — 3 cards (เข้าใจคนไกลบ้าน, บริการครบวงจร, คัดกรองด้วยหัวใจ)
- `TestimonialSlider` — Embla Carousel แสดง testimonials
- `FAQSection` — Accordion แสดง FAQs

**Property Components:**
- `PropertyCard` — Card แสดงทรัพย์ + รูป + ราคา + Badge + ข้อมูลสั้น — กด Link ไป /property/[slug]
- `PropertyGallery` — Image gallery + lightbox (Dialog)
- `PropertyFactSheet` — Grid แสดงสเปก (พื้นที่, ห้องนอน, ห้องน้ำ, etc.)
- `LocationIntelligence` — Google Maps embed + Distance cards
- `PimInsight` — Blockquote style + avatar
- `FinancialCalculator` — Input (ราคา/ดาวน์/ดอกเบี้ย/ปี) + คำนวณ + แสดงผล Recharts pie chart
- `PropertyFilter` — Filter bar: ช่วงราคา, ห้องนอน, เรียงตาม — ทำงานแบบ client-side filter บน Mock Data

**Blog Components:**
- `BlogCard` — Card + รูป + หมวด + ชื่อ + excerpt + เวลาอ่าน — กด Link ไป /blog/[slug]
- `BlogCategoryFilter` — ปุ่ม filter ตาม category

**Common Components:**
- `StickyCTA` — Fixed bottom-right ปุ่ม "ปรึกษาพิมฟรี" ลิงก์ไป LINE
- `SectionTitle` — หัวข้อ section ที่ใช้ซ้ำได้

### Step 5: Design Rules (สำคัญมาก)

ใช้ค่าเหล่านี้ตลอดทั้งโปรเจกต์:

```css
/* Tailwind Config Colors */
primary: #1B4D3E     /* Deep Forest Green — ปุ่มหลัก, Header */
secondary: #D4A843   /* Warm Gold — Accent, Hover */
accent: #2E75B6      /* Soft Blue — Links, Badges */
background: #F5F0E8  /* Warm Cream — พื้นหลัง */
foreground: #1A1A2E  /* Text หลัก */
muted: #666666       /* Text รอง */
```

**Font:** ใช้ `font-sans` (system-ui) ไปก่อนใน Prototype (ไม่ต้อง self-host Noto Sans Thai)

**สิ่งที่ต้องทำให้ดู "สมจริง":**
- ทุกราคาต้องมี format comma (1,890,000)
- ทุก Card ต้องมี Badge (ใหม่ / แนะนำ / รีโนเวท / เลี้ยงสัตว์ได้ / ขายแล้ว)
- Mobile responsive ทุกหน้า
- Framer Motion: fade-in เมื่อ scroll ถึง section
- Sticky CTA ปุ่ม LINE ลอยทุกหน้า

### Step 6: สิ่งที่ไม่ต้องทำ (Prototype Scope)

❌ ไม่ต้องต่อ Database / Prisma / Docker
❌ ไม่ต้องทำ Authentication / Login
❌ ไม่ต้องทำ API routes จริง
❌ ไม่ต้องทำ Form submission จริง (แค่ console.log)
❌ ไม่ต้องทำ AI Search จริง (กดแล้วไปหน้า listing ก็พอ)
❌ ไม่ต้องทำ SEO Schema / Sitemap
❌ ไม่ต้อง Deploy (แค่ `npm run dev` ได้ก็พอ)

---

## ✅ Definition of Done

Prototype ถือว่าเสร็จเมื่อ:

1. [ ] `npm run dev` แล้วเปิดได้ไม่มี Error
2. [ ] กดลิงก์จาก Home ไปทุกหน้าได้
3. [ ] กด PropertyCard ไปหน้า Property Detail ได้ (ทั้ง 8 รายการ)
4. [ ] กด BlogCard ไปหน้า Blog Post ได้ (ทั้ง 5 รายการ)
5. [ ] Filter ทรัพย์ในหน้า /buy, /rent, /land ทำงานได้ (client-side)
6. [ ] Financial Calculator คำนวณได้จริง
7. [ ] Testimonial Carousel เลื่อนได้
8. [ ] FAQ Accordion เปิด-ปิดได้
9. [ ] Mobile responsive ดูดีทุกหน้า
10. [ ] Sticky CTA "ปรึกษาพิมฟรี" แสดงทุกหน้า
11. [ ] Breadcrumb แสดงถูกต้องทุกหน้า (ยกเว้น Home)
12. [ ] ทุกหน้ามีข้อมูล Mock ภาษาไทยสมจริง ไม่มี Lorem Ipsum บน UI

---

## 🚀 วิธีใช้คำสั่งนี้

### สำหรับ Claude Code:
```bash
# วางไฟล์ PROMPT-MOCKUP.md ไว้ที่ root แล้วสั่ง:
claude "อ่าน PROMPT-MOCKUP.md แล้วสร้าง Interactive Prototype ทั้งหมดให้หน่อย เริ่มจาก Step 1 ไปจนถึง Step 5 ทำให้ครบทุกหน้า ทุก component"
```

### สำหรับ Gemini CLI:
```bash
gemini "อ่าน PROMPT-MOCKUP.md แล้วสร้าง Interactive Prototype ทั้งหมดตาม spec เริ่มจาก init project แล้วสร้างทุกหน้า ทุก component ให้ครบ"
```

### ถ้าโปรเจกต์ใหญ่เกินไปสำหรับ 1 คำสั่ง ให้แบ่งเป็น:
```bash
# รอบ 1: Init + Mock Data + Layout
claude "อ่าน PROMPT-MOCKUP.md ทำ Step 1 (init project) + Step 2 (mock data) + สร้าง Layout Components (Header, Footer, MobileMenu, StickyCTA)"

# รอบ 2: Home Page
claude "อ่าน PROMPT-MOCKUP.md ทำ Home Page ครบทุก section: Hero, SearchBar, ServiceShortcuts, CoreValues, TestimonialSlider, FAQSection"

# รอบ 3: Property Pages
claude "อ่าน PROMPT-MOCKUP.md ทำ Property Listing (/buy, /rent, /land) + Property Detail (/property/[slug]) + PropertyCard + PropertyFilter + Gallery + FinancialCalculator + PimInsight"

# รอบ 4: Content Pages
claude "อ่าน PROMPT-MOCKUP.md ทำ Blog (/blog, /blog/[slug]) + Owner Section (/owners) + About (/about) + Contact (/contact)"

# รอบ 5: Polish
claude "ตรวจสอบ Prototype ทุกหน้า: ลิงก์ครบไหม, responsive ดีไหม, เพิ่ม Framer Motion fade-in, ตรวจว่าไม่มี Lorem Ipsum"
```
