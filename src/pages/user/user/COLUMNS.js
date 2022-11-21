import moment from "moment";
import { DATE_FORMAT } from "../../../utils/CONSTANT";

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
  // {
  //   name: "Group",
  //   selector: (row) => row?.group_name,
  //   cell: (row) => <div>{row?.group_name[0]}</div>,
  //   width: "150px",
  //   wrap: true,
  // },
];
