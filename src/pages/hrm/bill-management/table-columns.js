import moment from "moment";
import {getDurations} from "../../utils/helper";
import {FaFileInvoice} from "react-icons/fa";
import {Badge} from "react-bootstrap";

export const BILL_LIST_TABLE_COLUMN =  [
  {
    name: "#",
    width: "80px",
    selector: (row, index) => index + 1,
  },
  {
    name: "Invoice Date",
    sortable: true,
    selector: (row, index) => moment(row?.invoice_date).toDate(),
    cell: (row, index) => (<span className="item-title">
      {moment(row?.invoice_date).format('DD MMM, YYYY')}
    </span>)
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
    selector: (row, index) => row?.status?'Approved':'In Progress',
    cell: (row, index) => (
        <span className="item-title">
          <Badge bg={row?.status?'success':'warning'}>{row?.status?'Approved':'In Progress'}</Badge>
    </span>
    )
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
      <a className="btn btn-primary btn-sm"><FaFileInvoice/> Invoice</a>
    </span>
    ),
  }
];
export const CONVEYANCE_LIST_TABLE =  [
  {
    name: "#",
    width: "80px",
    selector: (row, index) => index + 1,
  },
  {
    name: "Project",
    sortable: true,
    selector: (row, index) =>  row?.project?.name,
  },
  {
    name: `Employee`,
    sortable: true,
    width: "250px",
    selector: (row, index) => row?.employee?.name,
  },
  {
    name: "Invoice Code",
    sortable: true,
    selector: (row, index) => row?.invoice_code,
  },
  {
    name: `Total Amount`,
    selector: (row, index) => row?.totalamount,
  },
  {
    name: `Status`,
    sortable: true,
    selector: (row, index) => row?.status?'Approved':'In Progress',
    cell: (row, index) => (
        <span className="item-title">
          <Badge bg={row?.status?'success':'warning'}>{row?.status?'Approved':'In Progress'}</Badge>
    </span>
    )
  },
  {
    name: `Action`,
    width: "250px",
    cell: (row, index) => (
        <span className="item-title">
      <a className="btn btn-primary btn-sm"><FaFileInvoice/> Invoice</a>
    </span>
    ),
  }
];
