import moment from "moment";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DATE_FORMAT } from "../../../utils/CONSTANT";
import { USER_EDIT_PAGE } from "../../../utils/routes/app_routes/APP_ROUTES";

export const COLUMNS = [
  { name: "Username", selector: (row) => row?.username, minWidth: "250px", wrap: true },
  { name: "Name", selector: (row) => row?.first_name, minWwidth: "200px", wrap: true },
  {
    name: "Date of Joining",
    selector: (row) => row?.date_joined,
    cell: (row) => <div>{moment(row?.date_joined).format(DATE_FORMAT)}</div>,
    width: "150px",
    wrap: true,
  },
  {
    name: "Update",
    cell: (row) => (
      <div>
        <Link to={USER_EDIT_PAGE(row.id)}>
          <Button className="btn-circle">
            <i className="fe fe-edit"></i>
          </Button>
        </Link>
      </div>
    ),
    width: "150px",
    wrap: true,
  },
];

// export const COLUMNS = [
//   { Header: "ID", accessor: "id" },
//   { Header: "Username", accessor: "username" },

//   // {
//   //   name: "Group",
//   //   selector: (row) => row?.group_name,
//   //   cell: (row) => <div>{row?.group_name[0]}</div>,
//   //   width: "150px",
//   //   wrap: true,
//   // },
// ];
