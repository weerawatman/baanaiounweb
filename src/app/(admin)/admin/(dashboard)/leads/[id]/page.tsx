import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { getLeadById } from "@/lib/queries/leads"
import { LeadStatusUpdater } from "./LeadStatusUpdater"
import { LeadNotesEditor } from "./LeadNotesEditor"

export const metadata = { title: "รายละเอียด Lead" }

const FORM_TAG_LABEL: Record<string, string> = {
  owner: "เจ้าของทรัพย์ (TH)",
  "owner-foreign": "Property Owner (EN)",
  buyer: "ซื้อ/เช่า (TH)",
  "buyer-foreign": "Buyer/Renter (EN)",
  "co-agent": "Co-Agent",
  academy: "Academy",
  contact: "ติดต่อทั่วไป",
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params
  const lead = await getLeadById(id)

  if (!lead) notFound()

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ChevronLeft className="size-4" />
          กลับ
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{lead.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {FORM_TAG_LABEL[lead.form_tag] ?? lead.form_tag} ·{" "}
              {new Date(lead.created_at).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <StatusBadge status={lead.status} variant="lead" />
        </div>
      </div>

      {/* Status updater (client) */}
      <LeadStatusUpdater id={lead.id} currentStatus={lead.status} />

      {/* Contact */}
      <section className="rounded-xl border bg-white p-5">
        <p className="text-sm font-semibold text-foreground mb-3">ข้อมูลติดต่อ</p>
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Row label="เบอร์โทร" value={lead.phone} />
          <Row label="LINE ID" value={lead.line_id} />
          <Row label="อีเมล" value={lead.email} />
          <Row label="ช่องทางอื่น" value={lead.contact} />
        </dl>
      </section>

      {/* Property / Requirement Details */}
      {(lead.property_type || lead.location || lead.price || lead.budget) && (
        <section className="rounded-xl border bg-white p-5">
          <p className="text-sm font-semibold text-foreground mb-3">
            รายละเอียดทรัพย์ / ความต้องการ
          </p>
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Row label="ประเภท" value={lead.property_type} />
            <Row label="ขนาด" value={lead.property_size} />
            <Row label="ทำเล" value={lead.location} />
            <Row label="ราคา" value={lead.price} />
            <Row label="วัตถุประสงค์" value={lead.purpose} />
            <Row label="ความต้องการ" value={lead.requirement} />
            <Row label="ขนาดที่ต้องการ" value={lead.preferred_size} />
            <Row label="งบประมาณ" value={lead.budget} />
            <Row label="preselect" value={lead.preselect} />
          </dl>
          {lead.details && (
            <div className="mt-3 rounded-lg bg-muted/30 p-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                รายละเอียดเพิ่มเติม
              </p>
              <p className="text-sm text-foreground whitespace-pre-line">
                {lead.details}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Notes (client) */}
      <LeadNotesEditor id={lead.id} initialNotes={lead.notes ?? ""} />

      {/* Images */}
      {lead.image_urls?.length > 0 && (
        <section className="rounded-xl border bg-white p-5">
          <p className="text-sm font-semibold text-foreground mb-3">
            รูปภาพที่แนบมา ({lead.image_urls.length})
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {lead.image_urls.map((url) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt="รูปประกอบ"
                  className="aspect-square rounded-lg object-cover border hover:opacity-90"
                />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  )
}
