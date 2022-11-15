import React from "react";
import { Link } from "react-router-dom";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { EMPLOYEE_PERFORMANCE_GET } from "../../../utils/API_ROUTES";
import { EMPLOYEE_PERFORMANCE_SINGLE_PAGE } from "../../../utils/APP_ROUTES";
import { columns } from "./columns";

export default function EmployeePerformance() {
  const { data, isLoading, err } = useFetch(EMPLOYEE_PERFORMANCE_GET);
  console.log(isLoading);

  const action_column = [
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={EMPLOYEE_PERFORMANCE_SINGLE_PAGE(row.id)}>
            <button className="btn btn-sm btn-primary" title="Input">
              <i className="fe fe-plus"></i>
            </button>
          </Link>
        </>
      ),
      width: "80px",
      wrap: true,
    },
  ];
  return (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title="Employee Performance" />
      <Content>
        <Table data={data.data} columns={action_column.concat(columns)} />
      </Content>
    </Layout>
  );
}
