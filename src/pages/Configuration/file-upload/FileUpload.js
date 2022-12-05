import React from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import ReactSelect from "react-select";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import useEmployee from "../../../hooks/useEmployee";
import Layout from "../../../layout/Layout";
import { UNAUTHORIZED } from "../../../utils/APP_ROUTES";
import { USER_INFO } from "../../../utils/session/token";

export default function FileUpload() {
  const user = USER_INFO();
  const employeeList = useEmployee()?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }));

  const onUpload = (e) => {
    e.preventDefault();
  };
  return user.accessibility.includes("FileUpload") ? (
    <Layout>
      <PageHeader title="File Upload" />
      <Content>
        <Form className="m-auto w-50" onSubmit={onUpload}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select Employee</Form.Label>
            <ReactSelect options={employeeList} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Upload File</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button type="submit">Upload</Button>
        </Form>
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
