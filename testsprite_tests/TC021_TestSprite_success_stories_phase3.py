"""
Phase 3 — Homepage trust section (แทนที่ social proof slider เดิมตามดีไซน์ใหม่)
  set TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app
  python testsprite_tests/TC021_TestSprite_success_stories_phase3.py
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
            page.get_by_role("heading", name=re.compile(r"Trusted by Our Clients"))
        ).to_be_visible()

        for probe in ["Renovation Expert", "Professional Network", "Property Shopper"]:
            await expect(page.get_by_text(probe)).to_be_visible()

        await browser.close()
        print(f"PASS — Phase 3 homepage trust section verified on {BASE_URL}")


if __name__ == "__main__":
    asyncio.run(run_test())
