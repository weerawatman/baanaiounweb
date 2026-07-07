"""
Production readiness audit — run against the live site.
  python testsprite_tests/production_audit.py
"""

import asyncio
import os
import re
import statistics
import time

from playwright.async_api import async_playwright

BASE_URL = os.environ.get("TESTSPRITE_BASE_URL", "https://baanaiounweb.vercel.app").rstrip("/")

PUBLIC_PAGES = [
    "/",
    "/find-property",
    "/services",
    "/properties",
    "/blog",
    "/about",
    "/contact",
    "/list-property",
    "/co-agent",
    "/agent-course",
    "/request",
    "/privacy-policy",
]

REDIRECTS = [
    ("/buy", "/find-property"),
    ("/rent", "/find-property"),
    ("/land", "/find-property"),
    ("/owners", "/list-property"),
    ("/academy", "/agent-course"),
]

results: list[str] = []
issues: list[str] = []


def ok(msg: str) -> None:
    results.append(f"PASS  {msg}")


def bad(msg: str) -> None:
    results.append(f"FAIL  {msg}")
    issues.append(msg)


async def timed_goto(page, url: str, wait: str = "domcontentloaded") -> tuple[int | None, float]:
    t0 = time.perf_counter()
    resp = await page.goto(url, wait_until=wait)
    elapsed = (time.perf_counter() - t0) * 1000
    return (resp.status if resp else None), elapsed


async def main() -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True, args=["--disable-dev-shm-usage"])
        context = await browser.new_context(viewport={"width": 1366, "height": 900})
        context.set_default_timeout(30000)
        page = await context.new_page()

        console_errors: list[str] = []
        page.on(
            "console",
            lambda m: console_errors.append(f"{page.url} :: {m.text[:160]}")
            if m.type == "error"
            else None,
        )
        failed_requests: list[str] = []
        page.on(
            "response",
            lambda r: failed_requests.append(f"{r.status} {r.url[:120]}")
            if r.status >= 400 and "favicon" not in r.url
            else None,
        )

        # ── 1. Public pages: status + timing + basics ──────────────────
        print("== Public pages ==")
        timings: dict[str, float] = {}
        for path in PUBLIC_PAGES:
            status, ms = await timed_goto(page, f"{BASE_URL}{path}")
            timings[path] = ms
            if status == 200:
                ok(f"{path} -> 200 ({ms:.0f}ms)")
            else:
                bad(f"{path} -> {status} ({ms:.0f}ms)")

            title = await page.title()
            if not title or len(title) < 5:
                bad(f"{path} missing/short <title>: '{title}'")
            h1_count = await page.locator("h1").count()
            if h1_count == 0:
                bad(f"{path} has no <h1>")
            elif h1_count > 1:
                bad(f"{path} has {h1_count} <h1> elements")
            desc = await page.locator('meta[name="description"]').get_attribute("content")
            if not desc:
                bad(f"{path} missing meta description")
            print(f"  {path}: {ms:.0f}ms title='{title[:60]}'")

        # ── 2. Legacy redirects ─────────────────────────────────────────
        print("== Redirects ==")
        for src, dest in REDIRECTS:
            await page.goto(f"{BASE_URL}{src}", wait_until="domcontentloaded")
            if page.url.rstrip("/").endswith(dest):
                ok(f"{src} redirects to {dest}")
            else:
                bad(f"{src} landed on {page.url} (expected {dest})")

        # ── 3. SEO files ────────────────────────────────────────────────
        print("== SEO files ==")
        for f in ["/sitemap.xml", "/robots.txt"]:
            resp = await page.request.get(f"{BASE_URL}{f}")
            if resp.status == 200:
                ok(f"{f} -> 200")
            else:
                bad(f"{f} -> {resp.status}")

        # ── 4. Key interactions ─────────────────────────────────────────
        print("== Interactions ==")
        # Homepage hero search
        await page.goto(BASE_URL, wait_until="domcontentloaded")
        try:
            btn = page.get_by_role("button", name=re.compile(r"Search Properties|ค้นหาทรัพย์"))
            await btn.first.click()
            await page.wait_for_url(re.compile(r"/properties"), timeout=10000)
            ok("hero search navigates to /properties")
        except Exception as e:
            bad(f"hero search failed: {str(e)[:120]}")

        # Blog filters visible
        await page.goto(f"{BASE_URL}/blog", wait_until="domcontentloaded")
        try:
            vis = await page.get_by_test_id("blog-filters").is_visible()
            ok("blog filters visible") if vis else bad("blog filters not visible")
        except Exception:
            bad("blog-filters testid missing")

        # Contact form fields present
        await page.goto(f"{BASE_URL}/contact", wait_until="domcontentloaded")
        for fld in ["name", "phone", "message"]:
            if await page.locator(f"#{fld}").count() == 1:
                ok(f"contact form field #{fld} present")
            else:
                bad(f"contact form field #{fld} missing")
        # Map iframe
        if await page.locator("iframe[src*='maps.google']").count() >= 1:
            ok("contact page Google Maps iframe present")
        else:
            bad("contact page Google Maps iframe missing")

        # About timeline
        await page.goto(f"{BASE_URL}/about", wait_until="domcontentloaded")
        body_text = await page.locator("body").inner_text()
        for probe in ["Our Story", "2002", "2026", "Local Market Expertise"]:
            if probe in body_text:
                ok(f"about page contains '{probe}'")
            else:
                bad(f"about page missing '{probe}'")

        # Property detail page from listing
        await page.goto(f"{BASE_URL}/properties", wait_until="domcontentloaded")
        prop_links = page.locator('a[href^="/property/"]')
        if await prop_links.count() > 0:
            href = await prop_links.first.get_attribute("href")
            status, ms = await timed_goto(page, f"{BASE_URL}{href}")
            if status == 200:
                ok(f"property detail {href} -> 200 ({ms:.0f}ms)")
            else:
                bad(f"property detail {href} -> {status}")
        else:
            bad("no property links found on /properties")

        # ── 5. Admin: login page + unauthorized redirect + timing ──────
        print("== Admin ==")
        status, ms = await timed_goto(page, f"{BASE_URL}/admin/login")
        if status == 200:
            ok(f"/admin/login -> 200 ({ms:.0f}ms)")
        else:
            bad(f"/admin/login -> {status}")
        timings["/admin/login"] = ms

        status, ms = await timed_goto(page, f"{BASE_URL}/admin/leads")
        if "/admin/login" in page.url:
            ok(f"unauthenticated /admin/leads redirected to login ({ms:.0f}ms incl. redirect)")
        else:
            bad(f"/admin/leads did NOT redirect unauthenticated user (url={page.url})")
        timings["/admin/leads (redirect)"] = ms

        # ── 6. Repeat-visit performance (warm cache) ───────────────────
        print("== Warm timings (2nd visit) ==")
        warm: dict[str, float] = {}
        for path in ["/", "/properties", "/blog", "/about", "/contact"]:
            _, ms = await timed_goto(page, f"{BASE_URL}{path}")
            warm[path] = ms
            print(f"  warm {path}: {ms:.0f}ms")

        # ── 7. API security probes ──────────────────────────────────────
        print("== API probes ==")
        r = await page.request.post(f"{BASE_URL}/api/submit-form", data={"bogus": True})
        if r.status in (400, 422):
            ok(f"/api/submit-form rejects invalid payload ({r.status})")
        else:
            bad(f"/api/submit-form unexpected status {r.status} for invalid payload")

        r = await page.request.post(f"{BASE_URL}/api/upload-images")
        if r.status in (400, 415, 422):
            ok(f"/api/upload-images rejects empty upload ({r.status})")
        else:
            bad(f"/api/upload-images unexpected status {r.status}")

        # 404 page
        r = await page.request.get(f"{BASE_URL}/this-page-does-not-exist-xyz")
        if r.status == 404:
            ok("unknown route returns 404")
        else:
            bad(f"unknown route returned {r.status}")

        await browser.close()

        # ── Report ──────────────────────────────────────────────────────
        print("\n===== SUMMARY =====")
        for line in results:
            print(line)

        print("\n===== TIMINGS (cold) =====")
        for k, v in timings.items():
            flag = " <-- SLOW" if v > 3000 else ""
            print(f"  {k}: {v:.0f}ms{flag}")
        vals = [v for v in timings.values()]
        print(f"  median: {statistics.median(vals):.0f}ms  max: {max(vals):.0f}ms")

        print("\n===== CONSOLE ERRORS =====")
        if console_errors:
            for e in console_errors[:20]:
                print(f"  {e}")
        else:
            print("  (none)")

        print("\n===== HTTP >=400 RESPONSES =====")
        if failed_requests:
            for f in failed_requests[:20]:
                print(f"  {f}")
        else:
            print("  (none)")

        print(f"\nTOTAL: {len(results)} checks, {len(issues)} failures")
        if issues:
            print("FAILURES:")
            for i in issues:
                print(f"  - {i}")


if __name__ == "__main__":
    asyncio.run(main())
