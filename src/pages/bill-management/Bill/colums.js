import moment from "moment";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL_FOR_MEDIA_FILE, DATE_FORMAT } from "../../../utils/CONSTANT";
import { USER_INFO } from "../../../utils/session/token";

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
  { name: "Employee", selector: (row) => row?.employee_name, minWidth: "200px", wrap: true },
  { name: "Status", selector: (row) => row?.status, width: "80px", wrap: true },
  {
    name: "Files",
    selector: (row) => row?.attach_files?.map((d) => d?.main_img),
    cell: (row) => (
      <div className="d-flex">
        <Image src={BASE_URL_FOR_MEDIA_FILE + row?.attach_files?.map((d) => d?.main_img)} />
      </div>
    ),
    minWidth: "200px",
    wrap: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <Link>
          <Button size="sm">Invoice</Button>
        </Link>
      </>
    ),
    minWidth: "120px",
    wrap: true,
  },
];
