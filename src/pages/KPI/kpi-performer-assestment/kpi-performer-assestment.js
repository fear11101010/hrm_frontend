import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
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

export default function KpiPerformerAssestment() {
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

  //Get Data by Selecting SBU
  useEffect(() => {
    if (selectedSbu !== "") {
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
    }
  }, [selectedSbu]);

  // Buttons in COLUMN
  const extended_columns = [
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
      name: <div>Report (PDF)</div>,
      cell: (row) => (
        <>
          <Button
            size="sm"
            variant="primary"
            title="Download Report"
            className="btn-rounded-circle"
            onClick={() => {
              setSelectedRowId(row.id);
              setIncAmountModal(true);
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
  };

  return (
    <Layout>
      {isLoading || (loading && <Loader />)}
      <PageHeader title="KPI Performer Assestment" />
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
    </Layout>
  );
}
