# Baan Ai Oun Property (บ้านไออุ่น พร็อพเพอร์ตี้)

Bilingual (Thai/English) real-estate marketing website for **Baan Ai Oun Property**, a
brokerage in Ban Bueng, Chonburi, Thailand. The public site is lead-generation focused —
visitors browse property listings, read articles, and contact the agency through several
lead forms. A password-protected admin dashboard manages all content (listings, blog,
testimonials, success stories, FAQs) and incoming leads.

**Live site:** https://baanaiounweb.vercel.app (custom domain pending — see `TODO.md`)

## What the site does

**For visitors (no login):**

- Browse property listings for sale / rent / land with filters (purpose, area, type,
  price, bedrooms) at `/properties`, with detail pages at `/property/<slug>`
- Read about services: consignment (`/list-property`), buyer matchmaking
  (`/find-property`), co-agent partnership (`/co-agent`), and a 2-day agent workshop
  (`/agent-course`)
- Read blog articles (`/blog`) and the agency story (`/about`)
- Submit lead forms — every submission is saved to the database **and** pushed to the
  owner via LINE and email in real time
- Switch the whole site between Thai (default, served at `/`) and English (`/en/...`)

**For the owner (admin):**

- `/admin` (Supabase Auth login) — CRUD for properties, blog posts, testimonials,
  success stories, FAQs, profile/site images, plus inboxes for leads and service
  requests

## Tech stack

| Layer         | Technology                                                            |
| ------------- | --------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack, React 19) — TypeScript              |
| Styling       | Tailwind CSS 4 + shadcn/ui + framer-motion                             |
| Database      | Supabase (PostgreSQL + Auth + Storage) — no separate backend service   |
| i18n          | next-intl (`th` default at root, `en` under `/en`)                     |
| Notifications | LINE Messaging API + Resend (email)                                    |
| Monitoring    | Sentry (wired, currently inert — no DSN set)                           |
| Hosting       | Vercel (auto-deploys `master`; all public pages are static/ISR)        |

Deep dives: **[`ARCHITECTURE.md`](ARCHITECTURE.md)** (rendering model, i18n, caching,
Thai typography) · **[`docs/DATABASE.md`](docs/DATABASE.md)** (schema + migration
manual) · **[`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md)** (every external service).

## Getting started

Prerequisites: Node.js 20+ and npm. No Docker required (see the migration manual for
why).

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local   # then fill in values — see the table below

# 3. Run the dev server
npm run dev                   # http://localhost:3000
```

To exercise the site the way production behaves (static/ISR, accurate timings):

```bash
npm run build && npm run start
```

> **Windows note:** never run `npm run build` while `npm run start` is serving the same
> `.next` folder — the two write/read the same files and you get a corrupted build
> (pages render only header/footer, chunk 404s). Stop the server first.

## Environment variables

Copy from `.env.example`. Variables the code actually reads:

| Variable                        | Required    | Used for                                                       |
| ------------------------------- | ----------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Yes         | Canonical origin for metadata/sitemap/JSON-LD (`src/config/site.ts` → `BASE_URL`) |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes         | Supabase project URL                                            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes         | Public reads (RLS-guarded) + admin auth session                 |
| `SUPABASE_SERVICE_ROLE_KEY`     | Yes         | Server-only writes from API routes (bypasses RLS — never expose) |
| `LINE_CHANNEL_ACCESS_TOKEN`     | For notifications | LINE Messaging API channel token (`src/lib/line-messaging.ts`) |
| `LINE_TARGET_ID`                | For notifications | LINE user/group ID that receives lead alerts              |
| `RESEND_API_KEY`                | For notifications | Resend email API key (`src/lib/email.ts`)                 |
| `NOTIFY_EMAIL_TO`               | Optional    | Lead-alert recipient (defaults to the agency address)           |
| `NEXT_PUBLIC_SENTRY_DSN` + `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` | Optional | Activates Sentry (safe no-op when unset) |

Missing notification vars never break a form submission — the API routes degrade
gracefully and still return success to the visitor.

## Scripts

| Command                  | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `npm run dev`            | Dev server at localhost:3000                              |
| `npm run build`          | Production build (Turbopack)                              |
| `npm run start`          | Serve the production build                                |
| `npm run lint`           | ESLint over `src/`                                        |
| `npm run typecheck`      | `tsc --noEmit`                                            |
| `npm run validate`       | typecheck + lint + build — **run before every commit**    |
| `npm run format`         | Prettier write                                            |
| `npm run test:e2e`       | Playwright smoke tests (`e2e/`) — auto-starts dev server  |
| `npm run check:supabase` | Verify Supabase connection & schema                       |

## Project structure

```
src/
  app/
    [locale]/            Public site — ROOT LAYOUT for th/en pages (html lang, fonts)
      (public)/          All visitor pages (home, properties, blog, services, ...)
      [...rest]/         Catch-all → localized 404
    (admin)/             Admin — its OWN root layout (see ARCHITECTURE.md for why two)
      admin/             Login + dashboard pages
    api/                 3 routes: submit-form, service-request, upload-images
    sitemap.ts robots.ts global-error.tsx
  actions/               Server Actions for admin mutations (one file per entity)
  components/
    home/ property/ blog/ services/  Page-section components
    shared/              Reusable sections (hero banner, FAQ, CTA+form, ...)
    layout/              Header, Footer, PageSection, Breadcrumb, LanguageSwitcher
    admin/ ui/           Admin widgets · shadcn/ui primitives
  content/               Page copy as bilingual objects (TH/EN) — one file per page
  config/                site.ts (brand, contacts, BASE_URL) · navigation.ts
  i18n/                  routing.ts (locales, LocaleParams) · request.ts · navigation.ts
  lib/
    queries/             Supabase reads (ISR-cached public + cookie-auth admin)
    supabase/            client factories: public-client / server / client / proxy
    validations/         Zod schemas for forms
    thai-wrap.tsx        Thai phrase-aware line wrapping (see ARCHITECTURE.md)
    i18n/ mappers.ts ...  helpers
supabase/migrations/     SQL migrations — applied with the Supabase CLI (docs/DATABASE.md)
e2e/                     Playwright smoke tests
testsprite_tests/        TestSprite E2E artifacts (only the report is committed)
docs/                    INTEGRATIONS.md · DATABASE.md · mockups/ · archive/
scripts/                 Utility scripts (Supabase connection check)
```

## Testing

- **Playwright** (`npm run test:e2e`) — smoke suite covering navigation, locale
  switching, and legacy redirects.
- **TestSprite** (AI E2E via MCP) — full visitor regression run against a local
  production build; last report:
  [`testsprite_tests/testsprite-mcp-test-report.md`](testsprite_tests/testsprite-mcp-test-report.md)
  (19/23 passed, 0 code defects). Workflow in
  [`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md#testsprite-mcp).
- **Production audit** — `python testsprite_tests/production_audit.py` (~37 checks
  against the live URL).

## Deployment

Pushing to `master` auto-deploys to Vercel. All public pages are prerendered
(static/ISR) and served from the CDN — after a deploy, verify with:

```bash
curl -sI https://baanaiounweb.vercel.app/ | grep -i x-vercel-cache   # expect HIT (or PRERENDER right after deploy)
```

If pages ever come back `MISS` on every request, a dynamic API (`headers()`,
`cookies()`, `getLocale()` without `setRequestLocale`) has leaked into the public tree —
see the Rendering section of [`ARCHITECTURE.md`](ARCHITECTURE.md) before debugging.

## Documentation map

| File                                             | What's in it                                             |
| ------------------------------------------------ | -------------------------------------------------------- |
| [`ARCHITECTURE.md`](ARCHITECTURE.md)             | Rendering/i18n/caching model, layouts, Thai typography    |
| [`docs/DATABASE.md`](docs/DATABASE.md)           | Schema, Supabase clients, **migration manual (no Docker)** |
| [`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md)   | Every external service + MCP usage (and warnings)         |
| [`AGENTS.md`](AGENTS.md)                         | Facts & conventions for AI coding agents                  |
| [`PRD.md`](PRD.md)                               | Product requirements (also feeds TestSprite test plans)   |
| [`TODO.md`](TODO.md)                             | Remaining work before go-live                             |
