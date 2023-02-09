import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';


/**
 * @param textToEncrypt 
 * @param passphrase 
 * @returns this function will encrypt the input string 
 */
async function encryptWithAES(textToEncrypt:string, passphrase:string){
    try {
        return AES.encrypt(textToEncrypt, passphrase).toString();
    } catch (err) {
        console.log(err);
    }
};


/**
 * @param encryptedText 
 * @param passphrase 
 * @returns this function will retrun the decrypted string
 */
async function decryptWithAES (encryptedText:string, passphrase:string) {
    try {
        const bytes = AES.decrypt(encryptedText, passphrase);
        return bytes.toString(Utf8)
    } catch (err) {
        console.log(err);
    }};


   /**
    * @param red 
    * @param green 
    * @param blue 
    * @returns This function will return the HEX value from input RGB value
    */
async function rgbToHex(red:any,green:any,blue:any){
    try {
        const rgb = (red << 16) | (green << 8) | (blue << 0);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
    } catch (err) {
        console.log(err);
    }
}


export default { encryptWithAES, decryptWithAES, rgbToHex}