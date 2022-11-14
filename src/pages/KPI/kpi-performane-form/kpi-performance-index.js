import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {KPI_PERMORMANCE_FORM_PAGE} from "../../../utils/APP_ROUTES";
import {USER_INFO} from "../../../utils/session/token";
import {API} from "../../../utils/axios/axiosConfig";
import {KPI_PERFORMANCE_FORM} from "../../../utils/API_ROUTES";
import {columns} from "../employee-assestment/columns";
import Table from "../../../components/table/Table";
import {kpiPerformanceFormColumns} from "./table-columns";
import Loader from "../../../components/loader/Loader";
import {Card} from "react-bootstrap";

function KpiPerformanceIndex(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() => {
        API.get(KPI_PERFORMANCE_FORM)
            .then(response => {
                console.log(response);
                setData(response.data);
            }).catch(err => {

        }).finally(() => {
            setShowLoading(false);
        })
    },[])
    return (
        <Layout>
            <PageHeader subTitle={""} title={"KPI Performance Form List"}/>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Table data={data.data} columns={kpiPerformanceFormColumns} />
                    </Card.Body>
                </Card>
            </Container>
            {showLoading && <Loader/>}
        </Layout>
    )
}

export default KpiPerformanceIndex;