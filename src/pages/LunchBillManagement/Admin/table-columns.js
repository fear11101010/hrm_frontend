import moment from "moment";
import { USER_INFO } from "../../../utils/session/token";
import { Badge, Button } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
const user = USER_INFO();
export const SUBSIDY_TABLE_COLUMNS = (editFunc, deleteFunc) => [
  {
    name: "Serial No.",
    selector: (row, i) => i + 1,
  },
  {
    name: "Name",
    selector: (row, i) => row?.name,
  },
  {
    name: "Creation Date",
    selector: (row, i) => moment(row?.created_date).toDate(),
    cell: (row, i) => <span>{moment(row?.created_date).format("DD MMM, YYYY")}</span>,
  },
  {
    name: "Action",
    cell: (row, i) => (
      <div className="d-flex">
        {(user.accessibility.includes("subsidy.update") || true) && (
          <Button className="me-3" size="sm" variant="primary" onClick={(e) => editFunc(e, i)}>
            <FaEdit /> Edit
          </Button>
        )}
        {(user.accessibility.includes("subsidy.destroy") || true) && (
          <Button size="sm" variant="danger" onClick={(e) => deleteFunc(e, i)}>
            <FaTrash /> Delete
          </Button>
        )}
      </div>
    ),
  },
];

export const SUBSIDY_LUNCH_COST_TABLE_COLUMNS = [
  { name: "Serial No.", selector: (row, i) => i + 1 },
  { name: "Subsidy", selector: (row) => row?.subsidy_obj?.name },
  { name: "Meal Price", selector: (row) => row?.meal_price },
  { name: "Employee Amount", selector: (row) => row?.employee_amount },
  { name: "Employer Amount", selector: (row) => row?.employer_amount },
];

export const MENU_ENTRY_TABLE_COLUMNS = (addFunc, deleteFunc) => {
  const columns = [
    {
      name: "Serial No.",
      selector: (row, i) => i + 1,
    },
    {
      name: "Date",
      selector: (row, i) => moment(row?.date).format("DD MMM, YYYY"),
    },
    {
      name: "Weekday",
      selector: (row, i) => {
        console.log(row);
        return row?.weekday;
      },
    },
    {
      name: "Action",
      width: 300,
      cell: (row, i) => (
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addFunc(i);
          }}
        >
          Add or Remove Menu
        </Button>
        /*<div>
                    <div onClick={e=>addFunc(i)} className="text-secondary" style={{textDecoration:"none",cursor:"pointer",whiteSpace:'break-spaces'}}>
                        {row?.menus && row?.menus?.filter((menu)=>menu?.id)?.length>0?(
                            row?.menus?.filter((menu)=>menu?.id).map((menu)=>(<Badge bg="secondary" className="me-2">{menu.item}</Badge>))
                        ):'Click here to add menu'}
                    </div>
                </div>*/
      ),
    },
  ];
  return columns;
};
export const MENU_ENTRY_LIST_TABLE_COLUMNS = (updateFunc, deleteFunc) => [
  {
    name: "Serial No.",
    selector: (row, i) => i + 1,
  },
  {
    name: "Date",
    selector: (row, i) => moment(row?.date).format("DD MMM, YYYY"),
  },
  {
    name: "Weekday",
    selector: (row, i) => row?.weekday,
  },
  {
    name: "Add Menu",
    width: 300,
    cell: (row, i) => (
      <div>
        <div
          onClick={(e) => updateFunc(i)}
          className="text-secondary"
          style={{ textDecoration: "none", cursor: "pointer", whiteSpace: "break-spaces" }}
        >
          {row?.menus && row?.menus?.filter((menu) => menu?.id)?.length > 0
            ? row?.menus
                ?.filter((menu) => menu?.id)
                .map((menu) => (
                  <Badge bg="secondary" className="me-2">
                    {menu.item}
                  </Badge>
                ))
            : "Click here to add menu"}
        </div>
      </div>
    ),
  },
];
