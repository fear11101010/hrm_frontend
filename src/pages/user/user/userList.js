import React from "react";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Layout from "../../../layout/Layout";

export default function UserList() {
  return (
    <Layout>
      <PageHeader title="User" />
      <Content>
        <button className="btn btn-primary">Add User</button>
      </Content>
    </Layout>
  );
}
