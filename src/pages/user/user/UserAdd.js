import React from "react";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Layout from "../../../layout/Layout";

export default function UserAdd() {
  return (
    <Layout>
      <PageHeader title="User Add" onBack />
      <Content></Content>
    </Layout>
  );
}
