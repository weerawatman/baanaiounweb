/**
 * Global site configuration — brand, contact info, social links.
 */
export const SITE_CONFIG = {
  name: "บ้านไออุ่น พร็อพเพอร์ตี้",
  nameEn: "Baan Ai Oun Property",
  slogan: "บ้านไออุ่น: มากกว่าที่พัก คือพลังกายพลังใจให้คุณไปต่อ",
  headline: "จบทุกความต้องการเรื่องอสังหาฯ",
  subHeadline: "ไม่ต้องปวดหัวเรื่องอสังหาฯ อีกต่อไป! เรื่องยากเราเปลี่ยนให้เป็นเรื่องง่าย",

  // ─── Contact ───────────────────────────────────────────────────────────
  phone: "086-4149960",
  lineId: "@baan-ai-oun",
  lineUrl: "https://line.me/ti/p/@baan-ai-oun",
  email: "supansa.m@baanaioun.com",

  // ─── Social ────────────────────────────────────────────────────────────
  // facebook: มี 2 หน้า — ใช้หน้าแรกเป็นหลัก หน้าที่สอง: https://www.facebook.com/share/1GgLj8c2AX/
  facebook: "https://www.facebook.com/share/18EEmsWiKy/",
  tiktok: "https://www.tiktok.com/@baan_ai_oun",
  youtube: "https://youtube.com/@baanaioun", // TODO: อัปเดต URL จริง

  // ─── Location ──────────────────────────────────────────────────────────
  address: "107/57 เดอะคัลเลอร์เลคเชอร์ ซ.มหาชัย ม.13 ต.บางพลีใหญ่ อ.บางพลี จ.สมุทรปราการ 10540",
  addressShort: "อ.บางพลี จ.สมุทรปราการ",
  areaServed: "บ้านบึง ชลบุรี และพื้นที่ใกล้เคียง",

  // TODO: ไปที่ Google Maps → ค้นหาที่อยู่ → Share → Embed a map → copy src URL
  googleMapsEmbed:
    "https://maps.google.com/maps?q=107/57+เดอะคัลเลอร์เลคเชอร์+ซ.มหาชัย+ต.บางพลีใหญ่+อ.บางพลี+สมุทรปราการ+10540&output=embed&hl=th",

  // ─── Agent persona ─────────────────────────────────────────────────────
  pim: {
    name: "พิม",
    fullName: "คุณพิม — นายหน้าอสังหาริมทรัพย์",
    bio: "จากคนเช่าห้องแถวเล็ก ๆ ในนิคมอุตสาหกรรม สู่นายหน้าอสังหาริมทรัพย์ที่คัดสรรบ้านด้วยหัวใจ เพราะพิมเข้าใจว่า 'บ้าน' สำคัญแค่ไหนสำหรับคนไกลบ้าน",
    vision: "พิมมุ่งมั่นให้คนทำงานในชลบุรีมีบ้านที่เติมพลังใจได้จริง ไม่ใช่แค่ที่ซุกหัวนอน",
    // หมายเหตุ: placehold.co รองรับเฉพาะข้อความ ASCII (ใส่ไทยแล้วได้ HTTP 400 → รูปแตก)
    avatar: "https://placehold.co/200x200/1B4D3E/FFFFFF?text=Pim", // TODO: อัปรูปจริงที่ /admin/profile
    heroImage: "https://placehold.co/800x600/F5F0E8/1B4D3E?text=Baan+Ai+Oun", // TODO: อัปรูปจริงที่ /admin/profile
  },
}
