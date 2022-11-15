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
    LOGIN_API, USER_EACH_GET
} from "../../../utils/API_ROUTES";
import Loader from "../../../components/loader/Loader";
import {EMPLOYEE_PERFORMANCE_INDEX_PAGE} from "../../../utils/APP_ROUTES";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import KpiPerformanceFormComponent from "../../../components/kpi-performmance-form/KpiPerformanceFormComponent";
import {USER_INFO} from "../../../utils/session/token";

export default function KpiPerformanceFormCreate() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        setLoading(true)
        const userInfo = USER_INFO();
        console.log(userInfo);
        API.get(USER_EACH_GET(userInfo.user_id))
            .then((response)=>{
                console.log(response.data.data);
                setData({employee:response.data.data});
            }).catch(err=>{
            toast(err.response?.data?.non_field_errors[0]);
        }).finally(()=>{
            setLoading(false);
        })
    },[id])
    const beforeSubmit = ()=>{
        setLoading(true);
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
                setLoading(false);
                break;
        }
    }
    return (
        <Layout>
            <div>
                <PageHeader subTitle={""} title={"Create KPI Performance Form"}/>
                <Container fluid>
                    <KpiPerformanceFormComponent data={data} afterSubmit={afterSubmit} beforeSubmit={beforeSubmit} id={null}/>
                </Container>
                {loading && <Loader />}
            </div>
        </Layout>
    );

}
