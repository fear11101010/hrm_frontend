import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Card} from "react-bootstrap";
import CustomTable from "../../../components/custom-table/CustomTable";
import {MY_TICKET_TABLE_COLUMNS, STATUS_WISE_TICKET_TABLE_COLUMNS} from "../table-columns";
import useFetch from "../../../hooks/useFetch";
import {SUPPORT_DASHBOARD_LIST_STATUS_API, TICKET_LIST_CREATE_API} from "../../../utils/routes/api_routes/SP_API_ROUTES";
import Loader from "../../../components/loader/Loader";
import {Link, useParams} from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import React, {useState} from "react";
import {CREATE_TICKET_URL} from "../../../utils/routes/app_routes/SP_APP_ROUTES";
import ViewTicketDetail from "../ViewTicket/ViewTicketDetail";
import {USER_INFO} from "../../../utils/session/token";

function TicketStatusList(props) {
    const {id,type} = useParams();
    const {data, isLoading} = useFetch(id==='all'?TICKET_LIST_CREATE_API:SUPPORT_DASHBOARD_LIST_STATUS_API(id));
    const [show, setShow] = useState(false);
    const [ticketId, setTicketId] = useState('');

    function handleClose(e) {
        setShow(false)
    }

    function handleShow(id) {
        setTicketId(id)
        setShow(true)
    }

    return (
        <Layout>
            <PageHeader title={type+" Request List"} onBack/>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <CustomTable data={data.data} columns={STATUS_WISE_TICKET_TABLE_COLUMNS(handleShow)} size={"sm"}
                                     responsive/>
                    </Card.Body>
                </Card>
            </Container>
            {isLoading && <Loader/>}
            <ViewTicketDetail id={ticketId} show={show} handleClose={handleClose}/>
        </Layout>
    )
}

export default TicketStatusList;