import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FILE_UPLOAD_PAGE, LOGIN_PAGE } from "../utils/APP_ROUTES";

import PrivateRoute from "../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../utils/session/token";

export default function ConfigurationOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={FILE_UPLOAD_PAGE} />
          <Outlet />
        </>
      )}
    </div>
  );
}
