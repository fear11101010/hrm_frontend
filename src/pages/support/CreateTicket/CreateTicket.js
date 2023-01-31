import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import React from "react";
import './create-ticket.css'
import "react-datetime/css/react-datetime.css";
import {TICKET_LIST_CREATE_API} from "../../../utils/routes/api_routes/SP_API_ROUTES";
import TicketForm from "../../../components/support/TicketForm";

function CreateTicket(props) {
    return (
        <Layout>
            <PageHeader title={"Create Ticket"} onBack/>
            <Container fluid>
                <TicketForm url={TICKET_LIST_CREATE_API} method="post"/>
            </Container>
        </Layout>
    )
}

export default CreateTicket;