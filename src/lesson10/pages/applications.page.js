import { AppPage } from "./app.page";

export class ApplicationsPage extends AppPage {

    constructor(page) {
        super(page, "admin/prihlasky");
        this.applicationsTable = this.page.locator(".dataTable");
        this.loadingIndicator = this.page.getByText('Provádím...');
        this.applicationsTableRows = this.applicationsTable.locator("tbody").locator("tr");
    }

    async waitForTableReady() {
        await this.page.waitForLoadState();
        await this.loadingIndicator.waitFor({state: "hidden"});
    }

    async getApplicationsTableRows() {
        await this.waitForTableReady();
        const rows = await this.applicationsTableRows.all();
        return Promise.all(rows.map(async row => new TableRow(this.page, row)));
    }
}

export class TableRow {

    constructor(page, rowElement) {
        this.page = page;
        this.rowElement = rowElement;
    }

    async getValues() {
        const cells = await this.rowElement.locator("td");
        return {
            name: await cells.nth(0).textContent(),
            date: await cells.nth(1).textContent(),
            paymentType: await cells.nth(2).textContent(),
            toPay: await cells.nth(3).textContent()
        };
    }

    async openInfo() {
        await this.rowElement.locator("[data-can='view']").click();

        return new ApplicationsInfoPage(this.page);
    }
}

export class ApplicationsInfoPage {
    constructor(page) {
        this.page = page;
        this.paymentConfirmationButton = this.page.locator("[title='Stáhnout potvrzení o přihlášení']");
    }
}