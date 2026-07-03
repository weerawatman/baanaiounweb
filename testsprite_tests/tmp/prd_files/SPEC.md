# Baan Ai Oun Property — Public Website Functional Spec

## Product Overview
Bilingual (Thai/English) real estate marketing website for Baan Ai Oun Property
(Ban Bung, Chonburi, Thailand). Primary business goal is **lead generation**:
visitors should be able to browse properties and submit contact/requirement
forms that reach the sales team via LINE + email notification.

This spec covers the **public-facing site only** (no admin/login testing in
this pass). Scope: pages under `src/app/(public)/`.

## Global / Site-Wide Behavior
- **Bilingual display (TH + EN together):** As of 2026-07-03 there is NO
  language toggle — the site permanently displays Thai and English together
  (Thai primary, English as a secondary line or after a "|" separator).
  Header nav items render as two stacked lines (Thai over English).
  Acceptance: both languages are visible simultaneously on every page; no
  TH/EN switch button exists anywhere. (Older test plans TC020/TC022/TC030
  that verified toggle persistence are obsolete.)
- **Navigation:** Header links must route to the correct page for every item
  in the main nav. Footer quick links must also resolve correctly.
- **Legacy redirects:** `/buy`, `/rent`, `/land` → `/find-property` (301);
  `/owners` → `/list-property` (301); `/academy` → `/agent-course` (301).
  These should NOT be treated as independently testable pages — verify only
  that they redirect to the correct destination.
- **Responsiveness:** All pages must render correctly on mobile viewport
  widths (this site was recently updated for mobile responsiveness).

## Lead Form Behavior (applies to every form below)
- **Click-to-reveal (intentional design):** on find-property, list-property,
  co-agent, and agent-course pages the form is NOT visible on page load. The
  page ends with a "พร้อมเริ่มต้นหรือยัง? (Ready to Get Started?)" section —
  the tester MUST click its primary CTA button first; the form then replaces
  that section. Do not report "form not found" without clicking this CTA.
- Required fields must block submission with a visible validation message
  when empty or invalid (e.g. malformed phone number).
- On successful submit, the form calls `POST /api/submit-form` and the user
  sees a success confirmation (toast/message) and the form resets or shows a
  thank-you state.
- On server error, the user sees a visible error message (not a silent
  failure).
- **Rate limiting:** `/api/submit-form` allows 3 requests/minute per IP;
  `/api/upload-images` allows 20 requests/minute per IP. Do not script rapid
  repeated submissions of the same form in a single test run — space out or
  limit to one successful submission per form per test pass.

## Pages

### `/` — Home
Hero with headline + primary CTA, smart property search (purpose tabs:
All/Buy/Rent/Land, district dropdown, max-price dropdown — filters a
preloaded property grid client-side), featured property cards linking to
`/property/[slug]`, services overview, testimonials carousel, FAQ accordion.
**Acceptance:** filters narrow the visible property list correctly; property
cards link to a valid, matching property detail page; "View All Properties"
goes to `/properties`.

### `/properties` — Property Listing
Same filter pattern as home (purpose/district/price), full grid of listings.
**Acceptance:** filter combinations produce correct subset of results; empty
filter results show an appropriate empty state (not a crash).

### `/property/[slug]` — Property Detail
Image gallery with lightbox, mortgage/loan calculator (inputs: price,
down-payment %, interest %, years → live-recalculates a loan chart), contact
CTAs (LINE/phone).
**Acceptance:** gallery lightbox opens/closes and navigates images; changing
any calculator input immediately updates the chart/output with a plausible
number (no NaN/crash); an invalid slug shows a proper not-found page rather
than an error crash.

### `/find-property` — Buyer/Renter Lead Gen
`PropertyForm` (variant `buyer`) with Thai/Foreign tabs, requirement
checkboxes, property-type dropdown, contact fields.
**Acceptance:** form submits successfully with valid data (see Lead Form
Behavior above); formTag sent is `buyer` or `buyer-foreign` depending on tab.

### `/list-property` — Owner Lead Gen + Image Upload
`PropertyForm` (variant `owner`) with Thai/Foreign tabs, purpose checkboxes,
property-type dropdown, and image upload (drag/select, up to 5 images,
jpg/png/webp, 5MB max per file). FAQ accordion below the form.
**Acceptance:** uploading a valid image shows a preview/thumbnail before
submit; uploading an oversized or wrong-type file is rejected with a clear
message; images upload via `POST /api/upload-images` before the form itself
posts to `/api/submit-form` with the returned image URLs attached; FAQ items
expand/collapse.

### `/co-agent` — Partner Recruitment
`PropertyForm` (variant `co-agent`): name, phone, LINE ID, property type,
location, price, commission, details textarea.
**Acceptance:** submits successfully with `formTag=co-agent`.

### `/agent-course` — Training Course Marketing
`PropertyForm` (variant `academy`): name, phone, LINE ID, occupation, goal
textarea.
**Acceptance:** submits successfully with `formTag=academy`.

### `/services` — Services Hub
Static navigation hub linking to Find Property, List Property, Co-Agent,
Agent Course. **Acceptance:** every card links to the correct destination
page.

### `/blog` — Blog Listing
Category filter buttons + live text search over preloaded posts.
**Acceptance:** selecting a category shows only matching posts; typing a
search term filters the list in real time; clicking a card opens the matching
`/blog/[slug]` post.

### `/blog/[slug]` — Blog Post Detail
Article content + related property cards. **Acceptance:** related property
links resolve to valid property pages; invalid slug shows not-found rather
than crashing.

### `/contact` — Contact Page
Inline form (name, phone, email, subject dropdown, message) posting to
`/api/submit-form`; click-to-call/LINE/WhatsApp/email cards; embedded Google
Map. **Acceptance:** form validates and submits like other lead forms;
contact links use correct `tel:`/`mailto:`/LINE/WhatsApp URI schemes; map
loads.

### `/about` — Company Story
Static milestones/timeline and values content. No forms. **Acceptance:** page
renders fully without console errors; internal links (e.g. CTAs back to
find-property/list-property) resolve correctly.

## Out of Scope for This Test Pass
- `/admin/*` routes (login-gated dashboard) — excluded per current test scope.
- Backend/API load or security testing beyond basic functional validation of
  `submit-form` and `upload-images`.
