# Improvement Plan — Following TestSprite Test Run (2026-07-03)

> **STATUS UPDATE (2026-07-03, end of day):**
> - ✅ Item 1 done — `aria-label={property.title}` added to `PropertyCard.tsx`; Round 2's TC024 confirmed card→detail navigation now works for automation.
> - ✅ Item 2 done — TC002 excluded from all Round-2 batches via explicit `testIds`.
> - ⏸️ Item 3 still open (user chose to defer the page-file fix; dev-mode batching + watchdog used instead).
> - ✅ Item 4 partially done — the 15-case priority batch ran in 3 sub-batches: **13/15 passed, 0 real bugs** (TC039/TC043 flaky-blocked during server crash windows; same validations covered by passing tests). TC018 dropped: blog has no published posts (data gap — publish content before testing blog features). ~17 lower-priority cases remain.
> - Full consolidated results: [testsprite-mcp-test-report.md](./testsprite-mcp-test-report.md)

Source: [testsprite-mcp-test-report.md](./testsprite-mcp-test-report.md) — 15/49 planned test cases executed (dev-mode cap), 10 passed, 5 failed/blocked (4 of which are confirmed test-script artifacts, not site bugs).

---

## 1. Code fix — improve property card testability (Low effort, low priority)

**Problem:** `PropertyCard`'s link wraps title + badges + price into one long accessible name, which made the AI test agent's `get_by_role('link', name=...)` targeting unreliable and caused 3 of the 5 non-passing tests (TC003, TC004, TC005/TC007 chain).

**Fix:**
- File: `src/components/property/PropertyCard.tsx:30`
- Add `aria-label={property.title}` to the `<Link href={`/property/${property.slug}`} ...>` element.

**Impact:** No user-facing behavior change. Improves screen-reader clarity and makes future automated tests (TestSprite or otherwise) target the card reliably.

**Effort:** ~5 minutes.

---

## 2. Test-plan cleanup (No code change — TestSprite config only)

**Problem:** TC002 ("Submit a property request successfully") is a near-duplicate of TC001 on the same `/find-property` page. Its auto-generated script never fills any field and ends in a hardcoded failure — wasting a test slot every run.

**Action:** When re-running TestSprite, either:
- Exclude TC002 via `testIds` on `testsprite_generate_code_and_execute`, or
- Ask TestSprite to regenerate the test plan with de-duplication in mind (the underlying test-plan JSON can be hand-edited at `testsprite_tests/testsprite_frontend_test_plan.json` before execution).

**Effort:** ~2 minutes, no cost beyond the next test run.

---

## 3. Fix the local production-build environment (Medium effort, enables full coverage)

**Problem:** `npm run build` currently fails on this machine — Turbopack/Rust's thread pool can't initialize because the Windows paging file is too small (`The paging file is too small for this operation to complete`). This forced today's run onto the dev server, which caps TestSprite at 15 of 49 planned test cases instead of 30, and dev-mode results are also less stable (single-threaded server under concurrent test load).

**Action (requires admin, needs your go-ahead):**
1. Increase Windows virtual memory / page file size (Control Panel → System → Advanced → Performance Settings → Advanced → Virtual Memory), or set it to a larger fixed size / "System managed" with more free disk space.
2. Restart the machine.
3. Re-verify with `npm run build && npm run start`.

**Impact:** Unlocks production-mode TestSprite runs (30 test cases instead of 15) and matches how the site actually behaves once deployed to Vercel.

**Effort:** ~10 minutes + reboot. **I will not do this myself — it's a system-level change I'd need your explicit OK to make.**

---

## 4. Expand test coverage to the remaining 34 planned cases

**Not yet executed** (present in the 49-case plan, cut off by the dev-mode 15-test limit):

| Area | Test IDs | What's covered |
|---|---|---|
| Blog listing & search | TC018, TC026, TC029, TC032, TC038, TC046 | category filter, live search, article → related property |
| Language toggle persistence | TC020, TC022, TC030 | TH/EN switch stays active across navigation |
| Form validation (negative paths) | TC021, TC034, TC036, TC039, TC041, TC043 | blocked submission on missing/invalid required fields |
| Image upload validation | TC040 | reject wrong file type / oversized image |
| Services hub navigation | TC016, TC017, TC019, TC023, TC025, TC027, TC028, TC031 | all 4 service cards route correctly |
| About page | TC042, TC044 | milestone timeline + values content render |
| Contact page extras | TC035, TC037, TC045, TC047 | direct call/LINE/WhatsApp/email links, embedded map |
| Mortgage calculator | TC024 | live recalculation on input change |
| Empty-state / edge cases | TC048 | no-match filter results show empty state, not a crash |
| Owner-listing FAQ | TC049 | FAQ accordion expand/collapse |

**Action:** Once either (a) production build is fixed (item 3) or (b) you're OK spending more TestSprite credits on additional dev-mode runs, re-run `testsprite_generate_code_and_execute` targeting `testIds: ["TC016", ..., "TC049"]` to close this gap. Validation-path tests (item covering TC021/034/036/039/041/043) are the highest-value subset to prioritize, since negative-path bugs (broken forms that silently accept invalid input) are more likely and more damaging to lead-gen quality than they'd first appear.

**Effort:** ~150 TestSprite credits available on the free plan; a 34-case run will likely exceed what's left, so this should probably be split into 2–3 batches prioritized by the table above.

---

## Batch-2 incident & adjustment plan (added 2026-07-03, after first re-test attempt)

**What happened:** The first attempt to run the 15-case priority batch produced **zero usable results** — all 15 tests came back `BLOCKED` with `ERR_EMPTY_RESPONSE`. The dev server crashed ~40 seconds into the run, when TestSprite opened ~15 concurrent browser sessions at once. The crash is consistent with this machine's memory constraint (the same undersized page file that blocks `npm run build`): the `.dev-server.log` shows a burst of 6+ simultaneous page requests immediately before the server died. TestSprite did not deduct credits for the blocked run (still 124).

**Adjustments for the re-test:**

1. **Pre-warm all routes serially before the run.** In dev mode each route compiles on first hit, which is the most memory-intensive moment. Hitting all 12 public routes with `curl` one-by-one before the test run moves that cost outside the test window.
2. **Split the 15 tests into 3 batches of 5** (one `generate_code_and_execute` call per batch, run sequentially). This caps concurrent browser sessions at ~5 instead of 15:
   - Batch A (validation): TC021, TC034, TC036, TC039, TC041
   - Batch B (validation + upload + language): TC043, TC040, TC020, TC022, TC030
   - Batch C (content/features): TC018, TC024, TC027, TC042, TC048
3. **Run a watchdog during the tests** that polls port 3000 every ~3 s and immediately restarts `npm run dev` if the server stops responding, limiting any crash's blast radius to seconds instead of the whole batch.
4. **Check results after each batch** before launching the next, so a systemic failure never costs more than 5 tests' worth of credits.

## Suggested order of operations

1. Apply the `aria-label` fix (#1) — quick, safe, no discussion needed.
2. Trim TC002 from the next test plan (#2) — free.
3. Decide whether to fix the page-file issue (#3) — needed before any production-mode run; I'll wait for your go-ahead since it's a system setting.
4. Prioritize and batch-run the remaining 34 cases (#4), starting with the validation/negative-path tests.
