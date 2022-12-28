import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  EMPLOYEE_ASSESTMENT_PAGE,
  EMPLOYEE_PERFORMANCE_PAGE,
  KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE,
  KPI_ASSESTMENT_PAGE,
  KPI_EMPLOYEE_ASSIGN_PAGE,
  KPI_PERMORMANCE_FORM_PAGE,
  KPI_PERMORMER_ASSESTMENT_PAGE,
  LOGIN_PAGE,
} from "../../utils/routes/app_routes/APP_ROUTES";

import PrivateRoute from "../../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../../utils/session/token";

export default function KpiOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={KPI_EMPLOYEE_ASSIGN_PAGE} />
          <PrivateRoute to={KPI_PERMORMANCE_FORM_PAGE} />
          <PrivateRoute to={KPI_ASSESTMENT_PAGE} />
          <PrivateRoute to={KPI_PERMORMER_ASSESTMENT_PAGE} />
          <PrivateRoute to={KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE} />
          <PrivateRoute to={EMPLOYEE_ASSESTMENT_PAGE} />
          <PrivateRoute to={EMPLOYEE_PERFORMANCE_PAGE} />
          <Outlet />
        </>
      )}
    </div>
  );
}
