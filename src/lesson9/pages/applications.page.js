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
        return await this.applicationsTableRows.all();
    }
}