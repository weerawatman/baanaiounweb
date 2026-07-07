/** Skeleton ระหว่างรอ server render หน้า admin — ให้ feedback ทันทีตอนกดเมนู */
export default function DashboardLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      <div>
        <div className="h-8 w-48 rounded-lg bg-muted" />
        <div className="mt-2 h-4 w-72 rounded bg-muted" />
      </div>

      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-10 w-32 rounded-lg border bg-white" />
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="h-12 border-b bg-muted/40" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0">
            <div className="h-4 w-1/4 rounded bg-muted" />
            <div className="h-4 w-1/6 rounded bg-muted" />
            <div className="h-4 w-1/5 rounded bg-muted" />
            <div className="ml-auto h-4 w-16 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}
