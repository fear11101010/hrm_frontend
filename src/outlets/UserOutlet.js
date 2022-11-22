import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  EMPLOYEE_EDIT_PAGE,
  EMPLOYEE_LIST_PAGE,
  LOGIN_PAGE,
  USER_ADD_PAGE,
  USER_EDIT_PAGE_URL,
  USER_LIST_PAGE,
  USER_ROLE_LIST_PAGE,
  USER_ROLE_PRIVILEGE_PAGE_URL,
} from "../utils/APP_ROUTES";

import PrivateRoute from "../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../utils/session/token";

export default function UserOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={USER_LIST_PAGE} />
          <PrivateRoute to={USER_ADD_PAGE} />
          <PrivateRoute to={USER_EDIT_PAGE_URL} />
          <PrivateRoute to={USER_ROLE_LIST_PAGE} />
          <PrivateRoute to={USER_ROLE_PRIVILEGE_PAGE_URL} />
          <PrivateRoute to={EMPLOYEE_LIST_PAGE} />
          <PrivateRoute to={EMPLOYEE_EDIT_PAGE} />
          <Outlet />
        </>
      )}
    </div>
  );
}
