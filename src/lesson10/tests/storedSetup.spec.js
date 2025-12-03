import { expect, test } from "@playwright/test";
import { stateFile } from "../fixtures/fixtures";
import { ApplicationsPage } from "../pages/applications.page";

test.describe("Use stored state", async () => {
    let page;

    test.beforeAll(async ( { browser }) => {

        const context = await browser.newContext({
            storageState: stateFile,
        });
        
        page = await context.newPage();
    });

    test("should be logged", async () => {
        const applicationsPage = new ApplicationsPage(page);
        await applicationsPage.open();
        await expect(applicationsPage.usernameDropdown).toBeVisible();
    });

});