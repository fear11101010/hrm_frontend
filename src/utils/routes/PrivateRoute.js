import { Navigate } from "react-router-dom";
import { LOGIN_PAGE } from "./app_routes/APP_ROUTES";
import { GET_TOKEN } from "../session/token";

export default function PrivateRoute({ children }) {
  return GET_TOKEN() ? children : <Navigate to={LOGIN_PAGE} />;
}
