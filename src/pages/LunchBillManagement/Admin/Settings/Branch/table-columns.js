import moment from "moment";
import {Button} from "react-bootstrap";
import {FaEdit, FaTrash} from "react-icons/fa";
import {USER_INFO} from "../../../../../utils/session/token";
const user = USER_INFO();
export const BRANCH_TABLE_COLUMNS=(editFunc,deleteFunc)=>[
    {
        name:'Serial No.',
        selector:(row,i)=>i+1
    },
    {
        name:'Branch Name',
        selector:(row,i)=>row?.name
    },
    {
        name:'Creation Date',
        selector:(row,i)=>moment(row?.created_date).toDate(),
        cell:(row,i)=>(<span>{moment(row?.created_date).format('DD MMM, YYYY')}</span>),
    },
    {
        name:'Action',
        cell:(row,i)=>(
            <div className="d-flex">
                {(user.accessibility.includes("subsidy.update") || true) && <Button className="me-3" size="sm" variant="primary" onClick={e=>editFunc(e,i)}>
                    <FaEdit/> Edit
                </Button>}
                {/*{(user.accessibility.includes("subsidy.destroy") || true) && <Button size="sm" variant="primary" onClick={e=>deleteFunc(e,i)}>
                    <FaTrash/> Delete
                </Button>}*/}
            </div>
        ),
    },
]