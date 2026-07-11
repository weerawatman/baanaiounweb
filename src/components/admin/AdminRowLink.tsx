"use client"

import Link, { useLinkStatus } from "next/link"
import { cn } from "@/lib/utils"

interface AdminRowLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

function RowPendingMark() {
  const { pending } = useLinkStatus()
  if (!pending) return null
  return <span className="bg-primary/40 ml-1.5 inline-block size-1.5 animate-pulse rounded-full" />
}

export function AdminRowLink({ href, children, className }: AdminRowLinkProps) {
  return (
    <Link href={href} prefetch={true} className={cn("inline-flex items-center", className)}>
      {children}
      <RowPendingMark />
    </Link>
  )
}
