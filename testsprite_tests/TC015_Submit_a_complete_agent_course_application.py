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
        
        # -> Click the 'สมัครคอร์สนายหน้า' link to open the agent course application form.
        # สมัครคอร์สนายหน้า link
        elem = page.get_by_role('link', name='สมัครคอร์สนายหน้า', exact=True)
        await elem.click(timeout=10000)
        
        # -> Scroll down to reveal the application form on the 'คอร์สนายหน้า | Agent Course' page.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll down to reveal the application form on the 'คอร์สนายหน้า | Agent Course' page so all visible form fields can be observed.
        await page.mouse.wheel(0, 300)
        
        # -> Click the 'สมัครคอร์สพลิกชีวิต | Register Now' button to open the agent course application form so all visible fields can be observed.
        # สมัครคอร์สพลิกชีวิต | Register Now button
        elem = page.get_by_role('button', name='สมัครคอร์สพลิกชีวิต | Register Now', exact=True)
        await elem.click(timeout=10000)
        
        # -> Fill all visible form fields: 'ชื่อ-นามสกุล | Full Name', 'เบอร์โทรศัพท์ | Phone', 'ไอดีไลน์ | LINE ID', 'อาชีพปัจจุบัน | Current Occupation', and 'เป้าหมายที่อยากได้จากคอร์ส (WHY ของคุณ) | Your Goal (WHY)' with valid values.
        # ชื่อ-นามสกุลของคุณ | Your name text field
        elem = page.locator('[id="base-ui-_r_0_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Somchai Jaidee")
        
        # -> Fill all visible form fields: 'ชื่อ-นามสกุล | Full Name', 'เบอร์โทรศัพท์ | Phone', 'ไอดีไลน์ | LINE ID', 'อาชีพปัจจุบัน | Current Occupation', and 'เป้าหมายที่อยากได้จากคอร์ส (WHY ของคุณ) | Your Goal (WHY)' with valid values.
        # 0812345678 tel field
        elem = page.locator('[id="base-ui-_r_1_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("0912345678")
        
        # -> Fill all visible form fields: 'ชื่อ-นามสกุล | Full Name', 'เบอร์โทรศัพท์ | Phone', 'ไอดีไลน์ | LINE ID', 'อาชีพปัจจุบัน | Current Occupation', and 'เป้าหมายที่อยากได้จากคอร์ส (WHY ของคุณ) | Your Goal (WHY)' with valid values.
        # LINE ID (เพื่อประสานงานรวดเร็ว) text field
        elem = page.locator('[id="base-ui-_r_2_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("somchai_line")
        
        # -> Fill all visible form fields: 'ชื่อ-นามสกุล | Full Name', 'เบอร์โทรศัพท์ | Phone', 'ไอดีไลน์ | LINE ID', 'อาชีพปัจจุบัน | Current Occupation', and 'เป้าหมายที่อยากได้จากคอร์ส (WHY ของคุณ) | Your Goal (WHY)' with valid values.
        # เช่น พนักงานออฟฟิศ, รับจ้างทั่วไป | e.g. Office... text field
        elem = page.locator('[id="base-ui-_r_3_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Office worker")
        
        # -> Fill all visible form fields: 'ชื่อ-นามสกุล | Full Name', 'เบอร์โทรศัพท์ | Phone', 'ไอดีไลน์ | LINE ID', 'อาชีพปัจจุบัน | Current Occupation', and 'เป้าหมายที่อยากได้จากคอร์ส (WHY ของคุณ) | Your Goal (WHY)' with valid values.
        # เช่น อยากมีรายได้เสริมเพื่อเก็บเงินทำค่าเทอมลูก |... text area
        elem = page.get_by_placeholder("เช่น อยากมีรายได้เสริมเพื่อเก็บเงินทำค่าเทอมลูก | e.g. Want extra income for kids' tuition", exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Want extra income to save for my child's tuition.")
        
        # -> Click the 'สมัครคอร์สพลิกชีวิต | Register Now' button to submit the application form and then verify a success confirmation and that the form is reset.
        # สมัครคอร์สพลิกชีวิต | Register Now button
        elem = page.get_by_role('button', name='สมัครคอร์สพลิกชีวิต | Register Now', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'กรอกฟอร์มใหม่ | Submit New Form' button to reset and reopen the application form.
        # กรอกฟอร์มใหม่ | Submit New Form button
        elem = page.get_by_role('button', name='กรอกฟอร์มใหม่ | Submit New Form', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the form is reset
        # Assert: The Full Name field is cleared.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/div/div[1]/input").nth(0)).to_have_value("", timeout=15000), "The Full Name field is cleared."
        # Assert: The Phone field is cleared.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/div/div[2]/input").nth(0)).to_have_value("", timeout=15000), "The Phone field is cleared."
        # Assert: The LINE ID field is cleared.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/div/div[3]/input").nth(0)).to_have_value("", timeout=15000), "The LINE ID field is cleared."
        # Assert: The Current Occupation field is cleared.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/div/div[4]/input").nth(0)).to_have_value("", timeout=15000), "The Current Occupation field is cleared."
        # Assert: The Goal (WHY) textarea is cleared.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/div/div[5]/textarea").nth(0)).to_have_value("", timeout=15000), "The Goal (WHY) textarea is cleared."
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
    