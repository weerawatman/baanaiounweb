# AGENTS.md

Project brief for AI coding agents (Claude Code, Codex, Cursor, etc.). For
the human setup guide see `README.md`. This file documents facts, not
instructions — cross-reference rather than duplicate. (No `CLAUDE.md`
exists yet in this repo; if one is added later, keep it complementary to
this file rather than restating it.)

## What this is

Baan Ai Oun Property — bilingual (Thai/English) real estate marketing site
for a small brokerage in Ban Bueng, Chonburi, Thailand. Public site is
lead-generation focused (property search + contact forms); an admin
dashboard manages listings, blog, leads, and testimonials.

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS 4 + shadcn/ui + framer-motion
- Supabase (Postgres + Storage) — no separate backend service
- Resend (email) + LINE Messaging API — lead notifications
- Deployed on Vercel

## Directory map

```
src/app/[locale]/*      Public ROOT layout (html/fonts) + (public)/ pages (TH root, EN /en/…)
src/app/(admin)/*       Admin ROOT layout + admin/ dashboard, Supabase-auth gated
                        (two root layouts by design — see ARCHITECTURE.md §1)
src/app/api/*           3 routes: submit-form, service-request, upload-images
src/components/         home/ shared/ property/ blog/ layout/ ui/ admin/
src/content/*           Page copy (bilingual objects, not a CMS)
src/config/*            navigation.ts, site.ts
src/lib/queries/*       Supabase read queries (blog, properties, leads, ...)
src/lib/supabase/*      client.ts / server.ts / public-client.ts / proxy.ts
src/lib/validations/*   Zod schemas for admin forms
supabase/migrations/*   SQL migrations — applied with the Supabase CLI (npx supabase db push,
                        no Docker). NEVER via the Supabase MCP: it's signed into the wrong
                        account and shows a stale duplicate project. See docs/DATABASE.md.
testsprite_tests/*      Curated E2E scripts + production_audit.py (no unit tests exist)
docs/mockups/*          HTML reference mockups per public page (design source of truth)
docs/archive/*          Completed plans/reports — history only, may be stale
.cursor/skills/*        Project agent skills (see Skills section below)
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run validate` | typecheck + lint + build (CI equivalent) |
| `npm run check:supabase` | Verify Supabase connection/schema |

**Known machine-specific issue (intermittent):** on some Windows dev
machines, under memory pressure, `npm run build` can fail with a
Turbopack/Rust thread-pool panic (`The paging file is too small for this
operation`), and the dev server can crash under heavy concurrent load (e.g.
many parallel E2E browser sessions). Not a code defect — it depends on how
much free memory/page-file headroom exists at the time (confirmed the
build succeeds cleanly when the machine has enough headroom). If it
recurs: close other memory-heavy apps, or increase the page file (Control
Panel → System → Advanced → Performance → Virtual Memory) and reboot.

## Conventions to preserve

- **Keep public pages static (the #1 perf rule):** every layout/page under
  `[locale]` awaits `LocaleParams` (`src/i18n/routing.ts`) and calls
  `setRequestLocale(locale)` before any next-intl usage; `generateMetadata`
  takes locale from params (never `getLocale()`); public code never touches
  `cookies()`/`headers()`. One violation flips the whole route to per-request
  rendering (`X-Vercel-Cache: MISS`). Full rules + history: ARCHITECTURE.md §1.
- **Thai line wrapping:** long Thai marketing copy renders through
  `<ThaiText>` (`src/lib/thai-wrap.tsx`) so lines break at phrase boundaries,
  not ICU word fragments. Server components only (hydration risk in client
  components). Details: ARCHITECTURE.md §6.
- **Section spacing standard:** `PageSection` and ad-hoc sections use
  `py-8 lg:py-10` (~80 px between adjacent sections). Don't reintroduce
  `py-16`/`py-24` section padding.
- **`BASE_URL`** comes from `src/config/site.ts` — don't re-declare the
  `NEXT_PUBLIC_SITE_URL` fallback locally.
- **i18n routing with banner exception:** Thai content at root (`/about`),
  English at `/en/about` (`localePrefix: "as-needed"`,
  `localeDetection: false` — `/` is always Thai regardless of browser language).
  `LanguageSwitcher` in `Header.tsx` toggles locale. Body copy, nav, and forms
  show **one language** per locale via `pickLocalized()` / `localizedOrFallback()`
  (`src/lib/i18n/`). **Page banners** (`PageHeroBanner`, `HeroSection`)
  intentionally keep Thai + English together — do not localize banner headlines
  to a single locale.
- **Lead forms are click-to-reveal**, not always visible: `CTAWithForm`
  (`src/components/shared/CTAWithForm.tsx`) renders a CTA button first; the
  actual `PropertyForm` only mounts after the visitor clicks it. Automated
  tests/agents must click the CTA before looking for form fields.
- **Legacy redirects:** `next.config.ts` permanently redirects
  `/buy /rent /land` → `/find-property`, `/owners` → `/list-property`,
  `/academy` → `/agent-course`, and the same under `/en/*` (e.g.
  `/en/buy` → `/en/find-property`). The old page files were deleted (dead code,
  unreachable — a redirect always wins over the filesystem route in
  Next.js) but the redirects themselves must stay, for old bookmarked/
  indexed links.
- **Rate limiting:** both API routes (`submit-form`: 3/min/IP,
  `upload-images`: 20/min/IP) rate-limit in-memory per IP. No IP address is
  persisted to the database — don't add that without updating
  `privacy-policy-content.md` / the live `/privacy-policy` page.

## Testing

- **E2E:** Playwright (`e2e/*.spec.ts`, config at `playwright.config.ts`).
  Run with `npm run test:e2e` — it auto-starts the dev server if one isn't
  already running on :3000. `e2e/smoke.spec.ts` covers: Thai and English home
  nav, key `/en/*` pages return 200, language switcher, legacy redirects, and
  banner bilingual exception on hero.
- No Jest/Vitest unit/component test suite exists.
- **TestSprite (AI E2E via MCP):** full visitor-scope run 2026-07-12 — 19/23
  passed, 0 code defects; committed report at
  `testsprite_tests/testsprite-mcp-test-report.md`, operating manual in
  `docs/INTEGRATIONS.md#testsprite-mcp` (credits are limited; form tests create
  real leads + LINE/email alerts — prefix names with "TestSprite" and clean up).
- **Production audit:** `python testsprite_tests/production_audit.py` runs
  ~37 checks (status codes, redirects, SEO basics, forms, API probes, load
  timings) against the live site (`TESTSPRITE_BASE_URL` env var, defaults
  to the Vercel URL). The 5 `TC02x_*_phaseN.py` scripts are curated
  TestSprite regression tests for the same URL. Historical TestSprite
  reports live in `docs/archive/`.

## Error monitoring (Sentry)

`@sentry/nextjs` is installed and wired up (`src/instrumentation.ts`,
`src/instrumentation-client.ts`, `src/sentry.{server,edge}.config.ts`,
`src/app/global-error.tsx`, `next.config.ts` wrapped with
`withSentryConfig`). **It is currently inert** — `NEXT_PUBLIC_SENTRY_DSN` /
`SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` are unset (see
`.env.example`), and the SDK no-ops safely with no DSN. To activate: create
a Sentry project, set those 4 env vars (DSN in Vercel + `.env.local`; org/
project/authToken at minimum in CI for source-map upload), redeploy.

## Project skills (.cursor/skills/)

Discipline methodologies shared with any agent working in this repo. Load
the relevant one before starting work of that kind; `polymath-thinking` is
the index for choosing a lens when a problem spans domains:

- `fullstack-engineering`, `frontend-craft`, `backend-architecture` — build
  methodology (vertical slices, UI states, security boundaries) including
  this repo's specific conventions
- `data-science`, `data-engineering`, `data-analysis` — evidence, pipelines,
  metrics/funnels
- `business-analysis`, `strategy-consulting`, `sales-persuasion` — specs,
  prioritization, conversion copy
- `scientific-thinking` — hypothesis-driven debugging and experiment design
- `creative-direction` — taste, composition, storytelling, brand voice
- `polymath-thinking` — cross-discipline lens switching + shared mental models
- `grilling` — stress-test a plan/idea before building: one question at a
  time with a recommended answer, decisions stay with the user; includes a
  brainstorm mode. Use before starting any vaguely-specified feature
- `fable5-core-method` — domain-agnostic working discipline for any
  substantive task: Understand → Shape → Build → Verify → Deliver, plus
  error recovery and communication habits. Load before multi-step work
  (references include per-artifact verification checklists)

## Installed Claude Code plugins (project scope)

Registered in `.claude/settings.json` (gitignored — local per machine, not
shared via git; re-install with `claude plugin install <name>
@claude-plugins-official --scope project` on a fresh clone if needed):

- `superpowers` — brainstorming/planning/TDD/debugging/code-review workflow
  skills (no bundled agents or slash commands)
- `frontend-design` — distinctive, non-generic UI output
- `resend` — skills for this project's existing Resend email integration
  (`src/lib/email.ts`)
- `playwright` — browser automation/E2E testing skills — wired up, see
  Testing section above
- `context7` — up-to-date library documentation lookup (useful given
  Next.js 16 diverges from most training data)
- `security-guidance`, `semgrep` — pattern-based security review during
  edits, relevant given this site collects PII (PDPA) and accepts file
  uploads
- `sentry` — error-monitoring skills — wired up, see Error monitoring
  section above (inert until a DSN is set)
