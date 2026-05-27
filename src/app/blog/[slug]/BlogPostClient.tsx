"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, CalendarDays, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/layout/Breadcrumb"
import SectionTitle from "@/components/layout/SectionTitle"
import PropertyCard from "@/components/property/PropertyCard"
import { MOCK_PROPERTIES } from "@/data/properties"
import { MOCK_BLOG_POSTS } from "@/data/blog-posts"

interface BlogPostClientProps {
  slug: string
}

const PLACEHOLDER_CONTENT: Record<string, string[]> = {
  finance: [
    "การวางแผนการเงินก่อนซื้อบ้านเป็นเรื่องสำคัญที่หลายคนมองข้าม ไม่ว่าจะเป็นการเก็บเงินดาวน์ให้เพียงพอ การตรวจสอบเครดิตบูโร หรือการคำนวณภาระผ่อนต่อเดือนให้อยู่ในสัดส่วนที่เหมาะสมกับรายได้",
    "ผู้เชี่ยวชาญด้านการเงินแนะนำว่า ค่าผ่อนบ้านต่อเดือนไม่ควรเกิน 40% ของรายได้สุทธิ เพื่อให้ยังมีเงินเหลือสำหรับค่าใช้จ่ายในชีวิตประจำวัน เงินสำรองฉุกเฉิน และการออมระยะยาว",
    "ในยุคที่ดอกเบี้ยกู้ซื้อบ้านมีความผันผวน การเปรียบเทียบเงื่อนไขจากหลายธนาคารก่อนตัดสินใจจึงเป็นสิ่งจำเป็น บางธนาคารอาจมีโปรโมชันพิเศษสำหรับกลุ่มพนักงานประจำหรือผู้ที่มีรายได้ผ่านบัญชีกับธนาคารนั้น ๆ",
    "สุดท้ายแล้ว การมีที่ปรึกษาด้านอสังหาริมทรัพย์ที่เข้าใจสถานการณ์การเงินของคุณจะช่วยให้การตัดสินใจซื้อบ้านเป็นเรื่องที่สบายใจขึ้นมาก ไม่ใช่แค่ผ่านการอนุมัติกู้ แต่ผ่อนแล้วยังมีคุณภาพชีวิตที่ดีด้วย",
  ],
  lifestyle: [
    "การเปลี่ยนบ้านเช่าให้กลายเป็นบ้านที่อบอุ่นนั้นไม่จำเป็นต้องใช้งบประมาณมาก เพียงแค่เข้าใจหลักการจัดพื้นที่และเลือกสิ่งของที่สื่อถึงความเป็นตัวคุณก็เพียงพอ",
    "เทคนิคแรกคือการเพิ่มแสงสว่างที่อบอุ่น โคมไฟตั้งโต๊ะหรือโคมไฟพื้นที่ให้แสงสีส้มจะสร้างบรรยากาศที่ผ่อนคลาย แตกต่างจากหลอดนีออนสีขาวที่ให้ความรู้สึกเหมือนสำนักงาน",
    "ต้นไม้ในบ้านเป็นอีกหนึ่งวิธีที่ง่ายและประหยัด พืชตระกูลมอนสเตร้าหรือโพธิ์ใบหัวใจไม่ต้องการการดูแลมาก แต่ช่วยเพิ่มชีวิตชีวาและอากาศที่ดีให้กับพื้นที่ได้อย่างน่าทึ่ง",
    "สำหรับห้องนอน การลงทุนกับผ้าปูที่นอนคุณภาพดีและหมอนที่นอนสบายจะเปลี่ยนประสบการณ์การพักผ่อนของคุณอย่างสิ้นเชิง เพราะบ้านที่อบอุ่นที่สุดคือบ้านที่ทำให้คุณนอนหลับได้อย่างมีความสุข",
  ],
  location: [
    "บ้านบึงเป็นอำเภอในจังหวัดชลบุรีที่เติบโตอย่างรวดเร็วในช่วงทศวรรษที่ผ่านมา ด้วยทำเลที่ตั้งที่อยู่ใกล้กับนิคมอุตสาหกรรมชั้นนำ ทั้งอมตะนคร เหมราช และพัฒนานิคม ทำให้มีผู้คนหลั่งไหลเข้ามาอยู่อาศัยเพื่อทำงานอย่างต่อเนื่อง",
    "ในแง่ของสิ่งอำนวยความสะดวก บ้านบึงมีโรงพยาบาล ตลาดสด ห้างสรรพสินค้า และร้านอาหารที่หลากหลาย คนที่ย้ายมาจากต่างจังหวัดมักรู้สึกว่าที่นี่ไม่ต่างจากในเมืองมากนัก แต่บรรยากาศยังคงเงียบสงบกว่า",
    "ราคาอสังหาริมทรัพย์ในบ้านบึงยังอยู่ในระดับที่เข้าถึงได้เมื่อเทียบกับเมืองชลบุรีหรือพัทยา บ้านเดี่ยวราคา 1-3 ล้านบาทยังหาได้ในพื้นที่นี้ ขณะที่พื้นที่ใกล้เคียงราคาพุ่งสูงขึ้นมากแล้ว",
    "สำหรับผู้ที่กำลังมองหาที่อยู่อาศัยในเขต EEC บ้านบึงถือเป็นจุดสมดุลที่ดีระหว่างราคา ความสะดวก และคุณภาพชีวิต ทำเลนี้มีแนวโน้มเติบโตต่อเนื่องไปพร้อมกับการพัฒนาของเขตเศรษฐกิจพิเศษภาคตะวันออก",
  ],
  solutions: [
    "การติดบูโรหรือมีประวัติเครดิตไม่ดีนั้นไม่ใช่จุดจบของฝันที่อยากมีบ้าน แต่คือสัญญาณว่าต้องเริ่มวางแผนและแก้ไขอย่างเป็นระบบ",
    "ขั้นตอนแรกคือการดึงรายงานเครดิตบูโรของตัวเอง เพื่อดูว่าติดค้างอะไรบ้าง บางครั้งอาจมีรายการที่ผิดพลาดหรือล้าสมัยที่สามารถขอแก้ไขได้ หากมีหนี้ค้างจริง ให้เริ่มชำระหนี้เก่าทีละก้อนตั้งแต่วันนี้",
    "ระหว่างการแก้บูโร ให้เริ่มสร้างประวัติเครดิตใหม่ที่ดีขึ้น เช่น การใช้บัตรเครดิตแล้วชำระเต็มจำนวนทุกเดือน หรือการกู้สินเชื่อขนาดเล็กแล้วผ่อนชำระตรงเวลา สิ่งเหล่านี้จะค่อย ๆ สร้างประวัติที่ดีขึ้น",
    "โดยทั่วไปธนาคารจะพิจารณาประวัติเครดิตย้อนหลัง 3 ปี ดังนั้นหากเริ่มแก้ไขตั้งแต่วันนี้ อีก 2-3 ปีข้างหน้าโอกาสที่จะได้รับการอนุมัติสินเชื่อบ้านก็จะสูงขึ้นอย่างมีนัยสำคัญ",
  ],
  martech: [
    "เทคโนโลยีกำลังเปลี่ยนวิธีที่คนหาบ้านอย่างสิ้นเชิง ในปี 2026 การใช้ AI ในการค้นหาอสังหาริมทรัพย์ที่ตรงกับความต้องการและงบประมาณกลายเป็นเรื่องปกติ แทนที่จะต้องเลื่อนดูประกาศนับร้อยนับพัน",
    "เทรนด์ Renovate กลับมาแรงมากในยุคหลัง COVID บ้านเก่าราคาต่ำที่ได้รับการปรับปรุงใหม่กลายเป็นที่ต้องการอย่างมาก เพราะผู้ซื้อได้บ้านที่ดูใหม่ในราคาที่เข้าถึงได้",
    "แนวคิดบ้านเล็กแต่ฟังก์ชันครบ (Micro Living) กำลังเป็นที่นิยมในกลุ่มคนรุ่นใหม่ที่ให้ความสำคัญกับการออกแบบอัจฉริยะมากกว่าพื้นที่ขนาดใหญ่ ห้องนอน 2 ห้อง พื้นที่ใช้สอยครบถ้วน ดีกว่าบ้าน 4 ห้องที่ดูแลยาก",
    "สำหรับตลาดบ้านบึงและชลบุรี การเติบโตของ EEC ยังคงเป็นแรงขับเคลื่อนหลัก ผู้ที่เข้าใจทิศทางการพัฒนาและรีบตัดสินใจลงทุนในทำเลที่มีศักยภาพตั้งแต่วันนี้ จะได้ประโยชน์มากในอีก 5-10 ปีข้างหน้า",
  ],
  default: [
    "การมีบ้านเป็นของตัวเองนับเป็นความฝันของคนไทยหลายล้านคน โดยเฉพาะผู้ที่ต้องออกมาทำงานต่างจังหวัด การเลือกบ้านที่ดีจึงไม่ใช่แค่เรื่องของราคา แต่คือการเลือกคุณภาพชีวิตที่ดีสำหรับตัวเองและครอบครัว",
    "ทำเลที่ตั้งของบ้านส่งผลต่อชีวิตประจำวันอย่างมาก ระยะทางจากที่ทำงาน ความสะดวกในการเดินทาง สิ่งอำนวยความสะดวกในบริเวณใกล้เคียง ล้วนเป็นปัจจัยที่ต้องพิจารณาให้ถี่ถ้วน",
    "สภาพบ้านและคุณภาพงานก่อสร้างหรืองานรีโนเวทก็สำคัญไม่แพ้กัน การตรวจบ้านก่อนตัดสินใจซื้อโดยช่างที่มีความเชี่ยวชาญจะช่วยให้คุณรู้ว่าจะต้องเสียค่าซ่อมแซมเพิ่มเติมอีกเท่าไหร่",
    "สุดท้ายแล้ว การมีนายหน้าอสังหาริมทรัพย์ที่ไว้ใจได้และเข้าใจความต้องการของคุณอย่างแท้จริงจะทำให้กระบวนการซื้อ-เช่าบ้านเป็นเรื่องที่ราบรื่นและน่าจดจำในทางที่ดี",
  ],
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-2xl font-semibold text-muted-foreground">ไม่พบบทความ</p>
        <Link href="/blog" className="mt-4 inline-block text-primary hover:underline">
          กลับไปหน้าบทความทั้งหมด
        </Link>
      </main>
    )
  }

  const relatedProperties = MOCK_PROPERTIES.filter((prop) =>
    post.relatedPropertyIds.includes(prop.id)
  )

  const contentParagraphs =
    PLACEHOLDER_CONTENT[post.categorySlug] ?? PLACEHOLDER_CONTENT.default

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 space-y-10">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "หน้าแรก", href: "/" },
          { label: "บทความ", href: "/blog" },
          { label: post.title },
        ]}
      />

      {/* Article */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-6"
      >
        {/* Featured image */}
        <div className="overflow-hidden rounded-xl">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 shrink-0" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            อ่าน {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
          {post.title}
        </h1>

        {/* Excerpt / lead */}
        <p className="text-base text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 italic">
          {post.excerpt}
        </p>

        {/* Body content */}
        <div className="prose prose-sm sm:prose max-w-none space-y-4">
          {contentParagraphs.map((paragraph, index) => (
            <p key={index} className="text-sm sm:text-base leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.article>

      {/* Related properties */}
      {relatedProperties.length > 0 && (
        <section className="space-y-6">
          <SectionTitle title="บ้านและคอนโดที่เกี่ยวข้อง" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="rounded-2xl bg-primary/5 border border-primary/20 px-6 py-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">สนใจปรึกษาเรื่องบ้าน?</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          พิมพร้อมให้คำแนะนำทุกขั้นตอน ตั้งแต่เลือกทำเล วางแผนการเงิน จนถึงวันโอน ไม่มีค่าใช้จ่ายในการปรึกษา
        </p>
        <Link
          href="https://line.me/ti/p/~@baanaioun"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          ติดต่อพิมผ่าน LINE
        </Link>
      </section>
    </main>
  )
}
