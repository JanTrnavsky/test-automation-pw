import { test, expect } from '@playwright/test';

test('homework', async ({ page }) => {
    // place for your homework code
    await page.goto('/');
});


test('registrace', async ({ page }) => {
    // place for your homework code
    await page.goto('/registrace');

    await page.getByRole("textbox", { name: 'Jméno a příjmení' }).fill("TestName TestSurname");
    await page.locator("#email").fill("email@test.com");
    await page.locator("input#password").fill("test");
    await page.locator("#password-confirm").fill("test")

});

