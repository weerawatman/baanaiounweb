-- Mockup alignment: admin-managed page images + initial FAQ content (editable in Admin > FAQ)

ALTER TABLE public.agent_profile
  ADD COLUMN IF NOT EXISTS find_property_hero_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS find_property_bento_1_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS find_property_bento_2_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS find_property_bento_3_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS list_property_hero_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS list_property_bento_1_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS list_property_bento_2_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS list_property_bento_3_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS about_mid_banner_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS services_why_choose_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS co_agent_split_image TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS agent_course_banner_image TEXT NOT NULL DEFAULT '';

COMMENT ON COLUMN public.agent_profile.find_property_hero_image IS 'รูป Hero banner หน้างานหาทรัพย์';
COMMENT ON COLUMN public.agent_profile.find_property_bento_1_image IS 'รูปผลงาน bento ช่องใหญ่ หน้างานหาทรัพย์';
COMMENT ON COLUMN public.agent_profile.find_property_bento_2_image IS 'รูปผลงาน bento ช่องเล็ก 1 หน้างานหาทรัพย์';
COMMENT ON COLUMN public.agent_profile.find_property_bento_3_image IS 'รูปผลงาน bento ช่องเล็ก 2 หน้างานหาทรัพย์';
COMMENT ON COLUMN public.agent_profile.list_property_hero_image IS 'รูป Hero banner หน้าฝากขาย/ปล่อยเช่า';
COMMENT ON COLUMN public.agent_profile.list_property_bento_1_image IS 'รูปผลงาน bento ช่องใหญ่ หน้าฝากขาย';
COMMENT ON COLUMN public.agent_profile.list_property_bento_2_image IS 'รูปผลงาน bento ช่องเล็ก 1 หน้าฝากขาย';
COMMENT ON COLUMN public.agent_profile.list_property_bento_3_image IS 'รูปผลงาน bento ช่องเล็ก 2 หน้าฝากขาย';
COMMENT ON COLUMN public.agent_profile.about_mid_banner_image IS 'รูปแบนเนอร์กลางหน้าเกี่ยวกับเรา (ทำเล EEC)';
COMMENT ON COLUMN public.agent_profile.services_why_choose_image IS 'รูปประกอบส่วนทำไมต้องเลือกเรา หน้าบริการ';
COMMENT ON COLUMN public.agent_profile.co_agent_split_image IS 'รูปประกอบส่วนเนื้อหา หน้า Co-Agent';
COMMENT ON COLUMN public.agent_profile.agent_course_banner_image IS 'รูปแบนเนอร์กลางหน้าคอร์สนายหน้า';

-- Seed FAQs only when a page_slug group is empty (safe to re-run)
INSERT INTO public.faqs (question, answer, page_slug, sort_order)
SELECT v.question, v.answer, v.page_slug, v.sort_order
FROM (VALUES
  ('บ้านไออุ่น พร็อพเพอร์ตี้ ให้บริการครอบคลุมพื้นที่ใดบ้าง?', 'ทีมงานให้บริการรับฝากขาย ปล่อยเช่า จัดหาอสังหาริมทรัพย์ ครอบคลุมทำเลศักยภาพทั่ว กรุงเทพมหานคร, สมุทรปราการ, ชลบุรี, ฉะเชิงเทรา, ระยอง และพื้นที่เศรษฐกิจ EEC', 'home', 1),
  ('จุดเด่นที่ทำให้เราแตกต่างจากเว็บไซต์ตัวแทนอสังหาฯ ทั่วไปคืออะไร?', 'เรามีทีมงานลงพื้นที่คัดกรองทรัพย์ด้วยสายตานักลงทุน มีบริการให้คำปรึกษาด้านการปรับปรุงทรัพย์ และดูแลครบวงจรตั้งแต่การทำสินเชื่อไปจนถึงวันโอนกรรมสิทธิ์', 'home', 2),
  ('หากสนใจใช้บริการจัดหาบ้านหรือคอนโด มีค่าใช้จ่ายแอบแฝงหรือไม่?', 'บริการจัดหาทรัพย์ คัดกรองทำเล และให้คำปรึกษาด้านสินเชื่อสำหรับผู้ซื้อและผู้เช่า ดำเนินการให้ฟรี 100% โดยไม่มีค่าใช้จ่ายแอบแฝง', 'home', 3)
) AS v(question, answer, page_slug, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs f WHERE f.page_slug = 'home');

INSERT INTO public.faqs (question, answer, page_slug, sort_order)
SELECT v.question, v.answer, v.page_slug, v.sort_order
FROM (VALUES
  ('บริการจัดหาบ้านและคอนโด มีค่าใช้จ่ายแอบแฝงไหม?', 'บริการผู้ช่วยจัดหาทรัพย์ของเราฟรี 100% ไม่มีค่าใช้จ่ายแอบแฝงหรือบวกราคาเพิ่ม เราได้รับค่าการตลาดจากทางเจ้าของทรัพย์โดยตรง', 'match', 1),
  ('บ้านไออุ่นรับจัดหาอสังหาฯ ในทำเลไหนเป็นพิเศษบ้าง?', 'ครอบคลุมทำเล กรุงเทพมหานคร, สมุทรปราการ, ชลบุรี, ฉะเชิงเทรา, ระยอง และโซนนิคมอุตสาหกรรม EEC', 'match', 2),
  ('หลังจากส่งโจทย์ความต้องการแล้ว ใช้เวลาหาทรัพย์นานแค่ไหน?', 'โดยปกติเราจะส่งลิสต์ที่ผ่านการคัดกรองเบื้องต้นให้พิจารณาได้ภายใน 1-3 วันทำการ', 'match', 3),
  ('ทำไมการให้ทีมงานหาให้ ถึงดีกว่าการค้นหาดูประกาศด้วยตัวเอง?', 'ช่วยประหยัดเวลา และเราคัดกรองด้วยสายตานักลงทุน ตรวจสอบสภาพแวดล้อมและโครงสร้างเบื้องต้นก่อนพาคุณไปดูหน้างานจริง', 'match', 4)
) AS v(question, answer, page_slug, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs f WHERE f.page_slug = 'match');

INSERT INTO public.faqs (question, answer, page_slug, sort_order)
SELECT v.question, v.answer, v.page_slug, v.sort_order
FROM (VALUES
  ('ฝากขายบ้านกับบ้านไออุ่น ต่างจากการโพสต์ประกาศขายเองอย่างไร?', 'เราช่วยดูแลครบวงจรตั้งแต่การประเมินราคาตลาด ทำการตลาดเชิงรุก กระจายทรัพย์เข้าสู่เครือข่าย Co-Agent ไปจนถึงการดูแลเรื่องสัญญา', 'owners', 1),
  ('บ้านไออุ่นรับฝากขายในทำเลไหนบ้าง?', 'ครอบคลุมทำเลศักยภาพใน กรุงเทพมหานคร, สมุทรปราการ, ชลบุรี, ฉะเชิงเทรา, ระยอง และโซน EEC', 'owners', 2)
) AS v(question, answer, page_slug, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs f WHERE f.page_slug = 'owners');

INSERT INTO public.faqs (question, answer, page_slug, sort_order)
SELECT v.question, v.answer, v.page_slug, v.sort_order
FROM (VALUES
  ('บริการของบ้านไออุ่น พร็อพเพอร์ตี้ ครอบคลุมพื้นที่ไหนบ้าง?', 'ให้บริการรับฝากขาย ปล่อยเช่า และจัดหาอสังหาริมทรัพย์ ครอบคลุมทำเลศักยภาพในกรุงเทพมหานคร, สมุทรปราการ, ชลบุรี, ฉะเชิงเทรา, ระยอง และโซน EEC', 'services', 1),
  ('การใช้บริการให้ทีมงานจัดหาบ้านหรือคอนโด มีค่าใช้จ่ายแอบแฝงไหม?', 'สำหรับผู้ซื้อและผู้เช่า บริการจัดหา คัดกรองทรัพย์ และดูแลเรื่องสินเชื่อให้บริการฟรี 100%', 'services', 2),
  ('ฝากขายบ้านกับบ้านไออุ่น ต่างจากการโพสต์ประกาศขายเองอย่างไร?', 'เราดูแลครบวงจรตั้งแต่ CMA ทำการตลาดเชิงรุก กระจายทรัพย์เข้าเครือข่าย Co-Agent จนถึงการดูแลสัญญา', 'services', 3),
  ('ไม่มีประสบการณ์เลย สามารถเริ่มต้นอาชีพนายหน้ากับบ้านไออุ่นได้ไหม?', 'ได้แน่นอน เรามีคอร์สนายหน้าอสังหาฯ สอนจับมือทำ และสามารถร่วมเป็น Co-Agent หลังเรียนจบ', 'services', 4)
) AS v(question, answer, page_slug, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs f WHERE f.page_slug = 'services');

INSERT INTO public.faqs (question, answer, page_slug, sort_order)
SELECT v.question, v.answer, v.page_slug, v.sort_order
FROM (VALUES
  ('การประเมินราคาอสังหาริมทรัพย์ (CMA) คืออะไร และทำไมต้องทำก่อนตั้งขาย?', 'CMA คือการเปรียบเทียบราคาตลาดจากทรัพย์ใกล้เคียง เพื่อตั้งราคาขายได้เหมาะสม ทีมงานบ้านไออุ่นมีบริการประเมินให้ฟรีด้วยสายตานักลงทุน', 'blog', 1),
  ('อยากเริ่มต้นลงทุนอสังหาฯ ในทำเลชลบุรี หรือโซน EEC ต้องเตรียมตัวอย่างไร?', 'ศึกษาทำเลที่มีการเติบโต เตรียมเครดิตสินเชื่อ และมีพาร์ทเนอร์ที่เชี่ยวชาญในพื้นที่ช่วยให้คำแนะนำเชิงลึก', 'blog', 2),
  ('การรีโนเวทบ้านก่อนขาย ช่วยเพิ่มมูลค่าและทำกำไรได้จริงไหม?', 'ช่วยเพิ่มมูลค่าได้จริง สร้างความประทับใจแรกพบ และช่วยให้ปิดดีลได้ไวขึ้น', 'blog', 3)
) AS v(question, answer, page_slug, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs f WHERE f.page_slug = 'blog');

INSERT INTO public.faqs (question, answer, page_slug, sort_order)
SELECT v.question, v.answer, v.page_slug, v.sort_order
FROM (VALUES
  ('บ้านไออุ่น พร็อพเพอร์ตี้ คือใคร และให้บริการด้านใดบ้าง?', 'ศูนย์รวมบริการอสังหาริมทรัพย์ครบวงจร รับฝากขาย ปล่อยเช่า จัดหาทรัพย์ ดูแลสินเชื่อ และเครือข่าย Co-Agent', 'about', 1),
  ('จุดเด่นที่ทำให้บ้านไออุ่นแตกต่างจากตัวแทนอสังหาฯ ทั่วไปคืออะไร?', 'ดูแลด้วยสายตานักลงทุนและหัวใจผู้ให้บริการ มีทีมลงพื้นที่ประเมินศักยภาพทรัพย์ และระบบนิเวศที่เชื่อมโยงผู้ซื้อ ผู้ขาย และนายหน้า', 'about', 2),
  ('บ้านไออุ่นมีความเชี่ยวชาญอสังหาริมทรัพย์ในทำเลใดเป็นพิเศษ?', 'เชี่ยวชาญใน กรุงเทพมหานคร, สมุทรปราการ, ชลบุรี, ฉะเชิงเทรา, ระยอง และทำเลทองในโซน EEC', 'about', 3),
  ('หากสนใจร่วมเป็นเครือข่ายนายหน้า (Co-Agent) ต้องทำอย่างไร?', 'เริ่มได้ผ่านคอร์สนายหน้าอสังหาฯ หรือติดต่อทีมงานเพื่อลงทะเบียนเข้าร่วมระบบ Co-Agent', 'about', 4)
) AS v(question, answer, page_slug, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs f WHERE f.page_slug = 'about');

INSERT INTO public.faqs (question, answer, page_slug, sort_order)
SELECT v.question, v.answer, v.page_slug, v.sort_order
FROM (VALUES
  ('ร่วมเป็น Co-Agent กับบ้านไออุ่น ต้องเสียค่าใช้จ่ายไหม?', 'การเข้าร่วมเครือข่ายไม่มีค่าสมัคร และสามารถฝากทรัพย์เข้าระบบเพื่อให้ทีมช่วยทำการตลาดได้', 'co-agent', 1),
  ('แบ่งค่าคอมมิชชันอย่างไร?', 'มีโครงสร้างการแบ่งคอมมิชชันที่โปร่งใส ตกลงกันล่วงหน้าก่อนเริ่มทำการตลาดทุกเคส', 'co-agent', 2)
) AS v(question, answer, page_slug, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs f WHERE f.page_slug = 'co-agent');

INSERT INTO public.faqs (question, answer, page_slug, sort_order)
SELECT v.question, v.answer, v.page_slug, v.sort_order
FROM (VALUES
  ('คอร์สนายหน้าอสังหาฯ เหมาะกับใคร?', 'เหมาะกับผู้ที่อยากเริ่มอาชีพนายหน้า นักลงทุนมือใหม่ และผู้ที่ต้องการทักษะจริงในการลงพื้นที่', 'agent-course', 1),
  ('เรียนจบแล้วสามารถเริ่มทำงานกับบ้านไออุ่นได้เลยไหม?', 'สามารถเข้าร่วมเครือข่าย Co-Agent และเริ่มทำการตลาดร่วมกับทีมได้ทันทีหลังเรียนจบ', 'agent-course', 2)
) AS v(question, answer, page_slug, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs f WHERE f.page_slug = 'agent-course');
