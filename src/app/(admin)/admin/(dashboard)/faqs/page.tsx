import { getFaqs, groupFaqsByPage } from "@/lib/queries/faqs"
import { ProfileFaqEditor } from "@/components/admin/ProfileFaqEditor"
import { PROFILE_FAQ_TAB_ORDER, PROFILE_PAGE_FAQS } from "@/config/profile-faq-pages"

export const metadata = { title: "FAQ" }

export default async function FaqsPage() {
  const faqs = await getFaqs()
  const faqsByPage = groupFaqsByPage(faqs)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">FAQ</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          จัดการคำถามที่พบบ่อยทุกหน้า — หรือแก้ไขผ่านแท็บในเมนูโปรไฟล์ได้เช่นกัน
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {PROFILE_FAQ_TAB_ORDER.map((tab) => {
          const meta = PROFILE_PAGE_FAQS[tab]
          return (
            <ProfileFaqEditor
              key={meta.slug}
              pageSlug={meta.slug}
              publicPath={meta.path}
              initialFaqs={faqsByPage[meta.slug] ?? []}
            />
          )
        })}
      </div>
    </div>
  )
}
