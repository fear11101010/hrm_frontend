import React, { useEffect, useState } from "react";
import { Button, Card, Container, Dropdown, Modal } from "react-bootstrap";
import { FaFile, FaFileAlt, FaPlus, FaRegEdit } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { BILL_LIST_GET } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import { UNAUTHORIZED } from "../../../utils/routes/app_routes/APP_ROUTES";
import { BILL_ADD_URL, BILL_EDIT_PAGE_URL } from "../../../utils/routes/app_routes/BILL_APP_ROUTE";
import { USER_INFO } from "../../../utils/session/token";
import { columns } from "./colums";
import InspectModal from "./InspectModal";
import Invoice from "./invoice/Invoice";
import ViewFileModal from "./ViewFileModal";

function Bill(props) {
  const user = USER_INFO();
  const [isLoading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState([]);
  const [fileModal, setFileModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [selected_id, setSelected_id] = useState("");
  const [seleced_file, setSelectedFile] = useState([]);
  const [inspect_modal, setInspect_modal] = useState(false);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const getData = async (page) => {
    setIsLoading(true);
    try {
      const res = await API.get(`/invoice/?offset=${page}&limit=${perPage}`);
      if (res?.data?.statuscode === 200) {
        setBillData(res?.data?.data);
        setTotalRows(res?.data?.count);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    try {
      setIsLoading(true);
      const res = await API.get(`/invoice/?offset=${page}&limit=${newPerPage}`);
      if (res?.data?.statuscode === 200) {
        setBillData(res?.data?.data);
        setPerPage(newPerPage);
        setTotalRows(res.data.count);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(0);
  }, []);

  const EXTENDED_COLUMN = [
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown drop={billData?.length <= 3 && "start"}>
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
            {user?.accessibility?.includes("invoice.bill_message_invoice") && (
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
      name: "Edit",
      cell: (row) =>
        row?.status !== 2 && (
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
      {user?.accessibility?.includes("invoice.list") ? (
        <Layout>
          <PageHeader title={"Bill List"} />
          <Container fluid>
            <Card>
              <Card.Body>
                {user?.accessibility?.includes("invoice.create") && (
                  <div className="d-flex justify-content-end align-items-end mb-3">
                    <Link to={BILL_ADD_URL} className="btn btn-primary">
                      <FaPlus /> Add New Bill
                    </Link>
                  </div>
                )}
                <Table
                  paginationServer
                  paginationTotalRows={totalRows}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handlePerRowsChange}
                  columns={columns.concat(EXTENDED_COLUMN)}
                  data={billData}
                />
              </Card.Body>
            </Card>
          </Container>
        </Layout>
      ) : (
        <Navigate to={UNAUTHORIZED} />
      )}

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

      {/* Inspect Modal */}
      <InspectModal
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

export default Bill;

// <CustomTable
//   columns={BILL_LIST_TABLE_COLUMN}
//   data={billData}
//   size={"sm"}
//   // pagination
//   responsive
// />
