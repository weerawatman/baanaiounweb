"use client"

import { useState, useTransition } from "react"
import { MessageSquare, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateLeadNotes } from "@/actions/leads"

interface LeadNotesEditorProps {
  id: string
  initialNotes: string
}

export function LeadNotesEditor({ id, initialNotes }: LeadNotesEditorProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [savedNotes, setSavedNotes] = useState(initialNotes)
  const [isPending, startTransition] = useTransition()

  function saveNotes() {
    startTransition(async () => {
      await updateLeadNotes(id, notes)
      setSavedNotes(notes)
    })
  }

  return (
    <section className="flex flex-col gap-3 rounded-xl border bg-white p-5">
      <div className="flex items-center gap-2">
        <MessageSquare className="text-muted-foreground size-4" />
        <p className="text-foreground text-sm font-semibold">โน้ตทีมงาน</p>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        placeholder="บันทึกการติดต่อ, สรุปความต้องการ..."
        className="border-input bg-background focus:ring-ring w-full resize-y rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
      />
      <div className="flex items-center justify-between">
        {notes !== savedNotes && (
          <p className="text-xs text-amber-600">มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก</p>
        )}
        <Button
          size="sm"
          onClick={saveNotes}
          disabled={isPending || notes === savedNotes}
          className="bg-primary hover:bg-primary/90 ml-auto gap-2 text-white"
        >
          {isPending && <Loader2 className="size-3 animate-spin" />}
          บันทึกโน้ต
        </Button>
      </div>
    </section>
  )
}
