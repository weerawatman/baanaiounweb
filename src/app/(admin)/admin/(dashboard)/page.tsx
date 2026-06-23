import Link from "next/link"
import { Home, Inbox, Newspaper, AlertTriangle, ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const metadata = { title: "ภาพรวม" }

interface Stat {
  label: string
  value: number | null
  href: string
  icon: typeof Home
  accent: string
}

type CountQuery = PromiseLike<{ count: number | null; error: unknown }>

async function getCount(build: () => CountQuery): Promise<number | null> {
  try {
    const { count, error } = await build()
    return error ? null : (count ?? 0)
  } catch {
    return null
  }
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [properties, newLeads, posts] = await Promise.all([
    getCount(() =>
      supabase
        .from("properties")
        .select("*", { count: "exact", head: true })
        .is("deleted_at", null)
        .eq("status", "ACTIVE"),
    ),
    getCount(() =>
      supabase
        .from("form_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
    ),
    getCount(() => supabase.from("blog_posts").select("*", { count: "exact", head: true })),
  ])

  const stats: Stat[] = [
    {
      label: "ทรัพย์ที่เผยแพร่",
      value: properties,
      href: "/admin/properties",
      icon: Home,
      accent: "bg-green-100 text-green-700",
    },
    {
      label: "Leads ใหม่",
      value: newLeads,
      href: "/admin/leads",
      icon: Inbox,
      accent: "bg-blue-100 text-blue-700",
    },
    {
      label: "บทความ",
      value: posts,
      href: "/admin/blog",
      icon: Newspaper,
      accent: "bg-amber-100 text-amber-700",
    },
  ]

  const dbNotReady = stats.every((s) => s.value === null)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">ภาพรวม</h1>
        <p className="text-muted-foreground mt-1 text-sm">สรุปข้อมูลระบบจัดการบ้านไออุ่น</p>
      </div>

      {dbNotReady && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-medium">ยังไม่ได้ตั้งค่าฐานข้อมูล</p>
            <p className="mt-1 text-amber-700">
              รัน migration <code className="rounded bg-amber-100 px-1">004</code>–
              <code className="rounded bg-amber-100 px-1">007</code> ใน Supabase SQL Editor
              เพื่อสร้างตาราง properties, blog_posts, testimonials, faqs
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group flex items-center gap-4 rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`flex size-12 items-center justify-center rounded-full ${stat.accent}`}>
              <stat.icon className="size-6" />
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-foreground text-2xl font-bold">{stat.value ?? "—"}</p>
            </div>
            <ArrowRight className="text-muted-foreground size-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  )
}
