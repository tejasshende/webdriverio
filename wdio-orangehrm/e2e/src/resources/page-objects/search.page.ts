//@ts-nocheck
import Page from "./Page"
import logger from "../../test/helper/logger.helper"

class searchPage extends Page {

    //delacring and setting all the CONST variables
    const elementTimeoutTH = parseInt(process.env.ELEMENT_TIMEOUT_TH)
    const waitUntilTimeoutTH = parseInt(process.env.WAITUNTIL_TIMEOUT_TH)

    // locators
    get pimLink() { return $("//span[text()='PIM']") }
    get employeeInformationText() { return $("//h5[text()='Employee Information']") }
    get employeeNameTextbox() { return $("(//input[@placeholder='Type for hints...'])[1]") }
    get searchButton() { return $("//button[@type='submit']") }
    get searchResultTable() { return $("//div[@class='oxd-table-card']") }
    get searchResultFirstName() { return $("(//div[@class='oxd-table-cell oxd-padding-cell'])[3]") }
    get searchResultLastName() { return $("(//div[@class='oxd-table-cell oxd-padding-cell'])[4]") }
    
    /* **************************************************************************************************************** */


    constructor() {
        super()
    }

    async openPIMPage() {
        try {
            await super.clickElement(this.pimLink, this.elementTimeoutTH)
            await browser.waitUntil(async () => (await (await (this.employeeInformationText)).isDisplayed()))
            let text = await super.getElementText(this.employeeInformationText, this.elementTimeoutTH)
            await expect(text).toEqual("Employee Information")
            logger.info(`Employee Information page opened`)
        } catch (error) {
            console.log(error);
        }
    }


    async searchEmployee(employeeName: string) {
        try {
            await browser.waitUntil(async () => (await (await (this.employeeNameTextbox)).isDisplayed()))
            await super.typeKeys(this.employeeNameTextbox, employeeName, this.elementTimeoutTH)
            await browser.pause(700)
            await super.clickElement(this.searchButton, this.elementTimeoutTH)
            await browser.waitUntil(async () => (await (await (this.searchResultTable)).isDisplayed()))
            let firstText = await super.getElementText(this.searchResultFirstName, this.elementTimeoutTH)
            await expect(employeeName.split(" ")[0].toString()).toEqual(firstText)
            logger.info(`Employee search success`)
        } catch (error) {
            console.log(error);
        }
    }



    
}

//exporting the class
export default new searchPage()