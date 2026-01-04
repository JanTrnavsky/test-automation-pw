export class AppPage {

    constructor(page, url) {
        this.url = url;
        this.page = page;
        this.toastError = this.page.locator(".toast-error");
        this.usernameDropdown = this.page.locator(".navbar-right").locator("strong");
        this.logoutLink = this.page.locator("#logout-link");
    }

    async open() {
        await this.page.goto("/" + this.url);
    }
    
    async logout() {
        await this.usernameDropdown.click();
        await this.logoutLink.click();
    }
}