require("dotenv").config;
import { ApplicationsPage } from "../pages/applications.page";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

test.describe("Applications page", async () => {

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    });

    test("should list all applications", async ({page}) => {
        const applicationsPage = new ApplicationsPage(page);
        await applicationsPage.open();
        await expect(applicationsPage.applicationsTable).toBeVisible();
        await applicationsPage.waitForTableReady();

        const allRows = await applicationsPage.getApplicationsTableRows();

        for (const row of allRows) {
            const nameCell = row.locator("td").first();
            await expect(await nameCell).toHaveText(/.+/);
        }
    });
});