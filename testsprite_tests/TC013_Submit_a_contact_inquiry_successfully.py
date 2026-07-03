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
        
        # -> Click the 'ติดต่อเรา | Contact Us' link to open the contact page.
        # ติดต่อเรา | Contact Us link
        elem = page.get_by_role('link', name='ติดต่อเรา | Contact Us', exact=True)
        await elem.click(timeout=10000)
        
        # -> Fill 'Taylor Lead' into the Full Name field, '0800000000' into the Phone field, enter a message in the Message field, and click the 'ส่งข้อความ / Send Message' button.
        # คุณชื่ออะไรคะ? text field
        elem = page.locator('[id="name"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Taylor Lead")
        
        # -> Fill 'Taylor Lead' into the Full Name field, '0800000000' into the Phone field, enter a message in the Message field, and click the 'ส่งข้อความ / Send Message' button.
        # 0xx-xxx-xxxx tel field
        elem = page.locator('[id="phone"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("0800000000")
        
        # -> Fill 'Taylor Lead' into the Full Name field, '0800000000' into the Phone field, enter a message in the Message field, and click the 'ส่งข้อความ / Send Message' button.
        # บอกพิมได้เลยค่ะ ว่าสนใจซื้อ ขาย เช่า... text area
        elem = page.locator('[id="message"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Hello \u2014 I am interested in buying a property and would like more information. Please contact me at the phone number provided. Thank you.")
        
        # -> Fill 'Taylor Lead' into the Full Name field, '0800000000' into the Phone field, enter a message in the Message field, and click the 'ส่งข้อความ / Send Message' button.
        # ส่งข้อความ / Send Message button
        elem = page.get_by_role('button', name='ส่งข้อความ / Send Message', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'ส่งข้อความอีกครั้ง / Send another' button to reopen the contact form so the name, phone, and message fields can be inspected for reset.
        # ส่งข้อความอีกครั้ง / Send another button
        elem = page.get_by_role('button', name='ส่งข้อความอีกครั้ง / Send another', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the form is reset
        # Assert: Full Name field is empty after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/form/div[1]/input").nth(0)).to_have_value("", timeout=15000), "Full Name field is empty after the form reset."
        # Assert: Phone field is empty after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/form/div[2]/input").nth(0)).to_have_value("", timeout=15000), "Phone field is empty after the form reset."
        # Assert: Message field is empty after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/form/div[5]/textarea").nth(0)).to_have_value("", timeout=15000), "Message field is empty after the form reset."
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
    