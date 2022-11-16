import moment from "moment";
import { Link } from "react-router-dom";
import { EMPLOYEE_PERFORMANCE_SINGLE_PAGE } from "../../../utils/APP_ROUTES";
import { DATE_FORMAT } from "../../../utils/CONSTANT";

export const columns = [
  {
    name: "Status",
    selector: (row) => row.employee?.status,
    cell: (row) => (
      <span>
        {row.employee?.status === 1 ? (
          <h5 className="text-info mb-0"> In Progress </h5>
        ) : (
          <span className="text-success mb-0"> Complete </span>
        )}
      </span>
    ),
    width: "110px",
    wrap: true,
  },
  { name: "Employee ID", selector: (row) => row.employee?.employee_id, width: "120px", wrap: true },
  { name: "Employee Name", selector: (row) => row.employee?.name, minWidth: "120px", wrap: true },
  { name: "Desgination", selector: (row) => row.employee?.designation, minWidth: "120px", wrap: true },
  {
    name: "Date of Joining",
    selector: (row) => row.employee?.date_of_joining,
    cell: (row) => moment(row.employee?.date_of_joining).format(DATE_FORMAT),
    width: "140px",
    wrap: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <Link to={EMPLOYEE_PERFORMANCE_SINGLE_PAGE(row.id)}>
          <button className="btn btn-sm btn-rounded-circle btn-primary" title="Details">
            <i className="fe fe-edit"></i>
          </button>
        </Link>
      </>
    ),
    width: "80px",
    wrap: true,
    center: true,
  },
];
