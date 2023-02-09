//@ts-nocheck
import { Given, Then } from "@wdio/cucumber-framework";
import loginPage from "../../resources/page-objects/login.page"
import searchPage from "../../resources/page-objects/search.page"
import commonHelper from "../../test/helper/common.helper"

Given(/^User launches Orange HRM$/, async () => {
    //@ts-ignore
    await loginPage.launchOrangeHRM()
});

Then(/^(.*) logs-in with (.*)$/, async (username,password) => {
    let decryptPassword = await commonHelper.decryptWithAES(password,process.env.PASSPHRASE)
    await loginPage.loginToOrangeHRM(username,decryptPassword.trim())
});

Then(/^Dashboard should be displayed$/, async () => {    
    await loginPage.verifyLogin()
});

Then(/^User navigates to PIM link and Employee List link$/, async () => {    
    await searchPage.openPIMPage()
});

Then(/^User search for employee (.*)$/, async (employeeName) => {    
    await searchPage.searchEmployee(employeeName)
});

