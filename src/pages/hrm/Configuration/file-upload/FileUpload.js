import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate, useLocation, useNavigate, useHistory } from "react-router-dom";
import ReactSelect from "react-select";
import Content from "../../../../components/content/Content";
import PageHeader from "../../../../components/header/PageHeader";
import Loader from "../../../../components/loader/Loader";
import useEmployee from "../../../../hooks/useEmployee";
import Layout from "../../../../layout/Layout";
import { FILE_UPLOAD_POST } from "../../../../utils/routes/api_routes/API_ROUTES";
import { UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";
import { API } from "../../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../../utils/session/token";
import { YEAR_RANGE } from "../../../../utils/CONSTANT";
import { error_alert, success_alert } from "../../../../components/alert/Alert";

export default function FileUpload() {
  const user = USER_INFO();
  const navigate = useNavigate();

  const { state, code } = useLocation();
  const [loading, setLoading] = useState(false);
  const [em_id, setEm_id] = useState("");
  const [year, setYear] = useState("2022");
  const [xls, setXls] = useState(null);
  const [xls_filename, setXls_filename] = useState(null);

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
            setXls("");
            navigate("/file-upload", { state: { msg: res.data.message, code: 200 } });
            window.location.reload();
          } else {
            error_alert(res.data.message);
            navigate("/file-upload", { state: { msg: res.data.message, code: 400 } });
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

  console.log(state, code);
  return user.accessibility.includes("FileUpload") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="File Upload" />
      <Content>
        <Form className="m-auto w-50" onSubmit={onUpload}>
          {state !== null && (
            <>
              {state?.code === 200 ? (
                <div className="alert alert-success">
                  <h5 className="mb-0">{state?.msg}</h5>
                </div>
              ) : (
                <div className="alert alert-danger">
                  <h5 className="mb-0">{state?.msg}</h5>
                </div>
              )}
            </>
          )}
          <Form.Group className="mb-3">
            <Form.Label className="mb-0">Select Employee</Form.Label>
            <ReactSelect
              options={employeeList}
              placeholder={em_id !== "" ? employeeList?.map((d) => d.value === em_id && d.label) : "Select Employee"}
              onChange={(e) => {
                setEm_id(e.value);
              }}
              value={em_id}
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
                setXls_filename(e.target.files[0]?.name);
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
