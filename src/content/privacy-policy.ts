/**
 * Privacy Policy content — bilingual (Thai/English), static legal text.
 * Reviewed and approved by site owner 2026-07-03. Update EFFECTIVE_DATE
 * and re-review with a PDPA-qualified advisor before any substantive change.
 */

export const EFFECTIVE_DATE = { th: "1 มกราคม 2569", en: "January 1, 2026" }

export const INTRO = {
  th: `บ้านไออุ่น พร็อพเพอร์ตี้ ("เรา", "บริษัท") ให้ความสำคัญกับความเป็นส่วนตัวของท่าน ("ท่าน", "ผู้ใช้บริการ") นโยบายฉบับนี้อธิบายว่าเราเก็บรวบรวม ใช้ เปิดเผย และดูแลรักษาข้อมูลส่วนบุคคลของท่านอย่างไร เมื่อท่านใช้งานเว็บไซต์ baanaioun.com (หรือโดเมนที่เกี่ยวข้อง) และบริการที่เกี่ยวข้อง สอดคล้องตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)`,
  en: `Baan Ai Oun Property ("we", "the Company") values your privacy ("you", "the user"). This policy explains how we collect, use, disclose, and protect your personal data when you use baanaioun.com (or related domains) and our associated services, in accordance with Thailand's Personal Data Protection Act B.E. 2562 (PDPA).`,
}

export type PolicyBlock =
  | { type: "p"; th: string; en: string }
  | { type: "list"; items: { th: string; en: string }[] }
  | { type: "note"; th: string; en: string }

export interface PolicySection {
  number: string
  titleTh: string
  titleEn: string
  blocks: PolicyBlock[]
}

export const PRIVACY_POLICY_SECTIONS: PolicySection[] = [
  {
    number: "1",
    titleTh: "ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม",
    titleEn: "Personal Data We Collect",
    blocks: [
      {
        type: "p",
        th: "เราเก็บข้อมูลเฉพาะเท่าที่ท่านให้ไว้เองผ่านแบบฟอร์มติดต่อ/สอบถามบนเว็บไซต์ ได้แก่:",
        en: "We collect only the data you voluntarily provide through our website's contact/enquiry forms, namely:",
      },
      {
        type: "list",
        items: [
          {
            th: "**ข้อมูลติดต่อ:** ชื่อ-นามสกุล, เบอร์โทรศัพท์, LINE ID, อีเมล (ท่านเลือกให้ข้อมูลอย่างน้อย 1 ช่องทางเพื่อให้เราติดต่อกลับได้)",
            en: "**Contact information:** Full name, phone number, LINE ID, email (you provide at least one contact method so we can reach you).",
          },
          {
            th: "**ข้อมูลเกี่ยวกับความต้องการด้านอสังหาริมทรัพย์:** เช่น ประเภททรัพย์ที่สนใจ (ซื้อ/เช่า/ที่ดิน), งบประมาณ, ทำเลที่ต้องการ, รายละเอียดทรัพย์ที่ต้องการฝากขาย/เช่า ขึ้นอยู่กับแบบฟอร์มที่ท่านกรอก (ค้นหาทรัพย์, ฝากขาย/เช่า, Co-Agent, คอร์สนายหน้า หรือแบบฟอร์มติดต่อทั่วไป)",
            en: "**Property-related information:** E.g. property type of interest (buy/rent/land), budget, preferred location, or listing details — depending on which form you submit (Find Property, List Property, Co-Agent, Agent Course, or general Contact).",
          },
          {
            th: "**รูปภาพทรัพย์สิน:** กรณีท่านฝากขาย/เช่าทรัพย์ผ่านแบบฟอร์ม ท่านอาจอัปโหลดรูปภาพทรัพย์สินของท่าน (สูงสุด 5 รูป) เพื่อประกอบการพิจารณา",
            en: "**Property photos:** If you submit the List Property form, you may upload photos of your property (up to 5 images) to support our assessment.",
          },
        ],
      },
      {
        type: "p",
        th: "เราไม่เก็บข้อมูลอ่อนไหว (Sensitive Data) เช่น ศาสนา เชื้อชาติ ประวัติอาชญากรรม หรือข้อมูลสุขภาพ และไม่มีการติดตามพฤติกรรมผู้ใช้ด้วยคุกกี้โฆษณา/การตลาดใดๆ บนเว็บไซต์นี้ในปัจจุบัน",
        en: "We do not collect sensitive data such as religion, ethnicity, criminal history, or health information, and this site does not currently use any advertising or marketing tracking cookies.",
      },
    ],
  },
  {
    number: "2",
    titleTh: "วัตถุประสงค์ในการเก็บรวบรวมและใช้ข้อมูล",
    titleEn: "Purpose of Collection and Use",
    blocks: [
      { type: "p", th: "เราเก็บและใช้ข้อมูลของท่านเพื่อ:", en: "We collect and use your data to:" },
      {
        type: "list",
        items: [
          {
            th: "ติดต่อกลับเพื่อให้คำปรึกษาและนำเสนอบริการที่ท่านสนใจ (ค้นหาทรัพย์, ฝากขาย/เช่าทรัพย์, สมัครเป็น Co-Agent, สมัครคอร์สนายหน้า หรือสอบถามทั่วไป)",
            en: "Contact you back to provide consultation and the service you're interested in (finding property, listing a property, becoming a Co-Agent, joining the Agent Course, or general enquiries).",
          },
          {
            th: "ดำเนินการตามคำขอของท่าน เช่น จัดหาทรัพย์ที่ตรงความต้องการ หรือประเมิน/ลงประกาศทรัพย์ที่ท่านต้องการฝากขาย-เช่า",
            en: "Carry out your request, such as sourcing matching properties or assessing/listing a property you wish to sell or rent out.",
          },
          {
            th: "ปรับปรุงคุณภาพการให้บริการของเรา",
            en: "Improve the quality of our service.",
          },
        ],
      },
      {
        type: "p",
        th: "เราจะไม่นำข้อมูลของท่านไปใช้เพื่อวัตถุประสงค์อื่นนอกเหนือจากนี้ โดยไม่ได้รับความยินยอมจากท่านก่อน",
        en: "We will not use your data for any purpose beyond these without first obtaining your consent.",
      },
    ],
  },
  {
    number: "2.1",
    titleTh: "ฐานความชอบด้วยกฎหมาย",
    titleEn: "Legal Basis",
    blocks: [
      {
        type: "p",
        th: "เราประมวลผลข้อมูลส่วนบุคคลของท่านภายใต้ฐานความชอบด้วยกฎหมาย ดังนี้:",
        en: "We process your personal data under the following legal bases:",
      },
      {
        type: "list",
        items: [
          {
            th: "**ฐานการปฏิบัติตามสัญญา (Contract):** เพื่อดำเนินการตามคำขอของท่านก่อนเข้าทำสัญญา หรือเพื่อให้บริการตามที่ท่านร้องขอ เช่น การประเมินทรัพย์ หรือการจัดหาอสังหาริมทรัพย์",
            en: "**Contract:** To take steps at your request prior to entering into a contract, or to provide the service you requested — such as property assessment or property sourcing.",
          },
          {
            th: "**ฐานความยินยอม (Consent):** ในกรณีที่จำเป็นต้องขอความยินยอมโดยชัดแจ้งจากท่าน เช่น การติดต่อเพื่อนำเสนอข้อมูลที่ท่านสอบถาม",
            en: "**Consent:** Where explicit consent is required, such as contacting you to provide information you enquired about.",
          },
          {
            th: "**ฐานประโยชน์โดยชอบด้วยกฎหมาย (Legitimate Interest):** เพื่อการรักษาความปลอดภัยของระบบ และปรับปรุงคุณภาพการให้บริการ โดยไม่เกินขอบเขตที่ท่านสามารถคาดหมายได้ตามสมควร",
            en: "**Legitimate Interest:** For system security and service quality improvement, within the scope you would reasonably expect.",
          },
        ],
      },
    ],
  },
  {
    number: "3",
    titleTh: "การเปิดเผยข้อมูลให้บุคคลภายนอก",
    titleEn: "Disclosure to Third Parties",
    blocks: [
      {
        type: "p",
        th: "เมื่อท่านส่งแบบฟอร์ม ข้อมูลของท่านจะถูกส่งต่อไปยัง:",
        en: "When you submit a form, your data is shared with:",
      },
      {
        type: "list",
        items: [
          {
            th: "**ทีมงานของเรา:** ผ่านการแจ้งเตือนทาง LINE และอีเมล เพื่อให้ทีมงานติดต่อกลับท่านได้อย่างรวดเร็ว",
            en: "**Our team:** Via LINE and email notifications, so our team can follow up with you promptly.",
          },
          {
            th: "**ผู้ให้บริการระบบที่เราใช้งาน (Data Processors):** ได้แก่ ผู้ให้บริการฐานข้อมูล/พื้นที่จัดเก็บข้อมูลบนคลาวด์ (สำหรับเก็บข้อมูลแบบฟอร์มและรูปภาพ), ผู้ให้บริการส่งข้อความ LINE และผู้ให้บริการส่งอีเมล — ผู้ให้บริการเหล่านี้ประมวลผลข้อมูลในนามของเราเท่านั้น และมีข้อตกลงในการรักษาความลับของข้อมูล",
            en: "**Our service providers:** Including our cloud database/storage provider (for form data and photos), our LINE messaging provider, and our email delivery provider — these providers process data solely on our behalf under confidentiality agreements.",
          },
          {
            th: "**หน่วยงานราชการหรือหน่วยงานกำกับดูแล:** ในกรณีที่มีความจำเป็นต้องปฏิบัติตามกฎหมาย คำสั่งศาล หรือหมายเรียกจากพนักงานเจ้าหน้าที่",
            en: "**Government or regulatory authorities:** Where necessary to comply with law, a court order, or a lawful request from a competent authority.",
          },
        ],
      },
      {
        type: "p",
        th: "เรา **ไม่ขาย ไม่ให้เช่า และไม่แลกเปลี่ยนข้อมูลส่วนบุคคลของท่านกับบุคคลภายนอกเพื่อวัตถุประสงค์ทางการตลาด**",
        en: "We **do not sell, rent, or trade your personal data with third parties for marketing purposes**.",
      },
    ],
  },
  {
    number: "4",
    titleTh: "ระยะเวลาในการเก็บรักษาข้อมูล",
    titleEn: "Data Retention Period",
    blocks: [
      {
        type: "p",
        th: "เราจะเก็บรักษาข้อมูลของท่านไว้ตราบเท่าที่จำเป็นต่อการติดต่อและให้บริการตามคำขอของท่าน หรือตามระยะเวลาที่กฎหมายกำหนด โดยทั่วไปเราจะเก็บรักษาข้อมูลของท่านไว้เป็นเวลา **1-3 ปี** นับจากการติดต่อหรือการทำธุรกรรมครั้งล่าสุด เมื่อพ้นกำหนดระยะเวลาดังกล่าว หรือเมื่อท่านใช้สิทธิขอลบข้อมูล เราจะดำเนินการลบ ทำลาย หรือทำให้ข้อมูลนั้นไม่สามารถระบุตัวตนได้",
        en: "We retain your data for as long as necessary to contact you and fulfil your request, or as required by law. As a general rule, we retain your data for **1–3 years** from your last contact or transaction with us. Once this period has passed, or when you exercise your right to deletion, we will delete, destroy, or anonymize the data.",
      },
    ],
  },
  {
    number: "5",
    titleTh: "มาตรการรักษาความปลอดภัยของข้อมูล",
    titleEn: "Security Measures",
    blocks: [
      {
        type: "p",
        th: "เราจัดเก็บข้อมูลของท่านบนระบบฐานข้อมูลที่มีการเข้ารหัสและควบคุมสิทธิ์การเข้าถึงเฉพาะทีมงานที่เกี่ยวข้องเท่านั้น และมีการจำกัดอัตราการส่งข้อมูล (rate limiting) เพื่อป้องกันการใช้งานแบบฟอร์มในทางที่ผิด",
        en: "Your data is stored on an encrypted database with access restricted to relevant staff only, and we apply rate limiting to prevent misuse of our forms.",
      },
    ],
  },
  {
    number: "6",
    titleTh: "คุกกี้ (Cookies)",
    titleEn: "Cookies",
    blocks: [
      {
        type: "p",
        th: "เว็บไซต์ส่วนที่ให้บริการแก่ผู้เข้าชมทั่วไปในปัจจุบัน **ไม่ใช้คุกกี้เพื่อการติดตามพฤติกรรมหรือการตลาด** ระบบจะใช้คุกกี้/พื้นที่จัดเก็บข้อมูลในเบราว์เซอร์เฉพาะส่วนที่จำเป็นต่อการทำงานของระบบหลังบ้าน (สำหรับทีมงานเข้าสู่ระบบจัดการเท่านั้น) ไม่เกี่ยวข้องกับการเก็บข้อมูลผู้เข้าชมทั่วไป",
        en: "The public-facing part of this website currently **does not use tracking or marketing cookies**. Cookies/browser storage are used only where necessary for backend system functionality (staff admin login), and are unrelated to general visitor data collection.",
      },
      {
        type: "note",
        th: "หากในอนาคตมีการติดตั้งระบบวิเคราะห์เว็บไซต์ เช่น Google Analytics หรือ Meta Pixel จะต้องปรับปรุงหัวข้อนี้และอาจต้องมีแบนเนอร์ขอความยินยอมคุกกี้เพิ่มเติม",
        en: "If website analytics such as Google Analytics or Meta Pixel are added in future, this section must be updated and a cookie consent banner may be required.",
      },
    ],
  },
  {
    number: "7",
    titleTh: "สิทธิของเจ้าของข้อมูลส่วนบุคคล",
    titleEn: "Data Subject Rights",
    blocks: [
      {
        type: "p",
        th: "ภายใต้ PDPA ท่านมีสิทธิดังต่อไปนี้เกี่ยวกับข้อมูลส่วนบุคคลของท่าน:",
        en: "Under the PDPA, you have the following rights regarding your personal data:",
      },
      {
        type: "list",
        items: [
          { th: "สิทธิขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคล", en: "Right to access and obtain a copy of your personal data." },
          { th: "สิทธิขอให้แก้ไขข้อมูลให้ถูกต้อง", en: "Right to have your data corrected." },
          { th: "สิทธิขอให้ลบหรือทำลายข้อมูล", en: "Right to request deletion or destruction of your data." },
          { th: "สิทธิขอให้ระงับการใช้ข้อมูล", en: "Right to restriction of processing." },
          {
            th: "สิทธิขอรับข้อมูลหรือโอนย้ายข้อมูล ในรูปแบบที่เครื่องมือหรืออุปกรณ์อ่านได้",
            en: "Right to data portability, in a machine-readable format.",
          },
          {
            th: "สิทธิขอถอนความยินยอม (ในกรณีที่เราประมวลผลข้อมูลโดยอาศัยความยินยอม)",
            en: "Right to withdraw consent (where we process data based on consent).",
          },
          {
            th: "สิทธิคัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูล",
            en: "Right to object to the collection, use, or disclosure of your data.",
          },
          {
            th: "สิทธิในการร้องเรียนต่อคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สำนักงาน สคส.) หากพบว่าเราฝ่าฝืนหรือไม่ปฏิบัติตาม PDPA",
            en: "Right to lodge a complaint with Thailand's Personal Data Protection Committee (PDPC) if you believe we have violated the PDPA.",
          },
        ],
      },
      {
        type: "p",
        th: "ท่านสามารถใช้สิทธิดังกล่าวได้โดยติดต่อเราตามช่องทางในหัวข้อที่ 9",
        en: "You may exercise these rights by contacting us through the channels listed in Section 9.",
      },
    ],
  },
  {
    number: "8",
    titleTh: "การเปลี่ยนแปลงนโยบาย",
    titleEn: "Changes to This Policy",
    blocks: [
      {
        type: "p",
        th: "เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราวเพื่อให้สอดคล้องกับการเปลี่ยนแปลงของบริการหรือกฎหมาย โดยจะแจ้งวันที่ปรับปรุงล่าสุดไว้ด้านบนของหน้านี้",
        en: "We may update this policy from time to time to reflect changes in our services or the law. The most recent update date will be shown at the top of this page.",
      },
    ],
  },
  {
    number: "9",
    titleTh: "ช่องทางติดต่อ",
    titleEn: "Contact Us",
    blocks: [
      {
        type: "p",
        th: "หากท่านมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ หรือต้องการใช้สิทธิของท่านเกี่ยวกับข้อมูลส่วนบุคคล สามารถติดต่อเราได้ที่:",
        en: "If you have questions about this privacy policy, or wish to exercise your rights regarding your personal data, please contact us at:",
      },
      {
        type: "list",
        items: [
          { th: "**บ้านไออุ่น พร็อพเพอร์ตี้**", en: "**Baan Ai Oun Property**" },
          {
            th: "ที่อยู่: 107/57 เดอะคัลเลอร์เลคเชอร์ ซ.มหาชัย ม.13 ต.บางพลีใหญ่ อ.บางพลี จ.สมุทรปราการ 10540",
            en: "Address: 107/57 The Colour Lecture, Soi Mahachai, Moo 13, Bang Phli Yai, Bang Phli, Samut Prakan 10540",
          },
          { th: "โทร: 086-4149960", en: "Phone: 086-4149960" },
          { th: "อีเมล: supansa.m@baanaioun.com", en: "Email: supansa.m@baanaioun.com" },
          { th: "LINE: @baan-ai-oun", en: "LINE: @baan-ai-oun" },
        ],
      },
    ],
  },
]
