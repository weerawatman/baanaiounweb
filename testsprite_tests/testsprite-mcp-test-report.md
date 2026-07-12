# TestSprite AI Testing Report (MCP)

---

## 1️⃣ Document Metadata

- **Project Name:** baanaiounweb (Baan Ai Oun Property — bilingual TH/EN real-estate site)
- **Date:** 2026-07-12
- **Prepared by:** TestSprite AI Team + Claude Code (analysis)
- **Scope:** Visitor role only (admin excluded by design), 23 frontend E2E tests against local production build (port 3000)
- **Result:** 19 ✅ Passed / 3 ❌ Failed / 1 ⚠️ Blocked — **82.61% pass rate**

---

## 2️⃣ Requirement Validation Summary

### Requirement R1 — Global navigation (header, mobile menu, logo, breadcrumbs)

#### Test TC001 Reach a public page from the home navigation
- **Test Code:** [TC001_Reach_a_public_page_from_the_home_navigation.py](./TC001_Reach_a_public_page_from_the_home_navigation.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/7a2a8756-0031-43b2-b3cc-bacc9ca9f0b1
- **Status:** ✅ Passed
- **Analysis / Findings:** Desktop navigation reaches the properties page correctly; nav links and routing are healthy.

#### Test TC015 Open the mobile menu and reach a public page
- **Test Code:** [TC015_Open_the_mobile_menu_and_reach_a_public_page.py](./TC015_Open_the_mobile_menu_and_reach_a_public_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/78a7190b-f206-45de-a433-d85adbc8c8b5
- **Status:** ⚠️ Blocked (test-harness limitation — NOT a product bug)
- **Analysis / Findings:** TestSprite's agent could not switch to a mobile viewport, so the hamburger (correctly hidden on desktop) was unreachable. Independently verified with Playwright iPhone 13 emulation: hamburger opens the sheet menu, navigating to /services succeeds, and no console errors occur. Functionality confirmed working.

#### Test TC017 Return home from an inner page using the logo
- **Test Code:** [TC017_Return_home_from_an_inner_page_using_the_logo.py](./TC017_Return_home_from_an_inner_page_using_the_logo.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/6ac3a96c-6fff-492b-b0b4-f80ca791388d
- **Status:** ✅ Passed
- **Analysis / Findings:** Logo link returns to home from inner pages.

#### Test TC018 Use breadcrumbs to return from an inner page
- **Test Code:** [TC018_Use_breadcrumbs_to_return_from_an_inner_page.py](./TC018_Use_breadcrumbs_to_return_from_an_inner_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/aa714ed1-a1e7-4011-8808-1aba15f0840f
- **Status:** ✅ Passed
- **Analysis / Findings:** Breadcrumb navigation works on property detail pages.

### Requirement R2 — Language switching (TH ⇄ EN)

#### Test TC003 Switch to the English home page
- **Test Code:** [TC003_Switch_to_the_English_home_page.py](./TC003_Switch_to_the_English_home_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/db0e7354-ec15-4480-afba-24a0d536e8fb
- **Status:** ✅ Passed
- **Analysis / Findings:** TH → EN switch shows the English home page under /en.

#### Test TC012 Return to Thai from the English home page
- **Test Code:** [TC012_Return_to_Thai_from_the_English_home_page.py](./TC012_Return_to_Thai_from_the_English_home_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/5efe4005-6d10-4983-8319-acddc33fcfb1
- **Status:** ✅ Passed
- **Analysis / Findings:** EN → TH switch returns to the Thai home page (no /en prefix). Round-trip locale switching is healthy.

### Requirement R3 — Property browsing and filtering

#### Test TC006 Contact the property owner from a detail page
- **Test Code:** [TC006_Contact_the_property_owner_from_a_detail_page.py](./TC006_Contact_the_property_owner_from_a_detail_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/5fc708ae-64f2-4869-aafa-83b7b62a36b5
- **Status:** ✅ Passed
- **Analysis / Findings:** LINE and phone contact options are available and functional on property detail pages.

#### Test TC007 Filter property listings and open a result
- **Test Code:** [TC007_Filter_property_listings_and_open_a_result.py](./TC007_Filter_property_listings_and_open_a_result.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/6f237012-12dc-4016-ba51-9ca240f817f8
- **Status:** ❌ Failed (spec mismatch — bedroom filter does not exist in the product)
- **Analysis / Findings:** The test expected a bedroom-count filter, but the implemented filters are: purpose tabs (sale/rent/land), keyword search, area (ทำเล), property type, and max price ([PropertiesPage.tsx](../src/app/%5Blocale%5D/(public)/properties/PropertiesPage.tsx)). The expectation originated from an over-broad PRD line, not a regression. Property data already includes a `bedrooms` field, so adding a bedroom filter is a viable enhancement, tracked as an optional improvement. Type-filter + card navigation themselves work (see TC010 passed).

#### Test TC010 Open a property from the listings page
- **Test Code:** [TC010_Open_a_property_from_the_listings_page.py](./TC010_Open_a_property_from_the_listings_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/d060409f-9070-4105-b9e1-e16e4926fa98
- **Status:** ✅ Passed
- **Analysis / Findings:** Property cards open the correct detail pages.

### Requirement R4 — Lead / service request forms

#### Test TC004 Submit a buyer or renter request successfully
- **Test Code:** [TC004_Submit_a_buyer_or_renter_request_successfully.py](./TC004_Submit_a_buyer_or_renter_request_successfully.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/91581d77-89de-4325-a4b3-18034f37a2d4
- **Status:** ✅ Passed
- **Analysis / Findings:** Unified /request form submits successfully with success confirmation.

#### Test TC008 Submit a property matching request from the dedicated page
- **Test Code:** [TC008_Submit_a_property_matching_request_from_the_dedicated_page.py](./TC008_Submit_a_property_matching_request_from_the_dedicated_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/3493202f-77d5-443d-a6ab-b1b42d6c1a80
- **Status:** ✅ Passed
- **Analysis / Findings:** /find-property lead form submits successfully.

#### Test TC011 Submit a property listing request successfully
- **Test Code:** [TC011_Submit_a_property_listing_request_successfully.py](./TC011_Submit_a_property_listing_request_successfully.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/e829effa-246d-4741-a119-4b9eef2415b1
- **Status:** ✅ Passed
- **Analysis / Findings:** /list-property consignment form submits successfully.

#### Test TC013 Submit a co-agent partnership request successfully
- **Test Code:** [TC013_Submit_a_co_agent_partnership_request_successfully.py](./TC013_Submit_a_co_agent_partnership_request_successfully.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/5315eb34-4633-435b-8a4d-be7f626efed3
- **Status:** ✅ Passed
- **Analysis / Findings:** /co-agent form submits successfully.

#### Test TC014 Submit a general contact request successfully
- **Test Code:** [TC014_Submit_a_general_contact_request_successfully.py](./TC014_Submit_a_general_contact_request_successfully.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/85591e10-bf4c-4839-8a2b-cda4ef4c5413
- **Status:** ✅ Passed
- **Analysis / Findings:** /contact form submits successfully.

#### Test TC016 Switch request tabs and view the matching form
- **Test Code:** [TC016_Switch_request_tabs_and_view_the_matching_form.py](./TC016_Switch_request_tabs_and_view_the_matching_form.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/018bad4e-2e69-4eb7-8f8d-cdce8855c356
- **Status:** ✅ Passed
- **Analysis / Findings:** Tab switching on /request swaps the correct form content.

#### Test TC019 Show validation for an empty request form
- **Test Code:** [TC019_Show_validation_for_an_empty_request_form.py](./TC019_Show_validation_for_an_empty_request_form.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/d5cb2837-982a-4872-9e35-9518f5f5ce03
- **Status:** ✅ Passed
- **Analysis / Findings:** Empty submit shows validation errors and does not show a success state — zod + react-hook-form validation is effective.

### Requirement R5 — Blog

#### Test TC020 Browse articles and open a blog post
- **Test Code:** [TC020_Browse_articles_and_open_a_blog_post.py](./TC020_Browse_articles_and_open_a_blog_post.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/7c23523c-0e14-48df-87ae-e45dc1c35adb
- **Status:** ❌ Failed (content gap — no published articles in production data)
- **Analysis / Findings:** The blog page renders correctly with a friendly empty state ("🚧 ยังไม่มีบทความใหม่ในระบบ…"), confirmed identical on local and production. The failure is a data-entry gap, not a code defect: no blog posts are published in the Supabase database. Action: owner should publish articles via the admin blog editor; re-run TC020/TC021 afterwards.

#### Test TC021 Continue from a blog post to a related property
- **Test Code:** [TC021_Continue_from_a_blog_post_to_a_related_property.py](./TC021_Continue_from_a_blog_post_to_a_related_property.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/1a5dfcec-0023-4495-8eb5-bbfe1acd8f9e
- **Status:** ❌ Failed (same content gap as TC020)
- **Analysis / Findings:** Blocked by the same empty blog data; the related-property flow cannot be exercised until at least one article with linked properties is published.

### Requirement R6 — FAQ accordions

#### Test TC022 Expand and collapse FAQ answers on the home page
- **Test Code:** [TC022_Expand_and_collapse_FAQ_answers_on_the_home_page.py](./TC022_Expand_and_collapse_FAQ_answers_on_the_home_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/711d11db-9588-4b27-be30-8e808ea2e9cd
- **Status:** ✅ Passed
- **Analysis / Findings:** Home FAQ expands and collapses correctly.

#### Test TC023 Expand a FAQ answer on a service page
- **Test Code:** [TC023_Expand_a_FAQ_answer_on_a_service_page.py](./TC023_Expand_a_FAQ_answer_on_a_service_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/5c082f7c-5714-47f9-93e2-a131cdf20dba
- **Status:** ✅ Passed
- **Analysis / Findings:** Service-page (agent-course) FAQ works.

### Requirement R7 — Contact CTAs (floating LINE, mobile bar)

#### Test TC002 Open LINE from the floating contact action
- **Test Code:** [TC002_Open_LINE_from_the_floating_contact_action.py](./TC002_Open_LINE_from_the_floating_contact_action.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/df60f656-00d3-4f85-9bc5-3341ad38de65
- **Status:** ✅ Passed
- **Analysis / Findings:** Floating LINE CTA opens the LINE destination.

#### Test TC005 Use mobile contact actions from the bottom bar
- **Test Code:** [TC005_Use_mobile_contact_actions_from_the_bottom_bar.py](./TC005_Use_mobile_contact_actions_from_the_bottom_bar.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/d904eac4-5fe2-4c79-84a3-dc91e9978bd8
- **Status:** ✅ Passed
- **Analysis / Findings:** Mobile bottom bar exposes call / LINE / WhatsApp actions.

### Requirement R8 — Custom 404

#### Test TC009 Return home from a custom 404 page
- **Test Code:** [TC009_Return_home_from_a_custom_404_page.py](./TC009_Return_home_from_a_custom_404_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/61d54417-cda0-4fec-b546-cadf509a7c71/780e371f-e608-4a78-bbd6-94035953c62a
- **Status:** ✅ Passed
- **Analysis / Findings:** Unknown URLs render the custom Thai 404 (via the new [locale] catch-all added in commit 4974c6c) and the home link works.

---

## 3️⃣ Coverage & Matching Metrics

- **82.61%** of tests passed (19/23); of the 4 non-passes, 0 are code defects.

| Requirement | Total Tests | ✅ Passed | ❌ Failed | ⚠️ Blocked |
|---|---|---|---|---|
| R1 Global navigation | 4 | 3 | 0 | 1 (harness viewport; verified OK via Playwright) |
| R2 Language switching | 2 | 2 | 0 | 0 |
| R3 Property browsing/filtering | 3 | 2 | 1 (bedroom filter not in product spec) | 0 |
| R4 Lead/service forms | 7 | 7 | 0 | 0 |
| R5 Blog | 2 | 0 | 2 (no published articles — data gap) | 0 |
| R6 FAQ accordions | 2 | 2 | 0 | 0 |
| R7 Contact CTAs | 2 | 2 | 0 | 0 |
| R8 Custom 404 | 1 | 1 | 0 | 0 |
| **Total** | **23** | **19** | **3** | **1** |

---

## 4️⃣ Key Gaps / Risks

1. **Blog has no published content (data gap, highest-visibility issue).** The blog list/detail flows cannot be exercised and visitors see an empty state. This is a data-entry task for the owner (publish articles via admin, optionally linking related properties) — content must not be fabricated by automation. Re-run TC020/TC021 after publishing.
2. **No bedroom filter on /properties (spec clarification).** Listings data already stores `bedrooms`, so the filter is a low-effort enhancement if desired; otherwise remove it from the PRD to keep future test plans aligned.
3. **Test-data cleanup required.** Five real leads named with a "TestSprite" prefix were created during form tests (from /request, /find-property, /list-property, /co-agent, /contact) and triggered owner notifications — delete them in the admin leads/requests screens.
4. **Mobile-viewport coverage in TestSprite is unreliable** (TC015 blocked). Mobile flows were verified locally via Playwright device emulation; consider keeping a small local Playwright suite for mobile regressions.
5. **No code defects were found in the visitor experience** — all functional failures trace to content or test-spec issues. Combined with the same-day performance fix (static/ISR restored, Vercel cache MISS → HIT, TTFB ~450–900ms → ~180ms), the public site is in good shape.
