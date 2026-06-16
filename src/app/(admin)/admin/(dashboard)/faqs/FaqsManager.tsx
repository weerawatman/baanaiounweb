"use client"

import { useState, useTransition } from "react"
import { Plus, Save, Trash2, Loader2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { upsertFaq, deleteFaq } from "@/actions/faqs"
import type { Faq } from "@/lib/types/property"
import { cn } from "@/lib/utils"

interface FaqsManagerProps {
  initialFaqs: Faq[]
}

interface LocalFaq extends Partial<Faq> {
  localId: string
  question: string
  answer: string
  page_slug: string
  sort_order: number
  dirty?: boolean
  isNew?: boolean
}

export function FaqsManager({ initialFaqs }: FaqsManagerProps) {
  const [faqs, setFaqs] = useState<LocalFaq[]>(
    initialFaqs.map((f) => ({ ...f, localId: f.id })),
  )
  const [isPending, startTransition] = useTransition()
  const [savingId, setSavingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function addNew() {
    const localId = `new-${Date.now()}`
    setFaqs((prev) => [
      ...prev,
      {
        localId,
        question: "",
        answer: "",
        page_slug: "home",
        sort_order: prev.length,
        dirty: true,
        isNew: true,
      },
    ])
  }

  function update(localId: string, field: keyof LocalFaq, value: string | number) {
    setFaqs((prev) =>
      prev.map((f) => (f.localId === localId ? { ...f, [field]: value, dirty: true } : f)),
    )
  }

  function save(faq: LocalFaq) {
    setSavingId(faq.localId)
    const formData = new FormData()
    formData.set("question", faq.question)
    formData.set("answer", faq.answer)
    formData.set("page_slug", faq.page_slug)
    formData.set("sort_order", String(faq.sort_order))

    startTransition(async () => {
      const result = await upsertFaq(faq.id ?? null, {}, formData)
      if (!result.error) {
        setFaqs((prev) =>
          prev.map((f) =>
            f.localId === faq.localId ? { ...f, dirty: false, isNew: false } : f,
          ),
        )
      }
      setSavingId(null)
    })
  }

  function remove(faq: LocalFaq) {
    if (faq.isNew) {
      setFaqs((prev) => prev.filter((f) => f.localId !== faq.localId))
      return
    }
    setDeletingId(faq.localId)
    startTransition(async () => {
      if (faq.id) await deleteFaq(faq.id)
      setFaqs((prev) => prev.filter((f) => f.localId !== faq.localId))
      setDeletingId(null)
    })
  }

  const pages = [...new Set(faqs.map((f) => f.page_slug ?? "home"))]

  return (
    <div className="flex flex-col gap-4">
      {pages.map((page) => (
        <div key={page} className="rounded-xl border bg-white overflow-hidden">
          <div className="border-b bg-muted/30 px-4 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              หน้า: {page}
            </p>
          </div>
          <div className="divide-y">
            {faqs
              .filter((f) => (f.page_slug ?? "home") === page)
              .map((faq) => (
                <div key={faq.localId} className="flex items-start gap-3 p-4">
                  <GripVertical className="mt-2 size-4 shrink-0 text-muted-foreground/40" />
                  <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">คำถาม</label>
                      <Input
                        value={faq.question}
                        onChange={(e) => update(faq.localId, "question", e.target.value)}
                        placeholder="ค่าธรรมเนียมนายหน้าเท่าไหร่?"
                        className={cn(faq.dirty && "border-amber-300")}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">คำตอบ</label>
                      <Input
                        value={faq.answer}
                        onChange={(e) => update(faq.localId, "answer", e.target.value)}
                        placeholder="ฟรีสำหรับผู้ซื้อ/เช่า..."
                        className={cn(faq.dirty && "border-amber-300")}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-5">
                    {faq.dirty && (
                      <Button
                        size="sm"
                        onClick={() => save(faq)}
                        disabled={isPending}
                        className="gap-1 bg-primary text-white hover:bg-primary/90"
                      >
                        {savingId === faq.localId ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <Save className="size-3" />
                        )}
                        บันทึก
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => remove(faq)}
                      disabled={isPending}
                      className="size-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      {deletingId === faq.localId ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={addNew}
        className="gap-2 self-start"
      >
        <Plus className="size-4" />
        เพิ่มคำถาม
      </Button>
    </div>
  )
}
