import React from "react";
import PageHeader from "../../components/header/PageHeader";
import Layout from "../../layout/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <PageHeader subTitle={" Overview"} title={"Dashboard"} />
    </Layout>
  );
}
