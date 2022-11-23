import React, { useEffect, useState } from "react";
import { Button, Form, Modal, ModalTitle } from "react-bootstrap";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import useSbu from "../../../hooks/SBU/useSbu";
import Layout from "../../../layout/Layout";
import Select from "react-select";
import { API } from "../../../utils/axios/axiosConfig";
import { KPI_PERMORMER_ASSESTMENT_BY_SBU_GET } from "../../../utils/API_ROUTES";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import Table from "../../../components/table/Table";
import { dataColumns } from "./data-columns";
import EmployeePerformerDetails from "./details";
import ProposedAmount from "./proposedAmount";
import { RiFileDownloadFill } from "react-icons/ri";
import { USER_INFO } from "../../../utils/session/token";
import { Navigate } from "react-router-dom";
import { UNAUTHORIZED } from "../../../utils/APP_ROUTES";
import Summary from "./summary";

export default function KpiPerformerAssestment() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);

  // Calling Custom Hooks
  const { data, isLoading } = useSbu();

  // SBU-LIST
  const sbuList = data?.map((d) => ({ label: d.name, value: d.id }));

  //Form State
  const [selectedRowId, setSelectedRowId] = useState("");
  const [sbuData, setSbuData] = useState([]);
  const [selectedSbu, setSelectedSbu] = useState("");
  const [selectedSbuName, setSelectedSbuName] = useState("");

  //Modal states
  const [detailModal, setDetailModal] = useState(false);
  const [incAmountModal, setIncAmountModal] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);

  const [employee_name, setEmployee_name] = useState("");

  const currYear = new Date().getFullYear();

  //Get Data by Selecting SBU
  const selectedSbuData = () => {
    setLoading(true);
    API.get(KPI_PERMORMER_ASSESTMENT_BY_SBU_GET(selectedSbu))
      .then((res) => {
        if (res.data.statuscode === 200 && res.data.data.length > 0) {
          setSbuData(res.data.data);
        } else if (res.data.data.length === 0) {
          error_alert("No data found");
        } else {
          error_alert("Error!!! while retrieving data ");
        }
      })
      .catch((err) => {
        console.log(err);
        error_alert(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (selectedSbu !== "") {
      selectedSbuData();
    }
  }, [selectedSbu]);

  // Buttons in COLUMN
  const extended_columns = [
    {
      name: "Proposed",
      cell: (row) => (
        <>
          <Button
            size="sm"
            variant="info"
            title="Proposed"
            className="btn-rounded-circle"
            onClick={() => {
              setSelectedRowId(row.id);
              setIncAmountModal(true);
            }}
          >
            <i className="fe fe-edit-3"></i>
          </Button>
        </>
      ),
      width: "100px",
      center: true,
    },
    {
      name: <div>Year Summary</div>,
      cell: (row) => (
        <>
          <Button
            size="sm"
            variant="secondary"
            title="Details"
            className="btn-rounded-circle"
            onClick={() => {
              setSelectedRowId(row?.employee?.id);
              setEmployee_name(row?.employee?.name);
              setSummaryModal(true);
            }}
          >
            <i className="fe fe-file-text"></i>
          </Button>
        </>
      ),
      width: "130px",
      center: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <>
          <Button
            size="sm"
            variant="primary"
            title="Details"
            className="btn-rounded-circle"
            onClick={() => {
              setSelectedRowId(row.id);
              setDetailModal(true);
            }}
          >
            <i className="fe fe-file-text"></i>
          </Button>
        </>
      ),
      width: "80px",
      center: true,
    },

    {
      name: <div>Report</div>,
      cell: (row) => (
        <>
          <Button
            size="sm"
            variant="success"
            title="Download Report"
            className="btn-rounded-circle"
            onClick={(e) => {
              setSelectedRowId(row?.id);
              // pdfDownload(e, row?.employee?.id);
              pdfDownload(e, row?.employee?.id);
            }}
          >
            <RiFileDownloadFill />
          </Button>
        </>
      ),
      width: "80px",
      center: true,
    },
  ];

  // Modal off after submit success
  const afterSubmit = () => {
    setDetailModal(false);
    setIncAmountModal(false);
    selectedSbuData();
  };

  //download individual report
  const pdfDownload = (e, id) => {
    e.preventDefault();
    const payload = {
      employee_id: id,
      // employee_id: "5",
      day: "1",
      month: "March",
      year: "2022",
    };
    setLoading(true);
    API.post(`/reports/${currYear}/confirmed_increments_by_year/`, payload)
      .then((res) => {
        console.log(res);
        if (res.data.statuscode === 400) {
          error_alert(res.data.message);
        } else {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Performance Review.pdf");
          document.body.appendChild(link);
          link.click();
          setLoading(false);
          success_alert("File Downloaded");
        }
      })
      .catch((err) => {
        error_alert("No data found");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return user.accessibility.includes("PerformanceReview") ? (
    <Layout>
      {isLoading || (loading && <Loader />)}
      <PageHeader title="Performance Review" />
      <Content>
        {/* Select Dropdown */}
        <div className="w-50 m-auto">
          <Form>
            <Form.Group>
              <Form.Label>SBU</Form.Label>
              <Select
                options={sbuList}
                placeholder="Select SBU"
                onChange={(e) => {
                  setSelectedSbu(e.value);
                  setSelectedSbuName(e.label);
                }}
              />
            </Form.Group>
          </Form>
        </div>
        {sbuData.length > 0 && (
          <div className="mt-5">
            <h2>{`Employee Lists - ${selectedSbuName}`} </h2>
            <Table dense columns={dataColumns.concat(extended_columns)} data={sbuData} />
          </div>
        )}
      </Content>

      {/* Details */}
      <Modal show={detailModal} onHide={() => setDetailModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="mb-0">
            <h2 className="mb-0">Employee Details</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light p-3">
          <EmployeePerformerDetails rowId={selectedRowId} afterSubmit={afterSubmit} />
        </Modal.Body>
      </Modal>

      {/* Inc Amount Modal */}
      <Modal show={incAmountModal} onHide={() => setIncAmountModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="mb-0">
            <h2 className="mb-0">Proposed Amount</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProposedAmount rowId={selectedRowId} afterSubmit={afterSubmit} />
        </Modal.Body>
      </Modal>

      {/* Summary Modal */}
      <Modal
        show={summaryModal}
        onHide={() => {
          setSummaryModal(false);
        }}
        size="xl"
      >
        <Modal.Header closeButton>
          <ModalTitle className="mb-0">
            <h2 className="mb-0">Summary - {employee_name}</h2>
          </ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Summary rowId={selectedRowId} />
        </Modal.Body>
      </Modal>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
