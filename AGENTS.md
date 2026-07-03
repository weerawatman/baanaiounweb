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
src/app/(public)/*      Public site pages (no i18n routing — see below)
src/app/(admin)/admin/* Admin dashboard, Supabase-auth gated
src/app/api/*           2 routes: submit-form, upload-images
src/components/         home/ shared/ property/ blog/ layout/ ui/ admin/
src/content/*           Page copy (bilingual objects, not a CMS)
src/config/*            navigation.ts, site.ts
src/lib/queries/*       Supabase read queries (blog, properties, leads, ...)
src/lib/supabase/*      client.ts / server.ts / public-client.ts / proxy.ts
src/lib/validations/*   Zod schemas for admin forms
supabase/migrations/*   SQL migrations (applied via Supabase MCP, no local Docker)
testsprite_tests/*      TestSprite E2E test scripts + reports (no unit tests exist)
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

- **Bilingual display, no toggle:** the site permanently shows Thai and
  English together (Thai primary/bold, English secondary/muted, or
  "ไทย | English" inline for short labels). There is no language switcher —
  it was deliberately removed. Don't reintroduce `th-only`/`en-only`
  CSS-hide patterns or a toggle component.
- **Lead forms are click-to-reveal**, not always visible: `CTAWithForm`
  (`src/components/shared/CTAWithForm.tsx`) renders a CTA button first; the
  actual `PropertyForm` only mounts after the visitor clicks it. Automated
  tests/agents must click the CTA before looking for form fields.
- **Legacy redirects:** `next.config.ts` permanently redirects
  `/buy /rent /land` → `/find-property`, `/owners` → `/list-property`,
  `/academy` → `/agent-course`. The old page files were deleted (dead code,
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
  already running on :3000. `e2e/smoke.spec.ts` covers: home page renders
  the bilingual nav, all key public pages return 200, and the legacy
  `/buy /owners` etc. redirects still resolve correctly.
- No Jest/Vitest unit/component test suite exists.
- QA also runs through TestSprite (MCP-driven, browser-based E2E against
  the dev server) — see `testsprite_tests/testsprite-mcp-test-report.md`
  for the latest results and `testsprite_tests/improvement-plan.md` for
  open follow-ups.

## Error monitoring (Sentry)

`@sentry/nextjs` is installed and wired up (`src/instrumentation.ts`,
`src/instrumentation-client.ts`, `src/sentry.{server,edge}.config.ts`,
`src/app/global-error.tsx`, `next.config.ts` wrapped with
`withSentryConfig`). **It is currently inert** — `NEXT_PUBLIC_SENTRY_DSN` /
`SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` are unset (see
`.env.example`), and the SDK no-ops safely with no DSN. To activate: create
a Sentry project, set those 4 env vars (DSN in Vercel + `.env.local`; org/
project/authToken at minimum in CI for source-map upload), redeploy.

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
