// export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const server_ip = "http://192.168.7.148:9998";
// const server_ip = "http://182.163.112.207:5001";
// const server_ip = "http://192.168.7.148:5001";
const server_ip = "http://192.168.25.170:8000";

// export const BASE_URL = "http://127.0.0.1:8000/api";

// export const BASE_URL = `${server_ip}/api`;

// export const BASE_URL_FOR_MEDIA_FILE = "http://127.0.0.1:8000/media/";
export const BASE_URL_FOR_MEDIA_FILE = "http://182.163.112.207:9998/media/";
export const DATE_FORMAT = " DD-MMM-YYYY";
export const ASSESTMENT_TYPE = [
  { label: "Yearly", value: "Yearly" },
  { label: "Half Yearly", value: "half Yearly" },
];

export const YEAR_RANGE = [
  { label: new Date().getFullYear(), value: new Date().getFullYear() },
  { label: new Date().getFullYear() - 1, value: new Date().getFullYear() - 1 },
  { label: new Date().getFullYear() - 2, value: new Date().getFullYear() - 2 },
];
