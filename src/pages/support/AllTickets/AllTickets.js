import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Button, Card, Modal} from "react-bootstrap";
import Table from "../../../components/table/Table";
import CustomTable from "../../../components/custom-table/CustomTable";
import {ALL_TICKET_TABLE_COLUMNS, MY_TICKET_TABLE_COLUMNS} from "../table-columns";
import useFetch from "../../../hooks/useFetch";
import {TICKET_LIST_CREATE_API, TICKET_LIST_HR_ADMIN_API} from "../../../utils/routes/api_routes/SP_API_ROUTES";
import Loader from "../../../components/loader/Loader";
import {Link} from "react-router-dom";
import {BILL_ADD_URL} from "../../../utils/routes/app_routes/APP_ROUTES";
import {FaPlus} from "react-icons/fa";
import React, {useState} from "react";
import {CREATE_TICKET_URL} from "../../../utils/routes/app_routes/SP_APP_ROUTES";
import ViewTicketDetail from "../ViewTicket/ViewTicketDetail";
import editTicket from "../EditTicket/EditTicket";
import UpdateStatus from "../../../components/support/UpdateStatus";
import ForwardToForm from "../../../components/support/ForwardToForm";
import ReplyToForm from "../../../components/support/ReplyToForm";

function AllTickets(props) {
    const [refreshData,setRefreshData] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const {data,isLoading} = useFetch(TICKET_LIST_HR_ADMIN_API(page,limit),refreshData);
    const [show,setShow] = useState(false);
    const [showStatusUpdateDialog,setShowStatusUpdateDialog] = useState(false);
    const [forwardToDialog,setForwardToDialog] = useState(false);
    const [replyToDialog,setReplyToDialog] = useState(false);
    const [ticketId,setTicketId] = useState('');

    function handleClose(e) {
        setShow(false)
    }
    function handleStatusUpdateDialogClose(e) {
        setShowStatusUpdateDialog(false)
        setRefreshData(!refreshData);
    }
    function handleForwardToDialogClose(e) {
        setForwardToDialog(false)
        setRefreshData(!refreshData);
    }
    function handleReplyToDialog(e) {
        setReplyToDialog(false)
        setRefreshData(!refreshData);
    }

    const onPageOrLimitChange = (limit,page) => {
        setPage(page);
        setLimit(limit);
    }
    function handleShow(e,id) {
        console.log(typeof e);
        setTicketId(id)
        switch (e){
            case '1':
                setShowStatusUpdateDialog(true)
                break;
            case '2':
                setShow(true);
                break;
            case '3':
                setForwardToDialog(true);
                break;
            case '4':
                setReplyToDialog(true);
                break;
        }
    }

    return (
        <>
            <Layout>
                <PageHeader title={"Request List"}/>
                <Container fluid>
                    <Card>
                        <Card.Body>
                            <CustomTable data={data.data} total={data.count} pagination={{show:true,perPageList:[10,20,30,50,100],onPageOrLimitChange}} columns={ALL_TICKET_TABLE_COLUMNS(handleShow)} size={"sm"} responsive/>
                        </Card.Body>
                    </Card>
                </Container>

            </Layout>
            {isLoading && <Loader/>}
            {show && <ViewTicketDetail id={ticketId} show={show} handleClose={handleClose}/>}
            {showStatusUpdateDialog && <UpdateStatus id={ticketId} show={showStatusUpdateDialog} handleClose={handleStatusUpdateDialogClose}/>}
            {forwardToDialog && <ForwardToForm id={ticketId} show={forwardToDialog} handleClose={handleForwardToDialogClose}/>}
            {replyToDialog && <ReplyToForm id={ticketId} show={replyToDialog} handleClose={handleReplyToDialog}/>}</>
    )
}
export default AllTickets;