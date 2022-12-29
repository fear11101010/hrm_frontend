
import PageHeader from "../../../components/header/PageHeader";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Navigate } from "react-router-dom";
import {  UNAUTHORIZED } from "../../../utils/routes/app_routes/APP_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import {
  REQUISITION_APPROVE_POST,
  RESOURCE_REQUISITION_FORM,
} from "../../../utils/routes/api_routes/API_ROUTES";
import Table from "../../../components/table/Table";
import { kpiPerformanceFormColumns } from "./table-columns";
import Loader from "../../../components/loader/Loader";
import { Card } from "react-bootstrap";
import { USER_INFO } from "../../../utils/session/token";
import Layout from "../../../layout/Layout";
import { Button,Modal,Form } from "react-bootstrap";
import { error_alert, success_alert } from "../../../components/alert/Alert";

function RequisitionList(props) {
  const user = USER_INFO();
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showApproveModal,setshowApproveModal] = useState(false);
  const [selected_row,setSelected_row] = useState('');
  const [comment,setcomment] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoading(true);
        const response = await API.get(RESOURCE_REQUISITION_FORM);
        setData(response.data);
      } catch (err) {
      } finally {
        setShowLoading(false);
      }
    };

    fetchData();
  }, []);
  const EXT_COL = [
    {
      name: "Approval",
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center w-100">
          <Button
            size="sm"
            variant="primary"
            className="btn-rounded-circle"
            onClick={() => {
              setshowApproveModal(true);
              setSelected_row(row.id)
            }}
          >
            <i className="fe fe-edit"></i>
          </Button>
        </div>
      ),
      width: "100px",
      wrap: true,
    },
  ]
  const submitComment = (e) => {
    e.preventDefault();
    setShowLoading(true);
    const submit_data = {
      row_id : selected_row,
      comment : comment
    }
    API.post(REQUISITION_APPROVE_POST,submit_data).then(res => {
      success_alert("Comment Saved successfully");
      setShowLoading(false);
      setshowApproveModal(false);
    }).catch(err => {
      console.log(err);
      error_alert(err?.data?.message ?? 'An error occur while updating status. Please try again later')
    })
    setcomment('');
    
  }

  return user.accessibility.includes("AppraisalForm") ? (
    <Layout>
      <PageHeader subTitle={""} title={"Requisition List"} />
      {showLoading && <Loader />}
      <Modal show={showApproveModal} onHide={() => setshowApproveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitComment}>
            <Form.Group className="mb-3">
              <Form.Label>Add Comment</Form.Label>
              <Form.Control
                placeholder="Enter Comment"
                type="text"
                value={comment}
                onChange={(e) => {
                  setcomment(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Container fluid>
        <Card>
          <Card.Body>
            <Table data={data?.data} columns={kpiPerformanceFormColumns.concat(EXT_COL)} />
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}

export default RequisitionList;

