---
name: grilling
description: Grill the user relentlessly about a plan, idea, or design before building — one question at a time, with a recommended answer per question. Also supports brainstorm mode to expand options before converging. Use when the user wants to stress-test a plan, brainstorm an idea, says "grill", "ช่วย grill", "ช่วยซักถาม", "ยังไม่แน่ใจว่าจะเอายังไง", or describes a feature/idea that is still vague.
---

# Grilling & Brainstorming

สรุปย่อ: งานที่สั่งชัดตั้งแต่แรกคืองานที่ไม่ต้องรื้อทีหลัง — skill นี้บังคับให้ความต้องการชัดก่อนเขียนโค้ดบรรทัดแรก
(แนวทางตาม [mattpocock/skills — grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md))

## Mode 1: Grill (stress-test a plan)

Interview the user relentlessly about every aspect of the plan until reaching a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one.

Rules:

1. **One question at a time.** Wait for the answer before the next question. Asking multiple questions at once is bewildering.
2. **Provide a recommended answer with every question.** The user can say "เอาตามที่แนะนำ" and move fast.
3. **Facts vs decisions:** if a *fact* can be found by exploring the codebase, look it up — never ask. The *decisions* belong to the user — put each one to them and wait.
4. **Resolve in dependency order.** Ask about the decision that unlocks the most downstream decisions first (data model before UI, scope before styling).
5. **Do not enact the plan** until the user confirms shared understanding. Close with a short recap: scope, key decisions made, explicit out-of-scope list.
6. Track open questions; if an answer invalidates an earlier assumption, surface the conflict immediately.

Question priorities (adapt to context):

- ผลลัพธ์ที่ผู้ใช้ปลายทางเห็น คืออะไร หน้าตา/พฤติกรรมเปลี่ยนตรงไหน
- ใครใช้ (public visitor / admin / ทั้งคู่) และภาษา (TH/EN ตาม convention repo นี้)
- ข้อมูลมาจากไหน — hardcode, admin-editable (ต้อง migration), หรือ derive
- ขอบเขต: อะไร*ไม่*ทำในรอบนี้
- Edge cases: empty / error / mobile / ยังไม่ login
- นิยาม "เสร็จ": ตรวจยังไงว่าผ่าน

## Mode 2: Brainstorm (expand before converging)

When the idea is still vague ("อยากได้อะไรสักอย่างเกี่ยวกับ X"):

1. Restate the underlying goal in one sentence and confirm it.
2. Offer 3–5 distinct directions (not variations of one idea) — each with one-line trade-off: effort, impact, risk. Include one boring-but-safe option and one ambitious option.
3. Recommend one and say why.
4. Once the user picks a direction → switch to Grill mode to pin down the details.

## Exit criteria

The session is done when you can write, without guessing: (1) one-sentence outcome, (2) decisions list, (3) out-of-scope list, (4) verification method. Offer to save this as the task brief before starting work.
