import {expect, test} from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("API examples", async () => {

    let apiRequestContext;

    test.beforeAll(async ({playwright}) => {
        apiRequestContext = await playwright.request.newContext({
            baseURL: 'https://postman-echo.com',
        });
    });

    test("GET - should return something", async () => {
        const response = await apiRequestContext.get("/get");
        console.log(response);
        expect(response.status()).toBe(200);
    });

    test("POST endpoint", async () => {
        const response = await apiRequestContext.post("/post", {
            json: {
                key: "value"
            }
        });
        console.log(response);
    });
});

test.describe("API on our tested page", async () => {

    let apiRequestContext;

    test.beforeAll(async ({playwright}) => {
        apiRequestContext = await playwright.request.newContext({});
    });

    test("Register and login", async ({page}) => {
        const randomName = "Pepa Novak" + Math.random();
        const password = "mojeTajneHeslo1";
        const randomEmail = `randommail${Math.random()}@gmail.com`;
        
        const response = await apiRequestContext.post("/api/users/register", {
            data: {
                name: randomName,
                password: password,
                email: randomEmail
            }
        });


        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(randomEmail, password);
        await expect(loginPage.fieldError).not.toBeAttached();
    });
});