import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import { Button, Card, Col, Row } from "react-bootstrap";
import Select from "../../../../../components/select/Select";
import { useEffect, useState } from "react";
import useFetch from "../../../../../hooks/useFetch";
import {
  LUNCH_TIME_CONFIG_LIST_CREATE_API,
  LUNCH_TIME_CONFIG_LIST_UPDATE_API,
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import Loader from "../../../../../components/loader/Loader";
import { API } from "../../../../../utils/axios/axiosConfig";
import { error_alert, success_alert } from "../../../../../components/alert/Alert";

export default function LunchOrderTimeConfiguration(props) {
  const hours = [...Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: String(i + 1).padStart(2, "0") }))];
  const minutes = [...Array.from({ length: 60 }, (_, i) => ({ value: i, label: String(i).padStart(2, "0") }))];
  const am_pm = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];
  const [lunchOrder, setLunchOrder] = useState({ purpose: "LO" });
  const [menuEntry, setMenuEntry] = useState({ purpose: "ME" });
  const [orderCancel, setOrderCancel] = useState({ purpose: "OC" });
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useFetch(LUNCH_TIME_CONFIG_LIST_CREATE_API);

  useEffect(() => {
    if (data?.data && Array.isArray(data?.data) && data?.data?.length > 0) {
      data?.data?.forEach((conf) => {
        switch (conf?.purpose) {
          case "LO":
            setLunchOrder({ ...conf, purpose: "LO" });
            break;
          case "ME":
            setMenuEntry({ ...conf, purpose: "ME" });
            break;
          case "OC":
            setOrderCancel({ ...conf, purpose: "OC" });
            break;
        }
      });
    }
  }, [data]);

  const changeOrder = (v, key) => {
    setLunchOrder((lo) => ({ ...lo, [key]: v?.value }));
  };
  const changeMenuEntry = (v, key) => {
    setMenuEntry((me) => ({ ...me, [key]: v?.value }));
  };
  const changeOrderCancel = (v, key) => {
    setOrderCancel((oc) => ({ ...oc, [key]: v?.value }));
  };

  const saveData = (e) => {
    setLoading(true);
    const formData = [{ ...lunchOrder }, { ...menuEntry }, { ...orderCancel }];
    let method = "post";
    let url = LUNCH_TIME_CONFIG_LIST_CREATE_API;
    if (data?.data && Array.isArray(data?.data) && data?.data?.length > 0) {
      method = "put";
      url = LUNCH_TIME_CONFIG_LIST_UPDATE_API;
    }
    API[method](url, formData)
      .then((success) => {
        console.log(success.data);
        if (success?.data?.statuscode === 200) {
          success_alert(success?.data?.message);
        } else {
          error_alert(success?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  return (
    <Layout>
      <PageHeader title="Time Configuration" />
      <Content>
        <Card>
          <Card.Body>
            <Row>
              <Col sm={12} md={4} lg={4} className="d-flex align-items-center mb-2">
                <strong>Deadline Of Lunch Order For Next Day</strong>
              </Col>
              <Col sm={12} md={7} lg={7}>
                <Row>
                  <Col className="mb-2">
                    <Select
                      options={hours}
                      placeholder="Hour"
                      onChange={(v) => changeOrder(v, "hour")}
                      value={hours.find((h) => h.value === lunchOrder?.hour)}
                    ></Select>
                  </Col>
                  <Col className="mb-2">
                    <Select
                      options={minutes}
                      placeholder="Minute"
                      onChange={(v) => changeOrder(v, "minute")}
                      value={minutes.find((h) => h.value === lunchOrder?.minute)}
                    ></Select>
                  </Col>
                  <Col className="mb-2">
                    <Select
                      options={am_pm}
                      onChange={(v) => changeOrder(v, "meridiem")}
                      placeholder={"AM or PM"}
                      value={am_pm.find((h) => h.value === lunchOrder?.meridiem)}
                    ></Select>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={4} lg={4} className="d-flex align-items-center mb-2">
                <strong>Deadline Of Menu Entry For Next Day</strong>
              </Col>
              <Col sm={12} md={7} lg={7}>
                <Row>
                  <Col className="mb-2">
                    <Select
                      options={hours}
                      placeholder="Hour"
                      onChange={(v) => changeMenuEntry(v, "hour")}
                      value={hours.find((h) => h.value === menuEntry?.hour)}
                    ></Select>
                  </Col>
                  <Col className="mb-2">
                    <Select
                      options={minutes}
                      placeholder="Minute"
                      onChange={(v) => changeMenuEntry(v, "minute")}
                      value={minutes.find((h) => h.value === menuEntry?.minute)}
                    ></Select>
                  </Col>
                  <Col className="mb-2">
                    <Select
                      options={am_pm}
                      onChange={(v) => changeMenuEntry(v, "meridiem")}
                      placeholder={"AM or PM"}
                      value={am_pm.find((h) => h.value === menuEntry?.meridiem)}
                    ></Select>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={4} lg={4} className="d-flex align-items-center mb-2">
                <strong>Deadline Of Order Cancel For Next Day</strong>
              </Col>
              <Col sm={12} md={7} lg={7}>
                <Row>
                  <Col className="mb-2">
                    <Select
                      options={hours}
                      placeholder="Hour"
                      onChange={(v) => changeOrderCancel(v, "hour")}
                      value={hours.find((h) => h.value === orderCancel?.hour)}
                    ></Select>
                  </Col>
                  <Col className="mb-2">
                    <Select
                      options={minutes}
                      placeholder="Minute"
                      onChange={(v) => changeOrderCancel(v, "minute")}
                      value={minutes.find((h) => h.value === orderCancel?.minute)}
                    ></Select>
                  </Col>
                  <Col className="mb-2">
                    <Select
                      options={am_pm}
                      onChange={(v) => changeOrderCancel(v, "meridiem")}
                      placeholder={"AM or PM"}
                      value={am_pm.find((h) => h.value === orderCancel?.meridiem)}
                    ></Select>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col sm={12} md={11} lg={11} className="d-flex justify-content-end">
                <Button variant="primary" onClick={saveData}>
                  Save Configuration
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Content>
      {(loading || isLoading) && <Loader />}
    </Layout>
  );
}
