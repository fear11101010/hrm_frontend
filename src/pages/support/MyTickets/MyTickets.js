import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Card} from "react-bootstrap";
import CustomTable from "../../../components/custom-table/CustomTable";
import {MY_TICKET_TABLE_COLUMNS} from "../table-columns";
import useFetch from "../../../hooks/useFetch";
import {TICKET_LIST_API, TICKET_LIST_CREATE_API} from "../../../utils/routes/api_routes/SP_API_ROUTES";
import Loader from "../../../components/loader/Loader";
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {CREATE_TICKET_URL} from "../../../utils/routes/app_routes/SP_APP_ROUTES";
import ViewTicketDetail from "../ViewTicket/ViewTicketDetail";
import {USER_INFO} from "../../../utils/session/token";

function MyTickets(props) {
    const user = USER_INFO();
    const [show, setShow] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const {data, isLoading} = useFetch(TICKET_LIST_API(page,limit));
    const [ticketId, setTicketId] = useState('');

    function handleClose(e) {
        setShow(false)
    }

    function handleShow(id) {
        setTicketId(id)
        setShow(true)
    }
    const onPageOrLimitChange = (limit,page) => {
        setPage(page);
        setLimit(limit);
    }

    return (
        <Layout>
            <PageHeader title={"Request List"}/>
            <Container fluid>
                <Card>
                    <Card.Body>
                        {user.accessibility.includes("request_detail.POST") && (
                            <div className="d-flex justify-content-end align-items-end mb-3">
                                <Link to={CREATE_TICKET_URL} className="btn btn-primary btn-sm">
                                    <FaPlus/> Create New Request
                                </Link>
                            </div>
                        )}
                        <CustomTable data={data.data} total={data.count} pagination={{show:true,perPageList:[10,20,30,50,100],onPageOrLimitChange}} columns={MY_TICKET_TABLE_COLUMNS(handleShow)} size={"sm"}
                                     responsive/>
                    </Card.Body>
                </Card>
            </Container>
            {isLoading && <Loader/>}
            <ViewTicketDetail id={ticketId} show={show} handleClose={handleClose}/>
        </Layout>
    )
}

export default MyTickets;