"""
Phase 1 — /find-property Property Match (above-fold form)
Run against Vercel preview:

  set TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app
  python testsprite_tests/TC004_TestSprite_submits_property_match_from_find_property.py
"""

import asyncio
import os
import re

from playwright.async_api import async_playwright, expect

BASE_URL = os.environ.get("TESTSPRITE_BASE_URL", "https://baanaiounweb.vercel.app").rstrip("/")


async def run_test() -> None:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(
            headless=True,
            args=["--disable-dev-shm-usage"],
        )
        context = await browser.new_context()
        context.set_default_timeout(20000)
        page = await context.new_page()

        # Homepage nav uses the renamed Property Match label
        await page.goto(BASE_URL)
        await expect(page.get_by_role("link", name=re.compile(r"งานหาทรัพย์")).first).to_be_visible()

        # /find-property shows the matchmaking form above the fold (no CTA click)
        await page.goto(f"{BASE_URL}/find-property")
        await expect(page.get_by_role("heading", name=re.compile(r"งานหาทรัพย์|Property Match"))).to_be_visible()
        await expect(page.locator('input[name="name"]')).to_be_visible()
        await expect(page.locator('input[name="email"]')).to_be_visible()
        await expect(page.locator('select[name="propertyType"]')).to_be_visible()

        await page.locator('input[name="name"]').fill("TestSprite Property Match Lead")
        await page.locator('input[name="phone"]').fill("0812345678")
        await page.locator('input[name="email"]').fill("testsprite.match@example.com")
        await page.locator('select[name="propertyType"]').select_option(label=re.compile(r"บ้านเดี่ยว|Single House"))
        await page.locator('input[name="location"]').fill("บ้านบึง ชลบุรี | Ban Bueng, Chonburi")
        await page.locator('input[name="budget"]').fill("2,500,000 THB")

        await page.get_by_role("button", name=re.compile(r"ส่งคำขอ|Submit Request")).click()

        await expect(page.get_by_text(re.compile(r"ส่งคำขอเรียบร้อยแล้ว|Your request has been sent"))).to_be_visible(
            timeout=20000,
        )

        await browser.close()
        print(f"PASS — Phase 1 Property Match verified on {BASE_URL}")


if __name__ == "__main__":
    asyncio.run(run_test())
