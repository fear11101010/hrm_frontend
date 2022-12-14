import moment from "moment";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DATE_FORMAT } from "../../../utils/CONSTANT";
import { USER_INFO } from "../../../utils/session/token";

export const columns = [
  { name: "Date", selector: (row) => row.employee?.employee_id, width: "120px", wrap: true },
  { name: "Invoice Code", selector: (row) => row.employee?.name, minWidth: "200px", wrap: true },
  { name: "Project", selector: (row) => row.employee?.designation, minWidth: "200px", wrap: true },
  { name: "Employee", selector: (row) => row.employee?.sbu?.name, minWidth: "120px", wrap: true },
  { name: "Status", selector: (row) => row.employee?.sbu?.name, minWidth: "120px", wrap: true },
  { name: "Files", selector: (row) => row.employee?.sbu?.name, minWidth: "120px", wrap: true },
  {
    name: "Action",
    cell: (row) => (
      <>
        <Link>
          <Button size="sm" className="btn-rounded-circle">
            Invoice
          </Button>
        </Link>
      </>
    ),
    minWidth: "120px",
    wrap: true,
  },
];
