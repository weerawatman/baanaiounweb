import Link from "next/link"
import Image from "next/image"
import { FileImage } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { FaqSection, type FaqItem } from "@/components/shared"
import { cn } from "@/lib/utils"
import type { Profile } from "@/types"

interface AboutPageProps {
  profile: Profile
  faqs: FaqItem[]
}

interface Milestone {
  year: string
  imageUrl: string
  imageHint: string
  titleTH: string
  titleEN: string
  descTH: React.ReactNode
  descEN: React.ReactNode
}

const ADVANTAGES = [
  {
    icon: "🌐",
    titleTH: "เราคือ \u201cระบบนิเวศที่มีชีวิต\u201d",
    titleEN: "A Living Ecosystem",
    descTH: (
      <>
        เราไม่ใช่แค่แพลตฟอร์มเทคโนโลยีที่ให้คนมาแปะป้ายขายบ้าน แต่เราคือ{" "}
        <strong>Human-Centric Ecosystem</strong> ศูนย์รวมของ เจ้าของทรัพย์ ผู้ซื้อ เครือข่ายนายหน้า
        และทีมช่าง ที่ทำงานร่วมกันอย่างมีชีวิตชีวา
      </>
    ),
    descEN:
      "More than a listing board — we are a human-centric ecosystem connecting owners, buyers, agent networks, and renovation teams working vibrantly together.",
  },
  {
    icon: "👁️",
    titleTH: "คัดกรองด้วย \u201cวิสัยทัศน์นักลงทุน\u201d",
    titleEN: "Curated with an Investor's Vision",
    descTH:
      "เว็บอื่นแค่แสดงราคา แต่เราคือทีมงานที่มีประสบการณ์ตรง (Investor-Minded) จึงสามารถตรวจสอบโครงสร้าง ประเมินความคุ้มค่า และให้คำปรึกษาเพื่อเพิ่มมูลค่าทรัพย์ได้จริง",
    descEN:
      "Other sites just show prices. Our investor-minded team inspects structures, evaluates true value, and advises on how to genuinely increase property value.",
  },
  {
    icon: "🤝",
    titleTH: "บริการครบวงจรจบในที่เดียว",
    titleEN: "End-to-End Service in One Place",
    descTH:
      "ไม่ทิ้งให้คุณเผชิญปัญหาเพียงลำพัง ทีมงานของเราพร้อมเป็นพี่เลี้ยง ดูแลตั้งแต่การตั้งราคา ทำการตลาด จัดหาสินเชื่อ คัดกรองผู้เช่า ไปจนถึงการจดทะเบียนที่กรมที่ดิน",
    descEN:
      "You're never left to face problems alone. We mentor you from pricing and marketing to loans, tenant screening, and Land Office registration.",
  },
] as const

const LOCAL_AREAS = [
  { label: "📍 กรุงเทพมหานคร", highlight: false },
  { label: "📍 สมุทรปราการ", highlight: false },
  { label: "📍 ชลบุรี", highlight: false },
  { label: "📍 ฉะเชิงเทรา", highlight: false },
  { label: "📍 ระยอง", highlight: false },
  { label: "⭐ โซนเศรษฐกิจพิเศษ EEC", highlight: true },
] as const

function TimelineImage({ src, alt, hint }: { src: string; alt: string; hint: string }) {
  if (src) {
    return (
      <div className="relative h-[220px] w-full overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:h-[280px]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 450px" />
      </div>
    )
  }

  return (
    <div className="flex h-[220px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted px-4 text-center text-sm text-muted-foreground md:h-[280px]">
      <span className="flex items-center gap-2">
        <FileImage className="size-4 shrink-0 opacity-60" />
        {hint}
      </span>
    </div>
  )
}

export default function AboutPage({ profile, faqs }: AboutPageProps) {
  const milestones: Milestone[] = [
    {
      year: "2002",
      imageUrl: profile.aboutTimeline2002Image,
      imageHint: "ห้องพักเริ่มต้น",
      titleTH: "จุดเริ่มต้นจากความเข้าใจที่แท้จริง",
      titleEN: "The Beginning of True Understanding",
      descTH: (
        <>
          ทีมงานของเราเริ่มต้นจากการเป็นผู้เช่าและคนหาบ้าน ทำให้{" "}
          <strong>&apos;เรา&apos; เข้าใจความต้องการที่แท้จริง</strong>{" "}
          และเป็นแรงผลักดันให้เรามุ่งมั่นสรรสร้าง &apos;บ้าน&apos;
          ที่อบอุ่นและตอบโจทย์ที่สุดสำหรับทุกคน
        </>
      ),
      descEN:
        "Our team started as renters and home-seekers ourselves, so we truly understand what people need — driving us to create warm homes that answer everyone's needs.",
    },
    {
      year: "2016",
      imageUrl: profile.aboutTimeline2016Image,
      imageHint: "การลงทุนอสังหาริมทรัพย์เบื้องต้น",
      titleTH: "ก้าวแรกสู่การเป็นนักลงทุนอสังหาฯ",
      titleEN: "First Steps as Property Investors",
      descTH:
        "เราเริ่มสะสมประสบการณ์จริงจากการลงพื้นที่ ซื้อ-ขาย-รีโนเวท ปล่อยเช่าในพื้นที่ชลบุรีและปริมณฑล เรียนรู้ตลาดอย่างลึกซึ้ง ลองผิดลองถูกจนเชี่ยวชาญทุกกระบวนการ",
      descEN:
        "We gained hands-on experience buying, selling, renovating, and renting properties across Chonburi and Greater Bangkok — learning the market deeply until mastering every process.",
    },
    {
      year: "2020",
      imageUrl: profile.aboutTimeline2020Image,
      imageHint: "ก่อตั้งบริษัทบ้านไออุ่น",
      titleTH: "กำเนิด \u201cบ้านไออุ่น พร็อพเพอร์ตี้\u201d",
      titleEN: "The Birth of Baan Ai Oun Property",
      descTH: (
        <>
          ก่อตั้ง <strong>&apos;บ้านไออุ่น&apos;</strong> อย่างเป็นทางการ
          เราเปลี่ยนทุกความท้าทายให้เป็นความใส่ใจ
          พร้อมดูแลเคียงข้างลูกค้าและพาร์ทเนอร์นายหน้าให้เติบโตไปด้วยกันในทุกสถานการณ์
        </>
      ),
      descEN:
        "Baan Ai Oun was officially founded. We turned every challenge into care, standing beside clients and agent partners to grow together through every situation.",
    },
    {
      year: "2026",
      imageUrl: profile.aboutTimeline2026Image,
      imageHint: "แพลตฟอร์มดิจิทัลบ้านไออุ่น",
      titleTH: "ก้าวสู่ระบบนิเวศอสังหาฯ ไร้รอยต่อ",
      titleEN: "Toward a Seamless Real Estate Ecosystem",
      descTH:
        "เปิดตัวแพลตฟอร์มออนไลน์เต็มรูปแบบ รวบรวมทรัพย์คุณภาพ ผสานการทำงานกับเครือข่าย Co-Agent ทั่วประเทศ เพื่อช่วยให้คนหาบ้านได้บ้านที่ใช่ และช่วยเจ้าของบ้านปิดดีลได้ไวที่สุด",
      descEN:
        "Launched our full online platform, gathering quality listings and partnering with a nationwide Co-Agent network — helping buyers find the right home and owners close deals faster.",
    },
  ]

  const heroImage = profile.heroImageUrl

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "เกี่ยวกับเรา | About Us" }]} />
      </div>

      {/* Hero banner (mockup about.html) */}
      <header className="relative isolate overflow-hidden bg-primary py-20 text-center text-white sm:py-24">
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt=""
              aria-hidden
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover brightness-[0.6]"
            />
            <div className="absolute inset-0 -z-10 bg-primary/70" />
          </>
        )}
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-heading text-3xl font-bold leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] sm:text-[2.8rem]">
            เกี่ยวกับเรา: บ้านไออุ่น พร็อพเพอร์ตี้
            <span className="mt-1 block text-2xl font-semibold text-white/90 sm:text-3xl">
              About Baan Ai Oun Property
            </span>
          </h1>
          <p className="mt-5 text-lg font-bold text-secondary [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] sm:text-xl">
            เชื่อมโยงทุกความต้องการอสังหาฯ ด้วยประสบการณ์นักลงทุนและบริการที่จริงใจ
          </p>
          <p className="mt-1 text-base text-primary-foreground/80">
            Connecting real estate goals through investor-led expertise and heartfelt service.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {/* Our Story */}
        <section>
          <div className="mb-10 mt-14 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-[2.2rem]">
              จุดเริ่มต้นของเรา | Our Story
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              เรื่องราวที่หล่อหลอมให้เราเป็น &ldquo;ศูนย์รวมอสังหาฯ ที่เข้าใจคุณที่สุด&rdquo; ในวันนี้
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              The story that shaped us into the real estate hub that understands you best.
            </p>
          </div>

          {/* Zigzag timeline (mockup pattern) */}
          <div className="relative mx-auto max-w-4xl py-5">
            <div
              className="absolute bottom-0 top-0 left-5 w-0.5 bg-primary md:left-1/2 md:-translate-x-1/2"
              aria-hidden
            />

            <div className="flex flex-col gap-10 md:gap-16">
              {milestones.map((milestone, index) => (
                <article
                  key={milestone.year}
                  className={cn(
                    "relative flex flex-col gap-5 pl-12 md:flex-row md:items-center md:justify-between md:pl-0",
                    index % 2 === 1 && "md:flex-row-reverse",
                  )}
                >
                  <div
                    className="absolute left-5 top-2 z-10 size-5 -translate-x-1/2 rounded-full border-4 border-primary bg-secondary md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                    aria-hidden
                  />

                  <div className="md:w-[45%]">
                    <TimelineImage
                      src={milestone.imageUrl}
                      alt={milestone.titleTH}
                      hint={milestone.imageHint}
                    />
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_5px_20px_rgba(0,0,0,0.03)] md:w-[45%] md:p-8">
                    <span className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground">
                      {milestone.year}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-foreground">
                      {milestone.titleTH}
                      <span className="mt-0.5 block text-sm font-medium text-muted-foreground">
                        {milestone.titleEN}
                      </span>
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                      {milestone.descTH}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {milestone.descEN}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page banner */}
        <div className="relative mt-20 h-[200px] overflow-hidden rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.15)] sm:h-[280px] lg:h-[350px]">
          {profile.aboutMidBannerImage ? (
            <Image
              src={profile.aboutMidBannerImage}
              alt="ภาพมุมกว้างทำเลเศรษฐกิจ EEC"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover brightness-[0.85]"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
              <FileImage className="size-10 opacity-40" aria-hidden />
              <p className="text-sm">อัปโหลดรูปแบนเนอร์กลางใน Admin &gt; โปรไฟล์ &gt; เกี่ยวกับเรา</p>
            </div>
          )}
        </div>

        {/* How we help (Unfair Advantage) */}
        <section className="mt-20">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-[2.2rem]">
              เว็บไซต์บ้านไออุ่น ช่วยแก้ปัญหาให้คุณได้อย่างไร?
            </h2>
            <p className="mt-1 text-lg font-medium text-muted-foreground sm:text-xl">
              How Does Baan Ai Oun Platform Help You?
            </p>
            <p className="mt-3 text-lg text-muted-foreground">
              แตกต่างจากกระดานประกาศทั่วไป เพราะเราดูแลคุณด้วยทีมงานที่มีหัวใจและประสบการณ์จริง
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Unlike typical listing boards, we care for you with a real, experienced, heartfelt team.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {ADVANTAGES.map((adv) => (
              <div
                key={adv.titleEN}
                className="rounded-[20px] border border-border bg-card px-7 py-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_15px_40px_rgba(20,83,45,0.1)]"
              >
                <div className="mb-5 text-5xl">{adv.icon}</div>
                <h3 className="mb-1 text-xl font-bold text-primary">{adv.titleTH}</h3>
                <p className="mb-4 text-sm font-medium text-muted-foreground">{adv.titleEN}</p>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{adv.descTH}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{adv.descEN}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Local expertise */}
        <section className="mt-20 rounded-3xl border border-border bg-card px-6 py-14 text-center shadow-[0_10px_40px_rgba(0,0,0,0.02)] sm:px-10">
          <h2 className="font-heading text-2xl font-bold text-primary sm:text-[2rem]">
            ความเชี่ยวชาญเฉพาะพื้นที่ (Local Market Expertise)
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            เราคือผู้เชี่ยวชาญตัวจริงที่ลงพื้นที่ และมีเครือข่ายนายหน้าทำงานร่วมกัน
            ครอบคลุมทำเลศักยภาพสูงสุดในประเทศไทย ได้แก่:
          </p>
          <p className="mx-auto mt-1 max-w-3xl text-sm text-muted-foreground">
            Real on-the-ground experts with a collaborative agent network covering Thailand&apos;s
            highest-potential locations:
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            {LOCAL_AREAS.map((area) => (
              <span
                key={area.label}
                className={cn(
                  "whitespace-nowrap rounded-full border px-6 py-3 text-sm font-bold transition-colors",
                  area.highlight
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-primary bg-primary-subtle text-primary hover:bg-primary hover:text-primary-foreground",
                )}
              >
                {area.label}
              </span>
            ))}
          </div>
        </section>
      </main>

      <FaqSection
        title="คำถามที่พบบ่อยเกี่ยวกับ บ้านไออุ่น | Frequently Asked Questions"
        subtitle="เรื่องที่ลูกค้ามักสอบถามเกี่ยวกับบ้านไออุ่น พร็อพเพอร์ตี้"
        items={faqs}
        variant="boxed"
      />

      {/* Bottom CTA (mockup pattern) */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 text-center sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-[2.2rem]">
          ให้เราเป็นพาร์ทเนอร์ดูแลเรื่องอสังหาฯ ของคุณ
        </h2>
        <p className="mt-1 text-lg font-medium text-muted-foreground">
          Let us be your trusted real estate partner.
        </p>
        <div className="mt-7">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-10 py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            💬 ติดต่อทีมงานบ้านไออุ่น | Contact Our Team
          </Link>
        </div>
      </section>
    </>
  )
}
