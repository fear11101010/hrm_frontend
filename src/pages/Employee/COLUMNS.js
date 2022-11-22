import moment from "moment";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { EMPLOYEE_EDIT_PAGE } from "../../utils/APP_ROUTES";
import { DATE_FORMAT } from "../../utils/CONSTANT";

export const COLUMNS = [
  { name: "Name", selector: (row) => row?.name, minWidth: "120px", wrap: true },
  { name: "ID", selector: (row) => row?.employee_id, width: "100px", wrap: true },
  { name: "Designation", selector: (row) => row?.designation, minWidth: "120px", wrap: true },
  {
    name: "Joining Date",
    selector: (row) => row?.date_of_joining,
    cell: (row) => <p className="mb-0">{moment(row?.date_of_joining).format(DATE_FORMAT)}</p>,
    width: "130px",
    wrap: true,
  },
  { name: "SBU", selector: (row) => row?.sbu?.name, minWidth: "100px", wrap: true },
  { name: "Sub SBU", selector: (row) => row?.sub_sbu?.name, minWidth: "120px", wrap: true },

  {
    name: "Edit",
    cell: (row) => (
      <>
        <Link to={EMPLOYEE_EDIT_PAGE(row.id)}>
          <Button size="sm" className="btn-rounded-circle" title={`Edit`}>
            <i className="fe fe-edit"></i>
          </Button>
        </Link>
      </>
    ),
    width: "80px",
    wrap: true,
    center: true,
  },
];