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
    cell: (row) => <>{row?.status}</>,
  },
];
