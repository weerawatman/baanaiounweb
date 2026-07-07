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
        
        # -> Click the 'ค้นหาทรัพย์ | Find Property' link to open the property listing page.
        # ค้นหาทรัพย์ Find Property link
        elem = page.get_by_role('link', name='ค้นหาทรัพย์ | Find Property', exact=True)
        await elem.click(timeout=10000)
        
        # -> Find and click a property listing link (a link to a /property/[slug] detail page) after revealing the listing area.
        await page.mouse.wheel(0, 300)
        
        # -> Click the 'ดูทรัพย์ที่มี | View Available Properties' button to open the available properties listing.
        # ค้นหาบ้าน/ปรึกษาสินเชื่อ | Find Your Home button
        elem = page.get_by_role('button', name='ค้นหาบ้าน/ปรึกษาสินเชื่อ | Find Your Home', exact=True)
        await elem.click(timeout=10000)
        
        # -> Open the property detail page at /property/test-property and check for a LINE contact action on that page.
        await page.goto("http://localhost:3100/property/test-property")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the floating 'ปรึกษาพิมฟรี' (LINE consult) button to start the LINE contact flow and observe the result.
        # ปรึกษาพิมฟรี link
        elem = page.get_by_role('link', name='ปรึกษาพิมฟรีผ่าน LINE', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the LINE contact flow is opened
        # Assert: The browser opened the LINE add-friend page URL.
        await expect(page).to_have_url(re.compile("line\\.me/ti/p/@baan\\-ai\\-oun"), timeout=15000), "The browser opened the LINE add-friend page URL."
        await page.locator("xpath=/html/body/div/header/div/div/h1/a").nth(0).scroll_into_view_if_needed()
        # Assert: The LINE site header 'LINE' is visible on the page.
        await expect(page.locator("xpath=/html/body/div/header/div/div/h1/a").nth(0)).to_be_visible(timeout=15000), "The LINE site header 'LINE' is visible on the page."
        await page.locator("xpath=/html/body/div/div/div/ul/li/a").nth(0).scroll_into_view_if_needed()
        # Assert: The 'Learn more about LINE' link is visible on the page.
        await expect(page.locator("xpath=/html/body/div/div/div/ul/li/a").nth(0)).to_be_visible(timeout=15000), "The 'Learn more about LINE' link is visible on the page."
        
        # --> Verify the user can proceed to contact sales through LINE
        # Assert: The LINE add-friend page opened at the expected URL.
        await expect(page).to_have_url(re.compile("line\\.me/ti/p/@baan\\-ai\\-oun"), timeout=15000), "The LINE add-friend page opened at the expected URL."
        # Assert: The LINE page displays the 'Learn more about LINE' link, confirming the add-friend flow loaded.
        await expect(page.locator("xpath=/html/body/div/div/div/ul/li/a").nth(0)).to_have_text("Learn more about LINE", timeout=15000), "The LINE page displays the 'Learn more about LINE' link, confirming the add-friend flow loaded."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    