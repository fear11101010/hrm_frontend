import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  ASSESTMENT_EMPLOYER_REPORT,
  LOGIN_PAGE,
  SALARY_FULL_REPORT_URL,
  SALARY_INCREMENT_ELIGIBLE_REPORT_URL,
  SALARY_INCREMENT_REPORT,
  SALARY_PIVOT_SUMMARY_REPORT_URL,
} from "../../utils/routes/app_routes/APP_ROUTES";

import PrivateRoute from "../../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../../utils/session/token";

export default function ReportOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={SALARY_FULL_REPORT_URL} />
          <PrivateRoute to={SALARY_PIVOT_SUMMARY_REPORT_URL} />
          <PrivateRoute to={SALARY_INCREMENT_ELIGIBLE_REPORT_URL} />
          <PrivateRoute to={ASSESTMENT_EMPLOYER_REPORT} />
          <PrivateRoute to={SALARY_INCREMENT_REPORT} />
          <Outlet />
        </>
      )}
    </div>
  );
}
