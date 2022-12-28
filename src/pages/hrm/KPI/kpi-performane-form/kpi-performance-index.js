import Layout from "../../../../layout/Layout";
import PageHeader from "../../../../components/header/PageHeader";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Navigate, useNavigate } from "react-router-dom";
import { EMPLOYEE_PERFORMANCE_CREATE, UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";
import { API } from "../../../../utils/axios/axiosConfig";
import {
  APPRAISAL_FORM_GET,
  EMPLOYEE_ASSESTMENT_GET,
  KPI_PERFORMANCE_FORM,
  KPI_PERFORMANCE_FORM_DATE_VALIDATE,
} from "../../../../utils/routes/api_routes/API_ROUTES";
import Table from "../../../../components/table/Table";
import { kpiPerformanceFormColumns } from "./table-columns";
import Loader from "../../../../components/loader/Loader";
import { Card } from "react-bootstrap";
import moment from "moment";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";
import { USER_INFO } from "../../../../utils/session/token";

function KpiPerformanceIndex(props) {
  const user = USER_INFO();
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await API.get(KPI_PERFORMANCE_FORM);
        const response = await API.get(APPRAISAL_FORM_GET);
        setData(response.data);
        if (response.data.data.length <= 0) {
          const dateResponse = await API.get(KPI_PERFORMANCE_FORM_DATE_VALIDATE);
          const { start_date, end_date } = dateResponse.data.data[0];
          if (moment().isBetween(start_date, end_date)) {
            console.log(start_date, end_date);
            setDates([moment(start_date).format("DD MMM, YYYY"), moment(end_date).format("DD MMM, YYYY")]);
          }
        }
      } catch (err) {
      } finally {
        setShowLoading(false);
      }
    };

    fetchData();
    /*API.get(KPI_PERFORMANCE_FORM_DATE_VALIDATE)
            .then(response => {
                console.log(response);
                setData(response.data);
            }).catch(err => {

        }).finally(() => {
            setShowLoading(false);
        })
        API.get(KPI_PERFORMANCE_FORM)
            .then(response => {
                console.log(response);
                setData(response.data);
            }).catch(err => {

        }).finally(() => {
            setShowLoading(false);
        })*/
  }, []);
  const onOkButtonClick = () => {
    navigate(EMPLOYEE_PERFORMANCE_CREATE);
  };

  return user.accessibility.includes("AppraisalForm") ? (
    <Layout>
      <PageHeader subTitle={""} title={"Appraisal Form"} />
      <Container fluid>
        <Card>
          <Card.Body>
            <Table data={data?.data} columns={kpiPerformanceFormColumns} />
          </Card.Body>
        </Card>
      </Container>
      {showLoading && <Loader />}
      {dates.length > 0 && (
        <ConfirmDialog
          message={`You do not have any KPI Performance Form.You can create KPI Performance Form within ${dates[0]} to ${dates[1]}. Are you want to create one?`}
          onOkButtonClick={onOkButtonClick}
        />
      )}
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}

export default KpiPerformanceIndex;
