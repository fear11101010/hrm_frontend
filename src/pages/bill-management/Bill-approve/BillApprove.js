import React, { useEffect, useState } from "react";
import { Card, Container, Dropdown, Modal } from "react-bootstrap";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { BILL_APPROVE_LIST_GET, BILL_LIST_GET } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import BillApproveModal from "./bill-approve-modal/BillApproveModal";
import BillDetails from "./bill-approve-modal/BillDetails";
import { columns } from "./columns";
import InspectModal from "./inspect-modal/InspectModal";

export default function BillApprove() {
  const [isLoading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState([]);
  const [selected_id, setSelected_id] = useState("");
  const [forwaredTo, setForwardTo] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [detail_modal, setDetail_modal] = useState(false);
  const [approve_modal, setApprove_modal] = useState(false);
  const [inspect_modal, setInspect_modal] = useState(false);

  const getData = () => {
    setIsLoading(true);
    API.get(BILL_APPROVE_LIST_GET)
      .then((res) => {
        setBillData(res?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const EXTENDED_COLUMN = [
    {
      name: "Approve",
      cell: (row) => (
        <Dropdown drop={billData?.length <= 2 && "start"}>
          <Dropdown.Toggle size="sm" variant="light" id="dropdown-basic" className="fw-bold border">
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setDetail_modal(true);
                setSelected_id(row?.id);
              }}
            >
              <i className="fe fe-file-text"></i> View Invoice
            </Dropdown.Item>
            {row?.status === 2 || row?.status === 4 ? (
              ""
            ) : (
              <Dropdown.Item
                onClick={() => {
                  setApprove_modal(true);
                  setSelected_id(row?.id);
                  setForwardTo(row?.forwarded_to);
                  setStatus(row?.status);
                  setRemarks(row?.remark);
                }}
              >
                <i className="fe fe-edit-3"></i> Update Status
              </Dropdown.Item>
            )}
            <Dropdown.Item
              onClick={() => {
                setInspect_modal(true);
                setSelected_id(row?.id);
              }}
            >
              <i className="fe fe-eye"></i> Inspect Bill
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      width: "100px",
      wrap: true,
      center: true,
    },
  ];

  return (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title={"Bill Approve List"} />
      <Container fluid>
        <Card>
          <Card.Body>
            <Table columns={columns.concat(EXTENDED_COLUMN)} data={billData} />
          </Card.Body>
        </Card>
      </Container>

      <BillApproveModal
        show={approve_modal}
        onHide={() => {
          setApprove_modal(false);
          setSelected_id("");
          getData();
        }}
        bill_id={selected_id}
        forwaredTo={forwaredTo}
        status={status}
        remarks={remarks}
      />

      {/* Problem occuring while calling modal component, so calling it manually */}
      <Modal
        size="xl"
        show={detail_modal}
        onHide={() => {
          setDetail_modal(false);
          setSelected_id("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="mb-0">Bill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BillDetails bill_id={selected_id} />
        </Modal.Body>
      </Modal>

      {/* Inspect Modal */}
      <InspectModal
        show={inspect_modal}
        onHide={() => {
          setInspect_modal(false);
          setSelected_id("");
        }}
        id={selected_id}
      />
    </Layout>
  );
}
