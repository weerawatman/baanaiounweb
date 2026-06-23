export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <div className="border-primary/20 border-t-primary size-10 animate-spin rounded-full border-4" />
      <p className="text-muted-foreground text-sm">กำลังโหลดค่ะ...</p>
    </div>
  )
}
