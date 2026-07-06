"""
Phase 2 — Homepage hero search, CTAs, service cards, ecosystem band
Run against Vercel preview:

  set TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app
  python testsprite_tests/TC020_TestSprite_homepage_phase2.py
"""

import asyncio
import os
import re

from playwright.async_api import async_playwright, expect

BASE_URL = os.environ.get("TESTSPRITE_BASE_URL", "https://baanaiounweb.vercel.app").rstrip("/")


async def run_test() -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True, args=["--disable-dev-shm-usage"])
        context = await browser.new_context()
        context.set_default_timeout(20000)
        page = await context.new_page()

        await page.goto(BASE_URL)
        await expect(
            page.get_by_role("heading", level=1, name=re.compile(r"นักลงทุน|investors"))
        ).to_be_visible()

        await expect(
            page.get_by_role("link", name=re.compile(r"Find Your Perfect Match")).first
        ).to_be_visible()

        await expect(page.get_by_text("Join Our Ecosystem")).to_be_visible()

        search = page.get_by_placeholder(re.compile(r"Search area|project, keyword"))
        await expect(search.first).to_be_visible()
        await search.first.fill("บ้านบึง")
        await page.get_by_role("button", name=re.compile(r"Search Properties")).click()
        await page.wait_for_url(re.compile(r"/properties\?.*query="))
        assert "query=" in page.url

        await page.goto(BASE_URL)
        await page.get_by_role("link", name=re.compile(r"Find Your Perfect Match")).first.click()
        await page.wait_for_url(re.compile(r"/find-property"))

        await browser.close()
        print(f"PASS — Phase 2 homepage verified on {BASE_URL}")


if __name__ == "__main__":
    asyncio.run(run_test())
