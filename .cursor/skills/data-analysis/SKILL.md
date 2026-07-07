---
name: data-analysis
description: World-class data analyst methodology — decomposing metrics, cohorting, funnel analysis, honest dashboards, and turning numbers into recommendations. Use when interpreting metrics, building dashboards or reports, investigating "why did X change?", or defining KPIs.
---

# Data Analysis

สรุปย่อ: นักวิเคราะห์ที่เก่งไม่ได้ตอบว่า "เท่าไร" แต่ตอบว่า "แปลว่าอะไร แล้วควรทำอะไรต่อ"

## Investigating "why did X change?"

Decompose before theorizing:

1. **Definition check** — did the metric's definition, tracking, or timezone change?
2. **Mix shift** — same behavior, different composition? (more mobile users ≠ worse conversion)
3. **Segment isolation** — slice by source, device, geography, new/returning until the change concentrates somewhere.
4. **Timeline alignment** — overlay releases, campaigns, seasonality, holidays (Thai calendar included).
5. Only then form causal hypotheses, ranked by testability.

## Metrics that matter

- Every KPI needs: owner, definition (SQL-precise), refresh cadence, and an action threshold. A number nobody acts on is decoration.
- Prefer rates with visible denominators. "Conversion 3%" hides whether traffic doubled.
- Leading indicators (form starts, search volume) predict; lagging indicators (revenue, closed deals) confirm. Dashboards need both.
- Counting rule: define the grain first (per user? per session? per lead?) — most "wrong numbers" are grain confusion.

## Funnels & cohorts

- Funnel steps must be user-observable moments, not table names.
- Report drop-off *between* steps, not cumulative — the fix lives at the biggest step-gap.
- Cohort by acquisition period to separate product changes from audience changes.

## Honest presentation

- State the comparison explicitly: vs last period, vs same period last year, vs target.
- Annotate anomalies on the chart itself; a spike without a note becomes a myth.
- Recommendation format: finding → so what → do this next → what would change our mind.

## Cross-discipline links

- With **business-analysis**: the analyst finds the leak, the BA scopes the fix, the strategist decides if the leak is worth fixing.
- With **frontend-craft**: dashboard design IS information design — hierarchy, not chart zoo.
- With **sales-persuasion**: funnel language ("qualified", "intent") must match what sales actually experiences, or the report will be ignored.
