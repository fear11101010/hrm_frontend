import React, { useEffect, useState } from "react";
import { Button, Card, Container, Dropdown, Modal } from "react-bootstrap";
import { FaFile, FaFileAlt, FaPlus, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { BILL_LIST_GET } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import { BILL_ADD_URL, BILL_EDIT_PAGE_URL } from "../../../utils/routes/app_routes/BILL_APP_ROUTE";
import BillApproveModal from "./bill-approve-modal/BillApproveModal";
import { columns } from "./columns";
export default function BillApprove() {
  const [isLoading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState([]);
  const [, setSelected_id] = useState("");
  const [approve_modal, setApprove_modal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    API.get(BILL_LIST_GET)
      .then((res) => {
        setBillData(res?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const EXTENDED_COLUMN = [
    {
      name: "Approve",
      cell: (row) => (
        <Dropdown>
          <Dropdown.Toggle size="sm" variant="light" id="dropdown-basic">
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">View Details</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Update Status</Dropdown.Item>
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
        }}
      />
    </Layout>
  );
  {
    isLoading && <Loader />;
  }
}
