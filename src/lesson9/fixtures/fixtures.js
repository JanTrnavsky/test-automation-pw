require("dotenv").config;

const {ADMIN_USERNAME, ADMIN_PASSWORD} = process.env;

export const adminUsername = ADMIN_USERNAME;
export const adminPassword = ADMIN_PASSWORD;