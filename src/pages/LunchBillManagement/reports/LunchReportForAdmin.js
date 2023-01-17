import moment from "moment";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Content from "../../../components/content/Content";
import DatePicker from "../../../components/date-picker/DatePicker";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { DATE_FORMAT } from "../../../utils/CONSTANT";
import { LUNCH_REORT_FOR_ADMIN_POST, LUNCH_REORT_FOR_EMPLOYEE_POST } from "../../../utils/routes/api_routes/LUNCH_ROUTES";
import { USER_INFO } from "../../../utils/session/token";

export default function LunchReportForAdmin() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      from_date: from,
      to_date: to,
    };
    setLoading(true);
    API.post(LUNCH_REORT_FOR_ADMIN_POST, payload, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Lunch Report for Admin" + ".xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="Lunch Report for Admin" />
      <Content>
        <Form className="w-25 m-auto" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>From: </Form.Label>
            <DatePicker
              placeholder="Select From Date"
              value={from}
              onChange={(e) => setFrom(moment(e?._d).format("YYYY-MM-DD"))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>To: </Form.Label>
            <DatePicker
              placeholder="Select To Date"
              value={to}
              onChange={(e) => setTo(moment(e?._d).format("YYYY-MM-DD"))}
            />
          </Form.Group>
          <div>
            <Button disabled={from === "" || to === ""} type="submit">
              Download
            </Button>
          </div>
        </Form>
      </Content>
    </Layout>
  );
}
