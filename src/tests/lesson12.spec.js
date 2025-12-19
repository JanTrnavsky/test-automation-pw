import {test, expect} from "@playwright/test";

test("Demo for iframe", async ({page}) => {
    await page.goto("https://selectors.trnavsky.eu/iframe-demo.html");

    const iframe = page.frameLocator("#frame");

    const button = iframe.locator("#testButton");
    await button.click();

    const input = iframe.locator("#input-field");
    await input.fill("Piseme do inputu v iframe");

    const headline = page.locator("h1");

    await expect(headline).toBeVisible();

});

test("Nahrazeni odpovedi 200", async ({ page }) => {
    await page.route("**/demo-endpoint", async route => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                name: "Honza",
                role: "Tester",
                message: "Mockuje response",
            })
        });
    });
    await page.goto("https://selectors.trnavsky.eu/mock.html");
    await page.locator("#fetch-btn").click();
    await expect(page.locator("#status")).toHaveText("200");
});

test("Nasimulovani erroru 502", async ({ page }) => {

    await page.goto("https://selectors.trnavsky.eu/mock.html");
    await page.route("**/demo-endpoint", async route => {
        await route.fulfill({
            status: 502,
            contentType: "application/json",
            body: JSON.stringify({
                error: "Service unavailable"
            })
        });
    });
    await page.locator("#fetch-btn").click();
    await expect(page.locator("#status")).toHaveText("502");

});