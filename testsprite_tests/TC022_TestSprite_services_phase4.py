"""
Phase 4 — Services hub: 4-column grid, stats, LINE free consultation CTA
  set TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app
  python testsprite_tests/TC022_TestSprite_services_phase4.py
"""

import asyncio
import os

from playwright.async_api import async_playwright, expect

BASE_URL = os.environ.get("TESTSPRITE_BASE_URL", "https://baanaiounweb.vercel.app").rstrip("/")


async def run_test() -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True, args=["--disable-dev-shm-usage"])
        context = await browser.new_context(viewport={"width": 1280, "height": 800})
        context.set_default_timeout(20000)
        page = await context.new_page()

        await page.goto(f"{BASE_URL}/services")

        await expect(page.get_by_test_id("services-stats-bar")).to_be_visible()
        grid = page.get_by_test_id("services-four-column-grid")
        await expect(grid).to_be_visible()
        await expect(grid.locator("a")).to_have_count(4)

        await expect(page.get_by_test_id("services-line-cta")).to_be_visible()
        href = await page.get_by_test_id("services-line-cta").get_attribute("href")
        assert href and "line.me" in href

        await browser.close()
        print(f"PASS — Phase 4 services verified on {BASE_URL}")


if __name__ == "__main__":
    asyncio.run(run_test())
