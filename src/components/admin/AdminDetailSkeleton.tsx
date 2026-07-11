/** Skeleton for admin detail / edit pages */
export function AdminDetailSkeleton() {
  return (
    <div className="flex max-w-3xl animate-pulse flex-col gap-6">
      <div>
        <div className="mb-3 h-4 w-16 rounded bg-muted" />
        <div className="h-8 w-56 rounded-lg bg-muted" />
        <div className="mt-2 h-4 w-40 rounded bg-muted" />
      </div>

      <div className="h-12 rounded-xl border bg-white" />

      <div className="rounded-xl border bg-white p-5">
        <div className="mb-3 h-4 w-24 rounded bg-muted" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 rounded bg-muted/70" />
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <div className="mb-3 h-4 w-32 rounded bg-muted" />
        <div className="h-24 rounded bg-muted/70" />
      </div>
    </div>
  )
}
