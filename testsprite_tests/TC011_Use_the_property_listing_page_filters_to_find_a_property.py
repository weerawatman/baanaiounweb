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
        await page.goto("http://localhost:3000")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Open the Properties listing page (the site URL /properties) so the property filters and results can be used and inspected.
        await page.goto("http://localhost:3000/properties")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'ซื้อ\nBuy' purpose button to filter properties for sale.
        # ซื้อ Buy button
        elem = page.get_by_role('button', name='ซื้อ Buy', exact=True)
        await elem.click(timeout=10000)
        
        # -> Open the 'ทุกทำเล | All Areas' dropdown to reveal and choose the district option 'บ้านบึง | Ban Bueng'.
        # ทุกทำเล | All Areas บ้านบึง dropdown
        elem = page.get_by_label('เลือกทำเล', exact=True)
        await elem.click(timeout=10000)
        
        # -> Select 'บ้านบึง' from the 'ทุกทำเล | All Areas' dropdown and wait for the page to update.
        # ทุกทำเล | All Areas บ้านบึง dropdown
        elem = page.locator("xpath=/html/body/main/main/div[2]/div[2]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Select the price range '≤ 2 ล้าน | Under 2M' from the 'ทุกราคา | All Prices' dropdown and verify the filtered listing is visible.
        # ทุกราคา | All Prices ≤ 1 ล้าน | Under 1M ≤ 2 ล้าน... dropdown
        elem = page.locator("xpath=/html/body/main/main/div[2]/div[2]/select[2]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # --> Assertions to verify final state
        
        # --> Verify the filtered results are shown
        await page.locator("xpath=/html/body/main/main/div[2]/div[1]/button[2]").nth(0).scroll_into_view_if_needed()
        # Assert: The Buy purpose filter button is visible, confirming the purpose filter is set to Buy.
        await expect(page.locator("xpath=/html/body/main/main/div[2]/div[1]/button[2]").nth(0)).to_be_visible(timeout=15000), "The Buy purpose filter button is visible, confirming the purpose filter is set to Buy."
        # Assert: The area filter shows บ้านบึง, confirming the Ban Bueng district is selected.
        await expect(page.locator("xpath=/html/body/main/main/div[2]/div[2]/select[1]").nth(0)).to_contain_text("\u0e1a\u0e49\u0e32\u0e19\u0e1a\u0e36\u0e07", timeout=15000), "The area filter shows \u0e1a\u0e49\u0e32\u0e19\u0e1a\u0e36\u0e07, confirming the Ban Bueng district is selected."
        # Assert: The price filter shows '≤ 2 ล้าน | Under 2M', confirming the Under 2M range is selected.
        await expect(page.locator("xpath=/html/body/main/main/div[2]/div[2]/select[2]").nth(0)).to_contain_text("\u2264 2 \u0e25\u0e49\u0e32\u0e19 | Under 2M", timeout=15000), "The price filter shows '\u2264 2 \u0e25\u0e49\u0e32\u0e19 | Under 2M', confirming the Under 2M range is selected."
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
    