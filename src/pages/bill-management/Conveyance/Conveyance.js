import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../../../utils/axios/axiosConfig";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import {
  CONVEYANCE_ADD_URL,
  CONVEYANCE_EDIT_PAGE_URL,
  CONVEYANCE_LIST_URL,
} from "../../../utils/routes/app_routes/BILL_APP_ROUTE";
import { FaEdit, FaFileAlt, FaPlus } from "react-icons/fa";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import InvoiceCon from "./invoice/Invoice";
import { CONVEYANCE_LIST_API } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import { CONVEYANCE_LIST_TABLE } from "./Columns";
import ConViewFileModal from "./ViewFileModal";
import InspectConModal from "./InspectModal";
import { USER_INFO } from "../../../utils/session/token";

function Conveyance(props) {
  const user = USER_INFO();
  const [isLoading, setIsLoading] = useState(false);
  const [conveyance, setConveyance] = useState([]);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [selected_id, setSelected_id] = useState("");
  const [seleced_file, setSelectedFile] = useState([]);
  const [fileModal, setFileModal] = useState(false);
  const [inspect_modal, setInspect_modal] = useState(false);

  useEffect(() => {
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
  }, []);

  const EXTENDED_COLUMN = [
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown drop={conveyance?.length <= 3 && "start"}>
          <Dropdown.Toggle size="sm" variant="light" id="dropdown-basic" className="fw-bold border">
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setInvoiceModal(true);
                setSelected_id(row?.id);
              }}
            >
              <i className="fe fe-file-text"></i> View Invoice
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setFileModal(true);
                setSelectedFile(row);
              }}
            >
              <i className="fe fe-edit-3"></i> View Files
            </Dropdown.Item>
            {user?.accessibility?.includes("invoice.bill_message_conveyance") && (
              <Dropdown.Item
                onClick={() => {
                  setInspect_modal(true);
                  setSelected_id(row?.id);
                }}
              >
                <i className="fe fe-eye"></i> Inspect Bill
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      ),
      width: "100px",
      wrap: true,
      center: true,
    },
    {
      name: `Edit`,
      width: "80px",
      cell: (row, index) =>
        row?.status === 2 || row?.status === 4 ? (
          ""
        ) : (
          <Link to={CONVEYANCE_EDIT_PAGE_URL(row.id)}>
            <Button size="sm">
              <FaEdit />
            </Button>
          </Link>
        ),
      center: true,
    },
  ];

  return (
    <>
      <Layout>
        <PageHeader title={"Conveyance Bill List"} />
        <Container fluid>
          <Card>
            <Card.Body>
              {user?.accessibility?.includes("conveyance.create") && (
                <div className="d-flex justify-content-end align-items-end mb-3">
                  <Link to={CONVEYANCE_ADD_URL} className="btn btn-primary">
                    <FaPlus /> Add New Conveyance
                  </Link>
                </div>
              )}
              <Table data={conveyance} columns={CONVEYANCE_LIST_TABLE.concat(EXTENDED_COLUMN)} />
            </Card.Body>
          </Card>
        </Container>
      </Layout>
      {isLoading && <Loader />}

      <InvoiceCon
        onShow={invoiceModal}
        onHide={() => {
          setInvoiceModal(false);
          setSelected_id("");
        }}
        data={selected_id}
      />
      <ConViewFileModal
        data={seleced_file}
        show={fileModal}
        onHide={() => {
          setFileModal(false);
          setSelectedFile([]);
        }}
      />

      {/* Inspect Modal */}
      <InspectConModal
        show={inspect_modal}
        onHide={() => {
          setInspect_modal(false);
          setSelected_id("");
        }}
        id={selected_id}
      />
    </>
  );
}

export default Conveyance;
