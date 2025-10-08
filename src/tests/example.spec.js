import { test } from "@playwright/test";

test("should open login page", async ({ page }) => {
    await page.goto("/prihlaseni");
    console.log(await page.title());
});

test("lesson 2", async ({ page }) => {
    await page.goto("/prihlaseni");
    await page.locator("input#email").screenshot({ path: "css_id_email.png"});
    await page.locator(".btn-primary").screenshot({ path: "sumbit_btn.png"});
    await page.locator("div").locator("form").locator("input[type$='word']").screenshot({path: "chain.png"});
    await page.getByRole("heading", {level: 1}).screenshot({ path: "heading.png"});
    await page.getByText("Zapomněli jste své heslo?").screenshot({ path: "passfgt.png"});
    await page.getByLabel("Email").screenshot({ path: "by_label.png"});
    console.log(await page.title());
});