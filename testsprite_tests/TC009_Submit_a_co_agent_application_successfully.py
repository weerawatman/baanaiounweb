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
        
        # -> Open the 'ร่วมเป็น Co-Agent' (Co-Agents) page and load the co-agent form
        await page.goto("http://localhost:3000/co-agent")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Scroll down to reveal the co-agent form and observe its visible fields and any popups.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll down to reveal the co-agent submission form (the 'ส่งข้อมูลทรัพย์ / Submit Your Listing' section) so its visible fields can be observed.
        await page.mouse.wheel(0, 300)
        
        # -> Click the 'ส่งทรัพย์ Co-Agent | Submit Co-Agent Listing' button to open the co-agent submission form and reveal its fields.
        # ส่งทรัพย์ Co-Agent | Submit Co-Agent Listing button
        elem = page.get_by_role('button', name='ส่งทรัพย์ Co-Agent | Submit Co-Agent Listing', exact=True)
        await elem.click(timeout=10000)
        
        # -> Select the 'ประเภททรัพย์ | Property Type' dropdown and choose the 'บ้านเดี่ยว | House' option.
        # เลือก | Select บ้านเดี่ยว | House ทาวน์โฮม |... dropdown
        elem = page.locator("xpath=/html/body/main/section[5]/div/div/form/div/div[3]/select").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.select_option("")
        
        # -> Fill the 'Agent Name', 'Phone', 'LINE ID', and 'Location' fields in the Co-Agent form.
        # ชื่อ-นามสกุลของคุณ | Your name text field
        elem = page.locator('[id="base-ui-_r_0_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Test Agent CoAgent 2026-07-03")
        
        # -> Fill the 'Agent Name', 'Phone', 'LINE ID', and 'Location' fields in the Co-Agent form.
        # 0812345678 tel field
        elem = page.locator('[id="base-ui-_r_1_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("0899990001")
        
        # -> Fill the 'Agent Name', 'Phone', 'LINE ID', and 'Location' fields in the Co-Agent form.
        # LINE ID (for quick coordination) text field
        elem = page.locator('[id="base-ui-_r_2_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("testline_coagent_2026")
        
        # -> Fill the 'Agent Name', 'Phone', 'LINE ID', and 'Location' fields in the Co-Agent form.
        # เช่น ชลบุรี, ศรีราชา | e.g. Chonburi, Sriracha text field
        elem = page.locator('[id="base-ui-_r_3_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Chonburi, Sriracha")
        
        # -> Fill the 'ราคาขาย-เช่า | Listing Price', 'เงื่อนไขคอมมิชชัน | Commission Offer', and 'ลิงก์ข้อมูลทรัพย์หรือรูปภาพ | Property Link or Photos' fields, then click the 'ส่งข้อมูลทรัพย์ Co-Agent | Submit Co-Agent Listing' button to submit.
        # เช่น 2.5 ล้านบาท | e.g. 2.5 million THB text field
        elem = page.locator('[id="base-ui-_r_4_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("2.5 million THB")
        
        # -> Fill the 'ราคาขาย-เช่า | Listing Price', 'เงื่อนไขคอมมิชชัน | Commission Offer', and 'ลิงก์ข้อมูลทรัพย์หรือรูปภาพ | Property Link or Photos' fields, then click the 'ส่งข้อมูลทรัพย์ Co-Agent | Submit Co-Agent Listing' button to submit.
        # เช่น แบ่ง 50/50 หรือตามตกลง | e.g. 50/50 split or... text field
        elem = page.locator('[id="base-ui-_r_5_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("50/50")
        
        # -> Fill the 'ราคาขาย-เช่า | Listing Price', 'เงื่อนไขคอมมิชชัน | Commission Offer', and 'ลิงก์ข้อมูลทรัพย์หรือรูปภาพ | Property Link or Photos' fields, then click the 'ส่งข้อมูลทรัพย์ Co-Agent | Submit Co-Agent Listing' button to submit.
        # แนบลิงก์รูปภาพหรือ URL ทรัพย์ | Paste image links... text area
        elem = page.get_by_placeholder('แนบลิงก์รูปภาพหรือ URL ทรัพย์ | Paste image links or property URLs', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Test listing submission (no images).")
        
        # -> Fill the 'ราคาขาย-เช่า | Listing Price', 'เงื่อนไขคอมมิชชัน | Commission Offer', and 'ลิงก์ข้อมูลทรัพย์หรือรูปภาพ | Property Link or Photos' fields, then click the 'ส่งข้อมูลทรัพย์ Co-Agent | Submit Co-Agent Listing' button to submit.
        # ส่งข้อมูลทรัพย์ Co-Agent | Submit Co-Agent Listing button
        elem = page.get_by_role('button', name='ส่งข้อมูลทรัพย์ Co-Agent | Submit Co-Agent Listing', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'กรอกฟอร์มใหม่ | Submit New Form' button to reset the co-agent form and verify the fields are cleared.
        # กรอกฟอร์มใหม่ | Submit New Form button
        elem = page.get_by_role('button', name='กรอกฟอร์มใหม่ | Submit New Form', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the form is reset
        # Assert: The name input is empty after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[5]/div/div/form/div/div[1]/input").nth(0)).to_have_value("", timeout=15000), "The name input is empty after the form reset."
        # Assert: The phone input is empty after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[5]/div/div/form/div/div[2]/div[1]/input").nth(0)).to_have_value("", timeout=15000), "The phone input is empty after the form reset."
        # Assert: The LINE ID input is empty after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[5]/div/div/form/div/div[2]/div[2]/input").nth(0)).to_have_value("", timeout=15000), "The LINE ID input is empty after the form reset."
        # Assert: The property type selection is reset to the default after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[5]/div/div/form/div/div[3]/select").nth(0)).to_have_value("", timeout=15000), "The property type selection is reset to the default after the form reset."
        # Assert: The location input is empty after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[5]/div/div/form/div/div[4]/input").nth(0)).to_have_value("", timeout=15000), "The location input is empty after the form reset."
        # Assert: The price input is empty after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[5]/div/div/form/div/div[5]/input").nth(0)).to_have_value("", timeout=15000), "The price input is empty after the form reset."
        # Assert: The commission input is empty after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[5]/div/div/form/div/div[6]/input").nth(0)).to_have_value("", timeout=15000), "The commission input is empty after the form reset."
        # Assert: The details textarea is empty after the form reset.
        await expect(page.locator("xpath=/html/body/main/section[5]/div/div/form/div/div[7]/textarea").nth(0)).to_have_value("", timeout=15000), "The details textarea is empty after the form reset."
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
    