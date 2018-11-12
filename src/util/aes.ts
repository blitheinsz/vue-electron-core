import CryptoJS from 'crypto-js';

const aeskey:any = process.env.VUE_APP_Aeskey;

// Encrypt

/**
*  var word = 18;
*   var key = 'd8cg8gVakEq9Agup'
*   result x6iDoHcQFw6qu+8LHJf1IQ==
* @param {*等待加密的字符串} word
*/

const encrypt = (word:string) => {
    if (!word) return word;

    const key = CryptoJS.enc.Utf8.parse(aeskey);
    const str = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(str, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};

const decrypt = (encrypted:string) => {
    const key = CryptoJS.enc.Utf8.parse(aeskey);
    const decryptedData = CryptoJS.AES.decrypt(encrypted, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decryptedData.toString(CryptoJS.enc.Utf8);
};

export {
    encrypt,
    decrypt
};
