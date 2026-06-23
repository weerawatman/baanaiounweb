import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Home,
  Inbox,
  Newspaper,
  Star,
  HelpCircle,
  User,
} from "lucide-react"

export interface AdminNavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "ภาพรวม", href: "/admin", icon: LayoutDashboard },
  { label: "ทรัพย์", href: "/admin/properties", icon: Home },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "บทความ", href: "/admin/blog", icon: Newspaper },
  { label: "รีวิว", href: "/admin/testimonials", icon: Star },
  { label: "FAQ", href: "/admin/faqs", icon: HelpCircle },
  { label: "โปรไฟล์", href: "/admin/profile", icon: User },
]
