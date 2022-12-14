import axios from "axios";
import {BASE_URL, BASE_URL_FOR_MEDIA_FILE} from "../CONSTANT";
import { GET_TOKEN } from "../session/token";

let base_url = BASE_URL;
let base_url_media = BASE_URL_FOR_MEDIA_FILE;

// @Description   : Only for login as its doesnt require ant token or authentication credentials
// @Accessibility : PUBLIC
// @Author        : Safa
export const HTTP_LOGIN = axios.create({
  baseURL: base_url,
  timeout: 6000,
  headers: { "Content-Type": "application/json" },
});

// @Description   : Used for private routing where each module,submodule are privileged.
// @Accessibility : PRIVATE
// @Author        : Safa
export const API = axios.create({
  baseURL: base_url,
  // timeout: 6000,
  headers: { "Content-Type": "application/json" },
});
export const API_MEDIA = axios.create({
  baseURL: base_url_media,
  // timeout: 6000,
  responseType:'blob',
});

////////////////////////////////////////
// @Description   : Interceptor for API.
////////////////////////////////////////

//Interceptor Request
API.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + GET_TOKEN();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Interceptor Response
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.log("Please Check Your Internet Connection");
    }
    return Promise.reject(error);
  }
);
