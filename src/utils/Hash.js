var CryptoJS = require("crypto-js");
export const Encrypt = (txt) => CryptoJS.AES.encrypt(txt, "mySecretKey").toString();

export const Decrypt = (txt) => {
  const bytes = CryptoJS.AES.decrypt(txt, "mySecretKey");
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
