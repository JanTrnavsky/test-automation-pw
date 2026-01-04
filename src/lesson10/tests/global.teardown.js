import { test as teardown } from "@playwright/test";

teardown("do teardown", async ({page}) => {
    console.log("executing teardown");
});