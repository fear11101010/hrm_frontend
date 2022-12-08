import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { BILL_ADD } from "../../../utils/APP_ROUTES";
import { USER_INFO } from "../../../utils/session/token";
import { columns } from "./colums";

export default function BillList() {
  const user = USER_INFO();
  const { data, isLoading, err } = useFetch();
  const [loading, setLoading] = useState(false);
  return (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title={"Bill"} />
      <Content>
        <div className="text-end">
          <Link to={BILL_ADD}>
            <Button>Add New Bill</Button>
          </Link>
        </div>
        <Table column={columns} />
      </Content>
    </Layout>
  );
}
