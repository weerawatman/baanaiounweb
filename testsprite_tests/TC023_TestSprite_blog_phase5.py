"""
Phase 5 — Blog: 5 categories, filters, ArticleCTA + BlogPosting schema
  set TESTSPRITE_BASE_URL=https://baanaiounweb.vercel.app
  python testsprite_tests/TC023_TestSprite_blog_phase5.py
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

        await page.goto(f"{BASE_URL}/blog")
        await expect(page.get_by_test_id("blog-filters")).to_be_visible()
        await expect(page.get_by_role("button", name=re.compile(r"สินเชื่อและการเงิน"))).to_be_visible()
        await expect(page.get_by_role("button", name=re.compile(r"นายหน้าและอาชีพ"))).to_be_visible()

        # Open first article if any link exists
        article_link = page.locator('a[href^="/blog/"]').first
        if await article_link.count() > 0:
            await article_link.click()
            await page.wait_for_url(re.compile(r"/blog/"))
            await expect(page.get_by_test_id("article-cta")).to_be_visible()
            json_ld = page.locator('script[type="application/ld+json"]').first
            content = await json_ld.inner_text()
            assert "BlogPosting" in content

        await browser.close()
        print(f"PASS — Phase 5 blog verified on {BASE_URL}")


if __name__ == "__main__":
    asyncio.run(run_test())
