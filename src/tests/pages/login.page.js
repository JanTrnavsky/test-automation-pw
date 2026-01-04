//vytváříme třídu loginPage
//má konstruktor se třemi prvky 

//v rámci konstruktoru mám přesunuty všechny lokátory 
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailField = this.page.getByLabel("Email");
        this.passwordField = this.page.getByLabel("Heslo");
        this.loginButton = this.page.getByRole('button', { name: 'Přihlásit' });
    }
    //metoda otevření stránky
    async open() {
        await this.page.goto("/login");
    }

    //metoda přihlášení se 2 parametry které předáváme
    async login(username, password) {
        await this.emailField.fill(username);
        await this.passwordField.emailField(password);
        await this.loginButton.click();
    }
    //funkce pro odlášení
}