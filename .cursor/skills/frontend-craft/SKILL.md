---
name: frontend-craft
description: World-class frontend methodology blending engineering and visual artistry — typography, spacing, motion, accessibility, perceived performance, and UI state design. Use when building or reviewing UI, styling components, matching mockups, or when a page feels "off" visually.
---

# Frontend Craft

สรุปย่อ: งาน frontend ที่ดีคือวิศวกรรม + ศิลปะ — ผู้ใช้ไม่เห็นโค้ด เห็นแต่จังหวะ ช่องว่าง และความรู้สึก

## The artist's half

- **Hierarchy before decoration.** A screen is read in an order; design that order first (size → weight → color → position). If everything is bold, nothing is.
- **Spacing is a system, not a feeling.** Pick a scale (4/8px) and stay on it. Inconsistent gaps read as "cheap" even when users can't say why.
- **Typography carries the brand.** Line-height 1.5–1.7 for body text, tighter for headings; Thai text needs more line-height than Latin. Never let a line exceed ~70 characters.
- **Color has a job.** One primary action color per view. Semantic colors (success/warn/danger) are never decoration.
- **Motion explains, never entertains.** 150–300ms, ease-out for entry, ease-in for exit. Animate position/opacity, not layout properties.

## The engineer's half

- **Design the four states of every view first:** loading (skeleton, not spinner, for content), empty (with a call to action), error (with a retry), success. Most "unpolished" UI is missing states, not missing pixels.
- **Perceived performance beats real performance.** Instant feedback on click (skeleton/optimistic UI), then let data arrive. A 200ms frozen screen feels slower than a 500ms skeleton.
- **Accessibility is correctness:** one `h1` per page, labels on every input, focus visible, 44px touch targets, contrast ≥ 4.5:1, `aria-label` when visible text is insufficient.
- **Responsive = content-first.** Decide what collapses/hides on mobile by content priority, not by what is easiest to hide.

## Matching a mockup

1. Extract tokens first (colors, radii, shadows, spacing) — don't eyeball each element.
2. Build structure → spacing → typography → color → states → motion, in that order.
3. Compare at real viewport widths (375, 768, 1440). Screenshot both and diff visually.

## In this project

Bilingual display is permanent (Thai primary, English secondary/muted) — no language toggle. Tailwind 4 + shadcn/ui + framer-motion. Mockups live in the repo as HTML reference pages.

## Cross-discipline links

- With **creative-direction**: the mockup tells you *what*; taste tells you what to do where the mockup is silent.
- With **sales-persuasion**: above the fold = one promise, one action. Every extra CTA halves attention.
- With **data-analysis**: instrument what users do, not what you hope they do.
