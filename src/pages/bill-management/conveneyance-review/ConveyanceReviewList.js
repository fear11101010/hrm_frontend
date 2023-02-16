import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Card, Dropdown } from "react-bootstrap";
import { API } from "../../../utils/axios/axiosConfig";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import { USER_INFO } from "../../../utils/session/token";
import { CONVEYANCE_LIST_TABLE } from "../Conveyance-approve/columns";
import DetailsModal from "../Conveyance-approve/modals/DetailsModal";
import UpdateStatusModal from "../Conveyance-approve/modals/UpdateStatusModal";
import InspectModal from "../Conveyance-approve/inspect-modal/InspectModal";

export default function ConveyanceReviewList() {
  const user = USER_INFO();
  const [isLoading, setIsLoading] = useState(false);
  const [conveyance, setConveyance] = useState([]);
  const [approve_modal, setApprove_modal] = useState(false);
  const [forwaredTo, setForwardTo] = useState("");
  const [status, setStatus] = useState("");
  const [detail_modal, setDetail_modal] = useState(false);
  const [selected_id, setSelected_id] = useState("");
  const [inspect_modal, setInspect_modal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const getData = async (page) => {
    setIsLoading(true);
    try {
      const res = await API.get(`conveyance/$/bill_approve_list_for_accnts/?offset=${page}&limit=${perPage}`);
      if (res?.data?.statuscode === 200) {
        setConveyance(res?.data?.data);
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
      const res = await API.get(`conveyance/$/bill_approve_list_for_accnts/?offset=${page}&limit=${newPerPage}`);
      if (res?.data?.statuscode === 200) {
        setConveyance(res?.data?.data);
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
        <Dropdown drop={conveyance?.length <= 3 && "start"}>
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
            <Dropdown.Item
              onClick={() => {
                setInspect_modal(true);
                setSelected_id(row?.id);
              }}
            >
              <i className="fe fe-eye"></i> Inspect Conveyance
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
      <PageHeader title={"Conveyance Review List"} />
      <Container fluid>
        <Card>
          <Card.Body>
            <Table
              paginationServer
              paginationTotalRows={totalRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              data={conveyance}
              columns={CONVEYANCE_LIST_TABLE.concat(EXTENDED_COLUMN)}
            />
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
