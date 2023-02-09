//@ts-nocheck
import request from "supertest"

/**
 * @param baseURL 
 * @param endPoint 
 * @param payload 
 * @param username 
 * @param password
 * @returns //this function will return the response fetched from API with basic authentication 
 */
 async function POSTAUTH (baseURL:string,endPoint:string,payload:object,username:string,password:string) {
    try {
        return await request(baseURL.trim())
            .post(endPoint.trim())
            .auth(username,password)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(payload)
            .expect(200)
        } catch (error) {
            console.log(error);
    }
}


/**
 * @param baseURL 
 * @param endPoint 
 * @param payload 
 * @returns //this function will return the response fetched from API without authentication  
 */
async function POST(baseURL:string,endPoint:string,payload:object) {
    try {
        return await request(baseURL.trim())
            .post(endPoint.trim())
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(payload)
            .expect(200)
            // .set('Content-Length', '<calculated when request is sent>')
            // .set('Host', '<calculated when request is sent>')
    } catch (error) {
        console.log(error);
    }
}


/**
 * @param baseURL 
 * @param endPoint 
 * @param header 
 * @returns //this function will return the response fetched from API without authentication  
 */
 async function GET(baseURL:string,endPoint:string,headers:object) {
    try {
        return await request(baseURL.trim())
            .get(endPoint.trim())
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            // .set(headers)
            .set('currentUser', browser.config.webSSODummyUser)
            .expect(200)
    } catch (error) {
        console.log(error);
    }
}

export default { POSTAUTH, POST, GET }