import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal, ModalTitle } from "react-bootstrap";
import Content from "../../../../components/content/Content";
import PageHeader from "../../../../components/header/PageHeader";
import Loader from "../../../../components/loader/Loader";
import useSbu from "../../../../hooks/SBU/useSbu";
import Layout from "../../../../layout/Layout";
import Select from "react-select";
import { API } from "../../../../utils/axios/axiosConfig";
import {
  GLOBAL_FILTER,
  KPI_PERMORMER_ASSESTMENT_BULK_SUBMIT,
  KPI_PERMORMER_ASSESTMENT_BY_SBU_GET,
  PERFORMANCE_REVIEW_FILTER,
} from "../../../../utils/routes/api_routes/API_ROUTES";
import { error_alert, success_alert } from "../../../../components/alert/Alert";
import Table from "../../../../components/table/Table";
import { dataColumns } from "./data-columns";
import EmployeePerformerDetails from "./details";
import ProposedAmount from "./proposedAmount";
import { RiFileDownloadFill, RiReplyAllFill } from "react-icons/ri";
import { USER_INFO } from "../../../../utils/session/token";
import { Navigate } from "react-router-dom";
import { UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";
import Summary from "./summary";
import Filter from "../../../../components/table/filter";
import ReactSelect from "react-select";
import useDesignation from "../../../../hooks/useDesignation";
import useEmployee from "../../../../hooks/useEmployee";
import { ASSESTMENT_TYPE, YEAR_RANGE } from "../../../../utils/CONSTANT";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";

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
  const [isConfirm, setIsConfirm] = useState(false);
  const [isBulkConfirm, setIsBulkConfirm] = useState(false);
  const [employee_name, setEmployee_name] = useState("");
  const currYear = new Date().getFullYear();

  // table select
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  // Change while selecting checkbox
  const handleRowSelected = useCallback((data) => {
    let getSelectedId = data?.selectedRows?.map((d) => d?.id);
    setSelectedRows(getSelectedId);
  }, []);

  //Get Data by Selecting SBU
  const selectedSbuData = () => {
    setLoading(true);
    API.get(KPI_PERMORMER_ASSESTMENT_BY_SBU_GET(selectedSbu))
      .then((res) => {
        if (res.data.statuscode === 200 && res.data.data.length > 0) {
          setSbuData(res.data.data);
        } else if (res.data.data.length === 0) {
          error_alert("No data found");
          setSbuData([]);
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
          {row.flag !== 1 && (
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
          )}
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
            F
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
    {
      name: <div>Request for edit</div>,
      cell: (row) => (
        <>
          {row.flag === 1 && (
            <Button
              size="sm"
              variant="dark"
              title="Download Report"
              className="btn-rounded-circle"
              onClick={(e) => {
                setSelectedRowId(row?.id);
                setIsConfirm(true);
              }}
            >
              <RiReplyAllFill />
            </Button>
          )}
        </>
      ),
      width: "100px",
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

  const handleRequestForEdit = (e) => {
    e.preventDefault();
    API.get(`assessment/${selectedRowId}/admin_request_update/`)
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
          selectedSbuData();
        } else {
          error_alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setIsConfirm(false);
      });
  };

  // Bulk Submit
  const bulkSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post(KPI_PERMORMER_ASSESTMENT_BULK_SUBMIT, { final_id: selectedRows })
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
          setSelectedRows([]);
          setToggleCleared(!toggleCleared);
          selectedSbuData();
        } else {
          error_alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setToggleCleared(!toggleCleared);
        setSelectedRows([]);
        setIsBulkConfirm(false);
      });
  };

  ///////////////
  // FILTER
  ///////////////

  const employeList = useEmployee();
  const designationList = useDesignation();
  const [filter_year, setFilter_year] = useState("");
  const [filter_type, setFilter_type] = useState("");
  const [filter_employee, setFilter_employee] = useState("");
  const [filter_designation, setFilter_designation] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFiltering = (e) => {
    e.preventDefault();
    const payload = {
      model_name: "assessment_detail",
      year: filter_year,
      type: filter_type,
      sbu_id: selectedSbu,
      employee_id: filter_employee,
      designation_id: filter_designation,
    };
    setLoading(true);
    API.post(GLOBAL_FILTER, payload)
      .then((res) => {
        if (res.data.statuscode === 200) {
          if (res.data.data.length > 0) {
            setSbuData([]);
            setSbuData(res.data.data);
            setIsFilterOpen(false);
          } else {
            error_alert("No Data Found");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const reset_filter = () => {
    selectedSbuData();
    setFilter_year("");
    setFilter_type("");
    setFilter_employee("");
    setFilter_designation("");
  };

  // Disabled row when status is approved by head
  const rowDisabledCriteria = (row) => row?.flag === 1;

  //PerformanceReview
  return user.accessibility.includes("performer_assessment.search_by_sbu") ? (
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
            <h2 className="text-center">{`Employee Lists - ${selectedSbuName}`} </h2>
            {/* <Filter
              show={isFilterOpen}
              onClick={() => {
                setIsFilterOpen(true);
              }}
              onHide={() => {
                setIsFilterOpen(false);
              }}
            >
              <Form onSubmit={handleFiltering}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-0">Year</Form.Label>
                  <ReactSelect
                    options={YEAR_RANGE}
                    onChange={(e) => {
                      setFilter_year(e.value);
                    }}
                    placeholder={
                      filter_year === "" ? "Select Year" : YEAR_RANGE.map((d) => d.value === filter_year && d.label)
                    }
                    value={filter_year}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-0">Type</Form.Label>
                  <ReactSelect
                    options={ASSESTMENT_TYPE}
                    onChange={(e) => {
                      setFilter_type(e.value);
                    }}
                    placeholder={
                      filter_type === "" ? "Select Type" : ASSESTMENT_TYPE.map((d) => d.value === filter_type && d.label)
                    }
                    value={filter_type}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-0">Employee</Form.Label>
                  <ReactSelect
                    options={employeList?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }))}
                    onChange={(e) => {
                      setFilter_employee(e.value);
                    }}
                    placeholder={
                      filter_employee === ""
                        ? "Select Employee"
                        : employeList?.map((d) => d.id === filter_employee && d.name)
                    }
                    value={filter_employee}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-0">Designation</Form.Label>
                  <ReactSelect
                    options={designationList?.map((d) => ({ label: d.designation, value: d.id }))}
                    onChange={(e) => {
                      setFilter_designation(e.value);
                    }}
                    placeholder={
                      filter_designation === ""
                        ? "Select Designation"
                        : designationList?.map((d) => d.id === filter_designation && d.designation)
                    }
                    value={filter_designation}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="light" className="mt-2  ms-2 fw-bold" onClick={reset_filter}>
                    Clear Filter
                  </Button>
                  <Button type="submit" className="mt-2 ">
                    Apply Filter
                  </Button>
                </div>
              </Form>
            </Filter> */}
            <Table
              columns={dataColumns.concat(extended_columns)}
              data={sbuData}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              selectableRowDisabled={rowDisabledCriteria}
              clearSelectedRows={toggleCleared}
            />
            <div className="text-end">
              {selectedRows.length > 0 && (
                <Button
                  onClick={() => {
                    setIsBulkConfirm(true);
                  }}
                >
                  Approve
                </Button>
              )}
            </div>
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

      {/* Confirm modal for request  */}
      {isConfirm && (
        <ConfirmDialog
          message={"Are you sure you want to request for edit?"}
          onOkButtonClick={handleRequestForEdit}
          onCancelButtonClick={(e) => setIsConfirm(false)}
        />
      )}
      {isBulkConfirm && (
        <ConfirmDialog
          message={"Are you sure you want to bulk approve?"}
          onOkButtonClick={bulkSubmit}
          onCancelButtonClick={(e) => setIsBulkConfirm(false)}
        />
      )}
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
