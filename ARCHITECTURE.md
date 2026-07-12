# Architecture

How the Baan Ai Oun Property site is put together, and — just as important — the
constraints that keep it fast. Read this before touching layouts, i18n, data
fetching, or anything under `src/app/[locale]`.

```
Visitor ──► Vercel Edge/CDN ──► static/ISR HTML (public pages)
                    │
                    └─(admin, forms)─► Next.js serverless ──► Supabase (Postgres/Auth/Storage)
                                              │
                                              ├─► LINE Messaging API  (lead alerts)
                                              └─► Resend              (email alerts)
```

## 1. Rendering model — everything public is static/ISR

Every public page is prerendered at build time (SSG) and refreshed with ISR
(`export const revalidate = ...` per page: home/properties 15 min, most content
pages 1 h, blog posts 24 h). Vercel serves them from the CDN — the target signal is
`X-Vercel-Cache: HIT` and TTFB well under 200 ms.

Only three things render per-request, deliberately:

- `/request` (reads `searchParams` for the active tab)
- `/[locale]/[...rest]` (the 404 catch-all)
- everything under `/admin` and `/api` (auth/cookies)

### The rule that keeps it static (learned the hard way)

Next.js marks a route **dynamic** the moment any request-scoped API runs during
render — `headers()`, `cookies()`, or any next-intl call that falls back to reading
request headers. In 2026-07 the shared root layout called `getLocale()`, which
silently opted **every page on the site** into per-request rendering: Vercel showed
`X-Vercel-Cache: MISS` on every click and 400–900 ms TTFB. The fix (commit
`4974c6c`) restructured the app and set these rules:

1. **Two root layouts.** `src/app/[locale]/layout.tsx` is the root layout for the
   public site (it owns `<html lang={locale}>`, fonts, `globals.css`);
   `src/app/(admin)/layout.tsx` is a separate root layout for admin. There is **no
   shared `src/app/layout.tsx`** — a shared root can't know the locale without
   reading headers. Consequences: the localized 404 needs the
   `[locale]/[...rest]` catch-all + `[locale]/not-found.tsx`, and `global-error.tsx`
   stays at the app root (it renders its own `<html>`).
2. **Every layout and page under `[locale]` calls `setRequestLocale(locale)`**
   before any other next-intl usage, with `locale` taken from route params
   (`LocaleParams` from `src/i18n/routing.ts`). Layouts and pages render as
   parallel units — one unit missing the call re-introduces the header fallback for
   the whole route.
3. **`generateMetadata` never calls `getLocale()`** — it receives `params` and
   passes the locale explicitly (`createPageMetadata({ locale, ... })` in
   `src/lib/i18n/metadata.ts`).
4. Components rendered *inside* a page's tree (e.g. `Footer`, `HomePage` sections)
   may call `getLocale()` freely — by then the request-scoped locale is set.

If the live site ever regresses to `MISS`-on-every-request, one of these rules was
broken. Check the route table from `npm run build`: public routes must be `●`
(SSG), not `ƒ` (Dynamic).

## 2. i18n

- **Locales:** `th` (default) and `en` — `src/i18n/routing.ts`
  (`localePrefix: "as-needed"`, `localeDetection: false`). Thai lives at the root
  (`/about`), English under `/en/about`; `/` is always Thai regardless of browser
  language.
- **Copy lives in code**, not a CMS: `src/content/*` holds bilingual objects
  (`{ th, en }` or `"ไทย | English"` pipe strings) picked with `pickLocalized()` /
  `pickPipeBilingual()` (`src/lib/i18n/pick-localized.ts`). Database content has
  parallel `_en` columns picked with `localizedOrFallback()`.
- **Banner exception:** page hero banners (`PageHeroBanner`) intentionally show
  Thai + English together. Don't "fix" that.
- **`LocaleParams`** (`src/i18n/routing.ts`) is the params type for every page
  under `[locale]`; extend it for extra segments:
  `LocaleParams<{ slug: string }>`.
- SEO: `createPageMetadata` builds per-locale canonical + `hreflang` alternates;
  the sitemap emits both locales.

## 3. Data layer

Three Supabase client factories with strict lanes (`src/lib/supabase/`):

| Client                            | Key           | Cookies | Used by                                    |
| --------------------------------- | ------------- | ------- | ------------------------------------------ |
| `public-client.ts` (`publicClient`) | anon        | **No**  | All public-page reads — keeps pages static |
| `server.ts` (`createClient`)       | anon + session | Yes   | Admin pages/actions (RLS as logged-in user) |
| `supabase.ts` (`createServerSupabase`) | service role | No | API routes + `generateStaticParams` (writes/reads that bypass RLS) |
| `proxy.ts` (`updateSession`)       | anon + session | Yes   | Middleware session refresh for `/admin`    |

Public reads live in `src/lib/queries/*` wrapped in `unstable_cache` with the same
`revalidate` horizon as the pages and tags (`["properties"]`, etc.) so admin
mutations can invalidate them. **Never call `cookies()`/`server.ts` from a public
page** — that flips the route to dynamic (see §1).

Rows are mapped to UI types in `src/lib/mappers.ts`; admin form validation is Zod
(`src/lib/validations/`).

## 4. Middleware (`src/proxy.ts`)

Next 16 "proxy" (formerly middleware): `/admin/*` goes through Supabase session
refresh (`updateSession`); everything else goes through the next-intl middleware
(locale rewrite/redirect). Static assets and `/api` are excluded by the matcher.
Auth for admin is enforced *here* — admin layouts don't re-check, so navigations
show `loading.tsx` immediately.

## 5. Forms & notifications

```
Visitor form (client, zod-validated)
  └─► POST /api/submit-form  or  /api/service-request     (rate-limited 3/min/IP, in-memory)
        ├─► Supabase insert (service role) → form_submissions / list_property_requests /
        │                                     matchmaking_requests / coagent_requests
        ├─► LINE Messaging API push  (src/lib/line-messaging.ts)
        └─► Resend email             (src/lib/email.ts)          — all three in parallel
```

Design decision: the route returns success to the visitor **even if the DB insert
fails**, as long as the request was valid — the LINE/email notification still
carries the lead, and losing a customer to a transient DB error is worse than a
missing row. The response body's `saved` flag tells the truth for debugging.

Lead forms are click-to-reveal (`CTAWithForm` renders a button; the form mounts on
click) — automated tests must click first.

## 6. Thai typography (`src/lib/thai-wrap.tsx`)

Thai has no spaces between words; browsers line-break with an ICU dictionary that
happily splits compounds (`ผู้|ซื้อ`, `เวิร์|กชอป`). CSS can't fix this —
`word-break: keep-all` is spec'd for CJK only and does nothing for Thai. So
wrapping is structural:

- `<ThaiText text={...} />` segments text with `Intl.Segmenter`, merges tokens into
  phrase units, wraps each unit in a `whitespace-nowrap` span and marks allowed
  breaks with `<wbr>`; spaces remain normal break points.
- Unit rules: strict pass breaks only between two dictionary words of ≥5 chars;
  units still longer than 28 chars are re-split with a relaxed rule (≥4-char words,
  ≥7-char accumulated unit); units longer than 34 chars are left unwrapped so
  narrow screens can still break them (never overflow).
- Applied in the marketing text blocks (service cards, pillars, about advantages).
  **Server components only** — using it in a client component would re-segment in
  the browser and risk hydration mismatches across ICU versions. A global
  `:lang(th) { overflow-wrap: break-word }` in `globals.css` is the final overflow
  safety net.

## 7. Layout & spacing system

- `PageSection` (`src/components/layout/PageSection.tsx`) is the standard section
  wrapper: `py-8 lg:py-10`, so two adjacent sections total **~80 px** — the
  site-wide rhythm (matches the About page's `mt-20` reference). Ad-hoc `<section>`
  wrappers use the same `py-8 lg:py-10`. Don't reintroduce `py-16`/`py-24`
  section padding.
- Variants: `default` (white card bg), `warm` (cream), `primary` (green band).
- `BASE_URL` (canonical origin) comes from `src/config/site.ts` — never re-declare
  the `process.env.NEXT_PUBLIC_SITE_URL` fallback locally.

## 8. Error handling & monitoring

- Per-tree error boundaries: `src/app/[locale]/error.tsx` and
  `src/app/(admin)/error.tsx` (both re-export `components/shared/ErrorScreen`);
  admin dashboard has its own nested boundary.
- `src/app/global-error.tsx` catches root-layout crashes and reports to Sentry.
- Sentry is fully wired but **inert** until the DSN env vars are set — see
  `docs/INTEGRATIONS.md`.

## 9. Route map

| Route                                  | Rendering        | Notes                          |
| -------------------------------------- | ---------------- | ------------------------------ |
| `/[locale]` + 12 content pages          | SSG + ISR        | See §1 for revalidate windows  |
| `/[locale]/property/[slug]`, `/blog/[slug]` | SSG (per slug) + ISR | `generateStaticParams` from DB |
| `/[locale]/request`                     | Dynamic          | reads `searchParams`           |
| `/[locale]/[...rest]`                   | Dynamic          | 404 catch-all                  |
| `/admin/**`                             | Dynamic          | Supabase Auth via middleware   |
| `/api/submit-form`, `/api/service-request`, `/api/upload-images` | Dynamic | rate-limited |
| `/sitemap.xml`, `/robots.txt`           | Generated        | `BASE_URL`-driven              |
