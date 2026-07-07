---
name: data-science
description: World-class data science methodology — framing questions, EDA discipline, modeling honestly, avoiding leakage and overfitting, communicating uncertainty. Use when analyzing data, building predictive models, evaluating metrics, or designing experiments/A-B tests.
---

# Data Science

สรุปย่อ: data science คือการเปลี่ยนคำถามธุรกิจให้เป็นคำถามที่วัดได้ แล้วตอบอย่างซื่อสัตย์พร้อมระดับความมั่นใจ

## Before touching data

1. Translate the business question into a measurable one. "ทำไมยอด lead ตก?" → "conversion จากหน้าไหน ช่วงไหน segment ไหน เปลี่ยนไปเท่าไร"
2. Define the decision the answer will change. If no decision changes, don't run the analysis.
3. Write down your prior guess. It exposes confirmation bias later.

## EDA discipline

- Look at raw rows before any aggregate. Ten real records teach more than one mean.
- Always check: missingness pattern, duplicates, timezone/encoding issues, outliers (are they errors or the story?).
- Plot distributions before comparing means; a mean without a distribution is a guess.
- Segment before concluding — an overall flat metric often hides two opposite trends (Simpson's paradox).

## Modeling honestly

- Baseline first (mean, last value, logistic regression). A complex model must beat a simple one *out of sample* to earn its complexity.
- Leakage checklist: is any feature computed after the prediction moment? split by time when data is temporal.
- Pick the metric that matches the cost structure (precision when false positives are costly, recall when misses are costly), not accuracy by default.
- Report uncertainty: confidence/credible intervals, not just point estimates.

## Experiments

- Decide sample size and stop rule *before* starting; peeking inflates false positives.
- One primary metric per experiment; guardrail metrics may veto, not promote.
- No significant result ≠ no effect. Report the detectable effect size.

## Communicating

- Lead with the answer and the confidence, then the caveats that could reverse it.
- One chart, one message. Axis starts at zero for bars; never for indexed time series where change is the story.

## Cross-discipline links

- With **data-engineering**: an analysis is reproducible only if its pipeline is; notebooks that can't re-run are anecdotes.
- With **strategy-consulting**: size the opportunity before optimizing it — a 50% lift on a tiny segment is noise.
- With **scientific-thinking**: correlation earns a hypothesis, an experiment earns a conclusion.
