import moment from "moment";
import { Button, Image } from "react-bootstrap";
import { FaFileAlt } from "react-icons/fa";
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
  { name: "Employee", selector: (row) => row?.employee?.name, minWidth: "200px", wrap: true },
  { name: "Status", selector: (row) => row?.status, width: "80px", wrap: true },
];
