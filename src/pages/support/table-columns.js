import moment from "moment";
import {Link} from "react-router-dom";
import {EDIT_TICKET_URL_FUNC, VIEW_TICKET_URL_FUNC} from "../../utils/support/SP_APP_ROUTES";
import {FaEdit, FaEye, FaFile, FaForward} from "react-icons/fa";
import {Button, ButtonGroup, DropdownButton,Dropdown} from "react-bootstrap";
import {USER_INFO} from "../../utils/session/token";
const user = USER_INFO();
const getStatus = (statusId)=>{
    switch (statusId){
        case 1:
            return 'bg-secondary'
        case 2:
        case 8:
            return 'bg-warning'
        case 7:
        case 3:
            return 'bg-primary'
        case 4:
            return 'bg-success'
        case 5:
            return 'bg-danger'
        case 6:
            return 'bg-info'
    }
}
export const MY_TICKET_TABLE_COLUMNS = (func)=> [
    {
        name:'SL. No',
        selector:(_,index)=>index+1,
        sortable:true
    },
    {
        name:'Ticket No',
        selector:(row,index)=>row?.ticket_no,
        sortable:true
    },
    {
        name:'Title',
        selector:(row,index)=>row?.heading,
        sortable:true
    },
    {
        name:'Rising Date',
        selector:(row,index)=>row?.occurring_date?moment(row?.occurring_date).toDate():'',
        cell:(row,index)=>(<span>{row?.occurring_date?moment(row?.occurring_date).format('DD MMM, YYYY'):''}</span>),
        sortable:true
    },
    {
        name:'Status',
        selector:(row,index)=>row?.current_status?.name,
        cell:(row,index)=>(<span className={`badge ${getStatus(row?.current_status?.id)}`}>{row?.current_status?.name}</span>),
        sortable:true
    },
    {
        name: 'Comment',
        selector: (row, index) => row?.request_resolved_detail?.comments?row?.request_resolved_detail?.comments:'',
        sortable: true
    },
    {
        name: 'Resolving Date',
        selector: (row, index) => row?.request_resolved_detail?.created_at?moment(row?.request_resolved_detail?.created_at).toDate():'',
        cell: (row, index) => (
            <span>{row?.request_resolved_detail?.created_at?moment(row?.request_resolved_detail?.created_at).format('DD MMM, YYYY') : ''}</span>),
        sortable: true
    },
    {
        name:'Action',
        cell:(row,index)=>(
            <div className="d-flex justify-content-center align-items-center">
                {(row?.current_status?.id===1 && user.accessibility.includes("EditTicket")) && (
                    <Link to={EDIT_TICKET_URL_FUNC(row?.id)} disabled={true} style={{marginRight:'10px'}} className="btn btn-primary btn-sm d-flex justify-content-center align-items-center">
                        <FaEdit/>&nbsp;Edit
                    </Link>
                )}
                <Button onClick={e=>func(row?.id)} className="btn btn-primary btn-sm d-flex justify-content-center align-items-center">
                    <FaEye/>&nbsp;View
                </Button>
            </div>
        ),
        sortable:true
    },
]
export const STATUS_WISE_TICKET_TABLE_COLUMNS = (func)=> [
    {
        name:'SL. No',
        selector:(_,index)=>index+1,
        sortable:true
    },
    {
        name:'Ticket No',
        selector:(row,index)=>row?.ticket_no,
        sortable:true
    },
    {
        name:'Title',
        selector:(row,index)=>row?.heading,
        sortable:true
    },
    {
        name:'Rising Date',
        selector:(row,index)=>row?.occurring_date?moment(row?.occurring_date).toDate():'',
        cell:(row,index)=>(<span>{row?.occurring_date?moment(row?.occurring_date).format('DD MMM, YYYY'):''}</span>),
        sortable:true
    },
    {
        name:'Status',
        selector:(row,index)=>row?.current_status?.name,
        cell:(row,index)=>(<span className={`badge ${getStatus(row?.current_status?.id)}`}>{row?.current_status?.name}</span>),
        sortable:true
    },
    {
        name: 'Comment',
        selector: (row, index) => row?.request_resolved_detail?.comments?row?.request_resolved_detail?.comments:'',
        sortable: true
    },
    {
        name: 'Resolving Date',
        selector: (row, index) => row?.request_resolved_detail?.created_at?moment(row?.request_resolved_detail?.created_at).toDate():'',
        cell: (row, index) => (
            <span>{row?.request_resolved_detail?.created_at?moment(row?.request_resolved_detail?.created_at).format('DD MMM, YYYY') : ''}</span>),
        sortable: true
    },
    {
        name:'Action',
        cell:(row,index)=>(
            <div className="d-flex justify-content-center align-items-center">
                <Button onClick={e=>func(row?.id)} className="btn btn-primary btn-sm d-flex justify-content-center align-items-center">
                    <FaEye/>&nbsp;View
                </Button>
            </div>
        ),
        sortable:true
    },
]
export const ALL_TICKET_TABLE_COLUMNS = (viewFunc)=> {
    return [
        {
            name: 'SL. No',
            selector: (_, index) => index + 1,
            sortable: true
        },
        {
            name: 'Ticket No',
            selector: (row, index) => row?.ticket_no,
            sortable: true
        },
        {
            name: 'Employee Name',
            selector: (row, index) => row?.created_by?.first_name,
            sortable: true
        },
        {
            name: 'Title',
            selector: (row, index) => row?.heading,
            sortable: true
        },
        {
            name: 'Rising Date',
            selector: (row, index) => row?.occurring_date ? moment(row?.occurring_date).toDate() : '',
            cell: (row, index) => (
                <span>{row?.occurring_date ? moment(row?.occurring_date).format('DD MMM, YYYY') : ''}</span>),
            sortable: true
        },
        {
            name: 'Status',
            selector: (row, index) => row?.current_status?.name,
            cell: (row, index) => (<span
                className={`badge ${getStatus(row?.current_status?.id)}`}>{row?.current_status?.name}</span>),
            sortable: true
        },
        {
            name: 'Comment',
            selector: (row, index) => row?.request_resolved_detail?.comments?row?.request_resolved_detail?.comments:'',
            sortable: true
        },
        {
            name: 'Resolving Date',
            selector: (row, index) => row?.request_resolved_detail?.created_at?moment(row?.request_resolved_detail?.created_at).toDate():'',
            cell: (row, index) => (
                <span>{row?.request_resolved_detail?.created_at?moment(row?.request_resolved_detail?.created_at).format('DD MMM, YYYY') : ''}</span>),
            sortable: true
        },
        {
            name: 'Action',
            cell: (row, index) => (
                <div className="d-flex justify-content-center align-items-center">
                    <Dropdown
                        align="end"
                        as="a"
                        title="Select an Action"
                        id="dropdown-menu-align-end"
                        size="sm"
                        variant="light"
                        onSelect={e => viewFunc(e, row?.id)}
                    >
                        <Dropdown.Toggle variant="light" className="fw-bold" size="sm" id="dropdown-basic">
                            Action
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {((!row?.is_forward || row?.approve_status) && ([1,2].indexOf(row?.request_type?.id)>=0||[1,2].indexOf(row?.request_type?.id)<0)) && (<Dropdown.Item eventKey={1}>
                                <FaEdit/> Update Status
                            </Dropdown.Item>)}
                            <Dropdown.Item eventKey={2}>
                                <FaEye/> View Detail
                            </Dropdown.Item>
                            {
                               ((row?.request_type?.id===1 || row?.request_type?.id===2) && row?.current_status?.id!==1 && !row?.is_forward) && (
                                    <Dropdown.Item eventKey={3}>
                                        <FaForward/> Forward To
                                    </Dropdown.Item>
                                )
                            }
                            {
                                ((row?.request_type?.id===1 || row?.request_type?.id===2) && row?.is_forward) && (
                                    <Dropdown.Item eventKey={4}>
                                        <FaFile/> Inspection Report
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )
        },
    ]
}
export const OTHER_TICKET_TABLE_COLUMNS = (viewFunc)=> {
    return [
        {
            name: 'SL. No',
            selector: (_, index) => index + 1,
            sortable: true
        },
        {
            name: 'Ticket No',
            selector: (row, index) => row?.ticket_no,
            sortable: true
        },
        {
            name: 'Employee Name',
            selector: (row, index) => row?.created_by?.first_name,
            sortable: true
        },
        {
            name: 'Title',
            selector: (row, index) => row?.heading,
            sortable: true
        },
        {
            name: 'Rising Date',
            selector: (row, index) => row?.occurring_date ? moment(row?.occurring_date).toDate() : '',
            cell: (row, index) => (
                <span>{row?.occurring_date ? moment(row?.occurring_date).format('DD MMM, YYYY') : ''}</span>),
            sortable: true
        },
        {
            name: 'Status',
            selector: (row, index) => row?.current_status?.name,
            cell: (row, index) => (<span
                className={`badge ${getStatus(row?.current_status?.id)}`}>{row?.current_status?.name}</span>),
            sortable: true
        },
        {
            name: 'Comment',
            selector: (row, index) => row?.request_resolved_detail?.comments?row?.request_resolved_detail?.comments:'',
            sortable: true
        },
        {
            name: 'Resolving Date',
            selector: (row, index) => row?.request_resolved_detail?.created_at?moment(row?.request_resolved_detail?.created_at).toDate():'',
            cell: (row, index) => (
                <span>{row?.request_resolved_detail?.created_at?moment(row?.request_resolved_detail?.created_at).format('DD MMM, YYYY') : ''}</span>),
            sortable: true
        },
        {
            name: 'Action',
            cell: (row, index) => (
                <div className="d-flex justify-content-center align-items-center">
                    <Dropdown
                        align="end"
                        as="a"
                        title="Select an Action"
                        id="dropdown-menu-align-end"
                        size="sm"
                        variant="light"
                        onSelect={e => viewFunc(e, row?.id)}
                    >
                        <Dropdown.Toggle variant="light" className="fw-bold" size="sm" id="dropdown-basic">
                            Action
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={1}>
                                <FaEye/> View Detail
                            </Dropdown.Item>
                            {
                               ((row?.request_type?.id===1 || row?.request_type?.id===2) && row?.current_status?.id!==1) && (
                                    <Dropdown.Item eventKey={2}>
                                        <FaFile/> View Inspection Report
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )
        },
    ]
}