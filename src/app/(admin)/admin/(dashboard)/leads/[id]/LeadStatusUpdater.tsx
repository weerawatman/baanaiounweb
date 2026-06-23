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
    <section className="flex flex-col gap-3 rounded-xl border bg-white p-5">
      <p className="text-foreground text-sm font-medium">เปลี่ยนสถานะ</p>
      <div className="flex flex-wrap gap-2">
        {(["new", "contacted", "closed"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={status === s ? "default" : "outline"}
            disabled={isPending}
            onClick={() => changeStatus(s)}
            className={status === s ? "bg-primary hover:bg-primary/90 text-white" : ""}
          >
            {isPending && status !== s ? null : isPending && status === s ? (
              <Loader2 className="mr-1 size-3 animate-spin" />
            ) : null}
            <StatusBadge status={s} variant="lead" />
          </Button>
        ))}
      </div>
    </section>
  )
}
