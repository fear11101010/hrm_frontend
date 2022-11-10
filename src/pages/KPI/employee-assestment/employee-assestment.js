import React, { useState } from "react";

import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { Link } from "react-router-dom";
import { EMPLOYEE_ASSESTMENT_GET } from "../../../utils/API_ROUTES";
import { columns } from "./columns";
import { EMPLOYEE_ASSESTMENT_SINGLE_PAGE } from "../../../utils/APP_ROUTES";

export default function EmployeeAssestment() {
  // fetch Data
  const { data, isloading, err } = useFetch(EMPLOYEE_ASSESTMENT_GET);
  const [loading, setLoading] = useState(false);

  const action_column = [
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={EMPLOYEE_ASSESTMENT_SINGLE_PAGE(row.id)}>
            <button className="btn btn-sm btn-primary" title="Input">
              <i class="fe fe-plus"></i>
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
      {loading || (isloading && <Loader />)}
      <PageHeader title={"Assessment Employee Information"} />
      <Content>
        <Table data={data.data} columns={action_column.concat(columns)} />
      </Content>
    </Layout>
  );
}
