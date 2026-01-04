//vytváříme třídu loginPage
//má konstruktor se třemi prvky 

//v rámci konstruktoru mám přesunuty všechny lokátory

export class RegistrationPage {
    constructor(page) {
        this.page = page;
        // All locators in ONE place
        this.nameField = this.page.getByRole("textbox", { name: "Jméno a příjmení" });
        this.emailField = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordField = this.page.getByRole('textbox', { name: 'Heslo' });
        this.confirmPasswordField = this.page.getByRole('textbox', { name: 'Kontrola hesla' });
        this.registerButton = this.page.getByRole('button', { name: 'Zaregistrovat' });
    }

    async open() {
        await this.page.goto('/registrace');
    }

    // Actions grouped as methods
    async register(name, email, password, confirmPassword) {
        await this.nameField.fill(name);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(confirmPassword);
        await this.registerButton.click();
    }
}