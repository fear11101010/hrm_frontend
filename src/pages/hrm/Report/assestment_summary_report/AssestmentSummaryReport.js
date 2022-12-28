import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import ReactSelect from "react-select";
import { error_alert } from "../../../../components/alert/Alert";
import Content from "../../../../components/content/Content";
import DatePicker from "../../../../components/date-picker/DatePicker";
import ExcelPdfPrint from "../../../../components/excel-pdf-print/ExcelPdfPrint";
import PageHeader from "../../../../components/header/PageHeader";
import Loader from "../../../../components/loader/Loader";
import Table from "../../../../components/table/Table";
import useSbu from "../../../../hooks/SBU/useSbu";
import useEmployee from "../../../../hooks/useEmployee";
import useSupervisor from "../../../../hooks/useSupervisor";
import Layout from "../../../../layout/Layout";
import { ASSESTMENT_SUMMARY_REPORT_POST, GLOBAL_FILTER } from "../../../../utils/routes/api_routes/API_ROUTES";
import { ASSESTMENT_SUMMARY_REPORT, UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";
import { API } from "../../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../../utils/session/token";
import { ASSESSMENT_SUMMARY_REPORT, ASSESTMENT_SUMMARY_REPORT_EXCEL_COLUMN } from "../excel-columns";
import { ASSESSMENT_SUMMARY_REPORT_TABLE_COLUMN } from "../table-columns";

export default function AssestmentSummaryReport() {
  const user = USER_INFO();

  //Input States
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [selected_employee, setSelected_employee] = useState("");
  const [selected_sbu, setSelected_sbu] = useState("");
  const [selected_supervisor, setSelected_supervisor] = useState("");
  const [selected_status, setSelected_status] = useState("");
  const [selected_year, setSelected_year] = useState(new Date().getFullYear());
  const tableRef = useRef(null);

  // Custom-Hook
  const employeeList = useEmployee()?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }));
  const { data, isLoading } = useSbu();
  const sbuList = data?.map((d) => ({ label: d.name, value: d.id }));
  const supervisorList = useSupervisor()?.map((d) => ({ label: d.name, value: d.id }));
  const statusList = [
    { label: "In Progress", value: "0" },
    { label: "Complete", value: "1" },
    { label: "Supervisor Review", value: "2" },
  ];

  const [dataCount, setDataCount] = useState(0);
  const [lastThreeYearData, setLastThreeYearData] = useState({});
  const [allDsId, setAllDsId] = useState({});
  const [employeeDetail, setEmployeeDetail] = useState({});

  const lastThreeYear = [selected_year - 2, selected_year - 1, selected_year];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected_year === "") {
      error_alert("Select Year");
    } else {
      setLoading(true);
      const payload = {
        // model_name: "assessment_detail",
        employee_id: selected_employee,
        sbu_id: selected_sbu,
        supervisor_id: selected_supervisor,
        flag: selected_status,
        year: selected_year,

        //   NO need use in this case
        // data_range: "",
        // data_like: "",
        // data_in: "",
      };
      API.post(ASSESTMENT_SUMMARY_REPORT_POST, payload)
        .then((res) => {
          if (res.data.statuscode === 200) {
            if (res.data.count === 0) {
              error_alert("No data found");
              setReportData([]);
              setLastThreeYearData({});
            } else {
              if (Array.isArray(res.data.data)) {
                const em = res.data.data.reduce((c, p) => {
                  const obj = Object.values(p)[0];
                  const len = Object.values(p)[0]?.length;
                  const emm = Object.values(Object.values(p)[0][len - 1])[0].employee;
                  return { ...c, [Object.keys(p)[0]]: emm };
                }, {});
                const lty = res.data.data.reduce((c, p) => {
                  const key = Object.keys(p)[0];
                  const values = Object.values(p)[0].reduce((a, c) => ({ ...a, ...c }), {});
                  return { ...c, [key]: values };
                }, {});

                setDataCount(res.data.count);
                setLastThreeYearData({ ...lty });
                setAllDsId(res.data.data.map((v) => Object.keys(v)[0]));
                setEmployeeDetail(em);
                // console.log(lastThreeYearData);
              }
            }
          } else {
            error_alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          tableRef?.current?.scrollIntoView();
        });
    }
  };

  const reset = () => {
    setSelected_employee("");
    setSelected_sbu("");
    setSelected_supervisor("");
    setSelected_status("");
    setSelected_year("");
  };

  return user.accessibility.includes("AssessmentSummaryReport") ? (
    <Layout>
      {isLoading && <Loader />}
      {loading && <Loader />}
      <PageHeader title="Assessment Summary Report" />
      <Content>
        <Form className="w-50 m-auto" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select Employee</Form.Label>
            <ReactSelect
              options={[{ label: "All", value: "all" }].concat(employeeList)}
              placeholder={
                selected_employee === ""
                  ? "Select Employee"
                  : selected_employee === "all"
                  ? "All"
                  : employeeList?.map((d) => d.value === selected_employee && d.label)
              }
              onChange={(e) => {
                setSelected_employee(e.value);
              }}
              value={selected_employee}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select SBU</Form.Label>
            <ReactSelect
              options={sbuList}
              placeholder={selected_sbu === "" ? "Select SBU" : sbuList?.map((d) => d.value === selected_sbu && d.label)}
              onChange={(e) => {
                setSelected_sbu(e.value);
              }}
              value={selected_sbu}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select Supervisor</Form.Label>
            <ReactSelect
              options={supervisorList}
              placeholder={
                selected_supervisor === ""
                  ? "Select Supervisor"
                  : supervisorList?.map((d) => d.value === selected_supervisor && d.label)
              }
              onChange={(e) => {
                setSelected_supervisor(e.value);
              }}
              value={selected_supervisor}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">
              Select Year <span className="text-danger">*</span>{" "}
            </Form.Label>
            <DatePicker
              dateFormat="YYYY"
              placeholder={"Select Year"}
              onChange={(e) => {
                setSelected_year(parseInt(moment(e?._d).format("YYYY")));
              }}
              value={selected_year}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select Status</Form.Label>
            <ReactSelect
              options={statusList}
              placeholder={
                selected_status === "" ? "Select Status" : statusList?.map((d) => d.value === selected_status && d.label)
              }
              onChange={(e) => {
                setSelected_status(e.value);
              }}
              value={selected_status}
            />
          </Form.Group>
          <Button variant="light" className="me-2 fw-bold" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit">Search</Button>
        </Form>

        <div ref={tableRef}>
          {dataCount > 0 && (
            <>
              <hr />
              <div className="text-end">
                <ExcelPdfPrint
                  exportPdf={false}
                  print={false}
                  header="Assessment Summary Report"
                  data={Object.values(lastThreeYearData)}
                  columns={ASSESSMENT_SUMMARY_REPORT(lastThreeYear, selected_year)}
                />
                <Table
                  dense
                  pagination={false}
                  fixedHeader
                  fixedHeaderScrollHeight="400px"
                  data={Object.values(lastThreeYearData)}
                  columns={ASSESSMENT_SUMMARY_REPORT_TABLE_COLUMN(lastThreeYear, selected_year)}
                />
              </div>
            </>
          )}
        </div>
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
