"use client"

import { useState, useTransition } from "react"
import { Plus, Save, Trash2, Loader2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { upsertFaq, deleteFaq } from "@/actions/faqs"
import { PROFILE_PAGE_FAQS, type ProfileFaqTab, faqRouteName } from "@/config/profile-faq-pages"
import type { Faq } from "@/lib/types/property"
import { cn } from "@/lib/utils"

interface LocalFaq {
  localId: string
  id?: string
  question: string
  question_en: string
  answer: string
  answer_en: string
  page_slug: string
  sort_order: number
  dirty?: boolean
  isNew?: boolean
}

interface ProfileFaqEditorProps {
  pageSlug: string
  publicPath: string
  initialFaqs: Faq[]
  showHeader?: boolean
  compact?: boolean
}

const textareaCls =
  "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"

export function ProfileFaqEditor({
  pageSlug,
  publicPath,
  initialFaqs,
  showHeader = true,
  compact = false,
}: ProfileFaqEditorProps) {
  const routeName = faqRouteName(publicPath)
  const [faqs, setFaqs] = useState<LocalFaq[]>(() =>
    initialFaqs.map((f) => ({
      localId: f.id,
      id: f.id,
      question: f.question,
      question_en: f.question_en,
      answer: f.answer,
      answer_en: f.answer_en,
      page_slug: f.page_slug,
      sort_order: f.sort_order,
    })),
  )
  const [isPending, startTransition] = useTransition()
  const [savingId, setSavingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function addNew() {
    const localId = `new-${Date.now()}`
    setFaqs((prev) => [
      ...prev,
      {
        localId,
        question: "",
        question_en: "",
        answer: "",
        answer_en: "",
        page_slug: pageSlug,
        sort_order: prev.length,
        dirty: true,
        isNew: true,
      },
    ])
  }

  function update(localId: string, field: "question" | "question_en" | "answer" | "answer_en", value: string) {
    setFaqs((prev) =>
      prev.map((f) => (f.localId === localId ? { ...f, [field]: value, dirty: true } : f)),
    )
  }

  function save(faq: LocalFaq) {
    setSavingId(faq.localId)
    setError(null)
    const formData = new FormData()
    formData.set("question", faq.question)
    formData.set("question_en", faq.question_en)
    formData.set("answer", faq.answer)
    formData.set("answer_en", faq.answer_en)
    formData.set("page_slug", pageSlug)
    formData.set("sort_order", String(faq.sort_order))

    startTransition(async () => {
      const result = await upsertFaq(faq.id ?? null, {}, formData)
      if (result.error) {
        setError(result.error)
      } else {
        setFaqs((prev) =>
          prev.map((f) =>
            f.localId === faq.localId
              ? {
                  ...f,
                  id: result.id ?? f.id,
                  localId: result.id ?? f.localId,
                  dirty: false,
                  isNew: false,
                }
              : f,
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
    setError(null)
    startTransition(async () => {
      if (faq.id) {
        const result = await deleteFaq(faq.id)
        if (result.error) setError(result.error)
        else setFaqs((prev) => prev.filter((f) => f.localId !== faq.localId))
      }
      setDeletingId(null)
    })
  }

  return (
    <div className={cn("flex flex-col gap-3", !compact && "rounded-xl border bg-white p-6")}>
      {showHeader && (
        <div className="border-b border-border/60 pb-3">
          <p className="font-mono text-base font-semibold text-primary">{routeName}</p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {publicPath}
            <span className="text-muted-foreground/50 mx-1.5">·</span>
            page_slug: <span className="font-mono">{pageSlug}</span>
          </p>
        </div>
      )}

      <div>
        <h2 className="text-foreground text-sm font-semibold">คำถามที่พบบ่อย (FAQ)</h2>
        <p className="text-muted-foreground mt-0.5 text-xs">บันทึกทีละรายการ — อัปเดตบนเว็บหลังบันทึก</p>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {faqs.length === 0 ? (
        <p className="text-muted-foreground text-sm">ยังไม่มี FAQ สำหรับหน้านี้ — กดเพิ่มคำถามด้านล่าง</p>
      ) : (
        <div className="divide-y rounded-lg border">
          {faqs.map((faq) => (
            <div key={faq.localId} className="flex items-start gap-3 p-4">
              <GripVertical className="text-muted-foreground/40 mt-2 size-4 shrink-0" aria-hidden />
              <div className="grid flex-1 grid-cols-1 gap-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-muted-foreground text-xs font-medium">คำถาม (ไทย)</label>
                    <Input
                      value={faq.question}
                      onChange={(e) => update(faq.localId, "question", e.target.value)}
                      placeholder="คำถามที่พบบ่อย..."
                      className={cn(faq.dirty && "border-amber-300")}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-muted-foreground text-xs font-medium">
                      คำถาม (English)
                      <span className="text-muted-foreground/70 ml-1 font-normal">แนะนำ</span>
                    </label>
                    <Input
                      value={faq.question_en}
                      onChange={(e) => update(faq.localId, "question_en", e.target.value)}
                      placeholder="Frequently asked question..."
                      className={cn(faq.dirty && "border-amber-300")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-muted-foreground text-xs font-medium">คำตอบ (ไทย)</label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) => update(faq.localId, "answer", e.target.value)}
                      placeholder="คำตอบ..."
                      rows={3}
                      className={cn(textareaCls, faq.dirty && "border-amber-300")}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-muted-foreground text-xs font-medium">
                      คำตอบ (English)
                      <span className="text-muted-foreground/70 ml-1 font-normal">แนะนำ</span>
                    </label>
                    <textarea
                      value={faq.answer_en}
                      onChange={(e) => update(faq.localId, "answer_en", e.target.value)}
                      placeholder="Answer..."
                      rows={3}
                      className={cn(textareaCls, faq.dirty && "border-amber-300")}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex shrink-0 items-center gap-2">
                {faq.dirty && (
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => save(faq)}
                    disabled={isPending}
                    className="bg-primary hover:bg-primary/90 gap-1 text-white"
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
                  type="button"
                  variant="ghost"
                  onClick={() => remove(faq)}
                  disabled={isPending}
                  className="size-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                  aria-label="ลบคำถาม"
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
      )}

      <Button type="button" variant="outline" onClick={addNew} className="gap-2 self-start">
        <Plus className="size-4" />
        เพิ่มคำถาม
      </Button>
    </div>
  )
}

export function ProfileTabFaqs({
  tab,
  faqsByPage,
}: {
  tab: ProfileFaqTab
  faqsByPage: Record<string, Faq[]>
}) {
  const meta = PROFILE_PAGE_FAQS[tab]
  const faqs = faqsByPage[meta.slug] ?? []

  return (
    <section className="flex flex-col gap-4 rounded-xl border bg-white p-6">
      <ProfileFaqEditor
        pageSlug={meta.slug}
        publicPath={meta.path}
        initialFaqs={faqs}
        showHeader
        compact
      />
    </section>
  )
}
