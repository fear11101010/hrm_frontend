var CryptoJS = require("crypto-js");

export const Encrypt = (txt) => encodeURIComponent(CryptoJS.AES.encrypt(txt, "oblivionorb").toString());

// CryptoJS.AES.encrypt(txt, "Secret Passphrase");

export const Decrypt = (txt) => {
  const bytes = CryptoJS.AES.decrypt(txt, "oblivionorb");
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return decodeURIComponent(originalText);
};

export const _Encrypt = (txt) => {
  const key = CryptoJS.lib.WordArray.random(16);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(txt, key, {
    iv,
  });
  const data = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(encrypted.toString()));
  return CryptoJS.enc.Hex.stringify(key) + CryptoJS.enc.Hex.stringify(iv) + data;
};

export const _Decode = (txt) => {
  if (!txt) return "";
  const a = CryptoJS.enc.Hex.parse(txt.slice(0, 32)); //KEY
  const b = CryptoJS.enc.Hex.parse(txt.slice(32, 64)); //iv
  const c = txt.slice(64); //main data
  const params = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(c),
  });
  const bytes = CryptoJS.AES.decrypt(params, a, {
    iv: b,
  });
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
