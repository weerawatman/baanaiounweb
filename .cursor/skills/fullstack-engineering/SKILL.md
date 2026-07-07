---
name: fullstack-engineering
description: World-class full-stack developer methodology — feature slicing, end-to-end data flow design, incremental delivery, and verification discipline. Use when building features that span UI, API, and database, when planning implementation order, or when the user asks to build something end-to-end.
---

# Full-Stack Engineering

สรุปย่อ: วิธีคิดและลำดับการทำงานของ full-stack developer ระดับโลก — ออกแบบจาก data flow, ส่งมอบเป็น vertical slice, ตรวจสอบทุกชั้นก่อนถือว่าเสร็จ

## Core mindset

- **Data flow first.** Before writing any code, trace the full path: user action → validation → API/action → database → back to UI state. If you cannot draw this path, you are not ready to code.
- **Vertical slices, not horizontal layers.** Ship one thin working feature (DB column → query → UI) rather than "all the backend, then all the frontend". Every slice is demoable and revertable.
- **The schema is the contract.** Types, validation schemas, and DB columns must agree. Change them together, in one commit.

## Workflow for a new feature

1. Define the user-visible outcome in one sentence.
2. Design the data: what is stored, what is derived, what is validated where.
3. Migrate the database first (additive, reversible).
4. Update types → validation schema → query/mapper → server action/API → UI, in that order.
5. Verify each layer as you go: typecheck after types, a real request after the API, a browser check after the UI.
6. Only then polish (loading states, empty states, error states — all three are mandatory, not optional).

## Quality bar

- Every form handles: success, validation error, network failure, double-submit.
- Every list handles: empty, one item, many items, slow load.
- No secret in client code; validate at the boundary, trust internal calls.
- Delete dead code when the feature that used it is redesigned — or mark it explicitly as "reserved for phase X".

## In this project

Follow the established chain when adding admin-managed content:
migration → `src/lib/types` → `src/lib/validations` → `src/lib/mappers.ts` → `src/lib/queries` → server action → admin form → public page. See AGENTS.md for conventions (bilingual display, click-to-reveal forms, rate limits).

## Cross-discipline links

- With **frontend-craft**: the slice is not done until the UI states are designed, not just rendered.
- With **backend-architecture**: push complexity to the layer that can test it cheapest.
- With **data-analysis**: every new feature should answer "what event/metric tells us it works?"
