require("dotenv").config();
import { test, expect } from '@playwright/test';
import { RegistrationPage } from './pages/RegistrationPage';

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

// Constants for error messages
const ERROR_MESSAGES = {
    INVALID_PASSWORD: 'Heslo musí obsahovat minimáln',
    DUPLICATE_EMAIL: 'Účet s tímto emailem již existuje'
};

// Helper function to generate unique test data
function generateTestData(prefix = 'Alena') {
    const timestamp = Date.now().toString().slice(-6);
    return {
        name: `${prefix}${timestamp}`,
        email: `alena${timestamp}@a.cz`,
        email2: `alenadve${timestamp}@a.cz`,
        password: `Heslo${timestamp}`,
        invalidPassword: `${timestamp}` 
    };
}

//Tests for Registration
test.describe("Registration page", () => {
    let registrationPage;

//open Registration page before each test
    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await registrationPage.open();
        await expect(page).toHaveURL(/registrace/);
    });
//Valid registration test
    test('Valid registration test', { tag: ["@smoke", "@registration"] }, async ({ page }) => {
        const testData = generateTestData();

        await registrationPage.register(testData.name, testData.email, testData.password, testData.password);

        const userNameDisplay = page.getByRole('button', { name: testData.name });
        await expect(userNameDisplay).toHaveText(testData.name);
    });

//Invalid password test
    test("Invalid registration - password test", { tag: ["@smoke", "@registration"] }, async ({ page }) => {
        const testData = generateTestData('Alena - duplicate2');

        await registrationPage.register(testData.name, testData.email2, testData.invalidPassword, testData.invalidPassword);

        const registrationErrorField = page.getByText(ERROR_MESSAGES.INVALID_PASSWORD);
        await expect(registrationErrorField, "error field should be visible").toBeVisible();
    });
//Invalid registration - use admin's email
    test("Invalid registration - email test", { tag: "@smoke" }, async ({ page }) => {
        const testData = generateTestData();

        await registrationPage.register(testData.name, ADMIN_USERNAME, testData.password, testData.password);

        const fieldError = page.locator(".invalid-feedback");
        await expect(fieldError).toBeVisible({ timeout: 30000 });
        await expect(fieldError).toHaveText(ERROR_MESSAGES.DUPLICATE_EMAIL);
    });
});
