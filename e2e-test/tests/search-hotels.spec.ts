import { test, expect } from "@playwright/test";
import exp from "constants";


const UI_URL= "http://localhost:5173/"

test.beforeEach(async ({ page }) => {
    
    await page.goto(UI_URL);

    // getsign in buttton
  
    await page.getByRole("link", { name: "Sign In" }).click();
  
    await expect(page.getByRole("heading", { name: "Sign In Here" })).toBeVisible();
  
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password123");
  
    await page.getByRole("button", { name: "Sign In" }).click();
  
    await expect(page.getByText("Successfully signed!")).toBeVisible();
  
});

test("Should show hotel search results", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("where are you going?").fill("Dublin");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
    await expect(page.getByText("Dublin Getaways")).toBeVisible();

});

test("should show hotel detail", async({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("where are you going?").fill("Dublin");
    await page.getByRole("button", { name: "Search" }).click();

    await page.getByText("Dublin Getaways").click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book Now"})).toBeVisible();

});