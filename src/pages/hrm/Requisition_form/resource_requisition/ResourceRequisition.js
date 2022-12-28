import React from "react";
import { Accordion, Card, Col, Form, Row } from "react-bootstrap";
import Content from "../../../../components/content/Content";
import PageHeader from "../../../../components/header/PageHeader";
import Layout from "../../../../layout/Layout";

export default function ResourceRequisitionForm() {
  return (
    <Layout>
      <PageHeader title="Resource Requisition" onBack />
      <Content>
        <Form>
          {/* APPROVAL */}
          <Accordion className="mb-4 bg-white" alwaysOpen>
            <Accordion.Item>
              <Accordion.Header>
                <h4 className="mb-0">Approval</h4>
              </Accordion.Header>
              <Accordion.Body className="bg-white rounded">
                <Row>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label>Comment &#38; Signature of Unit Head:</Form.Label>
                      <Form.Control as={"textarea"} rows="6" />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label>Comment &#38; Signature of SBU Director:</Form.Label>
                      <Form.Control as={"textarea"} rows="6" />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label>Comment &#38; Signature of Director Finance:</Form.Label>
                      <Form.Control as={"textarea"} rows="6" />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label>Comment &#38; Signature of Chief Executive Officer:</Form.Label>
                      <Form.Control as={"textarea"} rows="6" />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label>Comments (Head of HR):</Form.Label>
                      <Form.Control as={"textarea"} rows="6" />
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Reason for Recruitment */}
          <Accordion defaultActiveKey="0">
            <Accordion.Item>
              <Accordion.Header>
                <h4 className="mb-0">Reason for Recruitment</h4>
              </Accordion.Header>
              <Accordion.Body className="bg-white rounded"></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Form>
      </Content>
    </Layout>
  );
}
