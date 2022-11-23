import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import { Accordion, Button, Card, Col, Form, Row } from "react-bootstrap";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { API } from "../../../utils/axios/axiosConfig";
import {
  KPI_PERFORMANCE_FORM,
  KPI_PERFORMANCE_FORM_DRAFT,
  KPI_PERFORMANCE_FORM_SINGLE,
  KPI_PERFORMANCE_FORM_SUBMIT,
  LOGIN_API,
} from "../../../utils/API_ROUTES";
import Loader from "../../../components/loader/Loader";
import { EMPLOYEE_PERFORMANCE_INDEX_PAGE } from "../../../utils/APP_ROUTES";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import KpiPerformanceFormComponent from "../../../components/kpi-performmance-form/KpiPerformanceFormComponent";
import * as PropTypes from "prop-types";
import useHrRating from "../../../hooks/kpi/hr_rating";
import useKpiValue from "../../../hooks/kpi/kpi_value";
import useDesignation from "../../../hooks/useDesignation";

export default function KpiPerformanceFormView() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const ratingList = useHrRating();
  const valueList = useKpiValue();
  useEffect(() => {
    setLoading(true);
    API.get(KPI_PERFORMANCE_FORM_SINGLE(id))
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((err) => {
        toast(err.response?.data?.non_field_errors[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const findRatingElem = (id) => {
    if (ratingList && Array.isArray(ratingList) && id) {
      const arr = ratingList.filter((v) => v?.id === parseInt(id));
      return arr.length > 0 ? arr[0].name : null;
    }
    return null;
  };
  const findValueElem = (id) => {
    if (valueList && Array.isArray(valueList) && id) {
      const arr = valueList.filter((v) => v?.id === parseInt(id));
      return arr.length > 0 ? arr[0].name : null;
    }
    return null;
  };
  return (
    <Layout>
      <div>
        <PageHeader subTitle={""} title={"KPI Performance Form Details"} onBack />
        <Container fluid>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={12} sm={12} md={6}>
                  <h5 className="header-pretitle mb-1">Name : </h5>
                  <h2 className="header-title mb-0">{data?.employee?.name}</h2>
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <h5 className="header-pretitle mb-0">Designation : </h5>
                  <h2 className="header-title mb-0">{data?.employee?.designation} </h2>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Row className="mb-4">
                <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                  <h2 className="mb-4 h3">OBJECTIVES SET FOR YEAR {data?.year}</h2>
                  <h4>Please write SMART Objective statements :</h4>
                  <p>
                    Please write SMART Objective statements : Streching, Measurable, Agreed, Realistic, Time-Bound Mark
                    PRIMARY objectives, to which a higher weighting will be given,with a * % .
                  </p>
                </Col>
                <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                  <h2 className="mb-4 h3">REVIEW OF RESULTS ACHIEVED</h2>
                  <h4>Ratings:</h4>
                  <ul className="list-group-numbered p-0">
                    {ratingList && Array.isArray(ratingList) && ratingList.map((v) => <li>{v?.name}</li>)}
                  </ul>
                </Col>
              </Row>
              <hr className="mb-4" />

              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">1. PRODUCTION</h3>
                      <h6 className="header-pretitle mb-0">(Product/ Project) (Cost, revenue, quality, quantity)</h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <h6 className="header-pretitle mb-2">Objective</h6>
                    <p className="fs-5 fw-bold" contentEditable={false}>
                      {data?.production || "N\\A"}
                    </p>
                    <Row>
                      <Col sm={6} xs={12} md={6}>
                        <h6 className="header-pretitle mb-2">Weightage Value</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.production_weightage || "N\\A"}
                        </p>
                      </Col>
                      <Col sm={6} xs={12} md={6}>
                        <h6 className="header-pretitle mb-2">Rating</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {findRatingElem(data?.production_rating) || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">2. SUPPORT</h3>
                      <h6 className="header-pretitle mb-0">
                        (Service, problem resolution, customer perception, business risk & reputation )
                      </h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <h6 className="header-pretitle mb-2">Objective</h6>
                    <p className="fs-5 fw-bold" contentEditable={false}>
                      {data?.support || "N\\A"}
                    </p>
                    <Row>
                      <Col sm={6} xs={12} md={6}>
                        <h6 className="header-pretitle mb-2">Weightage Value</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.support_weightage || "N\\A"}
                        </p>
                      </Col>
                      <Col sm={6} xs={12} md={6}>
                        <h6 className="header-pretitle mb-2">Rating</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {findRatingElem(data?.support_rating) || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">3. INNOVATION</h3>
                      <h6 className="header-pretitle mb-0">(New ideas and implementation)</h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <h6 className="header-pretitle mb-2">Objective</h6>
                    <p className="fs-5 fw-bold" contentEditable={false}>
                      {data?.innovation || "N\\A"}
                    </p>
                    <Row>
                      <Col sm={6} xs={12} md={6}>
                        <h6 className="header-pretitle mb-2">Weightage Value</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.innovation_weightage || "N\\A"}
                        </p>
                      </Col>
                      <Col sm={6} xs={12} md={6}>
                        <h6 className="header-pretitle mb-2">Rating</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {findRatingElem(data?.innovation_rating) || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">4. PEOPLE</h3>
                      <h6 className="header-pretitle mb-0">(Leadership, management, training)</h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <h6 className="header-pretitle mb-2">Objective</h6>
                    <p className="fs-5 fw-bold" contentEditable={false}>
                      {data?.people || "N\\A"}
                    </p>
                    <Row>
                      <Col sm={6} xs={12} md={6}>
                        <h6 className="header-pretitle mb-2">Weightage Value</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.people_weightage || "N\\A"}
                        </p>
                      </Col>
                      <Col sm={6} xs={12} md={6}>
                        <h6 className="header-pretitle mb-2">Rating</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {findRatingElem(data?.people_rating) || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">5. OTHER</h3>
                      <h6 className="header-pretitle mb-0">(Learning & development)</h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <h6 className="header-pretitle mb-2">Objective</h6>
                    <p className="fs-5 fw-bold" contentEditable={false}>
                      {data?.other || "N\\A"}
                    </p>
                    <Row>
                      <Col sm={6} xs={12} md={6}>
                        <h6 className="header-pretitle mb-2">Weightage Value</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.other_weightage || "N\\A"}
                        </p>
                      </Col>
                      <Col sm={6} xs={12} md={6}>
                        <h6 className="header-pretitle mb-2">Rating</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {findRatingElem(data?.other_rating) || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {/* value rating   */}

              {/*<hr className="mb-4"/>*/}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Row className="mb-4">
                <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                  <h2 className="mb-4 h3">VALUE RATINGS</h2>
                </Col>
                <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                  <h2 className="mb-4 h3">REVIEW OF RESULTS ACHIEVED</h2>
                  <h4>Ratings:</h4>
                  <ol style={{ listStyleType: "upper-alpha", paddingLeft: "16px" }}>
                    {valueList && Array.isArray(valueList) && valueList.map((v) => <li>{v?.name}</li>)}
                  </ol>
                </Col>
              </Row>
              <hr className="mb-4" />
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">1. COURAGEOUS</h3>
                      <h6 className="header-pretitle mb-0">
                        (Moral Strength: faith and belief in oneself, self confidence)
                      </h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <h6 className="header-pretitle mb-2">Value</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.courageous || "N\\A"}
                        </p>
                      </Col>
                      <Col sm={12} xs={12} md={12}>
                        <h6 className="header-pretitle mb-2">Rating</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {findValueElem(data?.courageous_rating) || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">2. TEAMWORK</h3>
                      <h6 className="header-pretitle mb-0">
                        (Team player, not exclusive: Enjoy sharing and collaborating with relevent parties)
                      </h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <h6 className="header-pretitle mb-2">Value</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.teamwork || "N\\A"}
                        </p>
                      </Col>
                      <Col sm={12} xs={12} md={12}>
                        <h6 className="header-pretitle mb-2">Rating</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {findValueElem(data?.teamwork_rating) || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">3. RESPONSIVE</h3>
                      <h6 className="header-pretitle mb-0">
                        (Attentive, Interactive : consider everyone inside & outside as customer ; stakeholder)
                      </h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <h6 className="header-pretitle mb-2">Value</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.responsive || "N\\A"}
                        </p>
                      </Col>
                      <Col sm={12} xs={12} md={12}>
                        <h6 className="header-pretitle mb-2">Rating</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {findValueElem(data?.responsive_rating) || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">4. CREATIVE</h3>
                      <h6 className="header-pretitle mb-0">(Business minds: Translates imagination into business)</h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <h6 className="header-pretitle mb-2">Value</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.creative || "N\\A"}
                        </p>
                      </Col>
                      <Col sm={12} xs={12} md={12}>
                        <h6 className="header-pretitle mb-2">Rating</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {findValueElem(data?.creative_rating) || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">5. TRUSTWORTHY</h3>
                      <h6 className="header-pretitle mb-0">(Deserving of trust , confidence , reliable, dependable)</h6>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <h6 className="header-pretitle mb-2">Value</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.trustworthy || "N\\A"}
                        </p>
                      </Col>
                      <Col sm={12} xs={12} md={12}>
                        <h6 className="header-pretitle mb-2">Rating</h6>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {findValueElem(data?.trustworthy_rating) || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {/* value rating   */}

              {/*<hr className="mb-4"/>*/}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">OTHER SUBSTANTIAL ACHIEVEMENTS</h3>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.other_sustainable_achievement || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">SIGNIFICANT ISSUES</h3>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.significant_issue || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {/* value rating   */}

              {/*<hr className="mb-4"/>*/}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h2 className="header-title mb-0">Comments</h2>
              <hr className="mb-4" />
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">INDIVIDUAL'S COMMENTS</h3>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.individual_comment || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">MANAGERS COMMENTS</h3>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.manager_comment || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS</h3>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.senior_manager_functional_head_comment || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header as={"div"}>
                    <div>
                      <h3 className="header-title mb-0">DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS</h3>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.director_chief_operating_officer_comment || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {/* value rating   */}

              {/*<hr className="mb-4"/>*/}
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h2 className="header-title mb-0">OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING</h2>
              <hr className="mb-4" />
              <Accordion>
                <Accordion.Item>
                  <Accordion.Body className={"show"}>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <p className="fs-5 fw-bold" contentEditable={false}>
                          {data?.overall_performance || "N\\A"}
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </Container>
        {loading && <Loader />}
      </div>
    </Layout>
  );
}
