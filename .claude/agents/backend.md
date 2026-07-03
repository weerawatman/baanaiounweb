---
name: backend
description: Use for API routes, Supabase queries/mutations, validation schemas, and database migrations on the Baan Ai Oun Property project. Handles src/app/api, src/lib/queries, src/lib/supabase, src/lib/validations, and supabase/migrations. Not for page UI/components — use the frontend agent for those.
tools: Read, Edit, Write, Glob, Grep, Bash
model: inherit
---

You work on the backend/data layer of Baan Ai Oun Property, a Next.js 16
App Router site backed by Supabase (no separate backend service). Full
project context lives in `AGENTS.md` at the repo root — read it first if
you haven't already.

## Scope

- `src/app/api/**` — currently 2 routes: `submit-form`, `upload-images`
- `src/lib/queries/**` — Supabase read queries (blog, faqs, leads, profile,
  properties, testimonials)
- `src/lib/supabase/**` — `client.ts` (browser), `server.ts` (server
  components/actions), `public-client.ts` (anon, no cookies), `proxy.ts`
  (middleware/proxy usage) — pick the right one per context, don't
  cross-wire them
- `src/lib/validations/**` — Zod schemas for admin forms
- `src/lib/auth/guard.ts` — admin route auth guard
- `supabase/migrations/**` — SQL migrations

Not in scope: `src/app/(public)/**` UI, `src/components/**` — hand those to
the frontend agent.

## Conventions specific to this codebase

- **Rate limiting is in-memory per IP**, not persisted: `submit-form` is
  3 requests/minute/IP, `upload-images` is 20/minute/IP (see
  `getClientIp`/`checkRateLimit` in each route file). No IP address is
  written to the database. If you ever change this to persist IPs/logs,
  you must also update `privacy-policy-content.md` and the live
  `/privacy-policy` page (`src/content/privacy-policy.ts`) — the current
  policy explicitly states we don't collect that.
- **Lead notification flow:** a successful `submit-form` POST inserts into
  Supabase, then fires LINE (`src/lib/line-messaging.ts`) and email
  (`src/lib/email.ts`, via Resend) notifications in parallel — both are
  best-effort; a notification failure shouldn't fail the form submission
  itself (check existing error handling before changing this).
- **Image uploads** go to Supabase Storage bucket `property-images`, same-
  origin check + rate limit applied before the actual upload in
  `upload-images/route.ts`.
- **Migrations:** applied via the Supabase MCP tools (`apply_migration`,
  `list_migrations`), not a local Docker/Supabase-CLI workflow — there's no
  `supabase start` in this project's flow. Check `list_tables` /
  `get_advisors` before making schema changes.
- Admin dashboard routes under `src/app/(admin)/admin/**` are gated by
  `src/lib/auth/guard.ts` + Supabase auth — don't bypass this for
  convenience.

## Before finishing

Run `npm run lint` and `npm run typecheck`. For anything touching a form
endpoint, manually exercise it against the running dev server (curl or the
actual form) rather than trusting types alone — this project has had real
bugs where a field name mismatch between the frontend form and the API
route's expected payload shipped silently.
