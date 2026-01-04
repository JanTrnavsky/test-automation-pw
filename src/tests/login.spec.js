require("dotenv").config(); //práce se secrets
import {expect, test} from "@playwright/test";
//musím udelat import

//tady používám proměnné z env, protože jsou to citlivá data musí být v env
const {ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

//lokatory dame do funkci
async function getToastError(page) {
    return page.locator(".invalid-feedback");  
}

//definuji si funkci pro přihlašeni
async function login (page, username, password) {
    await page.goto("/prihlaseni");
    await page.getByLabel("Email").fill(username);
    await page.getByLabel("Heslo").fill(password);
    await page.getByRole ('button',{ name: 'Přihlásit'}).click();

}

//test describe slučuje testy které patří dohromady
test.describe ("Login page", ()=> {
    //před každým testem spusti
      test.beforeEach(async ({ page }) => {
    await page.goto("/prihlaseni");
    await expect(page).toHaveURL(/prihlaseni/);
  });

 test ("valid login", {tag: ["@smoke", "@login"]}, async ({page}) => {
    await login(page, ADMIN_USERNAME, ADMIN_PASSWORD); //používám tu nadefinovanou funkci viz výše

        //ověříme, že je přihlášený uživatel, který má být přihlášený
        const user = page.locator(".navbar-right").locator("strong");
        await expect(user).toHaveText("Lišák Admin");
        await expect(await getToastError(page)).not.toBeVisible();

    });
    test ("login with invalid credential", async ({page}) => {

        const emailField = page.getByLabel ("Email");
        const passwordField = page.getByLabel ("Heslo");
        const loginButton = page.getByRole ('button',{ name: 'Přihlásit'});

        //Vyplníme údaje a klikneme na přihlášení

        await emailField.fill("da-app.admin@czechitas.cz");
        await passwordField.fill ("12345");
        await loginButton.click ();

        //ověříme, že se zobrazila chybová hláška
        
        await expect(await getToastError(page)).toBeVisible();
        await expect(await getToastError(page)).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");

    });
});