import oracledb from "oracledb";
import commonHelper from "./common.helper";

oracledb.fetchAsString = [oracledb.CLOB];

//this flag willl keep a tab on db connection initilization
var isDBConnectionInitilized = false
var connection: oracledb.Connection;

/**
 * @param config 
 * @returns This function will connect to database and return the connection object
 */
async function getDBConnectionObj(config: object) {
    let libPath = "node_modules/instantclient_21_3";

    try {
        //checking if the connection is not already been initilized
        if((connection == undefined) || (connection == null)){

            console.log(`Establishing connection with database...`);

            //setting a library path if platform is windows
            if (process.platform === 'win32') {
                oracledb.initOracleClient({ libDir: libPath });
            }

            //decrypting the database password
            let decryptedPassword = await commonHelper.decryptWithAES(config['password'],process.env.PASSPHRASE)
            // setting decrypted password back to config object
            config['password'] = decryptedPassword

            //getting database conncetion
            connection = await oracledb.getConnection(config);
        }

        //returning the database connection
        if(!(connection==undefined)){
            return connection
        }

    } catch (error) {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.log("Error while closing database connection : " + error);
            }
        }
        throw new Error(error.message)
    }
}

/**
 * @param config 
 * @param query 
 * @returns This function will fetch the result from database based on the user query 
 */
async function fetchDataFromDatabase(config:object, query: string) {
    // console.log(query);

    try {
        // getting the database connection
        var dbcon = await getDBConnectionObj(config)
        //fetching the results from database
        if(!(dbcon==undefined || dbcon==null)){
            let resultSet = await dbcon.execute(query);
            
            //returning result
            if(!(resultSet.rows.length == 0 || resultSet.rows.length == null )){
                return resultSet.rows;
            }

            await closeDBConnection()
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

//this function will close the open database connnection
async function closeDBConnection(){
    if(!(connection==undefined || connection==null)){
        await connection.close();
        console.log('closing the database connection')
    }
}


export default { getDBConnectionObj, fetchDataFromDatabase, closeDBConnection}