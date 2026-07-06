"""
Phase 6 — About mission copy + Course JSON-LD on agent-course
  set TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app
  python testsprite_tests/TC024_TestSprite_about_course_phase6.py
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

        await page.goto(f"{BASE_URL}/about")
        await expect(page.get_by_text("investor-led expertise")).to_be_visible()

        about_ld = await page.locator('script[type="application/ld+json"]').first.inner_text()
        assert "LocalBusiness" in about_ld

        await page.goto(f"{BASE_URL}/agent-course")
        course_ld = await page.locator('script[type="application/ld+json"]').first.inner_text()
        assert '"@type": "Course"' in course_ld or '"@type":"Course"' in course_ld

        await browser.close()
        print(f"PASS — Phase 6 about + course verified on {BASE_URL}")


if __name__ == "__main__":
    asyncio.run(run_test())
