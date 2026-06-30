import type { Metadata } from "next"
import AboutPage from "./AboutPage"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | About Baan Ai Oun Property — อสังหาในไทย กรุงเทพ ปริมณฑล EEC ชลบุรี",
  description:
    "บ้านไออุ่น พร็อพเพอร์ตี้ ศูนย์รวมอสังหาในไทยและเครือข่ายนายหน้า บริการซื้อ-ขาย-เช่า กรุงเทพฯ ปริมณฑล EEC ชลบุรี ฉะเชิงเทรา สำหรับลูกค้าคนไทยและต่างชาติ",
  openGraph: {
    title: "เกี่ยวกับเรา | About Baan Ai Oun Property",
    description:
      "The Premier Thai Real Estate Hub & Agent Network – Connecting Opportunities for Buy, Sell, Rent in Bangkok, EEC, Chonburi and across Thailand.",
  },
}

export default function Page() {
  return <AboutPage />
}
