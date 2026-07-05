import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { getServiceRequestById } from "@/lib/queries/requests"
import {
  isServiceRequestType,
  SERVICE_REQUEST_TYPE_LABEL,
} from "@/lib/types/service-request"
import { REQUEST_PROPERTY_TYPE_OPTIONS } from "@/content/form-options"
import { RequestStatusUpdater } from "./RequestStatusUpdater"
import { RequestNotesEditor } from "./RequestNotesEditor"

export const metadata = { title: "รายละเอียดคำขอบริการ" }

const PROPERTY_TYPE_LABEL: Record<string, string> = Object.fromEntries(
  REQUEST_PROPERTY_TYPE_OPTIONS.map((opt) => [opt.value, opt.label]),
)

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ type?: string }>
}

export default async function RequestDetailPage({ params, searchParams }: Props) {
  const [{ id }, { type }] = await Promise.all([params, searchParams])

  if (!isServiceRequestType(type)) notFound()

  const request = await getServiceRequestById(type, id)
  if (!request) notFound()

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <Link
          href={`/admin/requests?tab=${type}`}
          className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm"
        >
          <ChevronLeft className="size-4" />
          กลับ
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-foreground text-2xl font-bold">{request.name}</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {SERVICE_REQUEST_TYPE_LABEL[type]} ·{" "}
              {new Date(request.created_at).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <StatusBadge status={request.status} variant="lead" />
        </div>
      </div>

      {/* Status updater (client) */}
      <RequestStatusUpdater type={type} id={request.id} currentStatus={request.status} />

      {/* Contact */}
      <section className="rounded-xl border bg-white p-5">
        <p className="text-foreground mb-3 text-sm font-semibold">ข้อมูลติดต่อ</p>
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Row label="เบอร์โทร / WhatsApp / LINE" value={request.phone} />
          <Row label="อีเมล" value={request.email} />
        </dl>
      </section>

      {/* Request details */}
      <section className="rounded-xl border bg-white p-5">
        <p className="text-foreground mb-3 text-sm font-semibold">รายละเอียดคำขอ</p>
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Row
            label="ประเภททรัพย์"
            value={PROPERTY_TYPE_LABEL[request.property_type] ?? request.property_type}
          />
          <Row label="ทำเล / พื้นที่" value={request.location} />
          <Row label="งบประมาณ / ราคา" value={request.budget} />
        </dl>
      </section>

      {/* Notes (client) */}
      <RequestNotesEditor type={type} id={request.id} initialNotes={request.notes ?? ""} />

      {/* Images */}
      {request.image_urls?.length > 0 && (
        <section className="rounded-xl border bg-white p-5">
          <p className="text-foreground mb-3 text-sm font-semibold">
            รูปภาพที่แนบมา ({request.image_urls.length})
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {request.image_urls.map((url) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt="รูปประกอบ"
                  className="aspect-square rounded-lg border object-cover hover:opacity-90"
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
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="text-foreground text-sm font-medium">{value}</dd>
    </div>
  )
}
