import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { LUNCH_ORDER_SUMMARY } from "../../../utils/routes/api_routes/LUNCH_ROUTES";
import { USER_INFO } from "../../../utils/session/token";

export default function LunchOrderSummaryReport() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = () => {
    setLoading(true);
    API.get("lunch_reports/1/daily_lunch_summary/", { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Lunch Order Summary" + ".xlsx");
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
      <PageHeader title="Lunch Order Summary" />
      <Content>
        <div className="text-center">
          <Button type="submit" onClick={handleSubmit}>
            Download Lunch Order Summary Report
          </Button>
        </div>
      </Content>
    </Layout>
  );
}
