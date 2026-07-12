# Database & Migrations Manual

Everything about this project's Supabase database: how the app talks to it, and —
step by step — how schema changes are made **without Docker and without the
Supabase MCP**. Written so you can come back months later and follow it cold.

## ⚠️ Do NOT use the Supabase MCP for this project

The Supabase MCP available in Claude/Cursor on this machine is signed into
**weerawatman@gmail.com**, but the real project database lives under
**weerawat.m@baanaioun.com**. The MCP account contains a stale duplicate project
also named "baanaioun" (ref `zjqnfuqvbjvmdomuunsj`) that has only a
`form_submissions` table — querying it once led us to wrongly conclude the schema
was missing. Real project ref: **`ubbuniyssfmtpiwlxnxz`**.

Rules that follow from this:

- Never verify schema/data through the Supabase MCP — results are misleading.
- Query or change the real DB only via the **Supabase CLI** (below) or one-off
  Node scripts that read this repo's `.env.local` (which points at the real
  project). Example: the test-lead cleanup on 2026-07-12 was done with a local
  script using `SUPABASE_SERVICE_ROLE_KEY` — not the MCP.

## How the app connects (three lanes)

| Lane | File | Key | Behaviour |
| --- | --- | --- | --- |
| Public reads | `src/lib/supabase/public-client.ts` | anon | No cookies → pages stay static/ISR; RLS applies |
| Admin session | `src/lib/supabase/server.ts` | anon + auth cookies | RLS as the logged-in admin |
| Server writes | `src/lib/supabase.ts` (`createServerSupabase`) | **service role** | Bypasses RLS — API routes & `generateStaticParams` only; never import client-side |

Quick connectivity check: `npm run check:supabase` (`scripts/test-supabase.mjs`).

## Schema overview

The full schema is defined by `supabase/migrations/` applied in filename order;
the baseline `20260630000000_init_schema.sql` captures the complete production
schema (14 tables, 1 enum, 5 functions, triggers, RLS policies, storage buckets)
— read that file for the authoritative table list. The tables the app touches most:

- `properties` — listings (bilingual title/price-label columns, `bedrooms`, images)
- `blog_posts` — articles (bilingual, `published` flag)
- `agent_profile` — single-row site profile + every managed page image
- `faqs`, `testimonials`, `success_stories`
- Lead inboxes: `form_submissions` (contact), `list_property_requests`,
  `matchmaking_requests`, `coagent_requests`

## Migration workflow (no Docker)

The Supabase CLI's `db push` / `db query` talk to the Management API directly, so
nothing needs Docker. `db pull` / `db diff` DO need Docker (shadow database) —
**avoid them**; this workflow never requires them.

### One-time per shell session: link the project

`supabase/.temp/` isn't persisted, so every new shell starts unlinked. The CLI's
global access token IS persisted on this machine, so linking is non-interactive:

```bash
npx supabase link --project-ref ubbuniyssfmtpiwlxnxz
```

### Making a schema/data change

```bash
# 1. Create a timestamped empty migration file
npx supabase migration new add_bedroom_index

# 2. Write SQL into the generated file under supabase/migrations/
#    - DDL and DML are both fine (we've shipped data fixes as migrations)
#    - Prefer idempotent SQL: ADD COLUMN IF NOT EXISTS, CREATE INDEX IF NOT EXISTS

# 3. Apply to the remote database
npx supabase db push
#    A Docker warning during push is cache-only noise — the push still succeeds.

# 4. Verify
npx supabase db query --linked "select column_name from information_schema.columns where table_name='properties'"

# 5. Commit the migration file to git
```

### Useful commands

```bash
npx supabase db query --linked "SELECT ..."          # query the live DB
npx supabase migration list --linked                  # local vs remote history
npx supabase migration repair --status applied <ver>  # mark applied WITHOUT running
npx supabase migration repair --status reverted <ver> # remove from remote history table
```

`migration repair` edits only Supabase's tracking table
(`supabase_migrations.schema_migrations`) — it never touches the schema. That's how
the baseline was installed: the init migration was written to *describe* the
already-live schema and then marked applied.

## Playbook: "Remote migration versions not found in local migrations directory"

This drift has happened repeatedly (2026-07-07 `success_stories`, 2026-07-10
`contact_map_coordinates` + `about_timeline_images`): some other session applied a
migration straight to remote under a different timestamp than the file that later
got committed. `db push` then refuses to run.

Fix — safe and metadata-only:

```bash
# 1. Confirm the orphan remote version is the SAME feature as a local file
npx supabase db query --linked \
  "select version, name from supabase_migrations.schema_migrations where version in ('<orphan>')"

# 2. Remove the orphan from remote history (does not touch schema)
npx supabase migration repair --status reverted <orphan_version>

# 3. Push normally — idempotent SQL will just print "already exists, skipping"
npx supabase db push
```

Do **not** reach for `db pull` / `db diff` here (Docker-gated); the query + repair
path is sufficient.

## Migration log

| File | What it did |
| --- | --- |
| `20260630000000_init_schema.sql` | Full schema baseline (marked applied, not run) |
| `20260630100000_update_property_titles_bilingual.sql` | Data: bilingual property titles |
| `20260630110000_fix_rls_performance_and_security.sql` | RLS initplan fix, search_path, revoke anon EXECUTE |
| `20260705144610_service_request_tables.sql` | 3 service-request tables |
| `20260706220000_success_stories.sql` | success_stories (history repaired 07-07) |
| `20260707144850_home_page_images.sql` | Home hero + trust-pillar image columns |
| `20260707151247_match_team_image.sql` | match_team_image column |
| `20260707220000_contact_map_coordinates.sql` | map_lat/lng (history repaired 07-10) |
| `20260707223000_about_timeline_images.sql` | About timeline images (history repaired 07-10) |
| `20260710000000_page_hero_images.sql` | Per-page hero image columns |
| `20260711000000_mockup_images_and_faq_seed.sql` | Mockup image columns + FAQ seed |
| `20260711120000_standardize_property_categories.sql` | Property category normalization |
| `20260712000000_align_faq_page_slugs.sql` | FAQ page-slug alignment |
| `20260712100000_add_en_content_columns.sql` | English content columns (bilingual rollout) |
| `20260713000000_remove_success_story_placeholder_seed.sql` | Drop placeholder seed rows |

Keep this table updated when adding migrations.

## Security notes (open items in `TODO.md`)

From the 2026-07-07 Supabase advisor run, still pending: revoke anon `EXECUTE` on
the SECURITY DEFINER functions, enable leaked-password protection, and tighten the
broad storage-bucket SELECT policies. Re-run advisors after schema changes.
