
import fs from 'fs'
import path from 'path'

/**
 * @param filePath 
 * @returns this function will return the parsed json file 
 */
async function parseJSON(filePath:string){
    try {
        return JSON.parse(fs.readFileSync(filePath,'utf-8'))
    } catch (error){
        console.log(error.message)
    }
}

/**
 * This function will return true if the file exists on given file path
 * @param fileName
 */
async function checkFileExists(filepath:string, fileName:string){
    try {
        if(fs.existsSync(`${filepath}/${fileName}`)){
    			return true
    		} else {
    			return false
    		}
    } catch (err) {
        console.log(err);
    }
}


/**
 * This function will create a new file on given path
 * @param filePath 
 * @param fileName 
 */

async function createNewFile(filePath: string, fileName:string){
    let flagVal = undefined

    try {
        //checking if the file exists   
        flagVal = await checkFileExists(filePath, fileName)
    
        if(!(flagVal)){
            //creting new file as it doesnot exists
            fs.closeSync(fs.openSync(`${filePath}/${fileName}`, 'w'));
            console.log(`"${fileName}" file created successfully on "${filePath}"`);
        }        
        
    } catch (err) {
        console.log(err);
    }
}


/**
 * @param fileName 
 * @param contents 
 * @param writeMode 
 * @returns //this function will write content to input file
 */
async function writeToFile (fileType: string, fileName:string, contents:any, writeMode:string) {
    try{
        //getting the filename and filepath from fileName param
        let filenm = path.parse(fileName).base;
        let filepath = path.parse(fileName).dir

        switch(fileType.toUpperCase()){

            case 'TXT':{
                //checking if the file exists. if file doesnot exists then it will be created
                await createNewFile(filepath,filenm)
                
                fs.writeFile(fileName, contents, { flag: writeMode }, err => {
                    if(err){
                        console.error(err.message)
                        return
                    }
                });

                break;
            }

            case 'CSV': {
                //checking if the file exists. if file doesnot exists then it will be created
                await createNewFile(filepath,filenm)
                let writeStream = fs.createWriteStream(fileName)
                for(let i=0;i<contents.length;i++){
                    writeStream.write(contents[i].join(',')+ '\n', () => {
                });
            }
            writeStream.end()
            break;
        }
    }
    } catch (error) {
        console.log(error);
    }
}


export default { parseJSON, writeToFile, checkFileExists, createNewFile}