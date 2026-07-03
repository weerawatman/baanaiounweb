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
        
        # -> Click the 'ติดต่อเรา | Contact Us' link in the header to open the contact page.
        # ติดต่อเรา | Contact Us link
        elem = page.get_by_role('link', name='ติดต่อเรา | Contact Us', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'ติดต่อเรา | Contact Us' link in the header to open the contact page.
        # ติดต่อเรา | Contact Us link
        elem = page.get_by_role('link', name='ติดต่อเรา | Contact Us', exact=True)
        await elem.click(timeout=10000)
        
        # -> Open the 'หัวข้อ / Subject' dropdown
        # เลือกหัวข้อ | Select Topic ซื้อ/เช่า | Buy / Rent... dropdown
        elem = page.locator('[id="subject"]')
        await elem.click(timeout=10000)
        
        # -> Select 'ซื้อ/เช่า | Buy / Rent Property' (value = buy) from the 'หัวข้อ / Subject' dropdown and wait for the form to update.
        # เลือกหัวข้อ | Select Topic ซื้อ/เช่า | Buy / Rent... dropdown
        elem = page.locator("xpath=/html/body/main/section[2]/div/div/div/form/div[4]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Fill the 'Full Name', 'Phone', and 'Email' fields with valid values then enter a message and click the 'ส่งข้อความ / Send Message' button.
        # คุณชื่ออะไรคะ? text field
        elem = page.locator('[id="name"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Test User")
        
        # -> Fill the 'Full Name', 'Phone', and 'Email' fields with valid values then enter a message and click the 'ส่งข้อความ / Send Message' button.
        # 0xx-xxx-xxxx tel field
        elem = page.locator('[id="phone"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("086-123-4567")
        
        # -> Fill the 'Full Name', 'Phone', and 'Email' fields with valid values then enter a message and click the 'ส่งข้อความ / Send Message' button.
        # your@email.com email field
        elem = page.locator('[id="email"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("test.user@example.com")
        
        # -> Fill the 'Full Name', 'Phone', and 'Email' fields with valid values then enter a message and click the 'ส่งข้อความ / Send Message' button.
        # บอกพิมได้เลยค่ะ ว่าสนใจซื้อ ขาย เช่า... text area
        elem = page.locator('[id="message"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("I am interested in buying a property. Please contact me with details.")
        
        # -> Fill the 'Full Name', 'Phone', and 'Email' fields with valid values then enter a message and click the 'ส่งข้อความ / Send Message' button.
        # ส่งข้อความ / Send Message button
        elem = page.get_by_role('button', name='ส่งข้อความ / Send Message', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'ส่งข้อความอีกครั้ง / Send another' button to reopen the contact form and verify the fields are cleared.
        # ส่งข้อความอีกครั้ง / Send another button
        elem = page.get_by_role('button', name='ส่งข้อความอีกครั้ง / Send another', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the form is reset
        # Assert: Full Name field is cleared.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/form/div[1]/input").nth(0)).to_have_value("", timeout=15000), "Full Name field is cleared."
        # Assert: Phone field is cleared.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/form/div[2]/input").nth(0)).to_have_value("", timeout=15000), "Phone field is cleared."
        # Assert: Email field is cleared.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/form/div[3]/input").nth(0)).to_have_value("", timeout=15000), "Email field is cleared."
        # Assert: Subject dropdown shows the default 'เลือกหัวข้อ | Select Topic' option.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/form/div[4]/select").nth(0)).to_contain_text("\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e2b\u0e31\u0e27\u0e02\u0e49\u0e2d | Select Topic", timeout=15000), "Subject dropdown shows the default '\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e2b\u0e31\u0e27\u0e02\u0e49\u0e2d | Select Topic' option."
        # Assert: Message field is cleared.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/form/div[5]/textarea").nth(0)).to_have_value("", timeout=15000), "Message field is cleared."
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
    