import moment from "moment";
import { getDurations } from "../../utils/helper";
import { FaEdit, FaFileInvoice } from "react-icons/fa";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CONVEYANCE_EDIT_PAGE_URL } from "../../utils/routes/app_routes/BILL_APP_ROUTE";

export const BILL_LIST_TABLE_COLUMN = [
  {
    name: "#",
    width: "80px",
    selector: (row, index) => index + 1,
  },
  {
    name: "Invoice Date",
    sortable: true,
    selector: (row, index) => moment(row?.invoice_date).toDate(),
    cell: (row, index) => <span className="item-title">{moment(row?.invoice_date).format("DD MMM, YYYY")}</span>,
  },
  {
    name: "Invoice Code",
    sortable: true,
    selector: (row, index) => row?.invoice_code,
  },
  {
    name: "Project",
    sortable: true,
    width: "150px",
    selector: (row, index) => row?.project?.name,
  },
  {
    name: `Employee`,
    sortable: true,
    width: "250px",
    selector: (row, index) => row?.employee?.name,
  },
  {
    name: `Status`,
    sortable: true,
    selector: (row, index) => (row?.status ? "Approved" : "In Progress"),
    cell: (row, index) => (
      <span className="item-title">
        <Badge bg={row?.status ? "success" : "warning"}>{row?.status ? "Approved" : "In Progress"}</Badge>
      </span>
    ),
  },
  {
    name: `Files`,
    cell: (row, index) => (
      <span className="item-title">
        <a className="btn btn-primary btn-sm">See Attachment</a>
      </span>
    ),
  },
  {
    name: `Action`,
    width: "250px",
    cell: (row, index) => (
      <span className="item-title">
        <a className="btn btn-primary btn-sm">
          <FaFileInvoice /> Invoice
        </a>
      </span>
    ),
  },
];
