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
        
        # -> Open the 'ติดต่อเรา | Contact Us' page by clicking the 'Contact Us' link in the header.
        # ติดต่อเรา Contact Us link
        elem = page.get_by_role('link', name='ติดต่อเรา | Contact Us', exact=True)
        await elem.click(timeout=10000)
        
        # -> Fill the Full Name, Phone, and Email fields and select the subject 'สินเชื่อบ้าน | Home Loan Inquiry' from the Subject dropdown.
        # คุณชื่ออะไรคะ? text field
        elem = page.locator('[id="name"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("TestSprite Smith")
        
        # -> Fill the Full Name, Phone, and Email fields and select the subject 'สินเชื่อบ้าน | Home Loan Inquiry' from the Subject dropdown.
        # 0xx-xxx-xxxx tel field
        elem = page.locator('[id="phone"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("0864149960")
        
        # -> Fill the Full Name, Phone, and Email fields and select the subject 'สินเชื่อบ้าน | Home Loan Inquiry' from the Subject dropdown.
        # your@email.com email field
        elem = page.locator('[id="email"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("testsprite+contact@example.com")
        
        # -> Fill the Full Name, Phone, and Email fields and select the subject 'สินเชื่อบ้าน | Home Loan Inquiry' from the Subject dropdown.
        # เลือกหัวข้อ | Select Topic ซื้อ/เช่า | Buy / Rent... dropdown
        elem = page.locator("xpath=/html/body/main/section[2]/div/div/div/form/div[4]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Fill the Message field with a TestSprite message and click the 'ส่งข้อความ / Send Message' button.
        # บอกพิมได้เลยค่ะ ว่าสนใจซื้อ ขาย เช่า... text area
        elem = page.locator('[id="message"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("TestSprite automated test message: I am interested in the property and would like more information. Please contact me. Thank you.")
        
        # -> Fill the Message field with a TestSprite message and click the 'ส่งข้อความ / Send Message' button.
        # ส่งข้อความ / Send Message button
        elem = page.get_by_role('button', name='ส่งข้อความ / Send Message', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify a success confirmation is visible
        await page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/div/button").nth(0).scroll_into_view_if_needed()
        # Assert: The 'ส่งข้อความอีกครั้ง / Send another' button is visible, indicating a success confirmation.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/div/button").nth(0)).to_be_visible(timeout=15000), "The '\u0e2a\u0e48\u0e07\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07 / Send another' button is visible, indicating a success confirmation."
        await page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/div/svg").nth(0).scroll_into_view_if_needed()
        # Assert: The success confirmation icon is visible, indicating the message was sent.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/div/svg").nth(0)).to_be_visible(timeout=15000), "The success confirmation icon is visible, indicating the message was sent."
        
        # --> Verify the message was sent successfully
        await page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/div/button").nth(0).scroll_into_view_if_needed()
        # Assert: The 'ส่งข้อความอีกครั้ง / Send another' button is visible, indicating the message was sent successfully.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/div/button").nth(0)).to_be_visible(timeout=15000), "The '\u0e2a\u0e48\u0e07\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07 / Send another' button is visible, indicating the message was sent successfully."
        # Assert: The 'ส่งข้อความอีกครั้ง / Send another' button text exactly matches the success-state label.
        await expect(page.locator("xpath=/html/body/main/section[2]/div/div/div[1]/div/button").nth(0)).to_have_text("\u0e2a\u0e48\u0e07\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07 / Send another", timeout=15000), "The '\u0e2a\u0e48\u0e07\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07 / Send another' button text exactly matches the success-state label."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    