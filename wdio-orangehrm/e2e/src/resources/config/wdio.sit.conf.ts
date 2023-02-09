import { config as baseConfig } from "../../../../wdio.conf";

//exporting the config for SIT env
export const config = Object.assign(baseConfig, {

    //setting all the config related to SIT environemnt
    
    environment: "SIT",
    appURL: "",
    screenshotPath:'e2e/src/output/screenshots/sit/',
    regressionLogPath:'e2e/src/output/logs/sit/logs.txt',
    
    // API Config
    apiBaseURL: "",
    
    // WebSSO config
    webssoAppURL: "",
    webSSODummyUser: "websso-user",
    webSSOPassword: "XXXXXXXXXXXXXXXXXXXXX",

    //Database Config
    sqlConfig:{
        user: 'scott',
        password: 'XXXXXXXXXXXXXXXXXXXXX',
        connectionString: "server:port/PID"
    }
});