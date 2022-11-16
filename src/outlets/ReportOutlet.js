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
  LOGIN_PAGE, SALARY_INCREMENT_ELIGIBLE_REPORT_URL, SALARY_PIVOT_SUMMARY_REPORT_URL,
} from "../utils/APP_ROUTES";

import PrivateRoute from "../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../utils/session/token";

export default function KpiOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={SALARY_FULL_REPORT_URL} />
          <PrivateRoute to={SALARY_PIVOT_SUMMARY_REPORT_URL} />
          <PrivateRoute to={SALARY_INCREMENT_ELIGIBLE_REPORT_URL} />
          <Outlet />
        </>
      )}
    </div>
  );
}
