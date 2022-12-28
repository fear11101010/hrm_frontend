import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import React from "react";
import './edit-ticket.css'
import "react-datetime/css/react-datetime.css";
import {FETCH_TICKET_BY_ID_API, UPDATE_TICKET_BY_ID_API} from "../../../utils/routes/api_routes/SP_API_ROUTES";
import {useParams} from 'react-router-dom'
import TicketForm from "../../../components/support/TicketForm";
import useFetch from "../../../hooks/useFetch";

function EditTicket(props) {
    const params = useParams();
    const {data} = useFetch(FETCH_TICKET_BY_ID_API(params?.id))
    return (
        <Layout>
            <PageHeader title={"Edit request"} onBack/>
            <Container fluid>
                <TicketForm url={UPDATE_TICKET_BY_ID_API(params?.id)} data={data?.data} method="put"/>
            </Container>
        </Layout>
    )
}

export default EditTicket;