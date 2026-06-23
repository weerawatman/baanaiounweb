import { requireAdmin } from "@/lib/auth/guard"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminTopbar from "@/components/admin/AdminTopbar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth — proxy.ts already guards, but Server Components
  // and any direct navigation are re-checked here.
  const user = await requireAdmin()

  return (
    <div className="bg-muted/30 flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar email={user.email ?? ""} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
