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

test("should book hotel", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("where are you going?").fill("Dublin");

    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];

    await page.getByPlaceholder("Check-out-Date").fill(formattedDate);

    await page.getByRole("button", { name: "Search" }).click();

    await page.getByText("Dublin Getaways").click();
    
    await page.getByRole("button", { name: "Book Now"}).click();

    await expect(page.getByText("Total Cost: ₹238.00")).toBeVisible();

    const stripeFrame = page.frameLocator("iframe").first();
    await stripeFrame.locator('[placeholder="Card number"]').fill("4000003560000008");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("12/26");
    await stripeFrame.locator('[placeholder="CVC"]').fill("247");

    await page.getByRole("button", { name: "Confirm Booking"}).click();

    await page.getByText("This is a test 3D Secure 2 authentication for a transaction with Stripe.").scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: "COMPLETE"}).click();

    await expect(page.getByText("Booking Saved!")).toBeVisible();
});