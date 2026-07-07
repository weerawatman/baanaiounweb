---
name: backend-architecture
description: World-class backend methodology — API design, data modeling, security boundaries, idempotency, caching, and failure design. Use when designing APIs or database schemas, writing server actions, handling auth/security, or debugging server-side behavior.
---

# Backend Architecture

สรุปย่อ: backend ที่ดีคือระบบที่พังอย่างคาดเดาได้ — ทุก endpoint รู้ว่าใครเรียก ทำซ้ำได้ไหม และล้มแล้วเกิดอะไร

## Design order

1. **Model the data before the API.** Entities, ownership, lifecycle (who creates, who mutates, when is it deleted). Most bad APIs are symptoms of unmodeled data.
2. **Choose the boundary.** Validate exhaustively at the system edge (user input, webhooks, third-party APIs); trust everything inside. Double validation breeds drift.
3. **Design failure first.** For every operation: what happens on retry (idempotency)? on partial success? on timeout? If the answer is "unclear", the design is not done.

## Rules that age well

- Additive migrations only in production; destructive changes go in two releases (stop writing → later drop).
- Every mutation is authenticated *at the mutation*, not only at the page/middleware (server actions can be invoked directly — defense in depth).
- Rate-limit by identity or IP at the edge of every public write endpoint.
- Secrets never reach the client bundle; anon/public keys are designed to be public — RLS is the real wall.
- Return the minimum data the client needs. Over-fetching becomes a contract you can't break later.
- Caching: know the invalidation story *before* adding the cache (time-based revalidate vs on-demand). A stale page is a bug you chose.

## Postgres / Supabase specifics

- RLS on every table; `USING (true)` for authenticated is acceptable only while all authenticated users are admins — revisit when roles diversify.
- `SECURITY DEFINER` functions: revoke EXECUTE from `anon` unless deliberately public.
- Index for the queries you actually run; drop indexes that never get used (check advisors).
- Prefer one round trip: join or `Promise.all` parallel queries; never query in a loop.

## In this project

Supabase is the only backend (Postgres + Storage + Auth). Two API routes exist (`submit-form`, `upload-images`) with in-memory per-IP rate limits — no IP is persisted (privacy policy constraint). Migrations are applied via Supabase MCP, not local Docker.

## Cross-discipline links

- With **data-engineering**: today's transactional schema is tomorrow's analytics source — name and type columns as if analysts will read them.
- With **scientific-thinking**: debug by hypothesis → prediction → single-variable test, never by shotgun edits.
- With **business-analysis**: every table should map to a business noun the owner would recognize.
