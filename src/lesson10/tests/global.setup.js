import { test as setup } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { adminPassword, adminUsername, stateFile } from "../fixtures/fixtures";


setup("do global setup", async ({ page }) => {
    console.log("Executing global setup");

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(adminUsername, adminPassword);

    await page.context().storageState({path: stateFile });
});