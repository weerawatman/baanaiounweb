export default function PublicPageLoading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="mx-auto max-w-6xl animate-pulse space-y-6 px-4 py-8 sm:px-6">
      <div className="h-6 w-40 rounded bg-muted" />
      <div className="h-48 rounded-2xl bg-muted sm:h-64" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-44 rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  )
}
