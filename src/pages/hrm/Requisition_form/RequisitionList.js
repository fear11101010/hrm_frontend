import PageHeader from "../../../components/header/PageHeader";
import React, { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link, Navigate } from "react-router-dom";
import { REQUISITION_FORM, REQUISITION_LIST_PAGE_EDIT, UNAUTHORIZED } from "../../../utils/routes/app_routes/APP_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import {
  REQUISITION_APPROVE_POST,
  RESOURCE_REQUISITION_FORM,
  ROLE_LIST_GET,
} from "../../../utils/routes/api_routes/API_ROUTES";
import Table from "../../../components/table/Table";
import { kpiPerformanceFormColumns } from "./table-columns";
import Loader from "../../../components/loader/Loader";
import { Card } from "react-bootstrap";
import { GET_TOKEN, USER_INFO } from "../../../utils/session/token";
import Layout from "../../../layout/Layout";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import { BsBoxArrowUpRight } from "react-icons/bs";
import useFetch from "../../../hooks/useFetch";
import ReactSelect from "react-select";
import useSbuDirName from "../../../hooks/useSbuDirName";

function RequisitionList(props) {
  const user = USER_INFO();
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const roleList = useFetch(ROLE_LIST_GET);
  const director_name_list = useSbuDirName();
  const [showLoading, setShowLoading] = useState(true);
  const [showApproveModal, setshowApproveModal] = useState(false);
  const [selected_row, setSelected_row] = useState("");
  const [comment, setcomment] = useState("");
  const fetchData = async () => {
    try {
      setShowLoading(true);
      const response = await API.get(RESOURCE_REQUISITION_FORM);
      setData(response?.data);
    } catch (err) {
    } finally {
      setShowLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const EXT_COL = useMemo(
    () => [
      {
        name: <div>Approval</div>,
        cell: (row) => (
          <div className="d-flex justify-content-center align-items-center w-100">
            <>
              {row?.forward_group?.id == user?.group_id && (
                <>
                  {row?.status !== 5 && (
                    <Button
                      size="sm"
                      variant="primary"
                      className="btn-rounded-circle"
                      onClick={() => {
                        setshowApproveModal(true);
                        setSelected_row(row.id);
                      }}
                      // disabled={row.hr && row.project_head && row.sbu_dir && row.unit_head ? true : false}
                    >
                      <BsBoxArrowUpRight />
                    </Button>
                  )}
                </>
              )}
            </>
          </div>
        ),
        width: "100px",
        wrap: true,
      },
      {
        name: "Edit",
        cell: (row) => (
          <div className="d-flex justify-content-center align-items-center w-100">
            {row?.hr ? (
              ""
            ) : (
              <Link className={`btn btn-rounded-circle btn-sm btn-primary`} to={REQUISITION_LIST_PAGE_EDIT(row.id)}>
                <i className="fe fe-edit"></i>
              </Link>
            )}
          </div>
        ),
        width: "80px",
        wrap: true,
      },
    ],
    []
  );

  const submitComment = (e) => {
    e.preventDefault();
    setShowLoading(true);
    const submit_data = {
      row_id: selected_row,
      comment: comment,
    };
    API.post(REQUISITION_APPROVE_POST, submit_data)
      .then((res) => {
        success_alert("Comment Saved successfully");
        setShowLoading(false);
        setshowApproveModal(false);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        error_alert(err?.data?.message ?? "An error occur while updating status. Please try again later");
      });
    setcomment("");
    fetchData();
  };

  return user.accessibility.includes("RequisitionFromEntryList") ? (
    <Layout>
      <PageHeader subTitle={""} title={"Requisition List"} />
      {showLoading && <Loader />}
      <Modal show={showApproveModal} onHide={() => setshowApproveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="mb-0">Approval</Modal.Title>
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
            {/* <Form.Group className="mb-3">
              <Form.Label>Forward To</Form.Label>
              <ReactSelect
                options={roleList?.data?.map((d) => ({ label: d.name, value: d.id }))}
                onChange={(e) => setSelectedId(e.value)}
              />
            </Form.Group> */}
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Container fluid>
        <Card>
          <Card.Body>
            {user.module.includes("Requisition From Entry") && (
              <>
                <div className="justi-content-end">
                  <Col className="offset-md-9 mb-3" md="3">
                    <Link className={"nav-link p-0"} to={REQUISITION_FORM}>
                      <Button className="w-100 d-flex justify-content-center align-items-center">
                        <i class="fe fe-plus fs-3 me-2"></i> Create Resource Requisition
                      </Button>
                    </Link>
                  </Col>
                </div>
              </>
            )}
            <Table dense data={data?.data} columns={kpiPerformanceFormColumns.concat(EXT_COL)} />
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}

export default RequisitionList;
