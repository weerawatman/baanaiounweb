# Execution & Verification Patterns

Concrete discipline for producing artifacts. Everything here is domain-agnostic. The unifying rule: **an artifact is not done until it has been re-opened and inspected as its consumer would consume it.**

## Spreadsheets (openpyxl and similar)

Traps that recur across nearly every generated workbook:

- **Colors**: use full 8-digit ARGB hex (`FF` + RRGGBB). Six-digit values silently misbehave on some API paths. Always set `fill_type="solid"` on PatternFill — omitting it silently yields no fill.
- **Conditional formatting uses differential styles**, not regular fills. A regular fill inside a CF rule can produce a file the spreadsheet app "repairs" (i.e., strips) on open. Test a formula-based CF rule on 3 cells manually before applying to a whole range, and re-verify range strings after any row-count change.
- **Merged cells**: only the anchor (top-left) cell holds data. Write to the anchor, or unmerge → write → remerge.
- **Formulas are strings** when writing; reading back with `data_only=True` returns cached values (None if the file was never opened in a spreadsheet app). To verify formulas, read with `data_only=False` and inspect the string.
- **ISO week calendars**: ISO years have 52 or 53 weeks — never hardcode 52. Week 1 can start in the previous calendar year; tasks spanning year boundaries need real dates internally, week labels only for display.
- **Calendar systems**: some locales use non-Gregorian years (e.g., Buddhist Era = CE + 543). On any date ingestion, sanity-check year magnitudes per row, not per file — mixed files exist.
- **Macro-enabled files (.xlsm)**: open with `keep_vba=True` or macros are destroyed on save. Prefer supplying VBA as importable text over binary-patching `vbaProject.bin`.
- Column widths and styles don't travel with values — apply explicitly.

**Pre-delivery checklist (spreadsheets):**
1. File reopens cleanly with the library — no warnings.
2. Sheet names/count match the agreed shape.
3. Sample 3 formulas: right references, stored as formulas not text.
4. Conditional formatting present on expected ranges.
5. 3 random dates are sane (right century, right calendar system).
6. Merged ranges intact; no data lost in non-anchor cells.
7. If macro-enabled: macros still present after save.

## Documents and decks

- One message per section/slide, stated as a sentence in the heading, not a topic label ("Pilot pays back in 14 months", not "Pilot Update").
- Executive material: fewer slides, numbers over adjectives, every figure traceable to a source. Surface gaps and risks explicitly — decision-makers trust artifacts that show their own weaknesses.
- Verify the rendered artifact: no text overflow, no orphan bullets, consistent fonts, page/slide count as agreed. Check the file, not the code that made it.
- A cold reader must be able to navigate: an overview/legend up front explaining structure, color codes, and any ID scheme.

## Code

- Structure by function/module per concern; a failure in one part must not require regenerating the rest.
- Prove the risky part first with a minimal spike before polishing the rest.
- Explicit encodings everywhere (`encoding="utf-8"` on every file open). Non-ASCII in filenames and identifiers is a downstream time bomb — keep identifiers ASCII, content in any language.
- Handle the empty/one-element/duplicate cases; they are where most "worked in the demo" code dies.
- Run it. If it can't be run, trace it by hand on one concrete input. Untested code is a draft.

## Data work

- Profile before analyzing: row counts, null rates, duplicates, min/max on key columns. Ten minutes of profiling prevents confidently wrong conclusions.
- Quantities carry units; money carries currency. Never aggregate across units/currencies without grouping or converting.
- Reconciliations are bidirectional: totals foot both ways, every source row lands, every target is reached. Report orphans as findings.
- Keep a stable ID on every entity so artifacts can cross-reference by key, not by string-matching names.

## File hygiene

- Never overwrite a delivered version; bump a revision marker in the filename.
- When editing an existing artifact, load the real current version first, change minimally, and leave untouched parts untouched.
- Keep intermediate files in a working area; deliver only finals.
