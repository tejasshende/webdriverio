//@ts-nocheck

import { Capabilities, Options } from '@wdio/types';
import dotenv from "dotenv"
// import allureReporter from "@wdio/allure-reporter"
import { generate, ITestCaseHookParameter } from 'multiple-cucumber-html-reporter';
import fs from "fs"
import logger from './e2e/src/test/helper/logger.helper';
import tsConfig from './tsconfig.json'

//getting the values from .env file
dotenv.config()

//getting the flag value from package.json file, this value is in script command
var headlessFlag = process.env.HEADLESS;
var loggingFlag = process.env.LOGGING;

//setting reporting varibales
const reportDir = './e2e/src/output/reports/cucumber-reporter/'

//variables for multiple-cucumber-html-reporter
let countOfScenariosExecuted = 0;
let countOfScenariosPassed = 0;
let countOfScenariosInError = 0;
let countOfTestsExecuted = 0;
let countOfTestsPassed = 0;
let countOfTestsInError = 0;
let goAheadToNextStage = 'true';

//writing a funcion to generate test properties for multiple-cucumber-html-reporter
async function generateTestProperties() {
    // Change the content of the file as you want
    // or either set fileContent to null to create an empty file
    const passPercentag = (countOfTestsPassed / countOfTestsExecuted) * 100;
    goAheadToNextStage = (passPercentag > 80) ? 'true' : 'false';

    const data =
        `NAME_OF_TEST_SUITE_EXECUTED='Regression Test Suite'
        COUNT_OF_SCENARIOES_EXECUTED=${countOfScenariosExecuted}
        COUNT_OF_SCENARIOES_PASSED=${countOfScenariosPassed}
        COUNT_OF_SCENARIOES_IN_ERROR=${countOfScenariosInError}
        COUNT_OF_TESTS_EXECUTED=${countOfTestsExecuted}
        COUNT_OF_TESTS_PASSED=${countOfTestsPassed}
        COUNT_OF_TESTS_IN_ERROR=${countOfTestsInError}
        GO_AHEAD_TO_NEXT_STAGE=${goAheadToNextStage}
        PATH_OF_TEST_REPORT=${reportDir}report/index.html`;
    const testResults = data.replace(/^\s+/gm, '');
    // The absolute path of the new file with its name
    const filepath = `${reportDir}cucumber-reporter.properties`;
    fs.writeFile(filepath, testResults, err => {
        if (err) { throw err; }
        console.log('The file was succesfully saved!');
    });
}

//setting the values to 'N' if the flages values are not defined
if (headlessFlag == undefined || headlessFlag == null) {
    headlessFlag = 'N'
} else {
    headlessFlag.trim()
}

if (loggingFlag == undefined || loggingFlag == null) {
    loggingFlag = 'N'
} else {
    loggingFlag.trim()
}

export const config: Options.Testrunner = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    //
    // =====================
    // ts-node Configurations
    // =====================
    //
    // You can write tests using TypeScript to get autocompletion and type safety.
    // You will need typescript and ts-node installed as devDependencies.
    // WebdriverIO will automatically detect if these dependencies are installed
    // and will compile your config and tests for you.
    // If you need to configure how ts-node runs please use the
    // environment variables for ts-node or use wdio config's autoCompileOpts section.
    //

    autoCompileOpts: {
        autoCompile: true,
        // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
        // for all available options
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        },
        // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
        // do please make sure "tsconfig-paths" is installed as dependency
        // tsConfigPathsOpts: {
        //     baseUrl: './',
        //     paths: tsConfig.compilerOptions.paths
        // }        
    },
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called.
    //
    // The specs are defined as an array of spec files (optionally using wildcards
    // that will be expanded). The test for each spec file will be run in a separate
    // worker process. In order to have a group of spec files run in the same worker
    // process simply enclose them in an array within the specs array.
    //
    // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
    // then the current working directory is where your `package.json` resides, so `wdio`
    // will be called from there.
    //
    specs: ['./e2e/src/test/features/**/*.feature'],

    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator

    capabilities: [
        {
            // maxInstances can get overwritten per capability. So if you have an in-house Selenium
            // grid with only 5 firefox instances available you can make sure that not more than
            // 5 instances get started at a time.

            /**
             * Additional chrome options
             * --headless
             * --disable-dev-shm-usage
             * --no-sandbox
             * --window-size=1920,1080
             * --disble-gpu
             * --start-fullscreen
             * --proxy-server=https://your_proxy_server
             * binary=<actual_location_of_binary>
             * --auth-server-whitelist="_"
             **/

            maxInstances: 5,
            // browserName: 'chrome',
            // "goog:chromeOptions": {
            //     //checking the headlessFlag and depending on that the config would be launched
            //     "args": headlessFlag.toUpperCase() === "Y" ? ["--disable-web-security", "--headless", "--disable-dev-shm-usage", "--no-sandbox", "--window-size=1920,1080"] : ["--disable-web-security", "--window-size=1920,1080"]
            // },
            browserName: 'firefox',
            // "moz:firefoxOptions:": {
            //     //checking the headlessFlag and depending on that the config would be launched
            //     "args": headlessFlag.toUpperCase() === "Y" ? ["--disable-web-security", "--headless", "--disable-dev-shm-usage", "--no-sandbox", "--window-size=1920,1080"] : ["--disable-web-security", "--window-size=1920,1080"]
            // },
            acceptInsecureCerts: true,
            timeouts: { implicit: 100000, pageLoad: 1000000, script: 700000 },
            // timeouts: { implicit: 1000, pageLoad: 1000, script: 7000 },
            // If outputDir is provided WebdriverIO can capture driver session logs
            // it is possible to configure which logTypes to include/exclude.
            // excludeDriverLogs: ['*'],
            // pass '*' to exclude all driver session logs
            // excludeDriverLogs: ['bugreport', 'server'],
        }],

    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    //depending on LOGGING flag setting the log level
    // logLevel: 'error',
    // logLevel: loggingFlag.toUpperCase() === 'Y' ? 'info' : 'error',
    logLevel: loggingFlag.toUpperCase() === 'Y' ? 'warn' : 'error',

    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://localhost',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 90000,
    // waitforTimeout: 900000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['selenium-standalone'],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    // reporters: ['spec',
    reporters:
        // ['allure',
        //     {
        //         outputDir: 'e2e/src/output/reports/allure-results/',
        //         disableWebdriverStepReporting: true,
        //         useCucumberStepReports: true
        //     }
        // ]

        ['spec',
        ['cucumberjs-json', {jsonFolder:reportDir+'json'}]
    ],

    //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./e2e/src/step-definitions/*/*.ts'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        //<string[]>(type[:path]) specify the output format. optionally supply the PATH to redirects the output
        format: ['pretty'],
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        // timeout: 60000,
        timeout: 9000000,
        // timeout: 100000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        //deleting the e2e/src/output/reports/allure-results folder if the run is on local.
        // if (process.env.RUN_ON === "LOCAL" && fs.existsSync("./e2e/src/output/reports/allure-results")) {
        //     console.log("Deleting the allure-results dir");
        //     fs.rmSync("./e2e/src/output/reports/allure-results", { recursive: true })
        // }

        //deleting the e2e/src/output/reports/cucumber-reporter folder if the run is on local.
        if (process.env.RUN_ON === "LOCAL" && fs.existsSync(reportDir)) {
            console.log("Deleting the cucumber-reporter dir");
            fs.rmSync(reportDir, { recursive: true })
        }

        //creating cucumnber-reportr dir and screenshot dir
        fs.mkdirSync(reportDir)
        fs.mkdirSync(reportDir+'screenshots')
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialized
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just after a worker process has exited.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {Number} exitCode 0 - success, 1 - fail
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {Number} retries  number of retries used
     */
    // onWorkerEnd: function (cid, exitCode, specs, retries) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */
    // beforeSession: function (config, capabilities, specs, cid) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    //     //This code is added by Tejas
    //     global.allure = allureReporter;
    //     // allure.addFeature(suite.name);
    //     // allure.addDescription("generating Allure reports " + suite.name);

    //     //This code is added by Tejas
    //     //aading envirment to allure report
    //     console.log(`Setting environment in Allure Report ${browser.config.environment}`);
    //     allureReporter.addEnvironment("Environment: ", `${browser.config.environment}`)
    //     allureReporter.addEnvironment("BROWSER: ", browser.capabilities.browserName)
    //     allureReporter.addEnvironment("BROWSER_VERSION: ", browser.capabilities.browserVersion)
    //     allureReporter.addEnvironment("PLATFORM: ", browser.capabilities.platformName)
    //     allureReporter.addEnvironment("ENVIRONMENT: ", browser.config.environment)
    //     allureReporter.name()
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Cucumber Hooks
     *
     * Runs before a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // beforeFeature: function (uri, feature) {
    // },
    /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
     * @param {Object}                 context  Cucumber World object
     */
    beforeScenario: function (world, context) {
        logger.info(`Started Scenario - ${world.pickle.name}`);
    },
    /**
     *
     * Runs before a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     * @param {Object}             context  Cucumber World object
     */
    // beforeStep: function (step, scenario, context) {
    // },
    /**
     *
     * Runs after a Cucumber Step.
     * @param {Pickle.IPickleStep} step             step data
     * @param {IPickle}            scenario         scenario pickle
     * @param {Object}             result           results object containing scenario results
     * @param {boolean}            result.passed    true if scenario has passed
     * @param {string}             result.error     error stack if scenario failed
     * @param {number}             result.duration  duration of scenario in milliseconds
     * @param {Object}             context          Cucumber World object
     */
    afterStep: async (step, scenario, result, context) => {
        //This code is added by Tejas
        //This function will run after every step
        //We're taking a screenshot if the particulat step is failed

        // if (!result.passed) {
        //     console.log(`Taking a screenshot as the step, ${step.text} result.passed is:${result.passed}`);
        //     await browser.takeScreenshot()
        // }
    },
    /**
     *
     * Runs after a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
     * @param {Object}                 result           results object containing scenario results
     * @param {boolean}                result.passed    true if scenario has passed
     * @param {string}                 result.error     error stack if scenario failed
     * @param {number}                 result.duration  duration of scenario in milliseconds
     * @param {Object}                 context          Cucumber World object
     */
    afterScenario: function (world, result, context) {
        logger.info(`Finished Scenario - ${world.pickle.name}`)
    },
    /**
     *
     * Runs after a Cucumber Feature.
     * @param {String}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // afterFeature: function (uri, feature) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    after: function (scenarioResult) {
        //This code is written by tejas
        generateTestProperties();
    },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    afterScenario: async function (scenario: ITestCaseHookParameter, result) {
        const cucumberJson = require('wdio-cucumberjs-json-reporter').default;
        const screenshot = await browser.takeScreenshot();
        cucumberJson.attach(screenshot, 'image/png');
        let stream: WriteStream;
        const filePath = `${reportDir}screenshots/${scenario.gherkinDocument.feature.name}.png`
        // /* eslint-disable prefer-const */
        stream = fs.createWriteStream(filePath);
        // /* eslint-disable no-buffer-constructor */
        stream.write(new Buffer.from(screenshot, 'base64'));
        stream.end();

        countOfScenariosExecuted++;
        result.passed ? countOfScenariosPassed++ : countOfScenariosInError++;

    },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function (exitCode, config, capabilities, results) {
    onComplete: function () {
        generate({
            jsonDir: reportDir+'json',
            reportPath: reportDir+'report',
            saveCollectedJSON: true,
            disableLog: false,
            pageFooter: ' ',
            displayDuration: true,
            // durationInMS:true,
            hideMetadata: false,
            displayReportTime: true,
            useCDN: true,
            language: 'en',
            pageTitle: `Regression Test Suite Execution Report`,
            reportName: `OrnageHRM - Regression Test Execution`,
            'cjson:metadata': {
                // browser: {
                //     name: 'chrome',
                //     version: '106.0.5249.11'
                // },
                // device:'INPNQLT776321',
                device:'Local Machine',
                platform: {
                    name: 'Windows 10',
                    build: '19042.2251'
                }
            },
            customeData: {
                title: 'Regression Test Suite Execution Details',
                data: [
                    { label: 'Project', value: 'Orange HRM' },
                    { label: 'Execution Start Timestamp', value: Date.now() },
                    { label: 'Execution End Timestamp', value: Date.now() }
                ]
            },
        });
    },

    
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    // onReload: function(oldSessionId, newSessionId) {
    // }
}
