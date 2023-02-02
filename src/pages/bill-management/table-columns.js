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
  {
    name: `Invoice`,
    width: "120px",
    cell: (row, index) => (
      <Button size="sm">
        <FaFileInvoice /> Invoice
      </Button>
    ),
    center: true,
  },
  {
    name: `Edit`,
    width: "80px",
    cell: (row, index) => (
      <Link to={CONVEYANCE_EDIT_PAGE_URL(row.id)}>
        <Button size="sm">
          <FaEdit />
        </Button>
      </Link>
    ),
    center: true,
  },
];
