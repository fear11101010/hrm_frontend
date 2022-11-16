import React from "react";
import { Link } from "react-router-dom";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { EMPLOYEE_PERFORMANCE_GET } from "../../../utils/API_ROUTES";
import { columns } from "./columns";

export default function EmployeePerformance() {
  const { data, isLoading, err } = useFetch(EMPLOYEE_PERFORMANCE_GET);

  return (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title="Employee Performance" />
      <Content>
        <Table data={data.data} columns={columns} />
      </Content>
    </Layout>
  );
}
