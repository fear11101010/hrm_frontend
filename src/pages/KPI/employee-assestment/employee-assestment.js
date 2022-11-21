import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { EMPLOYEE_ASSESTMENT_GET } from "../../../utils/API_ROUTES";
import { UNAUTHORIZED } from "../../../utils/APP_ROUTES";
import { USER_INFO } from "../../../utils/session/token";
import { columns } from "./columns";

export default function EmployeeAssestment() {
  const user = USER_INFO();
  // fetch Data
  const { data, isLoading, err } = useFetch(EMPLOYEE_ASSESTMENT_GET);

  return user.accessibility.includes("TeamAssessmentPerformance") ? (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title={"Team Assessment Performance"} />
      <Content>
        <Table data={data.data} columns={columns} />
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
