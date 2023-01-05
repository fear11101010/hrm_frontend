import React from "react";
import Content from "../../../../components/content/Content";
import PageHeader from "../../../../components/header/PageHeader";
import Layout from "../../../../layout/Layout";

export default function LunchOrder() {
  return (
    <Layout>
      <PageHeader title={"Lunch Order"} />
      <Content>{/* Header Part */} </Content>
    </Layout>
  );
}
