import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import ReactSelect from "react-select";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { EMPLOYEE_LIST_GET, SALARY_INCREMENT_REPORT_POST } from "../../../utils/API_ROUTES";
import { UNAUTHORIZED } from "../../../utils/APP_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../utils/session/token";

export default function SalaryIncrementReport() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const currYear = new Date().getFullYear();
  const [employee_id, setEmployee_id] = useState("");
  const [isAll, setIsAll] = useState(false);
  const [year, setYear] = useState("");
  const { data, isLoading } = useFetch(EMPLOYEE_LIST_GET);

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { employee_id: isAll ? "all" : employee_id, day: "1", month: "March", year: year.toString() };

    try {
      const res = await API.post(SALARY_INCREMENT_REPORT_POST(year.toString()), payload, {
        responseType: "blob",
      });
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
        // if (res.data.statuscode === 200) {
        //   console.log(res.data.data);
        //   setReportData(res.data.data);
        // } else {
        //   error_alert(res.data.message);
        // }
      }
    } catch (err) {
      console.log(err);
      // error_alert(err?.response?.data.message);
      error_alert("No data found");
    } finally {
      setLoading(false);
    }
  };
  return user.accessibility.includes("SalaryIncrementReport") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="Salary Increment &amp; Performance Evaluation" />
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
            <Form.Label className="mb-1">Select Year</Form.Label>
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
          <Button type="submit">Download</Button>
        </Form>
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
