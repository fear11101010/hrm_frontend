import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DASHBOARD_PAGE, LOGIN_PAGE } from "../../utils/routes/app_routes/APP_ROUTES";

import PrivateRoute from "../../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../../utils/session/token";

export default function DashboardOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={DASHBOARD_PAGE} />
          <Outlet />
        </>
      )}
    </div>
  );
}
