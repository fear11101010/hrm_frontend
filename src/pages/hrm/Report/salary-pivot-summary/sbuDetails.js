import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import ExcelPdfPrint from "../../../../components/excel-pdf-print/ExcelPdfPrint";
import Table from "../../../../components/table/Table";
import { API } from "../../../../utils/axios/axiosConfig";
import { _Decode } from "../../../../utils/Hash";

export default function SbuDetails({ show, onHide, sbuID, year }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.post(`report_performance_assessed_data/$/pop_up_by_sbu/`, { year: year, sbu: sbuID });
      if (res.data.statuscode === 200) {
        setData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sbuID !== "" && year !== "") {
      fetchData();
    }
  }, [sbuID, year]);

  return (
    <>
      <Modal size="xl" show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title className="mb-0">
            <h2 className="mb-0">SBU Assestment Details</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <h3 className="mt-2">Loading...</h3>
            </div>
          ) : (
            <>
              <div className="text-end">
                <ExcelPdfPrint
                  exportPdf={false}
                  print={false}
                  header="SBU Assestment Report"
                  data={data}
                  columns={DETAILED_SBU_ASSESTMENT_REPORT_EXCEL_COLUMN}
                />
              </div>
              <Table
                dense
                columns={DETAILED_SBU_ASSESTMENT_REPORT_TABLE_COLUMN}
                data={data}
                paginationRowsPerPageOptions={["10", "20", "50", "100"]}
              />
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

let DETAILED_SBU_ASSESTMENT_REPORT_TABLE_COLUMN = [
  {
    name: "Name",
    selector: (row) => row?.employee?.name,
    width: "240px",
    sortable: true,
  },
  {
    name: "ID",
    selector: (row) => row?.employee?.employee_id,
    width: "100px",
    sortable: true,
  },
  {
    name: "Designation",
    selector: (row) => row?.employee?.designation,
    width: "200px",
    wrap: true,
    sortable: true,
  },
  {
    name: "SBU",
    selector: (row) => row?.employee?.sbu?.name,
    width: "200px",
    sortable: true,
  },
  {
    name: "Supervisor",
    selector: (row) => row?.employee?.supervisor?.name,
    width: "180px",
    sortable: true,
  },
  {
    name: "Objective",
    selector: (row) => row?.kpi_objective?.name,
    width: "200px",
    wrap: true,
    sortable: true,
  },
  {
    name: "Value",
    selector: (row) => row?.kpi_value?.name,
    width: "200px",
    sortable: true,
  },
  {
    name: "HR Rating",
    selector: (row) => row?.hr_rating?.name,
    width: "150px",
    sortable: true,
  },
  {
    name: "KPI",
    selector: (row) => row?.kpi_overall,
    width: "100px",
    sortable: true,
  },
  {
    name: <div> Proposed Amount By Supervisor</div>,
    selector: (row) => _Decode(row?.proposed_by_sbu_director_pm_self),
    cell: (row) =>
      _Decode(row?.proposed_by_sbu_director_pm_self) === "None" ? (
        ""
      ) : (
        <span>{_Decode(row?.proposed_by_sbu_director_pm_self)}</span>
      ),
    width: "200px",
    sortable: true,
    right: true,
  },
  {
    name: "Remarks ",
    selector: (row) => row?.remarks,
    width: "200px",
    sortable: true,
  },
];

const DETAILED_SBU_ASSESTMENT_REPORT_EXCEL_COLUMN = [
  {
    key: "Name",
    value: (row) => row?.employee?.name,
  },
  {
    key: "ID",
    value: (row) => row?.employee?.employee_id,
  },
  {
    key: "Designation",
    value: (row) => row?.employee?.designation,
  },
  {
    key: "SBU",
    value: (row) => row?.employee?.sbu?.name,
  },
  {
    key: "Supervisor",
    value: (row) => row?.employee?.supervisor?.name,
  },
  {
    key: "Objective",
    value: (row) => row?.kpi_objective?.name,
  },
  {
    key: "Value",
    value: (row) => row?.kpi_value?.name,
  },
  {
    key: "HR Rating",
    value: (row) => row?.hr_rating?.name,
  },
  {
    key: "KPI",
    value: (row) => row?.kpi_overall,
  },
  {
    key: "Proposed Amount By Supervisor",
    value: (row) => _Decode(row?.proposed_by_sbu_director_pm_self),
  },
  {
    key: "Remarks ",
    value: (row) => row?.remarks,
  },
];
