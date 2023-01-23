import moment from "moment";
import {USER_INFO} from "../../../../../utils/session/token";
import {Badge, Button} from "react-bootstrap";
import {FaEdit, FaTrash} from "react-icons/fa";
const user = USER_INFO();
export const ADMIN_MENU_ENTRY_TABLE_COLUMNS=(editFunc,deleteFunc)=>[
    {
        name:'Serial No.',
        selector:(row,i)=>i+1
    },
    {
        name:'Date',
        selector:(row,i)=>row?.date,
        cell:(row,i)=><span>{moment(row?.date).format('DD MMM, YYYY')}</span>
    },
    {
        name:'Weekday',
        selector:(row,i)=>row?.weekday,
    },
    {
        name:'Office Branch',
        selector:(row,i)=>row?.officeBranch,
    },
    {
        name:'Vendor',
        selector:(row,i)=>row?.vendor,
    },
    {
        name:'Menus',
        width:500,
        cell:(row,i)=><div style={{textDecoration:"none",cursor:"pointer",whiteSpace:'break-spaces'}}>
            {row?.menus?.map(menu=>(
                <Badge bg="secondary" className="me-2">{menu?.item}</Badge>
            ))}
        </div>,
    },
    {
        name:'Action',
        cell:(row,i)=>(
            <div className="d-flex">
                {(user.accessibility.includes("subsidy.update") || true) && <Button disabled={row?.disabled} className="me-3" size="sm" variant="primary" onClick={e=>editFunc(e,i)}>
                    <FaEdit/> Edit
                </Button>}
                {(user.accessibility.includes("subsidy.destroy") || true) && <Button disabled={row?.disabled} size="sm" variant="primary" onClick={e=>deleteFunc(e,i)}>
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