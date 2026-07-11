/**
 * LINE Messaging API Integration (Rev.00)
 * Replaces deprecated LINE Notify with official LINE Messaging API
 */

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message/push"

interface LineMessagePayload {
  formTag: string
  name: string
  contact: string
  details: Record<string, string>
}

export async function sendLineMessage(payload: LineMessagePayload): Promise<boolean> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  const targetId = process.env.LINE_TARGET_ID // User ID or Group ID

  if (!token || !targetId) {
    console.warn("[LINE Messaging] Credentials not configured")
    return false
  }

  const message = formatLineMessage(payload)

  try {
    const res = await fetch(LINE_MESSAGING_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        to: targetId,
        messages: [
          {
            type: "text",
            text: message
          }
        ]
      })
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("[LINE Messaging] API Error:", res.status, errorText)
      return false
    }

    return true
  } catch (err) {
    console.error("[LINE Messaging] Error:", err)
    return false
  }
}

function formatLineMessage(payload: LineMessagePayload): string {
  const tagLabel = getFormTagLabel(payload.formTag)
  const summary = getBriefSummary(payload.details)

  return `🏡 บ้านไออุ่น — Lead ใหม่!
━━━━━━━━━━━━━━━
📌 ${tagLabel}
👤 ${payload.name}
📱 ${payload.contact}
${summary}
━━━━━━━━━━━━━━━
⏰ ${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}`
}

function getFormTagLabel(formTag: string): string {
  const labels: Record<string, string> = {
    "owner": "ฝากทรัพย์ | Property Listing",
    "owner-foreign": "ฝากทรัพย์ (Foreign Owner)",
    "buyer": "หาบ้าน/สินเชื่อ | Find Home/Loan",
    "buyer-foreign": "หาบ้าน (Foreign Buyer)",
    "co-agent": "Co-Agent | Network Partner",
    "academy": "คอร์สนายหน้า | Agent Course",
    "contact": "ติดต่อเรา | Contact Us",
    "request-list-property": "ฝากขาย/ปล่อยเช่า | List Your Property",
    "request-matchmaking": "จัดหาทรัพย์ตามต้องการ | Property Matchmaking",
    "request-co-agent": "ร่วมเป็น Co-Agent | Join as a Co-Agent",
  }

  return labels[formTag] || formTag
}

function getBriefSummary(details: Record<string, string>): string {
  const summaryLines: string[] = []

  // Add key fields based on what's available
  if (details.purpose) {
    const purposeLabel = details.purpose === "sale" ? "ขาย" : details.purpose === "rent" ? "เช่า" : details.purpose
    summaryLines.push(`🎯 จุดประสงค์: ${purposeLabel}`)
  }

  if (details.requirement) {
    const reqLabel = details.requirement === "buy" ? "ซื้อ" : details.requirement === "rent" ? "เช่า" : details.requirement === "loan" ? "สินเชื่อ" : details.requirement
    summaryLines.push(`🎯 ความต้องการ: ${reqLabel}`)
  }

  if (details.propertyType) {
    summaryLines.push(`🏠 ประเภท: ${details.propertyType}`)
  }

  if (details.location) {
    summaryLines.push(`📍 ทำเล: ${details.location}`)
  }

  if (details.price) {
    summaryLines.push(`💰 ราคา: ${details.price}`)
  }

  if (details.budget) {
    summaryLines.push(`💰 งบประมาณ: ${details.budget}`)
  }

  if (details.lineId) {
    summaryLines.push(`💬 LINE ID: ${details.lineId}`)
  }

  if (details.email) {
    summaryLines.push(`📧 อีเมล: ${details.email}`)
  }

  if (details.commission) {
    summaryLines.push(`💸 คอมมิชชัน: ${details.commission}`)
  }

  if (details.occupation) {
    summaryLines.push(`💼 อาชีพ: ${details.occupation}`)
  }

  return summaryLines.join("\n")
}