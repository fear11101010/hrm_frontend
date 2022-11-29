import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import ReactSelect from "react-select";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import ConfirmDialog from "../../../components/confirm-dialog/ConfirmDialog";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { ASSESTMENT_EMPLOYER_REPORT_POST, EMPLOYEE_LIST_GET } from "../../../utils/API_ROUTES";
import { UNAUTHORIZED } from "../../../utils/APP_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../utils/session/token";

export default function AssestmentEmployerReport() {
  const user = USER_INFO();
  const currYear = new Date().getFullYear();
  const { data, isLoading } = useFetch(EMPLOYEE_LIST_GET);

  //States
  const [loading, setLoading] = useState(false);
  const [allDownload, setAllDownload] = useState(false);
  const [employee_id, setEmployee_id] = useState("");
  const [year, setYear] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  //   Download report
  const handleDownload = async (e) => {
    e.preventDefault();
    if (setEmployee_id === "" || setYear === "") {
      error_alert("Please select all the fields");
    } else {
      setLoading(true);
      const payload = { employee_id: allDownload ? "all" : employee_id.toString(), year: year.toString() };
      try {
        const res = await API.post(ASSESTMENT_EMPLOYER_REPORT_POST, payload, { responseType: "blob" });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Assestment Employer Report.xlsx");
        document.body.appendChild(link);
        link.click();
        setLoading(false);
        setIsConfirm(false);
        setAllDownload(false);
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

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setIsConfirm(true);
    setAllDownload(true);
  };
  return user.accessibility.includes("AssestmentEmployerReport") ? (
    <Layout>
      {isLoading && <Loader />}
      {loading && <Loader />}
      <PageHeader title="Assestment Employer Report" />
      <Content>
        <Form className="w-50 m-auto" onSubmit={handleDownload}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-1">Employee</Form.Label>
            <ReactSelect
              options={data.data?.map((d) => ({ label: d?.name + " (" + d?.employee_id + ")", value: d?.id }))}
              onChange={(e) => {
                setEmployee_id(e.value);
              }}
            />
          </Form.Group>
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

          <Button type="submit" disabled={employee_id === "" || year === ""}>
            View Report
          </Button>
          <Button
            variant="dark"
            type="submit"
            className="ms-2"
            onClick={(e) => {
              handleConfirmModal(e);
            }}
            disabled={year === "" || employee_id !== ""}
          >
            All Report
          </Button>
        </Form>
        {isConfirm && (
          <ConfirmDialog
            message="Are you sure you want to download all employee report?"
            onOkButtonClick={handleDownload}
            onCancelButtonClick={() => {
              setIsConfirm(false);
            }}
          />
        )}
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
