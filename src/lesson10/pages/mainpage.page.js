import { ApplicationsPage } from "./applications.page";
import { LoginPage } from "./login.page";

export class MainPage {
    constructor(page) {
        this.loginPage = new LoginPage(page);
        this.applicationsPage = new ApplicationsPage(page);
    }
}