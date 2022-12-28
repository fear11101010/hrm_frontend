import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { BILL_ADD, BILL_LIST, FILE_UPLOAD_PAGE, LOGIN_PAGE } from "../../utils/routes/app_routes/APP_ROUTES";

import PrivateRoute from "../../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../../utils/session/token";

export default function BillOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={BILL_LIST} />
          <PrivateRoute to={BILL_ADD} />
          <Outlet />
        </>
      )}
    </div>
  );
}
