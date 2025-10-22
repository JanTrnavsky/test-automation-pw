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

test("lesson 3", async ({ page }) => {
    await page.goto("/prihlaseni");
    const headingLocator = page.getByRole("heading", {level: 1});
    const headingText = await headingLocator.textContent();
    console.log(headingText);
    const emailField = page.getByLabel("Email");
    console.log("Is email field visible? " + await emailField.isVisible());
    console.log("Is email field enabled?" + await emailField.isEnabled());

    const forgotPassword = page.getByText("Zapomněli jste své heslo?");
    console.log("Forgot passoword href: " + await forgotPassword.getAttribute("href"));

    const passwordField = page.getByLabel("Heslo");
    console.log("Je videt? " + await passwordField.isVisible());
    console.log("Je povoleno? " + await passwordField.isEnabled());

    const loginButton = page.getByRole('button', { name: 'Přihlásit' });
    console.log("Text: " + await loginButton.textContent());

    await emailField.fill("da-app.admin@czechitas.cz");
    await passwordField.fill("Czechitas123");
    await loginButton.click();

    const userName = page.locator(".navbar-right").locator("strong");
    console.log("Logged user: " + await userName.textContent());
});

test("lesson 4", async ({ page }) => {
    await page.goto("/prihlaseni");
    await expect(page).toHaveScreenshot();

    const emailField = page.getByLabel("Email");
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEnabled();

    const passwordField = page.getByLabel("Heslo");
    await expect(passwordField, "password field should be visible").toBeVisible();
    await expect(passwordField).toBeEnabled();

    const loginButton = page.getByRole('button', { name: 'Přihlásit' });
    await expect(loginButton).toHaveText("Přihlásit");


    await emailField.fill("da-app.admin@czechitas.cz");
    await passwordField.fill("Czechitas123");
    await loginButton.click();

    const userName = page.locator(".navbar-right").locator("strong");
    await expect(userName).toHaveText("Lišák Admin");
})

test("lesson 4.2", async ({ page }) => {
    await page.goto("/")
    const moreInfoButton = page.getByText("Více informací")
    await expect(moreInfoButton).toBeVisible();
    await moreInfoButton.click();
    await expect(moreInfoButton).not.toBeAttached();

    await page.getByRole('link', { name: 'Vytvořit přihlášku' }).click();

    const emailField = page.getByLabel("Email");
    const passwordField = page.getByLabel("Heslo");
    const loginButton = page.getByRole('button', { name: 'Přihlásit' });
    await emailField.fill("da-app.admin@czechitas.cz");
    await passwordField.fill("Czechitas123");
    await loginButton.click();

    const checkbox = page.locator("#restrictions_yes");
    await expect(checkbox).not.toBeChecked();
    await checkbox.check({ force: true});
    await expect(checkbox).toBeChecked();
})
