import { Link } from "react-router-dom";
import {
  EMPLOYEE_ASSESTMENT_SINGLE_PAGE,
  EMPLOYEE_PERFORMANCE_VIEW,
  KPI_PERMORMANCE_FORM_PAGE,
} from "../../../utils/APP_ROUTES";
import React from "react";

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
  },
  {
    name: "Designation",
    selector: (row) => row.employee.designation,
  },
  {
    name: "Action",
    cell: (row) => (
      <div className="d-flex justify-content-center align-items-center w-100">
        <Link
          className={`btn btn-rounded-circle btn-sm btn-primary ${row.flag ? "disabled" : ""}`}
          to={KPI_PERMORMANCE_FORM_PAGE(row.id)}
        >
          <i className="fe fe-file-text"></i>
        </Link>
      </div>
    ),
    width: "80px",
    wrap: true,
  },
];
