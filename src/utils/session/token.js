import jwt_decode from "jwt-decode";

export default function SET_TOKEN(token) {
  localStorage.setItem("token", token);
}

export const GET_TOKEN = () => {
  return localStorage.getItem("token") || null;
};

export const REMOVE_TOKEN = () => {
  return localStorage.removeItem("token");
};

export const USER_INFO = () => {
  const token = GET_TOKEN();
  if (token) {
    var decoded = jwt_decode(token);
    return decoded;
  }
};
