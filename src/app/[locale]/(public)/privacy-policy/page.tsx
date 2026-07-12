import type { Metadata } from "next"
import PrivacyPolicyPage from "./PrivacyPolicyPage"

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | Privacy Policy — บ้านไออุ่น พร็อพเพอร์ตี้",
  description:
    "นโยบายความเป็นส่วนตัวของบ้านไออุ่น พร็อพเพอร์ตี้ — วิธีที่เราเก็บรวบรวม ใช้ และดูแลรักษาข้อมูลส่วนบุคคลของท่าน ตาม PDPA",
  openGraph: {
    title: "นโยบายความเป็นส่วนตัว | Privacy Policy",
    description:
      "How Baan Ai Oun Property collects, uses, and protects your personal data, in accordance with Thailand's PDPA.",
  },
}

export default function Page() {
  return <PrivacyPolicyPage />
}
