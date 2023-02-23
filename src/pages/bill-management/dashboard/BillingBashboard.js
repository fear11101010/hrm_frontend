import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { error_alert } from "../../../components/alert/Alert";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import StatusCard from "./StatusCard";

export default function BillingBashboard() {
  const [loading, setLoading] = useState(false);
  const [requestStatusData, setRequestStatusData] = useState([]);
  const [requestStatusDataConv, setRequestStatusConv] = useState([]);
  const [bill, setBill] = useState({});
  const [conv, setConv] = useState({});

  const getData = async () => {
    try {
      setLoading(true);
      let res = await API.get(`bill_dashboard/`);
      if (res?.data?.statuscode === 200) {
        setBill(res?.data?.bill);
        setConv(res?.data?.conveyance);
      } else {
        error_alert(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (bill) {
      const arr = [];
      for (const key in bill) {
        switch (key) {
          case "all":
            arr.push({ name: "All", value: bill?.all, fill: "#0088FE" });
            break;
          case "approved":
            arr.push({ name: "Approved", value: bill?.approved, fill: "#00C49F" });
            break;
          case "rejected":
            arr.push({ name: "Rejected", value: bill?.rejected, fill: "#FFBB28" });
            break;
          case "in_progress":
            arr.push({ name: "In Progress", value: bill?.in_progress, fill: "#FF8042" });
            break;
        }
      }
      setRequestStatusData(arr);
    }

    if (conv) {
      const arr = [];
      for (const key in bill) {
        switch (key) {
          case "all":
            arr.push({ name: "All", value: conv?.all, fill: "#0088FE" });
            break;
          case "approved":
            arr.push({ name: "Approved", value: conv?.approved, fill: "#00C49F" });
            break;
          case "rejected":
            arr.push({ name: "Rejected", value: conv?.rejected, fill: "#FFBB28" });
            break;
          case "in_progress":
            arr.push({ name: "In Progress", value: conv?.in_progress, fill: "#FF8042" });
            break;
        }
      }
      setRequestStatusConv(arr);
    }
  }, [bill, conv]);

  return (
    <Layout>
      <Container>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h2 className="mb-0">Bill</h2>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <StatusCard data={bill?.all} name="All" />
                  </Col>
                  <Col md={3}>
                    <StatusCard data={bill?.approved} name="Approved" />
                  </Col>
                  <Col md={3}>
                    <StatusCard data={bill?.rejected} name="Rejected" />
                  </Col>
                  <Col md={3}>
                    <StatusCard data={bill?.in_progress} name="In Progress" />
                  </Col>
                </Row>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart width={"100%"} data={requestStatusData}>
                    <XAxis dataKey={"name"} />
                    <YAxis dataKey={"value"} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "4px",
                        border: "1px solid #666",
                      }}
                    />
                    <Bar dataKey="value" fill="#850000" barSize={10} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h2 className="mb-0">Conveyance</h2>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <StatusCard data={conv?.all} name="All" />
                  </Col>
                  <Col md={3}>
                    <StatusCard data={conv?.approved} name="Approved" />
                  </Col>
                  <Col md={3}>
                    <StatusCard data={conv?.rejected} name="Rejected" />
                  </Col>
                  <Col md={3}>
                    <StatusCard data={conv?.in_progress} name="In Progress" />
                  </Col>
                </Row>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart width={"100%"} data={requestStatusDataConv}>
                    <XAxis dataKey={"name"} />
                    <YAxis dataKey={"value"} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "4px",
                        border: "1px solid #666",
                      }}
                    />
                    <Bar dataKey="value" fill="#850000" barSize={10} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
