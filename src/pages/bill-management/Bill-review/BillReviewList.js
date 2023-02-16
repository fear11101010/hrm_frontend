import React, { useEffect, useState } from "react";
import { Card, Container, Dropdown, Modal } from "react-bootstrap";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../utils/session/token";
import BillApproveModal from "../Bill-approve/bill-approve-modal/BillApproveModal";
import BillDetails from "../Bill-approve/bill-approve-modal/BillDetails";
import { columns } from "../Bill-approve/columns";
import InspectModal from "../Bill/InspectModal";

export default function BillReviewList() {
  const user = USER_INFO();
  const [isLoading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState([]);
  const [selected_id, setSelected_id] = useState("");
  const [forwaredTo, setForwardTo] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [detail_modal, setDetail_modal] = useState(false);
  const [approve_modal, setApprove_modal] = useState(false);
  const [inspect_modal, setInspect_modal] = useState(false);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const getData = async (page) => {
    setIsLoading(true);
    try {
      const res = await API.get(`invoice/$/bill_approve_list_for_accnts/?offset=${page}&limit=${perPage}`);
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
      const res = await API.get(`/invoice/$/bill_approve_list/?offset=${page}&limit=${newPerPage}`);
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
    getData(1);
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
            {row?.status === 2 || row?.status === 4 || !user?.accessibility?.includes("bill_status.POST") ? (
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
  ];

  return (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title={"Bill Review List"} />
      <Container fluid>
        <Card>
          <Card.Body>
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
