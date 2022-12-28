import moment from "moment";
import { Link } from "react-router-dom";
import { EMPLOYEE_ASSESTMENT_SINGLE_PAGE } from "../../../../utils/routes/app_routes/APP_ROUTES";
import { DATE_FORMAT } from "../../../../utils/CONSTANT";
import { Decrypt, Encrypt } from "../../../../utils/Hash";
import { USER_INFO } from "../../../../utils/session/token";

// For review-close day
const today = moment(Date.now()).format("YYYY-MM-DD");
const currTime = moment(today).valueOf();

export const columns = [
  {
    name: "Status",
    selector: (row) => row?.flag,
    cell: (row) => (
      <span>
        {row?.approve_by_sbu === 1 ? (
          <h5 className="text-success mb-0"> Approved by Head </h5>
        ) : row?.flag === 1 ? (
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
    sortable: true,
  },
  { name: "Employee ID", selector: (row) => row.employee?.employee_id, width: "150px", wrap: true, sortable: true },
  { name: "Employee Name", selector: (row) => row.employee?.name, minWidth: "200px", wrap: true, sortable: true },
  { name: "Desgination", selector: (row) => row.employee?.designation, minWidth: "200px", wrap: true, sortable: true },
  { name: "SBU", selector: (row) => row.employee?.sbu?.name, minWidth: "180px", wrap: true, sortable: true },
  {
    name: "Supervisor",
    selector: (row) => row?.employee?.supervisor?.name,
    minWidth: "250px",
    wrap: true,
    sortable: true,
  },
  {
    name: "Date of Joining",
    selector: (row) => row.employee?.date_of_joining,
    cell: (row) => moment(row.employee?.date_of_joining).format(DATE_FORMAT),
    width: "160px",
    wrap: true,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        {row?.flag === 1 && USER_INFO().group_id.split(",").includes("6") ? (
          <span></span>
        ) : (
          <>
            {/* If today is not greater than close_date then button will enable */}
            {currTime > moment(row?.review_closedate).valueOf() === false ? (
              <Link to={EMPLOYEE_ASSESTMENT_SINGLE_PAGE(row.id)}>
                {/* {console.log("/employee-assestment/" + Encrypt(row.id.toString()))} */}
                {row?.approve_by_sbu === 0 && (
                  <button className="btn btn-sm btn-rounded-circle btn-primary" title="Details">
                    <i className="fe fe-edit"></i>
                  </button>
                )}
              </Link>
            ) : (
              <>
                <h5 className="mb-0 text-center text-danger">Expiry Review</h5>
              </>
            )}
          </>
        )}
      </>
    ),
    width: "120px",
    wrap: true,
    center: true,
  },
];
