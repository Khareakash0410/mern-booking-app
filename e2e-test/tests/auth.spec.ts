import { test, expect } from '@playwright/test';

const UI_URL= "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // getsign in buttton

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In Here" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Successfully signed!")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();

  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();

});

test("should allow user to register", async({page}) => {
    const testEmail= `test_register_${Math.floor(Math.random() * 90000) + 10000}@gmail.com`;
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Sign In" }).click();

    await page.getByRole("link", { name: "Register here" }).click();

    await expect(page.getByRole("heading", { name: "Register Here"})).toBeVisible();

    await page.locator("[name=firstName]").fill("test");
    await page.locator("[name=lastName]").fill("data");
    await page.locator("[name=email]").fill(testEmail);
    await page.locator("[name=password]").fill("testdata");
    await page.locator("[name=confirmPassword]").fill("testdata");
    await page.locator("[name=phone]").fill("12345678");

    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Registration Success!")).toBeVisible();

    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();

    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();

    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();

});

