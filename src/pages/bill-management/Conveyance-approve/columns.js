import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CONVEYANCE_EDIT_PAGE_URL } from "../../../utils/routes/app_routes/BILL_APP_ROUTE";

export const CONVEYANCE_LIST_TABLE = [
  {
    name: `Employee`,
    width: "250px",
    selector: (row, index) => row?.employee?.name,
  },
  {
    name: `ID`,
    width: "120px",
    selector: (row, index) => row?.employee?.employee_id,
  },
  {
    name: "Project",
    sortable: true,
    selector: (row, index) => row?.project?.name,
    width: "180px",
  },

  {
    name: "Invoice Code",
    selector: (row, index) => row?.invoice_code,
    width: "180px",
  },
  {
    name: `Total Amount`,
    selector: (row, index) => row?.totalamount,
    width: "150px",
    right: true,
  },
  {
    name: `Status`,
    sortable: true,
    selector: (row, index) => row?.status,
    cell: (row) => (
      <>
        {row?.status === 1 ? (
          <span className="px-2 py-1 bg-primary rounded text-white" style={{ fontSize: "12px" }}>
            In Progress
          </span>
        ) : row?.status === 2 ? (
          <span className="px-2 py-1 bg-success rounded text-white" style={{ fontSize: "12px" }}>
            Approved
          </span>
        ) : row?.status === 3 ? (
          <span className="px-2 py-1 bg-warning rounded text-dark" style={{ fontSize: "12px" }}>
            Under Review
          </span>
        ) : row?.status === 4 ? (
          <span className="px-2 py-1 bg-danger rounded text-white" style={{ fontSize: "12px" }}>
            Rejected
          </span>
        ) : row?.status === 5 ? (
          <span className="px-2 py-1 bg-warning rounded text-dark" style={{ fontSize: "12px" }}>
            Checker Forward
          </span>
        ) : row?.status === 6 ? (
          <span className="px-2 py-1 bg-success rounded text-whited" style={{ fontSize: "12px" }}>
            Checked
          </span>
        ) : (
          ""
        )}
      </>
    ),
    width: "140px",
  },
  {
    name: "Forwarded To",
    selector: (row) => row?.forwarded_to?.first_name,
    minWidth: "150px",
    wrap: true,
  },
];
