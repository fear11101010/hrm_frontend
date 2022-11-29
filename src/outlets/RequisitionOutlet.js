import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN_PAGE, REQUISITION_RESOURCE_FORM, REQUISITION_RESOURCE_LIST } from "../utils/APP_ROUTES";
import PrivateRoute from "../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../utils/session/token";

export default function RequisitionOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={REQUISITION_RESOURCE_LIST} />
          <PrivateRoute to={REQUISITION_RESOURCE_FORM} />
          <Outlet />
        </>
      )}
    </div>
  );
}
