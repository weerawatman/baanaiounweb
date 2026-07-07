---
name: data-engineering
description: World-class data engineering methodology — pipelines as products, idempotent and replayable jobs, schema evolution, data quality gates, ELT layering. Use when building data pipelines, ETL/ELT jobs, designing analytics schemas, or moving data between systems.
---

# Data Engineering

สรุปย่อ: pipeline ที่ดีรันซ้ำได้เสมอ ล้มแล้วเล่าได้ว่าล้มตรงไหน และไม่โกหกปลายทาง

## Principles

- **Idempotent or broken.** Running a job twice must produce the same state (upsert by key, partition-overwrite, dedup on load). "Append and hope" is the root of most bad dashboards.
- **Replayable history.** Keep the raw layer immutable; every derived table must be rebuildable from raw. If you can't replay last month, you don't have a pipeline — you have a ritual.
- **Schema evolution is planned, not suffered.** Additive columns are safe; renames/type-changes go through a versioned view so consumers migrate on their schedule.
- **Data quality gates at boundaries:** row counts vs expectation, null-rate on key columns, freshness timestamp. Fail loudly *before* publishing, not after the CEO screenshots the dashboard.

## Layering (ELT)

```
raw (immutable, as-received) → staging (typed, deduped, renamed)
→ core (business entities, tested) → marts (per-audience aggregates)
```
Consumers only read core/marts. Nobody queries raw except the pipeline.

## Operational rules

- Every job logs: rows in, rows out, duration, watermark. A silent job is a failing job you haven't noticed.
- Backfills are first-class: parameterize by date range from day one.
- Late-arriving data: decide the policy (reprocess window vs ignore) explicitly.
- Small data is still data engineering — a cron + Postgres + SQL beats a distributed stack you can't operate.

## In this project

The transactional Supabase schema (leads, form_submissions, properties, activity_logs) is the future analytics source. Name columns for readability, keep timestamps `timestamptz`, and never overload a column with two meanings.

## Cross-discipline links

- With **data-analysis**: engineers own "is the number right?", analysts own "what does the number mean?" — both fail together.
- With **backend-architecture**: CDC/read-replicas beat querying production; never let a dashboard take down checkout.
- With **fullstack-engineering**: emit events at business moments (lead submitted, deal closed), not at technical moments.
