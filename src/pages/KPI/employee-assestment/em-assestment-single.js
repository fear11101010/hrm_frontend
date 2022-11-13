import React from "react";
import Layout from "../../../layout/Layout";
import { useParams } from "react-router-dom";
import PageHeader from "../../../components/header/PageHeader";
import Content from "../../../components/content/Content";
import useFetch from "../../../hooks/useFetch";
import { EMPLOYEE_ASSESTMENT_SINGLE_GET } from "../../../utils/API_ROUTES";
import { Col, Row } from "react-bootstrap";
import moment from "moment";

export default function EmAssestmentSingle() {
  const { id } = useParams();
  const { data, isLoading, err } = useFetch(EMPLOYEE_ASSESTMENT_SINGLE_GET(id));
  return (
    <Layout>
      <PageHeader title="Assessment Details" onBack />
      <Content>
        <div className="mb-4">
          <h1 className="mb-2"> {data.data?.employee?.name} </h1>
          <h3 className="mb-0">{data.data?.employee?.employee_id}</h3>
        </div>
        <div>
          <Row>
            <Col sm="6" md="3">
              <h2 className="mb-2">Date of Joining</h2>
              <h3>{data.data?.employee?.date_of_joining}</h3>
            </Col>
            <Col sm="6" md="3">
              <h2 className="mb-2">Duration</h2>
              <h3>{moment().diff(data.data?.employee?.date_of_joining, "years", false)} Years</h3>
            </Col>
            <Col sm="6" md="3">
              <h2 className="mb-2">Assessment Duration</h2>
              <h3>12 months</h3>
            </Col>
            <Col sm="6" md="3">
              <h2 className="mb-2">SBU</h2>
              <h3>{data.data?.employee?.sbu?.name}</h3>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
