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
        
        # -> Navigate to the /request page to access the property request forms.
        await page.goto("http://localhost:3100/request")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Select the property type 'บ้านเดี่ยว | Single House' from the Property Type dropdown after filling the Name and Phone fields.
        # ชื่อ-นามสกุล | Full name text field
        elem = page.locator('[id="base-ui-_R_8d8lubrivb_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("TestSprite Listing Lead")
        
        # -> Select the property type 'บ้านเดี่ยว | Single House' from the Property Type dropdown after filling the Name and Phone fields.
        # เช่น 0812345678 หรือ LINE ID | e.g. 0812345678 or... text field
        elem = page.locator('[id="base-ui-_R_8l8lubrivb_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("TestSprite Listing Contact")
        
        # -> Select the property type 'บ้านเดี่ยว | Single House' from the Property Type dropdown after filling the Name and Phone fields.
        # เลือกประเภททรัพย์ | Select property type... dropdown
        elem = page.locator("xpath=/html/body/main/main/div/div[3]/form/div[4]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Fill the 'อีเมล' (Email) field, fill the 'ทำเลที่ตั้งทรัพย์ / แลนด์มาร์คใกล้เคียง' (Property Location) field and the 'ราคาที่ต้องการขาย/ปล่อยเช่า' (Asking Price) field, then click the 'ส่งคำขอ | Submit Request' button.
        # you@example.com email field
        elem = page.locator('[id="base-ui-_R_8t8lubrivb_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("testsprite.listing@example.com")
        
        # -> Fill the 'อีเมล' (Email) field, fill the 'ทำเลที่ตั้งทรัพย์ / แลนด์มาร์คใกล้เคียง' (Property Location) field and the 'ราคาที่ต้องการขาย/ปล่อยเช่า' (Asking Price) field, then click the 'ส่งคำขอ | Submit Request' button.
        # เช่น บ้านบึง ชลบุรี ใกล้นิคมอมตะ | e.g. Ban... text field
        elem = page.locator('[id="base-ui-_R_9d8lubrivb_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Bangkok, Phrom Phong")
        
        # -> Fill the 'อีเมล' (Email) field, fill the 'ทำเลที่ตั้งทรัพย์ / แลนด์มาร์คใกล้เคียง' (Property Location) field and the 'ราคาที่ต้องการขาย/ปล่อยเช่า' (Asking Price) field, then click the 'ส่งคำขอ | Submit Request' button.
        # เช่น 2,500,000 บาท | e.g. 2,500,000 THB text field
        elem = page.locator('[id="base-ui-_R_9l8lubrivb_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("2,500,000")
        
        # -> Fill the 'อีเมล' (Email) field, fill the 'ทำเลที่ตั้งทรัพย์ / แลนด์มาร์คใกล้เคียง' (Property Location) field and the 'ราคาที่ต้องการขาย/ปล่อยเช่า' (Asking Price) field, then click the 'ส่งคำขอ | Submit Request' button.
        # ส่งคำขอ | Submit Request button
        elem = page.get_by_role('button', name='ส่งคำขอ | Submit Request', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify a bilingual success confirmation is visible
        await page.locator("xpath=/html/body/main/main/div/div[3]/div[2]/button").nth(0).scroll_into_view_if_needed()
        # Assert: The bilingual 'ส่งคำขอใหม่ | Submit Another Request' button is visible.
        await expect(page.locator("xpath=/html/body/main/main/div/div[3]/div[2]/button").nth(0)).to_be_visible(timeout=15000), "The bilingual '\u0e2a\u0e48\u0e07\u0e04\u0e33\u0e02\u0e2d\u0e43\u0e2b\u0e21\u0e48 | Submit Another Request' button is visible."
        # Assert: The button displays the bilingual label 'ส่งคำขอใหม่ | Submit Another Request'.
        await expect(page.locator("xpath=/html/body/main/main/div/div[3]/div[2]/button").nth(0)).to_have_text("\u0e2a\u0e48\u0e07\u0e04\u0e33\u0e02\u0e2d\u0e43\u0e2b\u0e21\u0e48 | Submit Another Request", timeout=15000), "The button displays the bilingual label '\u0e2a\u0e48\u0e07\u0e04\u0e33\u0e02\u0e2d\u0e43\u0e2b\u0e21\u0e48 | Submit Another Request'."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    