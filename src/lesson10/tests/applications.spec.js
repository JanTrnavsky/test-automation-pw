require("dotenv").config;
import { ApplicationsPage } from "../pages/applications.page";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { MainPage } from "../pages/mainpage.page";

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

test.describe("Applications page", async () => {
    let app;

    test.beforeEach(async ({page}) => {
        app = new MainPage(page);
        await app.loginPage.open();
        await app.loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    });

    test("should list all applications", async ({page}) => {
        await app.applicationsPage.open();
        await expect(app.applicationsPage.applicationsTable).toBeVisible();
        await app.applicationsPage.waitForTableReady();

        const allRows = await app.applicationsPage.getApplicationsTableRows();

        for (const row of allRows) {
            const rowData = await row.getValues();
            await expect(rowData.name).toMatch(/.+/);
            await expect(rowData.date).toMatch(/(\d{2}\.\d{2}\.\d{4}|\d{2}\.\d{2}\. - \d{2}\.\d{2}\.\d{4})/);
        }
    });

    test("should open application detail", async ({page}) => {
        const applicationsPage = new ApplicationsPage(page);
        await applicationsPage.open();

        const firstRow = (await applicationsPage.getApplicationsTableRows())[0];
        const applicationDetail = await firstRow.openInfo();
        await expect(applicationDetail.paymentConfirmationButton).toBeVisible();
    });
});