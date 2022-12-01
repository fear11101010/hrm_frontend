import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  ASSESTMENT_EMPLOYER_REPORT,
  LOGIN_PAGE,
  SALARY_FULL_REPORT_URL,
  SALARY_INCREMENT_ELIGIBLE_REPORT_URL,
  SALARY_INCREMENT_REPORT,
  SALARY_PIVOT_SUMMARY_REPORT_URL,
} from "../utils/APP_ROUTES";

import PrivateRoute from "../utils/routes/PrivateRoute";
import { GET_TOKEN } from "../utils/session/token";
import {CREATE_TICKET_URL} from "../utils/support/SP_APP_ROUTES";

export default function SupportOutlet() {
  return (
    <div>
      {!GET_TOKEN() ? (
        <Navigate to={LOGIN_PAGE} />
      ) : (
        <>
          <PrivateRoute to={CREATE_TICKET_URL} />
          <Outlet />
        </>
      )}
    </div>
  );
}
