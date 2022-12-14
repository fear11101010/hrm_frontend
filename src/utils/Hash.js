var CryptoJS = require("crypto-js");

export const Encrypt = (txt) => encodeURIComponent(CryptoJS.AES.encrypt(txt, "oblivionorb").toString());

// CryptoJS.AES.encrypt(txt, "Secret Passphrase");

export const Decrypt = (txt) => {
  const bytes = CryptoJS.AES.decrypt(txt, "oblivionorb");
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return decodeURIComponent(originalText);
};
