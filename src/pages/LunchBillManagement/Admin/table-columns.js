import moment from "moment";
import {USER_INFO} from "../../../utils/session/token";
import {Button} from "react-bootstrap";
const user = USER_INFO();
export const SUBSIDY_TABLE_COLUMNS=[
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
            <div>
                {(user.accessibility.includes("subsidy.update") || true) && <Button size="sm" variant="primary">

                </Button>}
            </div>
        ),
    },
]