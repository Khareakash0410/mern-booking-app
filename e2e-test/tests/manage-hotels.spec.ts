import { test, expect } from "@playwright/test";
import path from "path";

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
test("should allow userto add hotel", async ({ page }) => {

    await page.goto(`${UI_URL}add-hotel`);

    await page.locator(`[name="name"]`).fill("test Hotel");
    await page.locator(`[name="contact"]`).fill("23445576878654");
    await page.locator(`[name="city"]`).fill("test city");
    await page.locator(`[name="country"]`).fill("test country");
    await page.locator(`[name="description"]`).fill("test description");
    await page.locator(`[name="pricePerNight"]`).fill("1234");
    await page.selectOption(`select[name="starRating"]`, "4");

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator(`[name="adultCount"]`).fill("5");
    await page.locator(`[name="childCount"]`).fill("3");

    await page.setInputFiles(`[name="imageFiles"]`, [
        path.join(__dirname, "files", "4.1.jpg"),
        path.join(__dirname, "files", "2.3.jpg"),
    ]);

    await page.getByRole("button", { name: "Save "}).click();

    await expect(page.getByText("Hotel Saved!")).toBeVisible();

});

test("shuold display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("My Hotels")).toBeVisible();

    await expect(page.getByText("Dublin Getaways")).toBeVisible();
    await expect(page.getByText("Lorem ipsum dolor sit")).toBeVisible();

    await expect(page.getByText("Dublin, Ireland")).toBeVisible();
    await expect(page.getByText("8601424953")).toBeVisible();
    await expect(page.getByText("All Inclusive")).toBeVisible();
    await expect(page.getByText("₹119 /Night")).toBeVisible();
    await expect(page.getByText("2 adults, 3 children")).toBeVisible();
    await expect(page.getByText("2 Star Rating")).toBeVisible();


    await expect(page.getByRole("link", { name: "View Details" }).first()).toBeVisible();

    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});


test("should edit hotel", async({ page} ) => {
    await page.goto(`${UI_URL}my-hotels`);

    await page.getByRole("link", { name: "View Details" }).first().click();

    await page.waitForSelector('[name="name"]', { state: "attached" });
    await expect(page.locator(`[name="name"]`)).toHaveValue("Dublin Getaways");
    await page.locator(`[name="name"]`).fill("Dublin Getaways Updated");

    await page.getByRole("button", { name: "Save" }).click();  

    await expect(page.getByText("Hotel Saved!")).toBeVisible();

    await page.reload();

    await expect(page.locator(`[name="name"]`)).toHaveValue("Dublin Getaways Updated");

    await page.locator(`[name="name"]`).fill("Dublin Getaways");

    await page.getByRole("button", { name: "Save" }).click();
});