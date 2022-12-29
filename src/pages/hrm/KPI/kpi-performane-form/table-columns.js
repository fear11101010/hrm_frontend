import { Link } from "react-router-dom";
import { EMPLOYEE_PERFORMANCE_VIEW, KPI_PERMORMANCE_FORM_PAGE } from "../../../../utils/routes/app_routes/APP_ROUTES";
import React from "react";
import { USER_INFO } from "../../../../utils/session/token";

const user = USER_INFO();
export const kpiPerformanceFormColumns = [
  {
    name: "#",
    selector: (row, index) => index + 1,
    width: "80px",
  },
  {
    name: "Year",
    selector: (row) => row.year,
    width: "100px",
  },
  {
    name: "ID",
    cell: (row) => <Link to={EMPLOYEE_PERFORMANCE_VIEW(row.id)}>{row.employee.employee_id}</Link>,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.employee.name,
    wrap: true,
  },
  {
    name: "Designation",
    selector: (row) => row.employee.designation,
  },
  {
    name: "SBU",
    selector: (row) => row?.employee?.sbu?.name,
  },
  {
    name: "Supervisor",
    selector: (row) => row?.employee?.supervisor?.name,
    wrap: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <div className="d-flex justify-content-center align-items-center w-100">
        {user.accessibility.includes("kpi_performance.retrieve") && (
          <Link
            className={`btn btn-rounded-circle btn-sm btn-primary ${row.flag ? "disabled" : ""}`}
            to={KPI_PERMORMANCE_FORM_PAGE(row.id)}
          >
            <i className="fe fe-file-text"></i>
          </Link>
        )}
      </div>
    ),
    width: "80px",
    wrap: true,
  },
];
