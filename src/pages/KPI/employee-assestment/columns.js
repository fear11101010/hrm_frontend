import moment from "moment";
import { Link } from "react-router-dom";
import { EMPLOYEE_ASSESTMENT_SINGLE_PAGE } from "../../../utils/APP_ROUTES";
import { DATE_FORMAT } from "../../../utils/CONSTANT";
import { USER_INFO } from "../../../utils/session/token";

export const columns = [
  {
    name: "Status",
    selector: (row) => row?.flag,
    cell: (row) => (
      <span>
        {row?.flag === 1 ? (
          <h5 className="text-success mb-0"> Complete </h5>
        ) : row?.flag === 2 ? (
          <h5 className="text-primary mb-0"> Supervisor Review </h5>
        ) : (
          <h5 className="text-info mb-0"> In Progress </h5>
        )}
      </span>
    ),
    width: "140px",
    wrap: true,
  },
  { name: "Employee ID", selector: (row) => row.employee?.employee_id, width: "120px", wrap: true },
  { name: "Employee Name", selector: (row) => row.employee?.name, minWidth: "120px", wrap: true },
  { name: "Desgination", selector: (row) => row.employee?.designation, minWidth: "120px", wrap: true },
  { name: "SBU", selector: (row) => row.employee?.sbu?.name, minWidth: "120px", wrap: true },
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
        {row?.flag === 1 && USER_INFO().group_id.split(",").includes("6") ? (
          <span></span>
        ) : (
          <Link to={EMPLOYEE_ASSESTMENT_SINGLE_PAGE(row.id)}>
            <button className="btn btn-sm btn-rounded-circle btn-primary" title="Details">
              <i className="fe fe-edit"></i>
            </button>
          </Link>
        )}
      </>
    ),
    width: "80px",
    wrap: true,
    center: true,
  },
];
