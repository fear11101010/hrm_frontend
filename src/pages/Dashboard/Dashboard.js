import React from "react";
import { Col, Row } from "react-bootstrap";
import Content from "../../components/content/Content";
import PageHeader from "../../components/header/PageHeader";
import Layout from "../../layout/Layout";
import BarChart from "./bar-chart/bar-chart";
import HorizontalBarGraph from "./bar-chart/horizontal-bar-chart";

export default function Dashboard() {
  return (
    <Layout>
      <PageHeader subTitle={" Overview"} title={"Dashboard"} />
      <div className="px-5">
        <Row>
          <Col sm="12" md="6">
            <BarChart />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <HorizontalBarGraph />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
