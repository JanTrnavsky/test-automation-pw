require("dotenv").config;
import {expect, test} from "@playwright/test";
import { LoginPage } from "../pages/login.page";

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

test.describe("Playwright test context", async () => {

    test("Two pages test", async ({page, browser}) => {
        await page.goto("/");
        const czechitasContext = await browser.newContext({
            baseURL: "https://www.czechitas.cz",
            viewport: { width: 1024, height: 768 },
            timezoneId: "Europe/Prague",
            locale: "cs-CZ",
        });

        const mainPage = page;
        const czechitasPage = await czechitasContext.newPage();

        const loginPage = new LoginPage(mainPage);
        await loginPage.open();
        await czechitasPage.goto("");
        await czechitasPage.waitForLoadState();
        console.log(czechitasPage.url());
        console.log(czechitasPage.viewportSize());
        console.log(mainPage.viewportSize());
    });

    test("Two users", async ({page, browser}) => {
        const nonLoggedUserContext = await browser.newContext();
        const nonLoggedUserPage = await nonLoggedUserContext.newPage();

        const loggedUserPage = page;

        const loggedUserLoginPage = new LoginPage(loggedUserPage);
        const nonLoggedUserLoginPage = new LoginPage(nonLoggedUserPage);

        await loggedUserLoginPage.open();
        await nonLoggedUserLoginPage.open();

        await loggedUserLoginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);

        await expect(loggedUserLoginPage.emailField).not.toBeAttached();

        await nonLoggedUserLoginPage.login("abababab@dabab.com", "12346579");
        await expect(nonLoggedUserLoginPage.emailField).toBeAttached();
    });

});