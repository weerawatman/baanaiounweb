# Baan Ai Oun Property — Product Requirements Document

## 1. Overview

Baan Ai Oun Property (บ้านไออุ่น พร็อพเพอร์ตี้) is a bilingual (Thai/English) real-estate agency website for Ban Bueng, Chonburi, Thailand. It showcases property listings (sale / rent / land), agency services, and captures leads from prospective buyers, sellers, renters, and partner agents. It also includes an admin back office for the agency owner to manage all content.

- Production URL: https://baanaiounweb.vercel.app/
- Tech stack: Next.js 16 (App Router, static/ISR rendering), React 19, Tailwind CSS 4, Supabase (PostgreSQL + Auth + Storage), next-intl (i18n), deployed on Vercel.
- Locales: Thai (default, served at `/`) and English (served under `/en`). A language switcher in the header toggles locales and must preserve the current page.

## 2. User Roles

1. **Visitor (no login)** — browses properties, reads blog articles, views services, submits lead/contact forms.
2. **Admin (Supabase Auth login)** — manages properties, blog posts, testimonials, success stories, FAQs, leads, and service requests at `/admin` (login at `/admin/login`). Admin routes are not localized and are noindexed.

## 3. Public Pages (Visitor)

| Path | Purpose |
|---|---|
| `/` (TH) and `/en` | Home: hero banner, featured properties carousel, service shortcuts, trust pillars, testimonials, success stories, FAQ accordion, LINE CTA |
| `/properties` | All active property listings with client-side filters (type: sale/rent/land, price, bedrooms, keyword search) synced to URL query params |
| `/property/[slug]` | Property detail: image gallery, price, specs (beds/baths/area), location, agent contact CTAs (LINE / phone) |
| `/services` | Services hub: overview cards linking to each service |
| `/find-property` | Buyer/renter matchmaking service page with request form |
| `/list-property` | Owner consignment (sell/rent your property) page with request form |
| `/co-agent` | Partner agent (co-agent) program page with request form |
| `/agent-course` | 2-day real-estate agent workshop course page |
| `/blog` | Blog article list |
| `/blog/[slug]` | Blog article detail with related properties |
| `/about` | About the agency and founder timeline |
| `/contact` | Contact channels: LINE, WhatsApp, phone, email, contact form |
| `/request?tab=...` | Unified service request form with tabs: list-property / find-property / co-agent |
| `/privacy-policy` | PDPA privacy policy |

Site-wide UI: sticky header with dropdown nav + language switcher, footer with contact info, floating LINE CTA button, mobile bottom contact bar (call / LINE / WhatsApp), breadcrumbs on inner pages.

## 4. Key Visitor Flows to Test

1. **Navigation**: header menu (desktop dropdown + mobile sheet) reaches every public page; breadcrumbs navigate back; logo returns home.
2. **Language switching**: TH ⇄ EN from any page keeps the equivalent page; `<html lang>`, titles, and content change locale; URLs use `/en` prefix for English only.
3. **Property browsing**: filter properties by type/price/bedrooms/keyword; filters reflect in URL query params; property cards open the detail page; detail page shows gallery, specs, and contact CTAs.
4. **Lead forms** (list-property / find-property / co-agent / contact / request tabs): required-field validation (name, phone), Thai phone format accepted, success state (toast) after submit; submissions are stored via `/api/submit-form` or `/api/service-request` (Supabase `leads` / `service_requests` tables) and trigger LINE/email notifications.
5. **Blog**: list renders published posts; detail page renders rich text content and related properties.
6. **FAQ accordions** expand/collapse on home and service pages.
7. **404 handling**: unknown URLs render the custom Thai 404 page with links back home.
8. **Performance/UX**: public pages are statically rendered (ISR) — navigation should feel instant; no console errors; images lazy-load with proper aspect ratios.

## 5. Admin (out of scope for this test round)

Admin CRUD flows exist at `/admin` but require credentials — excluded from visitor-scope testing. Do not attempt to log in.

## 6. Non-Functional Requirements

- Bilingual SEO: per-locale `<title>`, meta description, canonical + hreflang alternates, JSON-LD (RealEstateAgent, Course, Blog, ContactPage).
- Responsive: mobile-first; mobile contact bar appears < md breakpoint; desktop nav ≥ lg.
- Accessibility: aria labels on nav/menu buttons, alt text on images, keyboard-navigable menus and accordions.
- No runtime console errors on any public page.
