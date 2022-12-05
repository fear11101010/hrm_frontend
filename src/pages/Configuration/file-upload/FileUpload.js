import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import ReactSelect from "react-select";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import useEmployee from "../../../hooks/useEmployee";
import Layout from "../../../layout/Layout";
import { FILE_UPLOAD_POST } from "../../../utils/API_ROUTES";
import { UNAUTHORIZED } from "../../../utils/APP_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../utils/session/token";
import { YEAR_RANGE } from "../../../utils/CONSTANT";
import { error_alert, success_alert } from "../../../components/alert/Alert";

export default function FileUpload() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const [em_id, setEm_id] = useState("");
  const [year, setYear] = useState("2022");
  const [xls, setXls] = useState(null);

  const employeeList = useEmployee()?.map((d) => ({
    label: d.name + " (" + d.employee_id + ")",
    value: d.id,
  }));

  const onUpload = (e) => {
    e.preventDefault();
    if (em_id === "") {
      error_alert("please select employee");
    } else if (year === "") {
      error_alert("please select year");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", xls);
      formData.append("year", year);

      API.post(FILE_UPLOAD_POST(em_id), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.statuscode === 200) {
            success_alert(res.data.message);
            setEm_id("");
            setYear("2022");
            setXls(null);
            window.location.reload();
          } else {
            error_alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return user.accessibility.includes("FileUpload") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="File Upload" />
      <Content>
        <Form className="m-auto w-50" onSubmit={onUpload}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select Employee</Form.Label>
            <ReactSelect
              options={employeeList}
              onChange={(e) => {
                setEm_id(e.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select Year</Form.Label>
            <ReactSelect
              options={YEAR_RANGE}
              defaultValue={YEAR_RANGE[0]}
              onChange={(e) => {
                setYear(e.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Upload File</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                setXls(e.target.files[0]);
              }}
            />
          </Form.Group>
          <Button type="submit">Upload</Button>
        </Form>
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
