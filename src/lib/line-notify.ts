/**
 * LINE Notify integration
 * Sends notification to the team's LINE group when a form is submitted.
 *
 * Get your token at: https://notify-bot.line.me/my/
 */

const LINE_NOTIFY_API = "https://notify-api.line.me/api/notify"

interface NotifyPayload {
  formTag: string
  name: string
  contact: string
  details: Record<string, string>
}

const TAG_LABELS: Record<string, string> = {
  owner: "เจ้าของทรัพย์ (ฝากขาย/เช่า)",
  "owner-foreign": "Foreign Owner (ฝากขาย/เช่า)",
  buyer: "ลูกค้าหาซื้อ/เช่า",
  "buyer-foreign": "Foreign Buyer/Renter",
  "co-agent": "Co-Agent เครือข่ายนายหน้า",
  academy: "สนใจคอร์สนายหน้า",
  contact: "ข้อความจากหน้าติดต่อ",
}

export async function sendLineNotify(payload: NotifyPayload): Promise<boolean> {
  const token = process.env.LINE_NOTIFY_TOKEN

  if (!token) {
    console.warn("[LINE Notify] LINE_NOTIFY_TOKEN not set — skipping notification")
    return false
  }

  const tagLabel = TAG_LABELS[payload.formTag] ?? payload.formTag
  const detailLines = Object.entries(payload.details)
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k}: ${v}`)
    .join("\n")

  const message = `
🏡 บ้านไออุ่น — Lead ใหม่!
━━━━━━━━━━━━━━━
📌 ประเภท: ${tagLabel}
👤 ชื่อ: ${payload.name}
📱 ติดต่อ: ${payload.contact}
${detailLines ? `\n📝 รายละเอียด:\n${detailLines}` : ""}
━━━━━━━━━━━━━━━
⏰ ${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}`

  try {
    const res = await fetch(LINE_NOTIFY_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ message }),
    })

    if (!res.ok) {
      console.error("[LINE Notify] Failed:", res.status, await res.text())
      return false
    }

    return true
  } catch (err) {
    console.error("[LINE Notify] Error:", err)
    return false
  }
}
