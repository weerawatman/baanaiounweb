---
name: polymath-thinking
description: Interdisciplinary methodology — connecting engineering, science, data, business, sales, and art into one decision process; mental-model transfer across fields; knowing which discipline's lens fits the current problem. Use when a problem spans multiple domains, when stuck after applying one discipline, or when prioritizing across technical, business, and creative concerns.
---

# Polymath Thinking

สรุปย่อ: ปัญหาจริงไม่เคยมาแบ่งตามสาขาวิชา — ความสามารถที่หายากที่สุดคือรู้ว่าปัญหาตรงหน้าต้องใช้เลนส์ของศาสตร์ไหน และแปลระหว่างศาสตร์ได้

## The lens-switching discipline

When stuck or deciding, deliberately rotate lenses:

| Lens | Core question | Skill to load |
|---|---|---|
| Engineer | How does it fail? What's the simplest thing that works? | fullstack/backend/frontend |
| Scientist | What's the mechanism? What would falsify my belief? | scientific-thinking |
| Data | What does the evidence actually say, at what confidence? | data-science / data-analysis |
| Business | Who pays, why, and what's the cost of delay? | business-analysis / strategy-consulting |
| Sales | What does the human on the other side feel and fear? | sales-persuasion |
| Artist | What is this *really* about, and does it move anyone? | creative-direction |

Rule of thumb: if two lenses give the same answer, act; if they conflict, the conflict itself is the insight (e.g., engineering says "cache it", business says "stale prices lose trust" → the real requirement is invalidation, not speed).

## Mental models that transfer everywhere

- **Feedback loops** (biology/control theory): find the loop before blaming the actor — metrics dashboards, code review culture, and lead follow-up are all loops.
- **Rate-limiting step** (chemistry): total speed = slowest step. Optimize nothing else first. (Admin felt slow → the limiting step was feedback latency, not server speed.)
- **Margin of safety** (engineering/investing): size buffers to the cost of failure, not the probability.
- **Selection pressure** (evolution): what behavior does the environment reward? That behavior will grow — design incentives, not rules.
- **Composition & hierarchy** (art): in any artifact — code, dashboard, pitch, page — decide what's the focal point and make everything else quieter.
- **Opportunity cost** (economics): every yes is a thousand nos; evaluate the best alternative, not just the proposal.
- **Signal vs noise** (statistics): before reacting to any change, ask "would I see this by chance?"

## Translating between tribes

- To engineers: speak in mechanisms and constraints. To business: speak in outcomes and risk. To artists: speak in intent and feeling. Same truth, three dialects.
- The most valuable sentence in any cross-functional room: "สิ่งที่คุณพูดในภาษาของฝั่งผมคือ... ถูกไหม?" (restate across the boundary, confirm).

## When to go deep vs wide

Depth wins when the problem is known and hard; breadth wins when the problem is unknown or misdiagnosed. Diagnose wide, execute deep.

## Cross-discipline links

This skill is the index — load the specific discipline skill once the right lens is chosen. All project skills live in `.cursor/skills/`.
