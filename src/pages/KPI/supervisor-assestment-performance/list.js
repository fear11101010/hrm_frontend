import React from "react";
import { error_alert } from "../../../components/alert/Alert";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { SUPERVISOR_ASSESTMENT_GET } from "../../../utils/API_ROUTES";
import { USER_INFO } from "../../../utils/session/token";
import { columns } from "./Columns";

export default function SupervisorAssestmentPerformance() {
  const user = USER_INFO();
  const { data, isLoading, err } = useFetch(SUPERVISOR_ASSESTMENT_GET);

  if (data.statuscode === 400) {
    error_alert(data.message);
  }

  return (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title={"Supervisor Assestment Performance"} />
      <Content>
        <Table data={data.data} columns={columns} />
      </Content>
    </Layout>
  );
}
