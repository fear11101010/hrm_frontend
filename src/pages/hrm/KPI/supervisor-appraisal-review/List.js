import React from "react";
import { Navigate } from "react-router-dom";
import { error_alert } from "../../../../components/alert/Alert";
import Content from "../../../../components/content/Content";
import PageHeader from "../../../../components/header/PageHeader";
import Loader from "../../../../components/loader/Loader";
import Table from "../../../../components/table/Table";
import useFetch from "../../../../hooks/useFetch";
import Layout from "../../../../layout/Layout";
import { KPI_SUPERVISOR_APPRAISAL_REVIEW_GET } from "../../../../utils/routes/api_routes/API_ROUTES";
import { UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";
import { USER_INFO } from "../../../../utils/session/token";
import { columns } from "../employee-performance/columns";

export default function SupervisorAppraisalReview() {
  const user = USER_INFO();

  const { data, isLoading, err } = useFetch(KPI_SUPERVISOR_APPRAISAL_REVIEW_GET);

  if (data?.data?.length < 1) {
    error_alert("No data found");
  }
  return user.accessibility.includes("kpi_performance.supervisor_head") ? (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title={"Supervisor Appraisal Review"} />
      <Content>
        <Table data={data.data} columns={columns} />
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
