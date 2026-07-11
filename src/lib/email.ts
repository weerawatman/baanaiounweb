/**
 * Email Notification Service (Rev.00)
 * Uses Resend for reliable email delivery
 */

// Dynamic import type for Resend
type ResendClient = {
  emails: {
    send: (options: {
      from: string
      to: string[]
      subject: string
      html: string
    }) => Promise<{ data: unknown; error: unknown }>
  }
}

let resendClient: ResendClient | null = null

interface EmailPayload {
  formTag: string
  name: string
  contact: string
  details: Record<string, string>
}

export async function sendEmailNotification(payload: EmailPayload): Promise<boolean> {
  // Lazy load Resend to avoid build issues if not configured
  if (!resendClient) {
    try {
      const { Resend } = await import("resend")
      if (!process.env.RESEND_API_KEY) {
        console.warn("[Email] RESEND_API_KEY not configured")
        return false
      }
      resendClient = new Resend(process.env.RESEND_API_KEY)
    } catch (err) {
      console.error("[Email] Failed to load Resend:", err)
      return false
    }
  }

  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL_TO || "supansa.m@baanaioun.com"
  const { subject, htmlContent } = formatEmailContent(payload)

  try {
    const { error } = await resendClient.emails.send({
      from: "Baan Ai Oun Website <noreply@baanaioun.com>",
      to: [NOTIFY_EMAIL],
      subject,
      html: htmlContent,
    })

    if (error) {
      console.error("[Email] Error:", error)
      return false
    }

    return true
  } catch (err) {
    console.error("[Email] Error:", err)
    return false
  }
}

function formatEmailContent(payload: EmailPayload) {
  const subject = getEmailSubject(payload.formTag)
  const htmlContent = generateEmailHTML(payload)

  return { subject, htmlContent }
}

function getEmailSubject(formTag: string): string {
  const subjects: Record<string, string> = {
    "owner": "[Lead ใหม่] แจ้งฝากทรัพย์จากหน้าเว็บไซต์บ้านไออุ่น | [New Lead] Property Listing from Baan Ai Oun Website",
    "owner-foreign": "[New Lead] Property Listing (Foreign Owner) from Baan Ai Oun Website",
    "buyer": "[Lead ใหม่] ลูกค้าตามหาบ้าน/ปรึกษาสินเชื่อ จากเว็บไซต์บ้านไออุ่น | [New Lead] Buyer/Renter Inquiry from Baan Ai Oun Website",
    "buyer-foreign": "[New Lead] Buyer/Renter Inquiry (Foreign) from Baan Ai Oun Website",
    "co-agent": "[Co-Agent ใหม่] มีนายหน้าส่งทรัพย์มาเสนอ Co-Broke | [New Co-Agent] Property Co-Broke Proposal from Baan Ai Oun Website",
    "academy": "[นักเรียนใหม่] สมัครคอร์สนายหน้า Workshop พลิกชีวิต | [New Student] Agent Course Registration from Baan Ai Oun Website",
    "request-list-property": "[Lead ใหม่] คำขอฝากขาย/ปล่อยเช่า จากเว็บไซต์บ้านไออุ่น | [New Lead] List Property Request from Baan Ai Oun Website",
    "request-matchmaking": "[Lead ใหม่] คำขอจัดหาทรัพย์ตามต้องการ จากเว็บไซต์บ้านไออุ่น | [New Lead] Property Matchmaking Request from Baan Ai Oun Website",
    "request-co-agent": "[Co-Agent ใหม่] คำขอร่วมเป็น Co-Agent จากเว็บไซต์บ้านไออุ่น | [New Lead] Co-Agent Request from Baan Ai Oun Website",
  }

  return subjects[formTag] || `[Lead ใหม่] ฟอร์มจากเว็บไซต์บ้านไออุ่น | [New Lead] Form from Baan Ai Oun Website`
}

function generateEmailHTML(payload: EmailPayload): string {
  const tagLabel = getFormTagLabel(payload.formTag)
  const detailsRows = Object.entries(payload.details)
    .filter(([, value]) => value && value.trim())
    .map(([key, value]) => {
      const label = getFieldLabel(key)
      return `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${label}:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${value}</td></tr>`
    })
    .join("")

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Baan Ai Oun - New Lead</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #14532d; color: white; padding: 25px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { padding: 25px 20px; background: #ffffff; border-radius: 0 0 8px 8px; }
    .contact-info { background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #14532d; }
    .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .details-table td { vertical-align: top; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; margin-top: 20px; }
    .tag-badge { display: inline-block; background: #E8833A; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-top: 10px; }
    .timestamp { color: #888; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0; color: white;">🏡 บ้านไออุ่น — Lead ใหม่</h2>
      <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">${tagLabel}</p>
      <div class="tag-badge">${payload.formTag}</div>
    </div>

    <div class="content">
      <h3 style="margin-top: 0; color: #14532d;">ข้อมูลผู้ติดต่อ | Contact Information</h3>
      <div class="contact-info">
        <p style="margin: 5px 0;"><strong>ชื่อ | Name:</strong> ${payload.name}</p>
        <p style="margin: 5px 0;"><strong>ติดต่อ | Contact:</strong> ${payload.contact}</p>
      </div>

      <h3 style="color: #14532d;">รายละเอียดเพิ่มเติม | Additional Details</h3>
      <table class="details-table">
        ${detailsRows}
      </table>

      <div class="timestamp">
        📅 <strong>เวลา | Time:</strong> ${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
      </div>
    </div>

    <div class="footer">
      <p>ข้อความนี้ถูกส่งอัตโนมัติจากเว็บไซต์บ้านไออุ่น</p>
      <p style="margin: 5px 0 0 0;">This message was automatically generated from Baan Ai Oun website</p>
    </div>
  </div>
</body>
</html>`
}

function getFormTagLabel(formTag: string): string {
  const labels: Record<string, string> = {
    "owner": "ฝากทรัพย์ | Property Listing",
    "owner-foreign": "ฝากทรัพย์ (Foreign Owner)",
    "buyer": "หาบ้าน/สินเชื่อ | Find Home/Loan",
    "buyer-foreign": "หาบ้าน (Foreign Buyer)",
    "co-agent": "Co-Agent | Network Partner",
    "academy": "คอร์สนายหน้า | Agent Course",
    "request-list-property": "ฝากขาย/ปล่อยเช่า | List Your Property",
    "request-matchmaking": "จัดหาทรัพย์ตามต้องการ | Property Matchmaking",
    "request-co-agent": "ร่วมเป็น Co-Agent | Join as a Co-Agent",
  }

  return labels[formTag] || formTag
}

function getFieldLabel(key: string): string {
  const labels: Record<string, string> = {
    purpose: "จุดประสงค์ | Purpose",
    requirement: "ความต้องการ | Requirement",
    propertyType: "ประเภททรัพย์ | Property Type",
    location: "ทำเลที่ตั้ง | Location",
    price: "ราคา | Price",
    budget: "งบประมาณ | Budget",
    lineId: "LINE ID",
    commission: "คอมมิชชัน | Commission",
    occupation: "อาชีพ | Occupation",
    details: "รายละเอียดเพิ่มเติม | Additional Details",
    nationality: "สัญชาติ | Nationality",
    propertySize: "ขนาดทรัพย์ | Property Size",
  }

  return labels[key] || key
}