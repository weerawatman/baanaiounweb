import { type BlogCategory } from "@/types"

// หมวดหมู่บทความ (config คงที่ — ไม่ใช่ข้อมูลตัวอย่าง)
// ใช้ในหน้า /blog สำหรับกรองตามหมวดหมู่
export const BLOG_CATEGORIES: BlogCategory[] = [
  { name: "วางแผนการเงิน", slug: "finance" },
  { name: "ชีวิตคนไกลบ้าน", slug: "lifestyle" },
  { name: "เจาะลึกทำเล", slug: "location" },
  { name: "แก้ปัญหาคนอยากมีบ้าน", slug: "solutions" },
  { name: "MarTech Update", slug: "martech" },
]
