"use client"

import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { updateLeadStatus } from "@/actions/leads"
import type { LeadStatus } from "@/lib/types/property"

interface LeadStatusUpdaterProps {
  id: string
  currentStatus: LeadStatus
}

export function LeadStatusUpdater({ id, currentStatus }: LeadStatusUpdaterProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isPending, startTransition] = useTransition()

  function changeStatus(newStatus: LeadStatus) {
    setStatus(newStatus)
    startTransition(async () => {
      await updateLeadStatus(id, newStatus)
    })
  }

  return (
    <section className="rounded-xl border bg-white p-5 flex flex-col gap-3">
      <p className="text-sm font-medium text-foreground">เปลี่ยนสถานะ</p>
      <div className="flex gap-2 flex-wrap">
        {(["new", "contacted", "closed"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={status === s ? "default" : "outline"}
            disabled={isPending}
            onClick={() => changeStatus(s)}
            className={
              status === s
                ? "bg-primary text-white hover:bg-primary/90"
                : ""
            }
          >
            {isPending && status !== s ? null : (
              isPending && status === s ? (
                <Loader2 className="size-3 animate-spin mr-1" />
              ) : null
            )}
            <StatusBadge status={s} variant="lead" />
          </Button>
        ))}
      </div>
    </section>
  )
}
