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

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run typecheck` | TypeScript type check |
| `npm run validate` | Run typecheck + lint + build (CI) |

## Project Structure

```
src/
  app/              # Next.js App Router pages & API routes
  components/
    blog/           # Blog-related components
    home/           # Homepage sections
    layout/         # Header, Footer, Breadcrumb, etc.
    property/       # Property detail components
    shared/         # Reusable form/CTA components
    ui/             # shadcn/ui primitives
  config/           # Site config & navigation
  content/          # Page content (1 file per page)
  data/             # Mock data (to be replaced with Supabase queries)
  types/            # TypeScript interfaces
  lib/              # Utilities & services (Supabase client, LINE Notify, validation)

supabase/
  setup/            # SQL files for initial database setup
  migrations/       # Incremental database migrations
```

## Supabase Setup

Full instructions: [`supabase/setup/README.md`](supabase/setup/README.md)

**Quick start:**

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** > paste contents of `supabase/setup/00_full_setup.sql` > Run
3. Copy your API keys from **Settings > API** into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL (for sitemap/OG) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-side only) |
| `LINE_NOTIFY_TOKEN` | Optional | LINE Notify token for lead notifications |

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Connect repo in [Vercel Dashboard](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy
