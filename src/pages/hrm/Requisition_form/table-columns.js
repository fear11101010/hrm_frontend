import { Link } from "react-router-dom";
import { REQUISITION_LIST_PAGE } from "../../../utils/routes/app_routes/APP_ROUTES";
import React from "react";
import moment from "moment";
import { DATE_FORMAT } from "../../../utils/CONSTANT";
import Badge from "react-bootstrap/Badge";

export const kpiPerformanceFormColumns = [
  {
    name: "#",
    selector: (row, index) => index + 1,
    width: "50px",
  },
  {
    name: "Date",
    selector: (row) => row.created_date,
    cell: (row) => moment(row?.created_date).format(DATE_FORMAT),
    width: "130px",
  },
  {
    name: "Status",
    selector: (row) => row?.status,
    cell: (row) => (
      <>
        {row?.status === 1 ? (
          <Badge bg="warning">
            <h5 className="mb-0">Pending</h5>
          </Badge>
        ) : row?.status === 2 ? (
          <Badge bg="info">
            <h5 className="mb-0">In Progress</h5>
          </Badge>
        ) : (
          ""
        )}
      </>
    ),
    width: "180px",
    center: true,
  },
  {
    name: "Name",
    selector: (row) => row.created_by.first_name,
    wrap: true,
    width: "240px",
  },
  {
    name: "SBU",
    selector: (row) => row?.sbu?.name,
    width: "180px",
  },
  {
    name: "Project",
    selector: (row) => row?.project?.name,
    wrap: true,
    width: "250px",
  },
  {
    name: "Project Head",
    selector: (row) => row?.project_head?.name,
    wrap: true,
    width: "250px",
  },
  {
    name: "Action",
    cell: (row) => (
      <div className="d-flex justify-content-center align-items-center w-100">
        <Link
          className={`btn btn-rounded-circle btn-sm btn-primary ${row.flag ? "disabled" : ""}`}
          to={REQUISITION_LIST_PAGE(row.id)}
        >
          <i className="fe fe-file-text"></i>
        </Link>
      </div>
    ),
    width: "80px",
    wrap: true,
  },
];
