import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactSelect from "react-select";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Layout from "../../../layout/Layout";
import { REPORT_INCREMENT_ELIGIBLE_SALARY_SUMMERY_API, SALARY_INCREMENT_REPORT_POST } from "../../../utils/API_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";

export default function SalaryIncrementReport() {
  const [loading, setLoading] = useState(false);
  const currYear = new Date().getFullYear();
  const [year, setYear] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { employee_id: "all", day: "0", month: "0", year: year.toString() };

    try {
      const res = await API.post(SALARY_INCREMENT_REPORT_POST(year.toString()), payload, {
        responseType: "blob",
      });
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
      error_alert("Error! Can not download data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="Performance Evaluation and Salary Increment" />
      <Content>
        <Form className="w-50 m-auto" onSubmit={handleDownload}>
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
          <Button type="submit" disabled={year === ""}>
            Download
          </Button>
        </Form>
      </Content>
    </Layout>
  );
}
