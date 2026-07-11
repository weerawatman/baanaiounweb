import { Suspense } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminTopbar from "@/components/admin/AdminTopbar"
import AdminRouteProgress from "@/components/admin/AdminRouteProgress"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Auth is enforced in proxy.ts on every /admin request — no duplicate getUser() here,
  // so navigations can show loading.tsx immediately instead of blocking on layout.
  return (
    <div className="bg-muted/30 flex min-h-screen">
      <Suspense fallback={null}>
        <AdminRouteProgress />
      </Suspense>
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
