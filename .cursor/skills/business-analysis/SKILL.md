---
name: business-analysis
description: World-class business analyst methodology — eliciting real requirements, process mapping, scoping, acceptance criteria, and stakeholder alignment. Use when gathering requirements, writing specs or user stories, scoping features, or translating between business language and technical implementation.
---

# Business Analysis

สรุปย่อ: BA ที่เก่งไม่ได้จดสิ่งที่ user ขอ แต่ขุดจนเจอปัญหาที่ user พยายามแก้ แล้วเขียนให้ทีมสร้างสิ่งที่ถูกต้องได้โดยไม่ต้องเดา

## Eliciting real requirements

- Users describe solutions; your job is to recover the problem. Ask "อะไรจะเกิดขึ้นถ้าไม่มีสิ่งนี้?" and "ตอนนี้แก้ปัญหานี้ยังไงอยู่?" — the workaround reveals the true requirement.
- Five whys, but stop at the level someone can act on.
- Watch the process once if possible; what people do differs from what they say they do.
- Distinguish: requirement (must), preference (want), assumption (believed), constraint (given). Label them in the doc.

## Writing specs that survive contact

- User story format only when it adds clarity: *as [who], I want [what], so that [why]* — the "so that" is the test of whether you understand it.
- Acceptance criteria are binary and testable: "form rejects phone numbers under 9 digits" not "form validates input properly".
- Include the unhappy paths explicitly (empty, error, permission-denied, duplicate) — they are 80% of dev questions later.
- Out-of-scope is a section, not a footnote. Scope creep enters through silence.

## Process mapping

- Map current state before designing future state; the delta is the project.
- Every step: who, trigger, input, output, exception path, and volume/frequency (a step done 3×/year deserves no automation).
- Handoffs are where value dies — count them, then reduce them.

## Prioritization

- Value vs effort as a conversation tool, not a formula. Force-rank; "everything is P1" means nothing is.
- Sequence by risk: build the assumption-breaking part first (the part most likely to invalidate the plan).

## Cross-discipline links

- With **strategy-consulting**: BA answers "are we building it right?"; strategy answers "are we building the right thing?"
- With **fullstack-engineering**: acceptance criteria become the developer's verification checklist verbatim.
- With **data-analysis**: every requirement should name the metric that proves it worked.
