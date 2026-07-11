import Link from "next/link"
import Image from "next/image"
import { FileImage } from "lucide-react"
import Breadcrumb from "@/components/layout/Breadcrumb"
import { FaqSection, type FaqItem } from "@/components/shared"
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

const VALUE_PROPS = [
  {
    icon: "🤍",
    titleTH: "เข้าใจทุกความต้องการ\nทลายกำแพงภาษา",
    titleEN: "Understanding Needs,\nBridging Gaps",
    descTH:
      "เราเป็น 'ศูนย์กลาง' รวบรวมทรัพย์และนายหน้า (Co-Agent) ตัดความยุ่งยากในการสื่อสาร ค้นหาทรัพย์ที่ซ่อนอยู่ในระบบทั่วไปไม่เจอ",
    descEN:
      "We act as a central hub, gathering properties and co-agents, removing communication barriers to find hidden gems not listed elsewhere.",
  },
  {
    icon: "🛡️",
    titleTH: "บริการครบวงจรจบที่เดียว",
    titleEN: "End-to-End Seamless Service",
    descTH:
      "ดูแลทุกขั้นตอน ตั้งแต่คัดสรร เจรจา ปรึกษาสินเชื่อ สัญญา ไปจนถึงโอนกรรมสิทธิ์และส่งมอบกุญแจ ปลอดภัย 100%",
    descEN:
      "We handle everything: property selection, negotiation, loans, contracts, and secure ownership transfer. 100% safe.",
  },
  {
    icon: "⭐",
    titleTH: "เครือข่ายทีมงาน\nคัดกรองด้วยหัวใจ",
    titleEN: "Heart-Curated\nTeam Network",
    descTH:
      "เชื่อมโยงนายหน้าทั่วประเทศ นำทรัพย์ที่ซ่อนอยู่มาเปิดเผย เพื่อให้มั่นใจว่าลูกค้าจะได้เจอกับทรัพย์ที่ 'น่าอยู่จริง'",
    descEN:
      "Connected with nationwide agents to reveal hidden properties, ensuring clients find truly livable and desirable homes.",
  },
] as const

const LOCAL_AREAS = [
  { label: "กรุงเทพมหานคร", highlight: false },
  { label: "สมุทรปราการ", highlight: false },
  { label: "ชลบุรี", highlight: false },
  { label: "ฉะเชิงเทรา", highlight: false },
  { label: "ระยอง", highlight: false },
  { label: "โซน EEC", highlight: true },
] as const

function TimelineImage({ src, alt, hint }: { src: string; alt: string; hint: string }) {
  if (src) {
    return (
      <div className="relative h-[150px] overflow-hidden rounded-lg border border-border md:h-full md:min-h-[150px]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
      </div>
    )
  }

  return (
    <div className="flex h-[150px] items-center justify-center rounded-lg border-2 border-dashed border-[#cbd5e1] bg-[#e2e8f0] px-4 text-center text-sm text-[#64748b] md:h-full md:min-h-[150px]">
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
      imageHint: "หอพักหรือกุญแจบ้าน",
      titleTH: "จุดเริ่มต้นจากห้องเช่าเล็กๆ",
      titleEN: "The Beginning",
      descTH: (
        <>
          พิมเริ่มต้นชีวิตในกรุงเทพฯ ด้วยห้องเช่าราคาหลักพัน ต้องย้ายที่อยู่บ่อยครั้ง จนวันที่กู้ซื้อบ้านหลังแรกสำเร็จ
          ประสบการณ์นั้นทำให้เรา <strong>&apos;เข้าใจความเหนื่อยล้าของคนไกลบ้าน&apos;</strong> อย่างลึกซึ้ง
        </>
      ),
      descEN: (
        <>
          Pim started her life in Bangkok in a small rented room, moving frequently. Finally securing her
          first home loan taught her to deeply understand{" "}
          <strong>&apos;the exhaustion of finding a true home.&apos;</strong>
        </>
      ),
    },
    {
      year: "2016",
      imageUrl: profile.aboutTimeline2016Image,
      imageHint: "รีโนเวทบ้าน หรือศึกษาดูงาน",
      titleTH: "ก้าวแรกสู่วงการอสังหาฯ",
      titleEN: "First Step in Real Estate",
      descTH:
        "เริ่มต้นเรียนรู้การลงทุนอสังหาริมทรัพย์ควบคู่กับงานประจำ เริ่มจากการกู้เงินเพื่อรีโนเวทบ้าน ปล่อยขายและเช่าในพื้นที่ชลบุรี ลองผิดลองถูกจนเชี่ยวชาญ",
      descEN:
        "Began learning real estate investment alongside a full-time job. Started by securing loans to renovate, sell, and rent properties in Chonburi, learning the market inside out.",
    },
    {
      year: "2020",
      imageUrl: profile.aboutTimeline2020Image,
      imageHint: "ทีมงานพูดคุยกับลูกค้า",
      titleTH: "กำเนิด 'บ้านไออุ่น'",
      titleEN: "The Birth of Baan Ai Oun",
      descTH:
        "ก่อตั้ง บริษัท บ้านไออุ่น จำกัด สร้างบ้านเพื่อคนทำงาน แม้เผชิญวิกฤตโควิด-19 เราก็สู้จนลูกค้าได้เข้าอยู่ครบทุกหลัง และรักษาสายสัมพันธ์อันดีกับลูกค้าและนายหน้ามาตลอด",
      descEN:
        "Founded Baan Ai Oun Co., Ltd. Despite the COVID-19 crisis, we fought hard to ensure every client moved into their homes, building lasting relationships with clients and agents.",
    },
    {
      year: "2026",
      imageUrl: profile.aboutTimeline2026Image,
      imageHint: "หน้าจอเว็บไซต์ หรือการจับมือปิดดีล",
      titleTH: "กำเนิดเว็บไซต์บ้านไออุ่น",
      titleEN: "Launch of Digital Hub",
      descTH: (
        <>
          เราพบปัญหาใหญ่: อสังหาฯ ล้นตลาดแต่ผู้ซื้อกลับ <strong>&apos;หาบ้านที่ตรงใจไม่เจอ&apos;</strong> ส่วนเจ้าของก็{" "}
          <strong>&apos;ปล่อยขายไม่ออก&apos;</strong> เราจึงสร้างเว็บไซต์นี้ขึ้นมาเป็นพื้นที่แก้ปัญหาโดยเฉพาะ
        </>
      ),
      descEN: (
        <>
          We noticed a massive gap: an oversupplied market, yet buyers{" "}
          <strong>&apos;couldn&apos;t find the right home&apos;</strong> and owners{" "}
          <strong>&apos;couldn&apos;t sell.&apos;</strong> We launched this platform specifically to bridge that gap.
        </>
      ),
    },
  ]

  const heroImage = profile.heroImageUrl

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
        <Breadcrumb items={[{ label: "หน้าแรก", href: "/" }, { label: "เกี่ยวกับเรา | About Us" }]} />
      </div>

      {/* Hero banner (mockup about.html) */}
      <header className="relative isolate overflow-hidden bg-gradient-to-b from-[#1B4D3E] to-[#0d2820] py-16 text-center text-white sm:py-20">
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt=""
              aria-hidden
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1B4D3E]/85 to-[#0d2820]/90" />
          </>
        )}
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold sm:text-[2.2rem]">
            เกี่ยวกับเรา: บ้านไออุ่น พร็อพเพอร์ตี้
          </h1>
          <p className="mt-2 text-xl font-medium text-white/80">About Baan Ai Oun Property</p>
          <p className="mt-5 text-base font-bold text-[#D4A843] sm:text-lg">
            &ldquo;เชื่อมโยงทุกความต้องการอสังหาฯ ด้วยประสบการณ์นักลงทุนและบริการที่จริงใจ
            เพื่อคนไทยและต่างชาติ&rdquo;
          </p>
          <p className="mt-2 text-sm text-white/75">
            &ldquo;Connecting real estate goals through investor-led expertise and heartfelt service for
            local and international clients.&rdquo;
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-12 sm:px-6">

        {/* Our Story */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-[2rem]">
              จุดเริ่มต้นของเรา | Our Story
            </h2>
            <p className="mt-2 text-base italic text-[#666]">
              &ldquo;จากคนเช่าห้องแถว สู่ทีมงานที่คัดสรรบ้านด้วยหัวใจ&rdquo;
            </p>
            <p className="mt-1 text-sm italic text-muted-foreground">
              &ldquo;From renting a small room to a team that curates homes with heart.&rdquo;
            </p>
          </div>

          <div className="relative ml-2 max-w-3xl pl-8 sm:mx-auto">
            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-primary" aria-hidden />

            <div className="flex flex-col gap-12">
              {milestones.map((milestone) => (
                <article key={milestone.year} className="relative">
                  <div
                    className="absolute -left-[42px] top-0 size-6 rounded-full border-4 border-muted bg-primary"
                    aria-hidden
                  />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.5fr] md:items-center">
                    <TimelineImage
                      src={milestone.imageUrl}
                      alt={milestone.titleTH}
                      hint={milestone.imageHint}
                    />

                    <div className="rounded-xl border border-border bg-card p-6 shadow-[0_4px_6px_rgba(0,0,0,0.02)]">
                      <h3 className="mb-3 flex flex-wrap items-center justify-between gap-2 text-lg font-semibold text-primary">
                        <span>
                          {milestone.titleTH}
                          <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                            | {milestone.titleEN}
                          </span>
                        </span>
                        <span className="rounded-full bg-[#eee] px-2.5 py-0.5 text-xs font-bold text-[#555]">
                          {milestone.year}
                        </span>
                      </h3>
                      <p className="text-[0.95rem] leading-relaxed text-[#555]">{milestone.descTH}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{milestone.descEN}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page banner */}
        <div className="relative mt-20 h-[200px] overflow-hidden rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] sm:h-[280px] lg:h-[350px]">
          {profile.aboutMidBannerImage ? (
            <Image
              src={profile.aboutMidBannerImage}
              alt="ทำเลศักยภาพ EEC และชลบุรี"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover brightness-[0.85]"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
              <FileImage className="size-10 opacity-40" aria-hidden />
              <p className="text-sm">อัปโหลดรูปแบนเนอร์กลางใน Admin &gt; โปรไฟล์ &gt; เกี่ยวกับเรา</p>
            </div>
          )}
        </div>

        {/* How we help */}
        <section className="mt-20">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-[2rem]">
              เว็บไซต์บ้านไออุ่น ช่วยแก้ปัญหาให้คุณได้อย่างไร?
            </h2>
            <p className="mt-1 text-lg font-medium text-muted-foreground sm:text-xl">
              How Does Baan Ai Oun Platform Help You?
            </p>
            <p className="mt-3 text-base italic text-[#666]">
              ศูนย์รวมอสังหาฯ และเครือข่ายนายหน้า บริการซื้อ-ขาย-เช่า ดูแลลูกค้าคนไทยและต่างชาติแบบไร้รอยต่อ
            </p>
            <p className="mt-1 text-sm italic text-muted-foreground">
              An all-in-one real estate hub and agent network for seamless buying, selling, and renting
              experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_PROPS.map((vp) => (
              <div
                key={vp.titleEN}
                className="rounded-2xl border border-border bg-card px-6 py-9 text-center shadow-[0_4px_10px_rgba(0,0,0,0.03)]"
              >
                <div className="mb-5 text-4xl text-[#ea580c]">{vp.icon}</div>
                <h3 className="mb-3 whitespace-pre-line text-base font-bold text-foreground sm:text-lg">
                  {vp.titleTH}
                </h3>
                <p className="mb-3 text-sm font-medium text-muted-foreground whitespace-pre-line">
                  {vp.titleEN}
                </p>
                <p className="text-sm leading-relaxed text-[#666]">{vp.descTH}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{vp.descEN}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Local expertise */}
        <section className="mt-10 rounded-xl border border-border bg-card p-8 text-center">
          <h3 className="text-lg font-bold text-primary">
            ความเชี่ยวชาญเฉพาะพื้นที่ | Local Market Expertise
          </h3>
          <p className="mt-2 text-[0.95rem] text-[#666]">
            เราคลุกคลีในตลาดอสังหาริมทรัพย์ของพื้นที่เหล่านี้มากกว่า 10 ปี รู้ลึก รู้จริง
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Over 10 years of deep expertise in these local real estate markets.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {LOCAL_AREAS.map((area) => (
              <span
                key={area.label}
                className={`rounded-full border px-5 py-2 text-sm ${
                  area.highlight
                    ? "border-primary bg-[#fef3c7] font-bold text-primary"
                    : "border-[#ddd] bg-[#fafafa] text-[#555]"
                }`}
              >
                {area.label}
              </span>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <section className="mt-20 rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] sm:px-10">
          <h2 className="text-2xl font-bold text-foreground sm:text-[1.8rem]">
            เติบโตไปด้วยกันกับครอบครัวบ้านไออุ่น
          </h2>
          <p className="mt-1 text-lg font-medium text-muted-foreground">
            Grow Together with Baan Ai Oun Ecosystem
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-[#555]">
            <strong className="text-foreground">อยากเป็นนายหน้าอสังหาฯ แต่ไม่มีทุน ไม่รู้จะเริ่มอย่างไร?</strong>
            <br />
            เราพบว่ามีลูกค้าต้องการซื้อ-เช่าบ้านจำนวนมากผ่านระบบเรา จึงเปิดโอกาสให้ผู้ที่อยากมีรายได้
            เข้ามาเรียนรู้แบบ &ldquo;จับมือทำ&rdquo; มาร่วมเป็นเครือข่าย Co-Agent
            เพื่อสร้างอาชีพที่มั่นคงไปด้วยกัน!
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            <strong>Want to be a real estate agent but don&apos;t know where to start?</strong>
            <br />
            We have a high volume of buyers and renters. We offer hands-on training to help you start
            earning. Join our Co-Agent network and build a stable career with us!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/find-property"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-[#0f3d20]"
            >
              ค้นหาทรัพย์ | Find Properties
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-transparent px-8 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              ร่วมเป็น Co-Agent / คอร์สนายหน้า | Join Co-Agent / Agent Course
            </Link>
          </div>
        </section>
      </main>

      <FaqSection
        title="คำถามที่พบบ่อย | Frequently Asked Questions"
        subtitle="เรื่องที่ลูกค้ามักสอบถามเกี่ยวกับบ้านไออุ่น พร็อพเพอร์ตี้"
        items={faqs}
        variant="boxed"
      />
    </>
  )
}
