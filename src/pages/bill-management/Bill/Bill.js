import React, { useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { FaFile, FaFileAlt, FaPlus, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { BILL_LIST_GET } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import { BILL_ADD_URL, BILL_EDIT_PAGE_URL } from "../../../utils/routes/app_routes/BILL_APP_ROUTE";
import { columns } from "./colums";
import Invoice from "./invoice/Invoice";
import ViewFileModal from "./ViewFileModal";

function Bill(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState([]);
  const [fileModal, setFileModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [selected_id, setSelected_id] = useState("");
  const [seleced_file, setSelectedFile] = useState([]);

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
      name: "Invoice",
      cell: (row) => (
        <>
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => {
              setInvoiceModal(true);
              setSelected_id(row?.id);
            }}
          >
            <FaFileAlt style={{ marginRight: "4px" }} /> Invoice
          </Button>
        </>
      ),
      minWidth: "120px",
      wrap: true,
      center: true,
    },
    {
      name: "Files",
      cell: (row) => (
        <Button
          size="sm"
          variant="info"
          className="d-flex justify-content-between align-items-center"
          onClick={() => {
            setFileModal(true);
            setSelectedFile(row);
          }}
        >
          <FaFile style={{ marginRight: "4px" }} /> View files
        </Button>
      ),
      minWidth: "125px",
      wrap: true,
      center: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Link to={BILL_EDIT_PAGE_URL(row?.id)}>
          <Button size="sm" variant="primary" className="btn-circle ">
            <i className="fe fe-edit" />
          </Button>
        </Link>
      ),
      width: "70px",
      wrap: true,
      center: true,
    },
  ];

  return (
    <>
      <Layout>
        <PageHeader title={"Bill List"} />
        <Container fluid>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-end align-items-end mb-3">
                <Link to={BILL_ADD_URL} className="btn btn-primary">
                  <FaPlus /> Add New Bill
                </Link>
              </div>
              <Table dense columns={columns.concat(EXTENDED_COLUMN)} data={billData} />
            </Card.Body>
          </Card>
        </Container>
      </Layout>
      {isLoading && <Loader />}
      <ViewFileModal
        data={seleced_file}
        show={fileModal}
        onHide={() => {
          setFileModal(false);
          setSelectedFile([]);
        }}
      />
      <Invoice
        onShow={invoiceModal}
        onHide={() => {
          setInvoiceModal(false);
          setSelected_id("");
        }}
        data={selected_id}
      />
    </>
  );
}

export default Bill;

// <CustomTable
//   columns={BILL_LIST_TABLE_COLUMN}
//   data={billData}
//   size={"sm"}
//   // pagination
//   responsive
// />
