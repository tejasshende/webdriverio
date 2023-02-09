//@ts-nocheck
import Page from "./Page"
import logger from "../../test/helper/logger.helper"

class login extends Page {

    //delacring and setting all the CONST variables
    const elementTimeoutTH = parseInt(process.env.ELEMENT_TIMEOUT_TH)
    const waitUntilTimeoutTH = parseInt(process.env.WAITUNTIL_TIMEOUT_TH)

    // locators
    get usernameTextbox() { return $("//input[@name='username']") }
    get passwordTextbox() { return $("//input[@name='password']") }
    get loginButton() { return $("//button[@type='submit']") }
    get dashboardText() { return $("//span/h6[text()='Dashboard']") }
    
    /* **************************************************************************************************************** */


    constructor() {
        super()
    }

   // this function will launch the orange hrm app
    async launchOrangeHRM() {
        try {
            await super.launchBrowser(browser.config.appURL)
        } catch (error) {
            console.log(error);
        }
    }

    // this function will login to orange hrm app
    async loginToOrangeHRM(userName:string, password:string) {
        try {
            await browser.waitUntil(async() => (await(await(this.usernameTextbox)).isDisplayed()))
            await super.typeKeys(this.usernameTextbox,userName,this.elementTimeoutTH)
            await super.typeKeys(this.passwordTextbox,password,this.elementTimeoutTH)
            await super.clickElement(this.loginButton,this.elementTimeoutTH)            
        } catch (error) {
            console.log(error);
        }
    }
    
    //this method will verify login
    async verifyLogin() {
        try {
            //verifying the logged in or not
            let text = await super.getElementText(this.dashboardText,this.elementTimeoutTH)
            await expect(text).toEqual("Dashboard")
            logger.info(`Login successful`)
        } catch (error) {
            console.log(error);
        }
    }
}

//exporting the class
export default new login()