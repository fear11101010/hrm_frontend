import moment from "moment";
import { DATE_FORMAT } from "../../../utils/CONSTANT";

export const columns = [
  {
    name: "Date",
    selector: (row) => row?.invoice_date,
    cell: (row) => moment(row?.invoice_date).format(DATE_FORMAT),
    width: "120px",
    wrap: true,
  },
  { name: "Invoice Code", selector: (row) => row?.invoice_code, minWidth: "200px", wrap: true },
  { name: "Project", selector: (row) => row?.project_name, minWidth: "200px", wrap: true },
  { name: "Employee", selector: (row) => row?.employee?.name, minWidth: "200px", wrap: true },
  {
    name: "Status",
    selector: (row) => row?.status,
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
        ) : (
          ""
        )}
      </>
    ),
    width: "120px",
    wrap: true,
  },
];
