import React, {useEffect} from "react";
import Layout from "../../../layout/Layout";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {API} from "../../../utils/axios/axiosConfig";
import {
    KPI_PERFORMANCE_FORM,
    KPI_PERFORMANCE_FORM_DRAFT,
    KPI_PERFORMANCE_FORM_SINGLE, KPI_PERFORMANCE_FORM_SUBMIT,
    LOGIN_API
} from "../../../utils/API_ROUTES";
import Loader from "../../../components/loader/Loader";
import {EMPLOYEE_PERFORMANCE_INDEX_PAGE} from "../../../utils/APP_ROUTES";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import KpiPerformanceFormComponent from "../../../components/kpi-performmance-form/KpiPerformanceFormComponent";
import useFetchKpiFormData from "../../../hooks/kpi/useFetchKpiFormData";

export default function KpiPerformanceForm() {
    const [isLoading, setIsLoading] = useState(false);
    // const [data, setData] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const {data,err,loading} = useFetchKpiFormData(id);

    useEffect(()=>{
        if(err?.non_field_errors[0] || err?.message){
            // data?.non_field_errors[0]
        }
    },[err])
    const beforeSubmit = ()=>{
        setIsLoading(true);
    }
    const afterSubmit = (e)=>{
        switch (e.status){
            case 'success':
                navigate(EMPLOYEE_PERFORMANCE_INDEX_PAGE);
                break;
            case 'error':
                console.log(e.message);
                break;
            case 'complete':
                setIsLoading(false);
                break;
        }
    }
    return (
        <Layout>
            <div>
                <PageHeader subTitle={""} title={"KPI Performance Form"}/>
                <Container fluid>
                    <KpiPerformanceFormComponent data={data} afterSubmit={afterSubmit} beforeSubmit={beforeSubmit} id={id}/>
                </Container>
                {(isLoading || loading) && <Loader />}
            </div>
        </Layout>
    );

}
