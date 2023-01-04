import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PrivateRoute from "../../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../../utils/session/token";
import { LOGIN_PAGE } from "../../utils/routes/app_routes/APP_ROUTES";
import { LUNCH_ORDER_PAGE } from "../../utils/routes/app_routes/LUNCH_ROUTES";

export default function LunchOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={LUNCH_ORDER_PAGE} />
          <Outlet />
        </>
      )}
    </div>
  );
}
