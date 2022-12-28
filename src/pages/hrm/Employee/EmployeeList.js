import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import useFetch from "../../../hooks/useFetch";
import useSupervisor from "../../../hooks/useSupervisor";
import Layout from "../../../layout/Layout";
import { EMPLOYEE_LIST_GET } from "../../../utils/routes/api_routes/API_ROUTES";
import { UNAUTHORIZED } from "../../../utils/routes/app_routes/APP_ROUTES";

import { USER_INFO } from "../../../utils/session/token";
import { COLUMNS } from "./COLUMNS";
import EmployeeDetails from "./EmployeeDetails";

export default function EmployeeList() {
  const user = USER_INFO();
  const [selectedId, setSelectedId] = useState("");
  const [detailsModal, setDetailsModal] = useState(false);
  const { data, isLoading } = useFetch(EMPLOYEE_LIST_GET);

  const EXT_COLUMNS = [
    {
      name: "Details",
      cell: (row) => (
        <>
          <Button
            size="sm"
            className="btn-rounded-circle"
            title={`Details`}
            onClick={() => {
              setDetailsModal(true);
              setSelectedId(row.id);
            }}
          >
            <i className="fe fe-file-text"></i>
          </Button>
        </>
      ),
      width: "80px",
      wrap: true,
      center: true,
    },
  ];

  return user.accessibility.includes("EmployeeList") ? (
    <Layout>
      <PageHeader title={"Employee List"} />
      <Content>{isLoading ? <Loader /> : <Table data={data.data} columns={COLUMNS.concat(EXT_COLUMNS)} />}</Content>

      {/* Details Modal */}
      <Modal
        show={detailsModal}
        onHide={() => {
          setDetailsModal(false);
        }}
        size="xl"
      >
        <Modal.Header className="mb-0" closeButton>
          <h3 className="mb-0">Employee Details</h3>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <EmployeeDetails rowId={selectedId} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            style={{ fontWeight: 500 }}
            onClick={() => {
              setDetailsModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
