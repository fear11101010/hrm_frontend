import React from "react";
import { Row } from "react-bootstrap";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Layout from "../../../layout/Layout";

export default function EmPerformanceSingle() {
  return (
    <Layout>
      <PageHeader title="Employee Performance" />
      <Content>
        <Row></Row>
      </Content>
    </Layout>
  );
}
