# Baan Ai Oun Property

Real estate website for Baan Ai Oun Property (Ban Bung, Chonburi, Thailand).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Notifications:** LINE Notify
- **Deployment:** Vercel

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Then fill in the values (see [Supabase Setup](#supabase-setup) below).

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                  | Description                         |
| ------------------------ | ----------------------------------- |
| `npm run dev`            | Start dev server                    |
| `npm run build`          | Production build                    |
| `npm run start`          | Start production server             |
| `npm run lint`           | Run ESLint                          |
| `npm run format`         | Format code with Prettier           |
| `npm run typecheck`      | TypeScript type check               |
| `npm run validate`       | Run typecheck + lint + build (CI)   |
| `npm run check:supabase` | Verify Supabase connection & schema |

## Project Structure

```
src/
  app/              # Next.js App Router pages & API routes
    (public)/       # Public site pages
    (admin)/        # Admin dashboard (Supabase-auth gated)
    api/            # submit-form, upload-images, service-request
  actions/          # Server Actions (admin mutations)
  components/
    blog/           # Blog-related components
    home/           # Homepage sections
    layout/         # Header, Footer, Breadcrumb, etc.
    property/       # Property detail components
    shared/         # Reusable form/CTA components
    admin/          # Admin dashboard components
    ui/             # shadcn/ui primitives
  config/           # Site config & navigation
  content/          # Page copy (bilingual objects, 1 file per page)
  data/             # Static config (BLOG_CATEGORIES)
  types/            # TypeScript interfaces
  lib/              # Supabase clients, queries, validations, mappers, utils

supabase/
  migrations/       # SQL migrations (applied via Supabase MCP)

e2e/                # Playwright smoke tests (npm run test:e2e)
testsprite_tests/   # Curated E2E scripts + production_audit.py
docs/
  mockups/          # HTML reference mockups per page
  archive/          # Completed plans/reports (history)
scripts/            # Dev/ops utility scripts (e.g. Supabase connection check)
.cursor/skills/     # Project agent skills (methodology per discipline)
```

> **Remaining work:** see [`TODO.md`](TODO.md) · **Facts & conventions for AI agents:** see [`AGENTS.md`](AGENTS.md)

## Supabase Setup

Initial setup SQL (historical): `docs/archive/supabase-setup/` — the live schema is defined by `supabase/migrations/`.

**Quick start:**

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Apply migrations in `supabase/migrations/` in order (SQL Editor or Supabase MCP)
3. Copy your API keys from **Settings > API** into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

## Environment Variables

| Variable                        | Required | Description                                  |
| ------------------------------- | -------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Yes      | Production URL (for sitemap/OG)              |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes      | Supabase project URL                         |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes      | Supabase anon/public key                     |
| `SUPABASE_SERVICE_ROLE_KEY`     | Yes      | Supabase service role key (server-side only) |
| `LINE_NOTIFY_TOKEN`             | Optional | LINE Notify token for lead notifications     |

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Connect repo in [Vercel Dashboard](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy
