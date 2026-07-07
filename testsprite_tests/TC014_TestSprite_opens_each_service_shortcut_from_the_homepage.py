import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:3100")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'ฝากขาย/ปล่อยเช่า | List Your Property' service shortcut on the homepage.
        # ฝากขาย/ปล่อยเช่า | List Your Property link
        elem = page.get_by_role('link', name='ฝากขาย/ปล่อยเช่า | List Your Property', exact=True)
        await elem.click(timeout=10000)
        
        # -> Navigate to the homepage (Home) so the agent training/course shortcut can be clicked.
        await page.goto("http://localhost:3100/")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'สมัครคอร์สนายหน้า | Join Our Agent Course' service shortcut on the homepage.
        # สมัครคอร์สนายหน้า Join Our Agent Course link
        elem = page.get_by_role('link', name='สมัครคอร์สนายหน้า Join Our Agent Course', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the agent course page is displayed
        # Assert: The URL contains 'agent-course', confirming the agent course page is displayed.
        await expect(page).to_have_url(re.compile("agent\\-course"), timeout=15000), "The URL contains 'agent-course', confirming the agent course page is displayed."
        current_url = await page.evaluate("() => window.location.href")
        # Assert: page loaded with a URL (final outcome verified by the AI judge during the run)
        assert current_url, 'Page should have loaded with a URL'
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    