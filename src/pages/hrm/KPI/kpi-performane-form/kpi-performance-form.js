import React, { useEffect } from "react";
import Layout from "../../../../layout/Layout";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import PageHeader from "../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { API } from "../../../../utils/axios/axiosConfig";
import {
  KPI_PERFORMANCE_FORM,
  KPI_PERFORMANCE_FORM_DRAFT,
  KPI_PERFORMANCE_FORM_SINGLE,
  KPI_PERFORMANCE_FORM_SUBMIT,
  LOGIN_API,
} from "../../../../utils/routes/api_routes/API_ROUTES";
import Loader from "../../../../components/loader/Loader";
import { EMPLOYEE_PERFORMANCE_INDEX_PAGE, UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import KpiPerformanceFormComponent from "../../../../components/kpi-performmance-form/KpiPerformanceFormComponent";
import useFetchKpiFormData from "../../../../hooks/kpi/useFetchKpiFormData";
import { success_alert } from "../../../../components/alert/Alert";
import { USER_INFO } from "../../../../utils/session/token";

export default function KpiPerformanceForm() {
  const user = USER_INFO();
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, err, loading } = useFetchKpiFormData(id);

  // useEffect(() => {
  //   if (err?.non_field_errors[0] || err?.message) {
  //     // data?.non_field_errors[0]
  //   }
  // }, [err]);
  const beforeSubmit = () => {
    setIsLoading(true);
  };
  const afterSubmit = (e) => {
    switch (e.status) {
      case "success":
        success_alert("KPI Performance Form Created Successfull");
        navigate(EMPLOYEE_PERFORMANCE_INDEX_PAGE);
        break;
      case "error":
        console.log(e.message);
        break;
      case "complete":
        setIsLoading(false);
        break;
    }
  };
  return (
    <Layout>
      <div>
        <PageHeader subTitle={""} title={"KPI Performance Form"} onBack />
        <Container fluid>
          {user.accessibility.includes("kpi_performance.retrieve") && (
            <KpiPerformanceFormComponent data={data} afterSubmit={afterSubmit} beforeSubmit={beforeSubmit} id={id} />
          )}
        </Container>
        {(isLoading || loading) && <Loader />}
      </div>
    </Layout>
  );
}
