import { test, expect } from "@playwright/test"

test.describe("smoke", () => {
  test("home page loads with bilingual header nav", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/บ้านไออุ่น|Baan Ai Oun/)
    await expect(page.getByRole("link", { name: /หน้าแรก/ }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: /ค้นหาทรัพย์/ }).first()).toBeVisible()
  })

  test("key public pages respond 200", async ({ page }) => {
    for (const path of ["/properties", "/find-property", "/list-property", "/request", "/contact", "/about", "/privacy-policy"]) {
      const response = await page.goto(path)
      expect(response?.status(), `${path} should return 200`).toBe(200)
    }
  })

  test("legacy redirects still resolve to their new destinations", async ({ page }) => {
    await page.goto("/buy")
    await expect(page).toHaveURL(/\/find-property$/)

    await page.goto("/owners")
    await expect(page).toHaveURL(/\/list-property$/)
  })

  test("request page renders all 3 service tabs and the form", async ({ page }) => {
    await page.goto("/request?tab=matchmaking")
    await expect(page.getByRole("tab", { name: /จัดหาทรัพย์ตามต้องการ/ })).toBeVisible()
    await expect(page.getByRole("tab", { name: /ฝากขาย\/ปล่อยเช่า/ })).toBeVisible()
    await expect(page.getByRole("tab", { name: /ร่วมเป็น Co-Agent/ })).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('select[name="propertyType"]')).toBeVisible()
  })
})
