//@ts-nocheck

// this class will have all the action methods that would be used by framewrk //
export default class Page {

    constructure() { }

    /**
     * this method will delete browser cookies
     */
    async deleteBrowserCookies(){
        // console.log(await browser.getCookies());
        console.log('clearing browser cookies...');
        await browser.deleteCookies()
    }


    /**
     * this method will launch browser
     * @param appURL 
     */
    async launchBrowser(appURL: string) {
        await this.deleteBrowserCookies()
        await browser.maximizeWindow()
        await browser.url(appURL)
    }

    /**
     * this method will perform click action on given web element
     * @param ele 
     * @param timeout 
     */
    async clickElement(ele: WebdriverIO.Element, timeout: number) {
        try {
            // await ele.waitForDisplayed({timeout:timeout})
            await ele.waitForClickable({ timeout: timeout })
            await ele.click()
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * this method will perform double click action on given web element
     * @param ele 
     * @param timeout 
     */
     async doubleClickElement(ele: WebdriverIO.Element, timeout: number) {
        try {
            await ele.waitForClickable({ timeout: timeout })
            await ele.doubleClick()
        } catch (err) {
            console.log(err);
        }
    }

    
    /**
     * this method will type the text in the textbox / textarea
     * @param ele 
     * @param value 
     * @param timeout 
     */
    async typeKeys(ele: WebdriverIO.Element, value: string, timeout: number) {
        try {
            await ele.waitForDisplayed({ timeout: timeout })
            await ele.setValue(value)
        } catch (err) {
            console.log(err);
        }
    }

    
    /**
     * this method will get the text from given web element
     * @param ele 
     * @param timeout 
     * @returns 
     */
    async getElementText(ele: WebdriverIO.Element, timeout: number) {
        try {
            ele.waitForDisplayed({ timeout: timeout })
            return ele.getText()
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * this method will close the current browser instance
     */
    async closeBrowser() {
        await browser.closeWindow()
    }
}