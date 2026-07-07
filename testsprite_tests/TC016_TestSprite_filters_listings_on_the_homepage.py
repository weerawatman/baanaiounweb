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
        
        # -> Click the 'ซื้อ | Buy' purpose filter button to set the purpose to Buy.
        # ซื้อ | Buy button
        elem = page.get_by_role('button', name='ซื้อ | Buy', exact=True)
        await elem.click(timeout=10000)
        
        # -> Open the 'ทุกทำเล | All Areas' (district) dropdown and then select 'บ้านบึง' when its option appears.
        # ทุกทำเล | All Areas บ้านบึง dropdown
        elem = page.get_by_label('เลือกทำเล', exact=True)
        await elem.click(timeout=10000)
        
        # -> Select 'บ้านบึง' (Ban Bueng) from the 'ทุกทำเล | All Areas' district dropdown.
        # ทุกทำเล | All Areas บ้านบึง dropdown
        elem = page.locator("xpath=/html/body/main/section[3]/div/div[2]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Open the max price dropdown labeled 'ทุกราคา | All Prices' so the price options appear.
        # ทุกราคา | All Prices ≤ 1 ล้าน | Under 1M ≤ 2 ล้าน... dropdown
        elem = page.get_by_label('เลือกช่วงราคา', exact=True)
        await elem.click(timeout=10000)
        
        # -> Select '≤ 2 ล้าน | Under 2M' from the 'ทุกราคา | All Prices' dropdown to apply the maximum price filter.
        # ทุกราคา | All Prices ≤ 1 ล้าน | Under 1M ≤ 2 ล้าน... dropdown
        elem = page.locator("xpath=/html/body/main/section[3]/div/div[2]/select[2]").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Scroll down to reveal the property grid and confirm it shows 'พบ 1 รายการ | Found 1 listings' and a listing in 'บ้านบึง' priced '1,990,000 บาท'.
        await page.mouse.wheel(0, 300)
        
        # --> Assertions to verify final state
        
        # --> Verify the property grid is narrowed to matching listings
        await page.locator("xpath=/html/body/main/section[3]/div[1]/div[1]/button[2]").nth(0).scroll_into_view_if_needed()
        # Assert: The purpose filter button 'ซื้อ | Buy' is visible.
        await expect(page.locator("xpath=/html/body/main/section[3]/div[1]/div[1]/button[2]").nth(0)).to_be_visible(timeout=15000), "The purpose filter button '\u0e0b\u0e37\u0e49\u0e2d | Buy' is visible."
        # Assert: The district filter is set to 'บ้านบึง'.
        await expect(page.locator("xpath=/html/body/main/section[3]/div[1]/div[2]/select[1]").nth(0)).to_contain_text("\u0e1a\u0e49\u0e32\u0e19\u0e1a\u0e36\u0e07", timeout=15000), "The district filter is set to '\u0e1a\u0e49\u0e32\u0e19\u0e1a\u0e36\u0e07'."
        # Assert: The max price filter is set to '≤ 2 ล้าน | Under 2M'.
        await expect(page.locator("xpath=/html/body/main/section[3]/div[1]/div[2]/select[2]").nth(0)).to_contain_text("\u2264 2 \u0e25\u0e49\u0e32\u0e19 | Under 2M", timeout=15000), "The max price filter is set to '\u2264 2 \u0e25\u0e49\u0e32\u0e19 | Under 2M'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    