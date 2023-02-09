const AES = require('crypto-js/aes')
const Utf8 = require('crypto-js/enc-utf8')

async function encryptWithAES(textToEncrypt, passphrase){
    try {
        return AES.encrypt(textToEncrypt, passphrase).toString();
    } catch (err) {
        console.log(err);
    }
};


async function decryptWithAES (encryptedText, passphrase) {
    try {
        const bytes = AES.decrypt(encryptedText, passphrase);
        return bytes.toString(Utf8)
    } catch (err) {
        console.log(err);
}};

console.log(encryptWithAES("admin123","MSJnPeIon6nzdLewGV60xWqi_d-phDA33"));
console.log(decryptWithAES("U2FsdGVkX19edRgV6t2vGwBPwGXzcxX9eVajgXsPTLo=","MSJnPeIon6nzdLewGV60xWqi_d-phDA33"));