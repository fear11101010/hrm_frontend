import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Content from "../../components/content/Content";
import PageHeader from "../../components/header/PageHeader";
import Loader from "../../components/loader/Loader";
import Layout from "../../layout/Layout";
import { API } from "../../utils/axios/axiosConfig";
import { USER_INFO } from "../../utils/session/token";
import BarChart from "./bar-chart/bar-chart";
import HorizontalBarGraph from "./bar-chart/horizontal-bar-chart";
import PieChartCustom from "./pie-chart/pie-chart";

export default function Dashboard() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [kpi_value_data, setKpi_value_data] = useState([]);
  const [kpi_obj_data, setKpi_obj_data] = useState([]);
  const [kpi_hr_data, setKpi_hr_data] = useState([]);
  const [sbu_inc_data, setSbu_inc_data] = useState([]);
  const currYear = new Date().getFullYear();

  const getInitialData = () => {
    setLoading(true);
    API.get(`dashboard_info/${currYear}/`)
      .then((res) => {
        if (res.data.statuscode === 200) {
          setData(res?.data);
          setKpi_value_data(res?.data?.kpi_value_data);
          setKpi_obj_data(res?.data?.kpi_obj_data);
          setKpi_hr_data(res?.data?.kpi_hr_data);
          setSbu_inc_data(res?.data?.sbu_increment);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader subTitle={"Overview"} title={"Dashboard"} />

      {user.accessibility.includes("dashboard") && (
        <div className="px-5">
          <Row>
            <Col sm="12" md="4">
              <PieChartCustom data={kpi_value_data} title={"KPI Value" + " " + currYear} />
            </Col>
            <Col sm="12" md="4">
              <PieChartCustom data={kpi_obj_data} title={"KPI Objective " + " " + currYear} />
            </Col>
            <Col sm="12" md="4">
              <PieChartCustom data={kpi_hr_data} title={"KPI HR" + " " + currYear} />
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="12">
              <HorizontalBarGraph title={"SBU Increment" + " " + currYear} data={sbu_inc_data} />
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}
