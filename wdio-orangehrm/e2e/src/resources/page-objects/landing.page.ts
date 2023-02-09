//@ts-nocheck
import Page from "./Page"
import logger from "../../test/helper/logger.helper"

class landingPage extends Page {

    //delacring and setting all the CONST variables
    const elementTimeoutTH = parseInt(process.env.ELEMENT_TIMEOUT_TH)
    const waitUntilTimeoutTH = parseInt(process.env.WAITUNTIL_TIMEOUT_TH)

    // locators
    get pimLink() { return $("//span[text()='PIM']") }
    get employeeInformationText() { return $("//h5[text()='Employee Information']") }
    get addEmployeeLink() { return $("//a[text()='Add Employee']") }
    get addEmployeeText() { return $("//h6[text()='Add Employee']") }
    get firstNameTextbox() { return $("//input[@name='firstName']") }
    get lastNameTextbox() { return $("//input[@name='lastName']") }
    get saveButton() { return $("//button[@type='submit']") }
    get successPopup() { return $("//div[@class='oxd-toast-container oxd-toast-container--bottom']") }

    /* **************************************************************************************************************** */


    constructor() {
        super()
    }

    async openAddEmployeePage() {
        try {
            await super.clickElement(this.pimLink, this.elementTimeoutTH)
            await browser.waitUntil(async () => (await (await (this.employeeInformationText)).isDisplayed()))
            await super.clickElement(this.addEmployeeLink, this.elementTimeoutTH)
            await browser.waitUntil(async () => (await (await (this.addEmployeeText)).isDisplayed()))
            let text = await super.getElementText(this.addEmployeeText, this.elementTimeoutTH)
            await expect(text).toEqual("Add Employee")
            logger.info(`Add Employee page opened`)
        } catch (error) {
            console.log(error);
        }
    }

    async addEmployee(firstName: string, lastName: string) {
        try {
            await super.typeKeys(this.firstNameTextbox, firstName, this.elementTimeoutTH)
            await super.typeKeys(this.lastNameTextbox, lastName, this.elementTimeoutTH)
            await super.clickElement(this.saveButton, this.elementTimeoutTH)
            await browser.waitUntil(async () => (await (await (this.successPopup)).isDisplayed()))
            logger.info(`New employee added`)
        } catch (error) {
            console.log(error);
        }
    }
}

//exporting the class
export default new landingPage()