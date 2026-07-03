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
        
        # -> Click the 'สมัครคอร์สนายหน้า' (Apply for Agent Course) link to open the agent course application page.
        # สมัครคอร์สนายหน้า link
        elem = page.get_by_role('link', name='สมัครคอร์สนายหน้า', exact=True)
        await elem.click(timeout=10000)
        
        # -> Scroll down the Agent Course page and locate the application form fields (look for labels like 'ชื่อ', 'เบอร์โทร', 'อีเมล') and the submit button (labels such as 'ส่ง' or 'สมัคร').
        await page.mouse.wheel(0, 300)
        
        # -> Scroll down to reveal the application form and locate the fields with labels 'ชื่อ', 'อีเมล', and 'เบอร์โทร' and the submit button (labels like 'ส่ง' or 'สมัคร').
        await page.mouse.wheel(0, 300)
        
        # -> Scroll up to reveal the agent course application form and locate the visible labels 'ชื่อ', 'อีเมล', and the submit button text (e.g., 'สมัคร' or 'ส่ง').
        await page.mouse.wheel(0, 300)
        
        # -> Scroll down the Agent Course page to reveal the application form and locate the visible labels 'ชื่อ', 'อีเมล', and the submit button text 'สมัคร' (or 'ส่ง').
        await page.mouse.wheel(0, 300)
        
        # -> Open the registration form by clicking the 'สมัครคอร์สพลิกชีวิต | Register Now' button so the form fields can be observed.
        # สมัครคอร์สพลิกชีวิต | Register Now button
        elem = page.get_by_role('button', name='สมัครคอร์สพลิกชีวิต | Register Now', exact=True)
        await elem.click(timeout=10000)
        
        # -> Submit the 'สมัครคอร์สพลิกชีวิต | Register Now' form with required fields missing (leave 'ชื่อ-นามสกุล' and 'ไอดีไลน์' empty) and observe validation feedback.
        # ชื่อ-นามสกุลของคุณ | Your name text field
        elem = page.locator('[id="base-ui-_r_0_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("")
        
        # -> Submit the 'สมัครคอร์สพลิกชีวิต | Register Now' form with required fields missing (leave 'ชื่อ-นามสกุล' and 'ไอดีไลน์' empty) and observe validation feedback.
        # LINE ID (เพื่อประสานงานรวดเร็ว) text field
        elem = page.locator('[id="base-ui-_r_2_"]')
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("")
        
        # -> Submit the 'สมัครคอร์สพลิกชีวิต | Register Now' form with required fields missing (leave 'ชื่อ-นามสกุล' and 'ไอดีไลน์' empty) and observe validation feedback.
        # สมัครคอร์สพลิกชีวิต | Register Now button
        elem = page.get_by_role('button', name='สมัครคอร์สพลิกชีวิต | Register Now', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify validation feedback is visible
        await page.locator("xpath=/html/body/main/section[7]/div/div/form/div[1]/div[1]/p/svg").nth(0).scroll_into_view_if_needed()
        # Assert: Validation feedback icon for 'ชื่อ-นามสกุล' (Full Name) is visible.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/div[1]/div[1]/p/svg").nth(0)).to_be_visible(timeout=15000), "Validation feedback icon for '\u0e0a\u0e37\u0e48\u0e2d-\u0e19\u0e32\u0e21\u0e2a\u0e01\u0e38\u0e25' (Full Name) is visible."
        await page.locator("xpath=/html/body/main/section[7]/div/div/form/div[1]/div[2]/p/svg").nth(0).scroll_into_view_if_needed()
        # Assert: Validation feedback icon for 'เบอร์โทรศัพท์' (Phone) is visible.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/div[1]/div[2]/p/svg").nth(0)).to_be_visible(timeout=15000), "Validation feedback icon for '\u0e40\u0e1a\u0e2d\u0e23\u0e4c\u0e42\u0e17\u0e23\u0e28\u0e31\u0e1e\u0e17\u0e4c' (Phone) is visible."
        await page.locator("xpath=/html/body/main/section[7]/div/div/form/div[1]/div[3]/p/svg").nth(0).scroll_into_view_if_needed()
        # Assert: Validation feedback icon for 'ไอดีไลน์' (LINE ID) is visible.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/div[1]/div[3]/p/svg").nth(0)).to_be_visible(timeout=15000), "Validation feedback icon for '\u0e44\u0e2d\u0e14\u0e35\u0e44\u0e25\u0e19\u0e4c' (LINE ID) is visible."
        await page.locator("xpath=/html/body/main/section[7]/div/div/form/p/svg").nth(0).scroll_into_view_if_needed()
        # Assert: Summary validation error indicator above the form is visible.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/p/svg").nth(0)).to_be_visible(timeout=15000), "Summary validation error indicator above the form is visible."
        
        # --> Verify submission is blocked
        # Assert: The page URL remains on /agent-course, confirming no navigation occurred after submit.
        await expect(page).to_have_url(re.compile("/agent\\-course"), timeout=15000), "The page URL remains on /agent-course, confirming no navigation occurred after submit."
        await page.locator("xpath=/html/body/main/section[7]/div/div/form/button").nth(0).scroll_into_view_if_needed()
        # Assert: The submit button is still visible, indicating the form remained on-screen after submission.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/button").nth(0)).to_be_visible(timeout=15000), "The submit button is still visible, indicating the form remained on-screen after submission."
        # Assert: The Full Name input is empty, showing a required field was not provided.
        await expect(page.locator("xpath=/html/body/main/section[7]/div/div/form/div[1]/div[1]/input").nth(0)).to_have_value("", timeout=15000), "The Full Name input is empty, showing a required field was not provided."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    