import { config as baseConfig } from "../../../../wdio.conf";

//exporting the config for UAT env
export const config = Object.assign(baseConfig, {
    
    //setting all the config related to UAT environemnt

    environment: "UAT",
    appURL: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    screenshotPath:'e2e/src/output/screenshots/uat/',
    regressionLogPath:'e2e/src/output/logs/uat/logs.txt',
    
    // API Config
    apiBaseURL: "",
    
    // WebSSO config
    webssoAppURL: "",
    webSSODummyUser: "websso-user",
    webSSOPassword: "XXXXXXXXXXXXXXXXXXXXX",

    // Database Config
    sqlConfig:{
        user: 'scott',
        password: 'XXXXXXXXXXXXXXXXXXXXX',
        connectionString: 'server:port/PID'
    }
}); 