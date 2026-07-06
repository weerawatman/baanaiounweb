"""
Phase 3 — Success stories before/after slider on homepage
Run against Vercel:

  set TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app
  python testsprite_tests/TC021_TestSprite_success_stories_phase3.py
"""

import asyncio
import os

from playwright.async_api import async_playwright, expect

BASE_URL = os.environ.get("TESTSPRITE_BASE_URL", "https://baanaiounweb.vercel.app").rstrip("/")


async def run_test() -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True, args=["--disable-dev-shm-usage"])
        context = await browser.new_context()
        context.set_default_timeout(20000)
        page = await context.new_page()

        await page.goto(BASE_URL)

        section = page.get_by_test_id("success-stories-section")
        await expect(section).to_be_visible()

        await expect(section.get_by_text("Real Results: Before & After Renovations")).to_be_visible()

        slider = section.get_by_test_id("before-after-slider")
        await expect(slider).to_be_visible()
        await expect(slider.get_by_text("Before | ก่อน")).to_be_visible()
        await expect(slider.get_by_text("After | หลัง")).to_be_visible()

        await browser.close()
        print(f"PASS — Phase 3 success stories verified on {BASE_URL}")


if __name__ == "__main__":
    asyncio.run(run_test())
