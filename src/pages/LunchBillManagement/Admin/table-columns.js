import moment from "moment";
import {USER_INFO} from "../../../utils/session/token";
import {Badge, Button} from "react-bootstrap";
import {FaEdit, FaTrash} from "react-icons/fa";
const user = USER_INFO();
export const SUBSIDY_TABLE_COLUMNS=(editFunc,deleteFunc)=>[
    {
        name:'Serial No.',
        selector:(row,i)=>i+1
    },
    {
        name:'Name',
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
                {(user.accessibility.includes("subsidy.destroy") || true) && <Button size="sm" variant="primary" onClick={e=>deleteFunc(e,i)}>
                    <FaTrash/> Delete
                </Button>}
            </div>
        ),
    },
]
export const MENU_ENTRY_TABLE_COLUMNS=(addFunc,deleteFunc)=>[
    {
        name:'Serial No.',
        selector:(row,i)=>i+1
    },
    {
        name:'Date',
        selector:(row,i)=>moment(row?.date).format('DD MMM, YYYY'),
    },
    {
        name:'Weekday',
        selector:(row,i)=>row?.weekday,
    },
    {
        name:'Add Menu',
        width:300,
        cell:(row,i)=>(
            <div>
                <div onClick={e=>addFunc(i)} className="text-secondary" style={{textDecoration:"none",cursor:"pointer",whiteSpace:'break-spaces'}}>
                    {row?.menus && row?.menus?.filter((menu)=>menu?.id)?.length>0?(
                                row?.menus?.filter((menu)=>menu?.id).map((menu)=>(<Badge bg="secondary" className="me-2">{menu.item}</Badge>))
                    ):'Click here to add menu'}
                </div>
            </div>
        ),
    },
]
export const MENU_ENTRY_LIST_TABLE_COLUMNS=(updateFunc,deleteFunc)=>[
    {
        name:'Serial No.',
        selector:(row,i)=>i+1
    },
    {
        name:'Date',
        selector:(row,i)=>moment(row?.date).format('DD MMM, YYYY'),
    },
    {
        name:'Weekday',
        selector:(row,i)=>row?.weekday,
    },
    {
        name:'Add Menu',
        width:300,
        cell:(row,i)=>(
            <div>
                <div onClick={e=>updateFunc(i)} className="text-secondary" style={{textDecoration:"none",cursor:"pointer",whiteSpace:'break-spaces'}}>
                    {row?.menus && row?.menus?.filter((menu)=>menu?.id)?.length>0?(
                                row?.menus?.filter((menu)=>menu?.id).map((menu)=>(<Badge bg="secondary" className="me-2">{menu.item}</Badge>))
                    ):'Click here to add menu'}
                </div>
            </div>
        ),
    },
]