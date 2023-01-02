import React from "react";
import { Link, Navigate } from "react-router-dom";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Table from "../../../components/table/Table";
import Loader from "../../../components/loader/Loader";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { USER_GET } from "../../../utils/routes/api_routes/API_ROUTES";
import { UNAUTHORIZED, USER_ADD_PAGE } from "../../../utils/routes/app_routes/APP_ROUTES";
import { COLUMNS } from "./COLUMNS";
import { USER_INFO } from "../../../utils/session/token";

export default function UserList() {
  const user = USER_INFO();
  const { data, isLoading } = useFetch(USER_GET);

  return user.module.includes("User") ? (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title="User" />
      <Content>
        <div className="mb-3 text-end">
          {user.accessibility.includes("user-register.create") && (
            <Link to={USER_ADD_PAGE}>
              <button className="btn btn-primary">Add User</button>
            </Link>
          )}
        </div>
        {user.accessibility.includes("user-list.list") && <Table data={data?.data} columns={COLUMNS} />}
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
