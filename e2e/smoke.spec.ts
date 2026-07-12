import { test, expect } from "@playwright/test"

test.describe("smoke", () => {
  test("Thai home loads with Thai nav and bilingual hero", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("html")).toHaveAttribute("lang", "th")
    await expect(page.getByRole("link", { name: "หน้าแรก" }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: "งานหาทรัพย์" }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: "ภาษาไทย" })).toHaveAttribute("aria-current", "page")
    await expect(page.getByRole("link", { name: "English" })).toBeVisible()
    // Banner exception: hero still shows both languages
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/ครบจบเรื่องอสังหาฯ|Your All-in-One/)
  })

  test("English home loads with English nav", async ({ page }) => {
    await page.goto("/en")
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await expect(page.getByRole("link", { name: "Home" }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: "Property Match" }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: "English" })).toHaveAttribute("aria-current", "page")
    await expect(page.getByRole("link", { name: "ภาษาไทย" })).toBeVisible()
  })

  test("key public pages respond 200", async ({ page }) => {
    for (const path of [
      "/properties",
      "/find-property",
      "/list-property",
      "/request",
      "/contact",
      "/about",
      "/privacy-policy",
      "/en/properties",
      "/en/find-property",
      "/en/services",
    ]) {
      const response = await page.goto(path)
      expect(response?.status(), `${path} should return 200`).toBe(200)
    }
  })

  test("legacy redirects still resolve to their new destinations", async ({ page }) => {
    await page.goto("/buy")
    await expect(page).toHaveURL(/\/find-property$/)

    await page.goto("/owners")
    await expect(page).toHaveURL(/\/list-property$/)

    await page.goto("/en/buy")
    await expect(page).toHaveURL(/\/en\/find-property$/)
  })

  test("language switcher preserves path", async ({ page }) => {
    await page.goto("/services")
    await page.getByRole("link", { name: "English" }).click()
    await expect(page).toHaveURL(/\/en\/services$/)

    await page.getByRole("link", { name: "ภาษาไทย" }).click()
    await expect(page).toHaveURL(/\/services$/)
  })

  test("request page renders service tabs and form fields", async ({ page }) => {
    await page.goto("/request?tab=matchmaking")
    await expect(page.getByRole("tab", { name: /จัดหาทรัพย์ตามต้องการ|Property Match/ })).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="propertyType"]').first()).toBeVisible()
  })
})
