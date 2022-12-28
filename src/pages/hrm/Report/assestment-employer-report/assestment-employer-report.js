import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import ReactSelect from "react-select";
import { error_alert, success_alert } from "../../../../components/alert/Alert";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";
import Content from "../../../../components/content/Content";
import PageHeader from "../../../../components/header/PageHeader";
import Loader from "../../../../components/loader/Loader";
import useFetch from "../../../../hooks/useFetch";
import Layout from "../../../../layout/Layout";
import { ASSESTMENT_EMPLOYER_REPORT_POST, EMPLOYEE_LIST_GET } from "../../../../utils/routes/api_routes/API_ROUTES";
import { UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";
import { API } from "../../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../../utils/session/token";

export default function AssestmentEmployerReport() {
  const user = USER_INFO();
  const currYear = new Date().getFullYear();
  const { data, isLoading } = useFetch(EMPLOYEE_LIST_GET);

  //States
  const [loading, setLoading] = useState(false);
  const [employee_id, setEmployee_id] = useState("");
  const [year, setYear] = useState("");

  const [isAll, setIsAll] = useState(false);

  //   Download report
  const handleDownload = async (e) => {
    e.preventDefault();
    if (setEmployee_id === "" || setYear === "") {
      error_alert("Please select all the fields");
    } else {
      setLoading(true);
      const payload = { employee_id: isAll ? "all" : employee_id.toString(), year: year.toString() };
      try {
        const res = await API.post(ASSESTMENT_EMPLOYER_REPORT_POST, payload, { responseType: "blob" });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Assestment Employer Report.xlsx");
        document.body.appendChild(link);
        link.click();
        setLoading(false);
        setIsAll(false);
        success_alert("File Downloaded");
        // if (res.data.statuscode === 200) {
        //   console.log(res.data.data);
        //   setReportData(res.data.data);
        // } else {
        //   error_alert(res.data.message);
        // }
      } catch (err) {
        console.log(err);
        error_alert(err?.response?.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return user.accessibility.includes("AssestmentEmployerReport") ? (
    <Layout>
      {isLoading && <Loader />}
      {loading && <Loader />}
      <PageHeader title="Assestment Employer Report" />
      <Content>
        <Form className="w-50 m-auto" onSubmit={handleDownload}>
          <Form.Check
            type={"checkbox"}
            id={`all`}
            label="All"
            className="mb-3 fw-bold"
            checked={isAll}
            onChange={() => {
              setIsAll(!isAll);
              setEmployee_id("");
            }}
          />
          {!isAll && (
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Employee</Form.Label>
              <ReactSelect
                options={data.data?.map((d) => ({ label: d?.name + " (" + d?.employee_id + ")", value: d?.id }))}
                onChange={(e) => {
                  setEmployee_id(e.value);
                }}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label className="mb-1">Year</Form.Label>
            <ReactSelect
              options={[
                { label: currYear, value: currYear },
                { label: currYear - 1, value: currYear - 1 },
                { label: currYear - 2, value: currYear - 2 },
              ]}
              onChange={(e) => {
                setYear(e.value);
              }}
            />
          </Form.Group>

          <Button type="submit" className="ms-2">
            Download
          </Button>
        </Form>
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
