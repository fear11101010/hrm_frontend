import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Layout from "../../../layout/Layout";
import { REQUISITION_RESOURCE_FORM } from "../../../utils/APP_ROUTES";

export default function RequestRequisitionList() {
  return (
    <Layout>
      <PageHeader title="Request Requistion List" />
      <Content>
        <div className="text-end mb-3">
          <Link to={REQUISITION_RESOURCE_FORM}>
            <Button>Request Requisition Form</Button>
          </Link>
        </div>
      </Content>
    </Layout>
  );
}
