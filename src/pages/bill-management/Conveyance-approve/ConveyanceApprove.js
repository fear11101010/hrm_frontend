import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Card, Dropdown } from "react-bootstrap";
import { API } from "../../../utils/axios/axiosConfig";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import { CONVEYANCE_LIST_API } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import { CONVEYANCE_LIST_TABLE } from "./columns";
import DetailsModal from "./modals/DetailsModal";
import UpdateStatusModal from "./modals/UpdateStatusModal";
import InspectModal from "./inspect-modal/InspectModal";

export default function ConveyanceApprove() {
  const [isLoading, setIsLoading] = useState(false);
  const [conveyance, setConveyance] = useState([]);
  const [approve_modal, setApprove_modal] = useState(false);
  const [forwaredTo, setForwardTo] = useState("");
  const [status, setStatus] = useState("");
  const [detail_modal, setDetail_modal] = useState(false);
  const [selected_id, setSelected_id] = useState("");
  const [inspect_modal, setInspect_modal] = useState(false);
  const [remarks, setRemarks] = useState("");

  const getData = () => {
    setIsLoading(true);
    API.get(CONVEYANCE_LIST_API)
      .then((res) => {
        setConveyance(res.data.data);
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
        <Dropdown drop={conveyance?.length < 3 && "start"}>
          <Dropdown.Toggle size="sm" variant="light" id="dropdown-Conveyance " className="fw-bold border">
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
            <Dropdown.Item
              onClick={() => {
                setInspect_modal(true);
                setSelected_id(row?.id);
              }}
            >
              <i className="fe fe-eye"></i> Messages
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
      <PageHeader title={"Conveyance Approve List"} />
      <Container fluid>
        <Card>
          <Card.Body>
            <Table data={conveyance} columns={CONVEYANCE_LIST_TABLE.concat(EXTENDED_COLUMN)} />
          </Card.Body>
        </Card>

        <DetailsModal
          show={detail_modal}
          onHide={() => {
            setDetail_modal(false);
            setSelected_id("");
          }}
          id={selected_id}
        />

        <UpdateStatusModal
          show={approve_modal}
          onHide={() => {
            setApprove_modal(false);
            setSelected_id("");
            getData();
          }}
          id={selected_id}
          forwaredTo={forwaredTo}
          status={status}
          remarks={remarks}
        />

        {/* Inspect Modal */}
        <InspectModal
          show={inspect_modal}
          onHide={() => {
            setInspect_modal(false);
            setSelected_id("");
          }}
          id={selected_id}
        />
      </Container>
    </Layout>
  );
}
