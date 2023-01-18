import {Badge, Button} from "react-bootstrap";
import {FaEdit} from "react-icons/fa";
import {USER_INFO} from "../../../../../utils/session/token";

const user = USER_INFO();
export const VENDOR_LIST_TABLE_COLUMNS = (editFunc, deleteFunc) => [
    {
        name: 'Serial No.',
        selector: (row, i) => i + 1
    },
    {
        name: 'Vendor Name',
        selector: (row, i) => row?.name
    },
    {
        name: 'Branch Name',
        selector: (row, i) => row?.branch?.name,
    },
    {
        name: 'Action',
        cell: (row, i) => (
            <div className="d-flex">
                {(user.accessibility.includes("subsidy.update") || true) &&
                    <Button className="me-3" size="sm" variant="primary" onClick={e => editFunc(e, i)}>
                        <FaEdit/> Edit
                    </Button>}
                {/*{(user.accessibility.includes("subsidy.destroy") || true) && <Button size="sm" variant="primary" onClick={e=>deleteFunc(e,i)}>
                    <FaTrash/> Delete
                </Button>}*/}
            </div>
        ),
    },
];
export const VENDOR_MENU_LIST_TABLE_COLUMNS = (editFunc, deleteFunc) => [
    {
        name: 'Serial No.',
        selector: (row, i) => i + 1
    },
    {
        name: 'Item Name',
        selector: (row, i) => row?.item
    },
    {
        name: 'Vendor Name',
        selector: (row, i) => row?.vendor_data?.name
    },
    {
        name: 'Office Branch',
        selector: (row, i) => row?.office_branch?.name,
    },
    {
        name: 'Manu Status',
        cell: (row, i) => row?.active?(<Badge bg="success">
            Active
        </Badge>):(<Badge bg="danger">
            In active
        </Badge>),
    },
    {
        name: 'Price',
        selector: (row, i) => row?.price?.toFixed(2),
    },
    {
        name: 'Action',
        cell: (row, i) => (
            <div className="d-flex">
                {(user.accessibility.includes("subsidy.update") || true) &&
                    <Button className="me-3" size="sm" variant="primary" onClick={e => editFunc(e, i)}>
                        <FaEdit/> Edit
                    </Button>}
                {/*{(user.accessibility.includes("subsidy.destroy") || true) && <Button size="sm" variant="primary" onClick={e=>deleteFunc(e,i)}>
                    <FaTrash/> Delete
                </Button>}*/}
            </div>
        ),
    },
]