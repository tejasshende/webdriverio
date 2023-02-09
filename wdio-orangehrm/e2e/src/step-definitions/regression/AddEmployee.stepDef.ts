//@ts-nocheck
import { Given, Then } from "@wdio/cucumber-framework";
import loginPage from "../../resources/page-objects/login.page"
import landingPage from "../../resources/page-objects/landing.page"
import commonHelper from "../../test/helper/common.helper"


Given(/^User launches Orange HRM UI$/, async () => {
    //@ts-ignore
    await loginPage.launchOrangeHRM()
});

Then(/^(.*) logsin with (.*)$/, async (username,password) => {
    let decryptPassword = await commonHelper.decryptWithAES(password,process.env.PASSPHRASE)
    await loginPage.loginToOrangeHRM(username,decryptPassword.trim())
});

Then(/^Dashboard page should be displayed$/, async () => {    
    await loginPage.verifyLogin()
});

Then(/^User navigates to PIM link and Add Employee link then Add Employee page displayed$/, async () => {    
    await landingPage.openAddEmployeePage()
});

Then(/^User adds new employee$/, async () => {    
    await landingPage.addEmployee('Test','User')
});

