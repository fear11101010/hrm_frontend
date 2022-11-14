import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {KPI_PERMORMANCE_FORM_PAGE} from "../../../utils/APP_ROUTES";
import {USER_INFO} from "../../../utils/session/token";
import {API} from "../../../utils/axios/axiosConfig";
import {KPI_PERFORMANCE_FORM, KPI_PERFORMANCE_FORM_DATE_VALIDATE} from "../../../utils/API_ROUTES";
import {columns} from "../employee-assestment/columns";
import Table from "../../../components/table/Table";
import {kpiPerformanceFormColumns} from "./table-columns";
import Loader from "../../../components/loader/Loader";
import {Card, Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
function KpiPerformanceIndex(props) {
    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await API.get(KPI_PERFORMANCE_FORM);
                setData(response.data);
                if(response.data.data.length<=0){
                    const dateResponse = await API.get(KPI_PERFORMANCE_FORM_DATE_VALIDATE);
                    const {start_date,end_date} = dateResponse.data.data[0];
                    if(moment().isBetween(start_date,end_date)){
                        console.log(start_date,end_date)
                        setDates([
                            moment(start_date).format('DD MMM, YYYY'),
                            moment(end_date).format('DD MMM, YYYY'),
                        ])
                    }
                }
            }catch (err){

            }
        }

        fetchData().catch(console.error)
        /*API.get(KPI_PERFORMANCE_FORM_DATE_VALIDATE)
            .then(response => {
                console.log(response);
                setData(response.data);
            }).catch(err => {

        }).finally(() => {
            setShowLoading(false);
        })
        API.get(KPI_PERFORMANCE_FORM)
            .then(response => {
                console.log(response);
                setData(response.data);
            }).catch(err => {

        }).finally(() => {
            setShowLoading(false);
        })*/
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
            <Modal show={true}  centered>
                <Modal.Body className="m-auto">
                    <h2 className="mt-3 text-center">
                        Warning
                    </h2>
                    <div class="d-flex justify-content-center">
                        You can create kpi performance form from {dates[0]} to {dates[1]}
                    </div>
                    <div className={"d-flex justify-content-center align-items-center"}>
                        <button className="btn btn-primary" style={{marginRight:'10px'}}>Confirm</button>
                        <button className="btn btn-danger" style={{marginRight:'10px'}}>Cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </Layout>
    )
}

export default KpiPerformanceIndex;