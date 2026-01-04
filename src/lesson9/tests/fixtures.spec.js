import {test as  base, expect} from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ApplicationsPage } from "../pages/applications.page";
import { adminPassword, adminUsername } from "../fixtures/fixtures";

const test = base.extend({
    applicationsPageFixture: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        const applicationsPage = new ApplicationsPage(page);

        await loginPage.open();
        await loginPage.login(adminUsername, adminPassword);
        await applicationsPage.open();

        await use(page);

        await loginPage.logout();
    },
});

test.describe("Applications page with fixture", async () => {

    test("should list all applications", async ({applicationsPageFixture}) => {
        const applicationsPage = new ApplicationsPage(applicationsPageFixture);
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