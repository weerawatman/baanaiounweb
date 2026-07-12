# External Integrations

Every external service this project talks to, how it's wired, and how to operate
it. Env var names refer to `.env.example` / Vercel project settings.

## Supabase (database · auth · storage)

- **What for:** the only backend — Postgres (content + leads), Auth (admin login),
  Storage (property/blog images).
- **Real project ref:** `ubbuniyssfmtpiwlxnxz` under the **weerawat.m@baanaioun.com**
  account. Dashboard: supabase.com → that account.
- **Env:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` (server-only).
- **Client lanes and the full migration manual:** see
  [`DATABASE.md`](DATABASE.md).

> ⚠️ **Never use the Supabase MCP here.** It is signed into a different account
> (weerawatman@gmail.com) holding a stale duplicate project — its query results do
> not reflect this project's real database. Use the Supabase CLI or local scripts
> reading `.env.local` instead. Full story in
> [`DATABASE.md`](DATABASE.md#️-do-not-use-the-supabase-mcp-for-this-project).

## Vercel (hosting · CDN · deploys)

- Pushing to `master` on GitHub auto-builds and deploys. No CI pipeline in between
  — run `npm run validate` locally before pushing.
- All public pages are static/ISR served from the CDN. Health check after deploy:

  ```bash
  curl -sI https://baanaiounweb.vercel.app/ | grep -i x-vercel-cache
  # HIT = served from CDN (good) · PRERENDER = first serve of a fresh deploy (fine)
  # MISS on every request = something made pages dynamic → see ARCHITECTURE.md §1
  ```

- Environment variables are managed in the Vercel dashboard (Project → Settings →
  Environment Variables) and must mirror `.env.example`.
- The Vercel MCP (`list_deployments`, `get_deployment_build_logs`,
  `get_runtime_errors`) is available and safe to use for reading deploy status and
  logs.

## LINE Messaging API (lead alerts)

- **What for:** pushes every lead-form submission to the owner's LINE instantly.
  (This replaced LINE Notify, which was discontinued.)
- **Code:** `src/lib/line-messaging.ts` — one push message per submission with the
  form tag, name, contact, and details.
- **Env:** `LINE_CHANNEL_ACCESS_TOKEN` (from LINE Developers Console → Messaging
  API channel), `LINE_TARGET_ID` (the user or group ID that receives alerts).
- **Failure mode:** if unset or the API errors, the submission still succeeds —
  the error is logged server-side only.

## Resend (email alerts)

- **What for:** email copy of every lead alert (redundancy alongside LINE).
- **Code:** `src/lib/email.ts` — per-form-tag subject lines (TH/EN).
- **Env:** `RESEND_API_KEY`; `NOTIFY_EMAIL_TO` optional (defaults to the agency
  address in code).
- Same graceful-degradation behaviour as LINE.

## Sentry (error monitoring — wired but inert)

- `@sentry/nextjs` is fully integrated (`src/instrumentation*.ts`,
  `sentry.{server,edge}.config.ts`, `global-error.tsx`, `withSentryConfig` in
  `next.config.ts`) and **no-ops safely because no DSN is configured**.
- To activate: create a Sentry project, set `NEXT_PUBLIC_SENTRY_DSN` (Vercel +
  `.env.local`) and `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` (needed
  for source-map upload at build), redeploy.

## Google Fonts (self-hosted at build)

`next/font/google` downloads **Prompt** (headings) and **Noto Sans Thai** (body) at
build time and self-hosts them — no runtime requests to Google. Definitions in
`src/lib/fonts.ts`, consumed by both root layouts.

## TestSprite MCP (AI end-to-end testing)

- **What for:** generates and executes browser E2E tests against a local build,
  with results hosted on testsprite.com. First full visitor-scope run 2026-07-12:
  19/23 passed, 0 code defects —
  [`../testsprite_tests/testsprite-mcp-test-report.md`](../testsprite_tests/testsprite-mcp-test-report.md).
- **Account:** Free plan under weerawatman@gmail.com — credits are limited; check
  with the `testsprite_check_account_info` tool before big runs (a 23-test run
  cost ~44 credits).
- **Workflow** (as driven from Claude Code):
  1. Serve a production build locally: `npm run build && npm run start` (never
     build while the server is running).
  2. `testsprite_bootstrap` (port 3000, type frontend, scope codebase) — opens a
     browser config form that **blocks until you upload a Product Spec**; upload
     the repo's `PRD.md`.
  3. The assistant writes `testsprite_tests/tmp/code_summary.yaml`, then
     `generate_standardized_prd` → `generate_frontend_test_plan`
     (`needLogin: false` for visitor scope) → `generate_code_and_execute`
     (`serverMode: "production"`).
  4. Triage the raw report; the polished report is committed at
     `testsprite_tests/testsprite-mcp-test-report.md`.
- **Cautions:** form tests create real DB rows and fire real LINE/email alerts —
  instruct it to prefix names with "TestSprite" and delete the rows afterwards.
  Its browser agent cannot reliably emulate mobile viewports — verify mobile flows
  with local Playwright device emulation instead.
- Everything under `testsprite_tests/` except the final report is gitignored
  (`tmp/config.json` contains the API key).

## Analytics (not wired yet)

`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_FB_PIXEL_ID`, and the Cloudflare
Turnstile keys exist in some `.env` files but **no code reads them today** — GA4 /
Pixel / Turnstile integration is future work (see `TODO.md`). Remove this section
when they're implemented.

## Image hosts (`next.config.ts` remotePatterns)

`next/image` is allowed to optimize from: `*.supabase.co` (production storage),
`placehold.co` (dev placeholders), `res.cloudinary.com` (optional CDN, unused
today).
