import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Layout from "../../../layout/Layout";
import Datetime from "react-datetime";
import { USER_INFO } from "../../../utils/session/token";
import DatePicker from "../../../components/date-picker/DatePicker";

export default function BillAdd() {
  const user = USER_INFO();
  return (
    <Layout>
      <PageHeader title="Add New Bill" />
      <Content>
        <Form>
          <Row>
            <Col sm="12" md="3">
              <Form.Group>
                <Form.Label>Invoice Date</Form.Label>
                <DatePicker placeholder={"Invoice date"} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6"></Col>
            <Col sm="12" md="6"></Col>
          </Row>
        </Form>
      </Content>
    </Layout>
  );
}
